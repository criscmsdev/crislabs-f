'use client';
import { ListSite } from '@/interface/site.interface';
import { wearGetSitesWithCursor } from '@/lib/wear/site/getSitesWithCursor';
import { useSearch } from '@/src/context/SearchContext';
import React, { Fragment, Suspense, use } from 'react';
import { CardSitePagination } from '../card/cardSitePagination';
import { PaginationSites } from '../pagination/paginationSites';
import { useQuery } from '@tanstack/react-query';
import { SelectionProvider } from '@/src/context/SelectionContext';
import { HeadingDashboardOption } from '../heading/HeadingDashboardOptions';

interface Props {
  sites: ListSite;
}

export function WearGridSites(props: Props) {
  const { sites } = props;
  const { connectionArgs } = useSearch();
  const { data } = useQuery({
    queryKey: ['wear-get-sites-with-cursor', connectionArgs],
    queryFn: () => wearGetSitesWithCursor(connectionArgs),
    initialData: sites,
  });
  return (
    <SelectionProvider ids={data?.page.edges.map(data => data.node._id)}>
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {data.page.edges.map((data, i) => (
          <CardSitePagination key={i} site={data} />
        ))}
      </div>
      {data.pageData.count > 12 && <PaginationSites sites={data} />}
    </SelectionProvider>
  );
}
