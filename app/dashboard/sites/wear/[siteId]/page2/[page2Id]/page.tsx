import { wearGetPage2 } from '@/lib/wear/page/page2/getPage';
import { wearGetPages2 } from '@/lib/wear/page/page2/getPages';
import { wearGetPages3WithCursor } from '@/lib/wear/page/page3/getPagesWithCursor';
import { SearchProvider } from '@/src/context/SearchContext';
import { HeadingDashboardv1 } from '@/ui/heading/HeadingDashboardv1';

interface Props {
  params: {
    siteId: string;
    page2Id: string;
  };
}

export default async function Page(props: Props) {
  const {
    params: { page2Id, siteId },
  } = props;
  const page = await wearGetPage2(page2Id);
  const pages = await wearGetPages3WithCursor({ first: 12 }, page2Id);
  console.log('pages', pages)
  return (
    <SearchProvider>
      {/* <h1>Page2</h1> */}
      <HeadingDashboardv1 page={page} />
      {/* 
      <WearGridPages1 pages1={pages} parentId={page0Id} /> */}
    </SearchProvider>
  );
}

export async function generateStaticParams() {
  const pages = await wearGetPages2();
  return pages.map((data) => ({ siteId: data.siteId, page2Id: data._id }));
}
