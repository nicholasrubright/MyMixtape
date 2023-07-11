import MixtapeLayout from "@/components/layouts/MixtapeLayout";

export const metadata = {
  title: "MyMixtape | Welcome!",
};

export default function MixtapePageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <MixtapeLayout>{children}</MixtapeLayout>;
}
