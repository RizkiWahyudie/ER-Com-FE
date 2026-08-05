import { ColorModeScript } from "@chakra-ui/react";
import "./globals.css";
import Providers from "./providers";
import ChunkErrorReloader from "@/components/ChunkErrorReloader";
import ScrollToTop from "@/components/ScrollToTop";

const productionUrl = process.env.URL_PRODUCTION || "https://www.er-communication.com";

export const metadata = {
  metadataBase: new URL(productionUrl),
  title: {
    default: "ER | Communication",
    template: "%s | ER | Communication",
  },
  description:
    "ER | Communication adalah agensi komunikasi dan branding yang membantu bisnis membangun citra, konten, dan koneksi yang kuat melalui strategi kreatif dan digital.",
  keywords: [
    "ER Communication",
    "agency komunikasi",
    "branding",
    "digital marketing",
    "content creation",
    "public relations",
  ],
  applicationName: "ER | Communication",
  authors: [{ name: "ER | Communication" }],
  creator: "ER | Communication",
  publisher: "ER | Communication",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ER | Communication",
    description:
      "ER | Communication membantu brand tumbuh melalui strategi komunikasi, branding, dan konten digital yang relevan.",
    url: productionUrl,
    siteName: "ER | Communication",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/hero/navbar-logo-sm.svg",
        width: 1200,
        height: 630,
        alt: "ER | Communication",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ER | Communication",
    description:
      "ER | Communication membantu brand tumbuh melalui strategi komunikasi, branding, dan konten digital yang relevan.",
    images: ["/assets/hero/navbar-logo-sm.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/hero/navbar-logo-sm.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode="dark" />
        <ChunkErrorReloader />
        <Providers>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
