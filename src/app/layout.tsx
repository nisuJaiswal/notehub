import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ConvexProvider } from "@/providers/convex-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/modal-provider";
// import { ConvexClientProvider } from "@/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "An web application that allows to post notes along with the pictures",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="notehub"
            >
              <Toaster position="bottom-center"></Toaster>
              <ModalProvider />

              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
