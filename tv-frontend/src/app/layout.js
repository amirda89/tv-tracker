import "./globals.css";

export const metadata = {
  title: "TV Tracker",
  description: "TV Tracker web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
