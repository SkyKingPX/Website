import { Metadata } from 'next'
import { PageWrapper } from "@/components/page-wrapper"
import Header from "@/components/blocks/header"
import Footer from "@/components/blocks/footer"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  return {
    title: `${slug} - Archive Notes - Soncresity Industries`,
    description: `Archive note: ${slug}`,
  }
}

async function getNoteContent(slug: string) {
  try {
    const noteFilePath = path.join(process.cwd(), 'public', 'archive', 'notes', `${slug}.md`)
    const fileContent = await fs.readFile(noteFilePath, 'utf8')
    return fileContent
  } catch (error) {
    console.error('Error reading note file:', error)
    return null
  }
}

export default async function ArchiveNotePage({ params }: Props) {
  const { slug } = await params
  const noteContent = await getNoteContent(slug)

  if (!noteContent) {
    notFound()
  }

  // Format the title from slug (e.g., "cardiac-interface-1" -> "Cardiac Interface 1")
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <PageWrapper backgroundInterval={30000}>
      <main className="min-h-dvh flex flex-col">
        <Header/>

        <div className="flex-1 pt-header relative">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-center">{title}</h1>
              <p className="text-muted-foreground text-center">Archive Notes</p>
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-blockquote:text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {noteContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>

          <div className="h-[var(--header-h)]" />
        </div>
        
        <Footer/>
      </main>
    </PageWrapper>
  )
}