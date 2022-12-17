import { marketingGetSitesWithCursor } from '@/lib/marketing/site/getSitesWithCursor';
import { CardSitePagination } from '@/ui/card/cardSitePagination';
import { HeadingDashboard } from '@/ui/heading/HeadingDashboard';
import { use } from 'react';

export default function Page() {
  // const sites = use(marketingGetSitesWithCursor({ first: 12 }));
  return (
    <>
      <h1>Marketing</h1>
      {/* <HeadingDashboard />
      <div className={'grid-sites'}>
        {sites?.page.edges.map((data, i) => (
          <CardSitePagination key={i} site={data} />
        ))}
      </div> */}
    </>
  );
}
