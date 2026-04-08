import {Metadata} from 'next'
import {PageWrapper} from "@/components/page-wrapper"
import Header from "@/components/blocks/header"
import Footer from "@/components/blocks/footer"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {promises as fs} from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: "License - Soncresity Industries",
  description: "License information for Soncresity Industries",
}

async function getLicenseContent() {
  try {
    const licenseFilePath = path.join(process.cwd(), 'app', 'license', 'license.md')
    const fileContent = await fs.readFile(licenseFilePath, 'utf8')
    return fileContent
  } catch (error) {
    console.error('Error reading license file:', error)
    return 'License file not found.'
  }
}

export default async function LicensePage() {
  const licenseContent = await getLicenseContent()

  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-dvh flex flex-col">
        <Header/>

        <div className="flex-1 pt-header relative">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center">License</h1>
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {licenseContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </main>
    </PageWrapper>
  )
}