import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Mission Manager",
  description: "Manage your Freelance missions here, simple and efficient ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="dark dark:bg-black">
        {children}
      </body>
    </html>
  );
}
