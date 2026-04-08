import { Metadata } from 'next'
import {PageWrapper} from "@/components/page-wrapper"
import Header from "@/components/blocks/header"
import Help from "@/components/blocks/help"
import Footer from "@/components/blocks/footer"

export const metadata: Metadata = {
  title: "Help & Support - Soncresity Industries",
  description: "Get help and support for Soncresity Industries projects and services",
}

export default function HelpPage() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-screen relative text-foreground">
        <Header/>
        
        <Help/>
        
        <Footer/>
      </main>
    </PageWrapper>
  )
}