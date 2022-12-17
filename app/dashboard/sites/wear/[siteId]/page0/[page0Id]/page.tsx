import { wearGetPage0 } from '@/lib/wear/page/page0/getPage';
import { wearGetPages0 } from '@/lib/wear/page/page0/getPages';
import { wearGetPages1WithCursor } from '@/lib/wear/page/page1/getPagesWithCursor';
import { SearchProvider } from '@/src/context/SearchContext';
import { WearGridPages1 } from '@/ui/grid/WearGridPages1';
import { HeadingDashboardv1 } from '@/ui/heading/HeadingDashboardv1';

interface Props {
  params: {
    siteId: string;
    page0Id: string;
  };
}

export default async function Page(props: Props) {
  const {
    params: { page0Id, siteId },
  } = props;
  const page = await wearGetPage0(page0Id);
  const pages = await wearGetPages1WithCursor({ first: 12 }, page0Id);

  return (
    <SearchProvider>
      <HeadingDashboardv1 page={page} />
      <WearGridPages1 pages1={pages} parentId={page0Id} />
    </SearchProvider>
  );
}

export async function generateStaticParams() {
  const pages = await wearGetPages0();
  return pages.map((data) => ({ siteId: data.siteId, page0Id: data._id }));
}
