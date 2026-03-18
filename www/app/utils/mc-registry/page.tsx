import {Metadata} from "next";
import {metadataImageHeight, metadataImageWidth} from "@/components/variables";
import {PageWrapper} from "@/components/page-wrapper";
import MCRegistry from "@/components/blocks/utils/mc-registry";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export const metadata: Metadata = {
  title: "Minecraft Registry - Soncresity Industries",
  description: "Browse Minecraft registry data including Block IDs, Sound Events, and more",
  openGraph: {
    title: "Minecraft Registry - Soncresity Industries",
    description: "Browse Minecraft registry data including Block IDs, Sound Events, and more",
    images: [
      {
        url: "https://soncresity.industries/logo.png",
        width: metadataImageWidth,
        height: metadataImageHeight,
      },
    ],
  },
}

export default function MCRegistryPage() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <Header/>
      <div className="container mx-auto px-4 py-20 mt-12">
        <h1 className="text-4xl font-serephixBold mb-2">Minecraft Registry</h1>
        <p className="text-muted-foreground mb-8">Browse registry data from Minecraft including Block IDs, Sound Events, and more. Select a type and version to view the available entries.</p>

        <MCRegistry />
      </div>
      <Footer/>
    </PageWrapper>
  )
}

