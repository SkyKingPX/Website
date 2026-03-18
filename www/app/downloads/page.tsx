import {PageWrapper} from "@/components/page-wrapper";
import {Metadata} from "next";
import {metadataImageHeight, metadataImageWidth} from "@/components/variables";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export const metadata: Metadata = {
  title: "Downloads - Soncresity Industries",
  description: "Download the latest versions of Soncresity Industries' projects, including mods, tools, and more.",
  openGraph: {
    title: "MC Height Datapack Generator - Utilities - Soncresity Industries",
    description: "Generate custom Minecraft datapacks for modifying dimension heights",
    images: [
      {
        url: "https://soncresity.industries/logo.png",
        width: metadataImageWidth,
        height: metadataImageHeight,
      },
    ],
  },
}

export default function DownloadsPage() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-dvh flex flex-col">
        <Header/>

        <div className="flex-1 pt-header relative">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-serephixBold mb-6">Download</h1>
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Work in Progress</h2>
              <p className="text-muted-foreground">
                This section is currently under development. Please check back later.
              </p>
            </div>
          </div>
          <div className="h-[var(--header-h)]"/>
        </div>

        <Footer/>
      </main>
    </PageWrapper>
  )
}
