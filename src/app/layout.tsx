import "@/styles/global.css";
import Header from '@/src/app/layout/header'
import Footer from "@/src/app/layout/footer";
import Body from "@/src/app/layout/body";
import Image from 'next/image'
import Script from "next/script";

function Background() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
    }}>
      <Image
        src="/images/1.jpg"
        alt="background image"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Background />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          <Body/>
          <Footer/>
          <link rel="stylesheet" href="/live2d-widget/waifu.css" />
          <Script src="/live2d-widget/autoload.js" strategy="afterInteractive" />
        </div>
      </body>
    </html>
  );
}