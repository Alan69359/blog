import "@/styles/global.css";
import Header from '@/src/app/layout/header'
import Footer from "@/src/app/layout/footer";
import Script from "next/script";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Blog Title',
  description: 'Your blog description',
}

export default function RootLayout(
  {children}: {children: React.ReactNode}
) {
  return (
    <html>
        <body>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header />{children}<Footer/>
            <link rel="stylesheet" href="/live2d-widget/waifu.css" />
            <Script src="/live2d-widget/autoload.js" strategy="afterInteractive" />
          </div>
      </body>
    </html>
  );
}