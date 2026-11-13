import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { CustomizeProvider, prefsScript } from "@/lib/customize";

export const metadata: Metadata = {
  title: "Likita — Product Designer",
  description: "Product design for AI-native CRM and B2B SaaS.",
};
export const viewport: Viewport = { themeColor: "#0f0f0e", colorScheme: "dark light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-bg="2" data-scroll-behavior="smooth" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-pill focus:px-4 focus:py-2 focus:text-pill-fg"
        >
          Skip to content
        </a>
        <CustomizeProvider>{children}</CustomizeProvider>
      </body>
    </html>
  );
}
