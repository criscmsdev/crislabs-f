// 'use client'
import { wearGetSitesWithCursor } from '@/lib/wear/site/getSitesWithCursor';
import { SearchProvider, useSearch } from '@/src/context/SearchContext';
import { WearGridSites } from '@/ui/grid/WearGridSites';
import { HeadingDashboard } from '@/ui/heading/HeadingDashboard';
import { HeadingDashboardv1 } from '@/ui/heading/HeadingDashboardv1';
import { useQueryClient } from '@tanstack/react-query';
import { use } from 'react';

export default async function Page() {
  // const queryClient = useQueryClient();
  // await queryClient.prefetchQuery(['wear-get-sites-with-cursor', {first: 12}], () => wearGetSitesWithCursor({first: 12}))
  const sites =  await wearGetSitesWithCursor({first: 12});

  return (
    <SearchProvider>
      {/* <HeadingDashboard /> */}
      <HeadingDashboardv1 />
      <WearGridSites sites={sites} />
    </SearchProvider>
  );
}
