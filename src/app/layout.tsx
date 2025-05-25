import { cn } from "@/lib/utils";
import "@/styles/global.css";
import Image from 'next/image';
import Link from 'next/link';
import utilStyles from '@/styles/utils.module.css';

const name = 'Alan69359';

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
          <header className="flex flex-col items-center">
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </header>
          <main className="mt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}