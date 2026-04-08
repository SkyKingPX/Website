import { Metadata } from 'next'
import {PageWrapper} from "@/components/page-wrapper"
import Header from "@/components/blocks/header"
import Team from "@/components/blocks/team"
import Footer from "@/components/blocks/footer"

export const metadata: Metadata = {
  title: "Team - Soncresity Industries",
  description: "Meet the Soncresity Industries team",
}

export default function TeamPage() {
  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-dvh flex flex-col">
        <Header/>

        <div className="flex-1 pt-header relative">
          <Team/>
          <div className="h-[var(--header-h)]" />
        </div>
        
        <Footer/>
      </main>
    </PageWrapper>
  )
}