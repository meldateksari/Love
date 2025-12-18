import "./globals.css";
import { Crimson_Text, Pacifico } from "next/font/google";

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${crimson.variable} ${pacifico.variable}`}>
      <body className="font-crimson bg-rose-50 text-rose-950 antialiased">
        {children}
      </body>
    </html>
  );
}
