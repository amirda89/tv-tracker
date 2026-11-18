import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL);
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Цувралын анги, улирал болон төлөвийг автоматаар тооцоолох туслах функц
function calculateSeriesState({ cur_season, cur_ep, total_seasons, total_ep }) {
  let season = Math.max(1, Number(cur_season) || 1);
  let ep = Math.max(0, Number(cur_ep) || 0);
  const maxSeasons = Math.max(1, Number(total_seasons) || 1);
  const maxEp = Math.max(1, Number(total_ep) || 10);

  // Хэрэв тухайн улирлын сүүлийн ангид хүрсэн эсвэл давсан бол
  if (ep >= maxEp) {
    if (season < maxSeasons) {
      // Дараагийн улирал байгаа тул шилжүүлнэ (1-р ангиас эхэлнэ)
      season += 1;
      ep = 1;
      return {
        cur_season: season,
        cur_ep: ep,
        total_seasons: maxSeasons,
        total_ep: maxEp,
        status: "Watching",
      };
    } else {
      // Бүх улирал, бүх анги дууссан
      return {
        cur_season: maxSeasons,
        cur_ep: maxEp,
        total_seasons: maxSeasons,
        total_ep: maxEp,
        status: "Completed",
      };
    }
  }

  // 1-р улирлын 0-р анги дээр байвал огт эхлээгүй гэж үзнэ
  if (season === 1 && ep === 0) {
    return {
      cur_season: 1,
      cur_ep: 0,
      total_seasons: maxSeasons,
      total_ep: maxEp,
      status: "Plan to Watch",
    };
  }

  // 1-ээс дээш анги үзсэн боловч дуусаагүй байгаа үед
  return {
    cur_season: season,
    cur_ep: ep,
    total_seasons: maxSeasons,
    total_ep: maxEp,
    status: "Watching",
  };
}

// 1. Бүх медиаг авах
app.get("/api/media", async (req, res) => {
  try {
    const result = await sql`SELECT * FROM media_library ORDER BY id DESC`;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// 2. Шинээр нэмэх
app.post("/api/media", async (req, res) => {
  try {
    const {
      title,
      type,
      genre,
      year,
      rating,
      status,
      runtime,
      cur_season,
      cur_ep,
      total_seasons,
      total_ep,
    } = req.body;

    const maxIdRes = await sql`SELECT MAX(id) as max_id FROM media_library`;
    const newId = (maxIdRes[0]?.max_id || 0) + 1;

    let finalSeason = 1;
    let finalEp = 0;
    let finalTotalSeasons = 1;
    let finalTotalEp = 10;
    let finalStatus = status || "Plan to Watch";

    if (type === "Series") {
      const calculated = calculateSeriesState({
        cur_season,
        cur_ep,
        total_seasons,
        total_ep,
      });
      finalSeason = calculated.cur_season;
      finalEp = calculated.cur_ep;
      finalTotalSeasons = calculated.total_seasons;
      finalTotalEp = calculated.total_ep;
      finalStatus = calculated.status;
    }

    const result = await sql`
      INSERT INTO media_library (id, title, type, genre, year, rating, status, runtime, cur_season, cur_ep, total_seasons, total_ep)
      VALUES (${newId}, ${title}, ${type}, ${genre}, ${year}, ${rating}, ${finalStatus}, ${runtime || "2h 12m"}, ${finalSeason}, ${finalEp}, ${finalTotalSeasons}, ${finalTotalEp})
      RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert media" });
  }
});

// 3. Мэдээлэл засах болон +1 Episode дарах
app.patch("/api/media/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currentRes = await sql`SELECT * FROM media_library WHERE id = ${id}`;
    if (currentRes.length === 0) {
      return res.status(404).json({ error: "Media not found" });
    }
    const media = currentRes[0];

    const updatedType = req.body.type ?? media.type;
    let finalSeason = req.body.cur_season ?? media.cur_season;
    let finalEp = req.body.cur_ep ?? media.cur_ep;
    let finalTotalSeasons = req.body.total_seasons ?? media.total_seasons;
    let finalTotalEp = req.body.total_ep ?? media.total_ep;
    let finalStatus = req.body.status ?? media.status;

    if (updatedType === "Series") {
      // +1 Episode товч дарсан бол одоогийн ангийг 1-ээр нэмэгдүүлнэ
      if (req.body.is_quick_increment) {
        finalEp = (media.cur_ep || 0) + 1;
      }

      const calculated = calculateSeriesState({
        cur_season: finalSeason,
        cur_ep: finalEp,
        total_seasons: finalTotalSeasons,
        total_ep: finalTotalEp,
      });

      finalSeason = calculated.cur_season;
      finalEp = calculated.cur_ep;
      finalTotalSeasons = calculated.total_seasons;
      finalTotalEp = calculated.total_ep;
      finalStatus = calculated.status;
    }

    const result = await sql`
      UPDATE media_library 
      SET 
        title = COALESCE(${req.body.title}, title),
        type = ${updatedType},
        genre = COALESCE(${req.body.genre}, genre),
        year = COALESCE(${req.body.year}, year),
        rating = COALESCE(${req.body.rating}, rating),
        status = ${finalStatus},
        runtime = COALESCE(${req.body.runtime}, runtime),
        cur_season = ${finalSeason},
        cur_ep = ${finalEp},
        total_seasons = ${finalTotalSeasons},
        total_ep = ${finalTotalEp}
      WHERE id = ${id}
      RETURNING *;
    `;

    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update media" });
  }
});

// 4. Spotlight тохируулах
app.patch("/api/media/:id/spotlight", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`UPDATE media_library SET is_spotlight = FALSE`;
    const result = await sql`
      UPDATE media_library SET is_spotlight = TRUE WHERE id = ${id} RETURNING *;
    `;
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update spotlight" });
  }
});

// 5. Устгах
app.delete("/api/media/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM media_library WHERE id = ${id}`;
    res.json({ message: "Deleted successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete media" });
  }
});

app.listen(port, () => {
  console.log(`CineTrack backend listening on port ${port}`);
});
