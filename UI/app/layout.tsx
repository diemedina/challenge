import type { Metadata } from "next";
import Search from "./components/Search";
import "./globals.scss";

export const metadata: Metadata = {
  title: "MercadoLibre Challenge",
  description: "Diego Medina - Challenge Frontend Developer",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Search></Search>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
