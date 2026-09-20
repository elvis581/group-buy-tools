import { GroupBuyFooter, GroupBuyHeader } from "@/components/group-buy-site";

export default function PublicLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <GroupBuyHeader />
      <main className="public-main flex-1">{children}</main>
      <GroupBuyFooter />
    </div>
  );
}
