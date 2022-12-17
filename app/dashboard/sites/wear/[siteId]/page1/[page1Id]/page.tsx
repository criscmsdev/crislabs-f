import { wearGetPage1 } from '@/lib/wear/page/page1/getPage';
import { wearGetPages1 } from '@/lib/wear/page/page1/getPages';
import { wearGetPages2WithCursor } from '@/lib/wear/page/page2/getPagesWithCursor';
import { SearchProvider } from '@/src/context/SearchContext';
import { HeadingDashboardv1 } from '@/ui/heading/HeadingDashboardv1';
import { WearGridPages2 } from '@/ui/grid/WearGridPages2';

interface Props {
  params: {
    siteId: string;
    page1Id: string;
  };
}

export default async function Page(props: Props) {
  const {
    params: { page1Id, siteId },
  } = props;
  const page = await wearGetPage1(page1Id);
  const pages = await wearGetPages2WithCursor({ first: 12 }, page1Id);

  return (
    <SearchProvider>
      <HeadingDashboardv1 page={page} />
      <WearGridPages2 pages2={pages} parentId={page1Id} />
    </SearchProvider>
  );
}

export async function generateStaticParams() {
  const pages = await wearGetPages1();
  return pages.map((data) => ({ siteId: data.siteId, page1Id: data._id }));
}
