import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "CINETRACK - Personal Cinema & TV Tracker",
  description: "Personal Cinema & TV Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} bg-[#111111] text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container`}
      >
        {children}
      </body>
    </html>
  );
}
