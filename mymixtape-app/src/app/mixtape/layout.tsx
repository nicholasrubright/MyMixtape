import MixtapeLayout from "@/components/layouts/MixtapeLayout";

export default function MixtapePageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <MixtapeLayout>{children}</MixtapeLayout>;
}
