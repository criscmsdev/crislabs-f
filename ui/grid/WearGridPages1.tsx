'use client';
import { useSearch } from '@/src/context/SearchContext';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SelectionProvider } from '@/src/context/SelectionContext';
import { HeadingDashboardOption } from '../heading/HeadingDashboardOptions';
import { ListPage } from '@/interface/page.interface';
import { wearGetPages1WithCursor } from '@/lib/wear/page/page1/getPagesWithCursor';
import { CardPage1Pagination } from '../card/cardPage1Pagination';
import { PaginationPages } from '../pagination/paginationPages';

interface Props {
  pages1: ListPage;
  parentId: string
}

export function WearGridPages1(props: Props) {
  const { pages1, parentId } = props;
  const { connectionArgs } = useSearch();
  const { data } = useQuery({
    queryKey: ['wear-get-pages1-with-cursor', connectionArgs, parentId],
    queryFn: () => wearGetPages1WithCursor(connectionArgs, parentId),
    initialData: pages1,
  });
  return (
    <SelectionProvider ids={data?.page.edges.map(data => data.node._id)}>
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {data.page.edges.map((data, i) => (
          <CardPage1Pagination key={i} page={data} />
        ))}
      </div>
      {data.pageData.count > 12 && <PaginationPages pages={data} />}
    </SelectionProvider>
  );
}
