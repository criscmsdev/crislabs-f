'use client';
import { useSearch } from '@/src/context/SearchContext';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SelectionProvider } from '@/src/context/SelectionContext';
import { HeadingDashboardOption } from '../heading/HeadingDashboardOptions';
import { ListPage } from '@/interface/page.interface';
import { wearGetPages2WithCursor } from '@/lib/wear/page/page2/getPagesWithCursor';
import { CardPage2Pagination } from '../card/cardPage2Pagination';
import { PaginationPages } from '../pagination/paginationPages';

interface Props {
  pages2: ListPage;
  parentId: string
}

export function WearGridPages2(props: Props) {
  const { pages2, parentId } = props;
  const { connectionArgs } = useSearch();
  const { data } = useQuery({
    queryKey: ['wear-get-pages2-with-cursor', connectionArgs, parentId],
    queryFn: () => wearGetPages2WithCursor(connectionArgs, parentId),
    initialData: pages2,
  });
  return (
    <SelectionProvider ids={data?.page.edges.map(data => data.node._id)}>
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {data.page.edges.map((data, i) => (
          <CardPage2Pagination key={i} page={data} />
        ))}
      </div>
      {data.pageData.count > 12 && <PaginationPages pages={data} />}
    </SelectionProvider>
  );
}
