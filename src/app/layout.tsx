import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripPlanner - AI-Powered Travel Planning",
  description: "Plan your perfect trip with AI-powered itineraries, flight bookings, and personalized recommendations.",
  keywords: "travel, trip planning, AI, itinerary, flights, hotels, vacation",
  authors: [{ name: "TripPlanner Team" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}