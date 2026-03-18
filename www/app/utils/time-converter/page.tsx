import {Metadata} from "next";
import {metadataImageHeight, metadataImageWidth} from "@/components/variables";
import {PageWrapper} from "@/components/page-wrapper";
import TimeConverter from "@/components/blocks/utils/time-converter";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export const metadata: Metadata = {
  title: "Time System Converter - Soncresity Industries",
  description: "Convert time between different systems including Earth Time, Sodonian Time, Infernian Time, and Creator Time",
  openGraph: {
    title: "Time System Converter - Soncresity Industries",
    description: "Convert time between different systems including Earth Time, Sodonian Time, Infernian Time, and Creator Time",
    images: [
      {
        url: "https://soncresity.industries/logo.png",
        width: metadataImageWidth,
        height: metadataImageHeight,
      },
    ],
  },
}

export default function TimeConverterPage() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <Header/>
      <div className="container mx-auto px-4 py-20 mt-12">
        <h1 className="text-4xl font-serephixBold mb-2">Time System Converter</h1>
        <p className="text-muted-foreground mb-8">
          Convert time between different temporal systems including Earth Time, Sodonian Time, Infernian Time, and Creator Time.
          Each system represents different ways of measuring and calculating time.
        </p>

        <TimeConverter />
      </div>
      <Footer/>
    </PageWrapper>
  )
}