import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "@/styles/global.css";
import { Header } from "@/components/header";

const siteTitle = "Alan's blog";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Header />
          <main className="mt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}