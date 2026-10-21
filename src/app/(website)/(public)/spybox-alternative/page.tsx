import { GroupBuyEditorialPage } from "@/components/group-buy-editorial-page";
import { siteConfig } from "@/config/site";
import { spyboxAlternatives as page } from "@/data/group-buy-weekly-pages";
import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({
  title: page.metaTitle,
  description: page.description,
  canonicalUrl: `${siteConfig.url}${page.path}`,
  primaryKeyword: page.keyword,
});
export default function Page() {
  return <GroupBuyEditorialPage page={page} />;
}
