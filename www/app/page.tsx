import { Metadata } from 'next'
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Analytics} from "@vercel/analytics/next"
import {PageWrapper} from "@/components/page-wrapper"
import Header from "@/components/blocks/header"
import HomeBlock from "@/components/blocks/home"
import Footer from "@/components/blocks/footer"
import {metadataImageHeight, metadataImageWidth} from "@/components/variables";

export const metadata: Metadata = {
  title: "Soncresity Industries",
  description: "The official Website of Soncresity Industries",
  openGraph: {
    title: "Soncresity Industries",
    description: "The official Website of Soncresity Industries",
    images: [
      {
        url: "https://soncresity.industries/logo.png",
        width: metadataImageWidth,
        height: metadataImageHeight,
      },
    ],
  },
}

export default function Home() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-screen flex flex-col">
        <Header />
        <SpeedInsights/>
        <Analytics/>

        <div className="flex-1 flex flex-col">
          <HomeBlock />
        </div>

        <Footer />
      </main>
    </PageWrapper>
  )
}
