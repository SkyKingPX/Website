import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import {Metadata} from "next";
import {metadataImageHeight, metadataImageWidth} from "@/components/variables";
import HeightDPGen from "@/components/blocks/utils/height-dp-gen";
import {PageWrapper} from "@/components/page-wrapper";

export const metadata: Metadata = {
  title: "MC Height Datapack Generator - Utilities - Soncresity Industries",
  description: "Generate custom Minecraft datapacks for modifying dimension heights",
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

export default function Generator() {
    return (
      <PageWrapper backgroundInterval={30000}>
        <main className="min-h-screen">
            <Header/>

            <HeightDPGen/>

            <Footer/>
        </main>
      </PageWrapper>
    );
}
