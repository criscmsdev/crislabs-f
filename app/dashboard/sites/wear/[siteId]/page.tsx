import { wearGetPages0WithCursor } from '@/lib/wear/page/page0/getPagesWithCursor';
import { wearGetSite } from '@/lib/wear/site/getSite';
import { wearGetSites } from '@/lib/wear/site/getSites';
import { SearchProvider } from '@/src/context/SearchContext';
import { WearGridPages0 } from '@/ui/grid/WearGridPages0';
import { HeadingDashboard } from '@/ui/heading/HeadingDashboard';
import { HeadingDashboardv1 } from '@/ui/heading/HeadingDashboardv1';

interface Props {
  params: {
    siteId: string;
  };
}

export default async function Page(props: Props) {
  const {
    params: { siteId },
  } = props;
  const site = await wearGetSite(siteId)
  const pages = await wearGetPages0WithCursor({ first: 12 }, siteId);

  return (
    <SearchProvider>
      {/* <HeadingDashboard /> */}
      <HeadingDashboardv1 site={site}/>
      <WearGridPages0 pages0={pages} parentId={siteId} />
    </SearchProvider>
  );
}

export async function generateStaticParams() {
  const sites = await wearGetSites();
  return sites.map((data) => ({ siteId: data._id }));
}
