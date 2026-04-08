import { Metadata } from 'next'
import {PageWrapper} from "@/components/page-wrapper"
import Header from "@/components/blocks/header"
import Partners from "@/components/blocks/partners"
import Footer from "@/components/blocks/footer"

export const metadata: Metadata = {
  title: "Partners - Soncresity Industries",
  description: "Our partners and collaborations",
}

export default function PartnersPage() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-dvh flex flex-col">
        <Header/>
        
        <Partners/>
        
        <Footer/>
      </main>
    </PageWrapper>
  )
}