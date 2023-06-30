import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.scss";

import { Roboto } from "next/font/google";
import { Providers } from "./providers";

const inter = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "MyMixtape",
  description: "Unite your playlists, amplify your vibes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
          integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} gradient-background`}>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
