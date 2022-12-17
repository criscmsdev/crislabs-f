'use client';

import { dehydrate, QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { use, useState } from 'react';


export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }))
  
  const dehydratedState = dehydrate(queryClient)
  // use(queryClient.prefetchQuery({
  //   queryKey: ['marketing-get-sites-with-cursor-v', {first: 12}],
  //   queryFn: () => marketingGetSitesWithCursor1({first: 12}),
  // }))
  // use(queryClient.prefetchQuery({
  //   queryKey: ['marketing-get-sites-with-cursor', {first: 12}],
  //   queryFn: () => marketingGetSitesWithCursor({first: 12})
  // }))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>


        {children}
      </Hydrate>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}