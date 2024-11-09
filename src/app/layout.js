import Section from "/src/app/component/layouts/Section.js";
import "./globals.css";

export const metadata = {
  title: "Welcome to Treetherium",
  description: "Please wait for a second.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
