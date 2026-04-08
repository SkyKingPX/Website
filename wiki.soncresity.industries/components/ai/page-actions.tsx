'use client';
import { useMemo, useState } from 'react';
import { Check, ChevronDown, Copy, ExternalLinkIcon, MessageCircleIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import Image from "next/image";

const cache = new Map<string, string>();

export function LLMCopyButton({
  /**
   * A URL to fetch the raw Markdown/MDX content of page
   */
  markdownUrl,
}: {
  markdownUrl: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setLoading(true);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': fetch(markdownUrl).then(async (res) => {
            const content = await res.text();
            cache.set(markdownUrl, content);

            return content;
          }),
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          color: 'secondary',
          size: 'sm',
          className: 'gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground',
        }),
      )}
      onClick={onClick}
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </button>
  );
}

export function ViewOptions({curseforgeUrl, modrinthUrl}: {
  curseforgeUrl?: string;
  modrinthUrl?: string;
}) {
  const items = useMemo(() => {
    const allItems = [
      {
        title: 'Join Discord',
        href: "https://discord.gg/zUDCFPHePq",
        icon: <Image src="/icons/discord.png" alt="Discord Logo" width="16" height="16"/>
      },
      {
        title: 'Request Support',
        href: "https://support.soncresity.industries",
        icon: <Image src="/icons/si-lg.png" alt="SI Logo" width="16" height="16"/>
      },
      ...(curseforgeUrl ? [{
        title: 'CurseForge Project Page',
        href: curseforgeUrl,
        icon: <Image src="/icons/curseforge.png" alt="CurseForge Logo" width="16" height="16"/>
      }] : []),
      ...(modrinthUrl ? [{
        title: 'Modrinth Project Page',
        href: modrinthUrl,
        icon: <Image src="/icons/modrinth.png" alt="Modrinth Logo" width="16" height="16"/>
      }] : []),
    ];

    return allItems;
  }, [curseforgeUrl, modrinthUrl]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            color: 'secondary',
            size: 'sm',
            className: 'gap-2',
          }),
        )}
      >
        Actions
        <ChevronDown className="size-3.5 text-fd-muted-foreground"/>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className="text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4"
          >
            {item.icon}
            {item.title}
            <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto"/>
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}
