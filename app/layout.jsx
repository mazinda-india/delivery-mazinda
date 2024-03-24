import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Food Delivery - Mazinda",
  description: "Food Delivery - Mazinda",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
