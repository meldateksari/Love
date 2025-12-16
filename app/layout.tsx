import "./globals.css";
import { Crimson_Text } from "next/font/google";

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={crimson.variable}>
      <body className="font-crimson bg-rose-50 text-rose-950 antialiased">
        {children}
      </body>
    </html>
  );
}
