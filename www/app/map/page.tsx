import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import {TiledMap} from "@/components/TiledMap";
import {Metadata} from "next";
import {metadataImageHeight, metadataImageWidth} from "@/components/variables";
import {PageWrapper} from "@/components/page-wrapper";

export const metadata: Metadata = {
  title: "Sodonia World Map - Soncresity Industries",
  description: "The official World Map of Sodonia by Soncresity Industries",
  openGraph: {
    title: "Sodonia World Map - Soncresity Industries",
    description: "The official World Map of Sodonia by Soncresity Industries",
    images: [
      {
        url: "https://soncresity.industries/logo.png",
        width: metadataImageWidth,
        height: metadataImageHeight,
      },
    ],
  },
}

export default function MapPage() {

  const generateTileUrls = (rows: number, cols: number) => {
    return Array.from({length: rows}, (_, row) =>
      Array.from({length: cols}, (_, col) =>
        `tile-${row + 1}-${col + 1}.jpg`
      )
    );
  };

  const mapTiles = generateTileUrls(10, 10);

  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-screen">
        <Header/>
        <section id="map" className="pt-20">
          <TiledMap tileSize={256} tiles={mapTiles}/>
        </section>
        <Footer/>
      </main>
    </PageWrapper>
  )
}
