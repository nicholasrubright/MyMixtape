import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.scss";

import { Roboto } from "next/font/google";
import Headers from "@/components/headers/Headers";

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
      <Headers />
      <body className={`${inter.className} gradient-background`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
