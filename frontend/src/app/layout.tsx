import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoodMate AI - Privacy-Focused Mood Tracking",
  description: "Track your emotions, discover patterns, and get AI-powered insights about your mental wellness journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
