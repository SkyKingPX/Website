import './global.css';
import {source} from '@/lib/source';
import {DocsLayout} from 'fumadocs-ui/layouts/docs';
import {baseOptions} from '@/lib/layout.shared';
import {ThemeProvider} from 'next-themes';
import {RootProvider} from "fumadocs-ui/provider/next";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});


export default function Layout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-mono", jetbrainsMono.variable)}>
    <body>
    <RootProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DocsLayout tree={source.getPageTree()} {...baseOptions()}
                    sidebar={{
                      tabs: {
                        transform: (option, node) => {
                          const iconValue = (node as any)?.icon;

                          // Check if icon is a path (contains / or .png) rather than a lucide icon name
                          if (typeof iconValue === 'string' && (iconValue.includes('/') || iconValue.includes('.png'))) {
                            const src = iconValue.startsWith('/') ? iconValue : `/${iconValue}`;

                            return {
                              ...option,
                              icon: (
                                <img
                                  src={src}
                                  alt="icon"
                                  width={24}
                                  height={24}
                                  style={{objectFit: 'contain'}}
                                />
                              ),
                            };
                          }

                          return option;
                        },
                      },
                    }}
        >
          {children}
        </DocsLayout>
      </ThemeProvider>
    </RootProvider>
    </body>
    </html>
  );
}