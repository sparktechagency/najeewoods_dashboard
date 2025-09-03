import { Inter } from "next/font/google"; // Import the Inter font
import "@/app/style/globals.css";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter", 
  subsets: ["latin"], 
});

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "Dashboard Overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
