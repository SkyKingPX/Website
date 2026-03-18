import {Metadata} from "next";
import {metadataImageHeight, metadataImageWidth} from "@/components/variables";
import {PageWrapper} from "@/components/page-wrapper";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export const metadata: Metadata = {
  title: "Utilities - Soncresity Industries",
  description: "All online utilities provided by Soncresity Industries",
  openGraph: {
    title: "Utilities - Soncresity Industries",
    description: "All online utilities provided by Soncresity Industries",
    images: [
      {
        url: "https://soncresity.industries/logo.png",
        width: metadataImageWidth,
        height: metadataImageHeight,
      },
    ],
  },
}

const utilities = [
  {
    id: "mc-registry",
    title: "Minecraft Registry",
    description: "Browse Minecraft registry data including Block IDs, Sound Events, and more. Supports multiple versions with easy filtering.",
    href: "/utils/mc-registry",
  },
  {
    id: "mc-height-dp-gen",
    title: "Minecraft World Height Datapack Generator",
    description: "Generate Minecraft datapacks that modify the maximum build height for different dimensions and versions.",
    href: "/utils/mc-height-dp-gen",
  },
  {
    id: "time-converter",
    title: "Time System Converter",
    description: "Convert time between different systems including Earth Time, Sodonian Time, Infernian Time, and Creator Time.",
    href: "/utils/time-converter",
  },
];

export default function UtilsPage() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-dvh flex flex-col">
        <Header/>
        <div className="container mx-auto px-4 py-28 pb-36">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-serephixBold mb-2">Utilities</h1>
            <p className="text-muted-foreground mb-8 text-center max-w-2xl">A collection of online tools for developers and users.</p>

            {/* Utilities Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-2xl w-full">
            {utilities.map((utility) => (
              <Card key={utility.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{utility.title}</CardTitle>
                  <CardDescription>{utility.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Link href={utility.href}>
                    <Button className="w-full">
                      Open Utility
                      <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        </div>
        <Footer/>
      </main>
    </PageWrapper>
  )
}
