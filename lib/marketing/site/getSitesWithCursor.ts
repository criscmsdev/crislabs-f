import { ConnectionArgs, ListSite } from "@/interface/site.interface";

export const MARKETING_GET_SITES_WITH_CURSOR = `
  query MarketingGetSitesWithCursor($args: ConnectionArgs!) {
   marketingGetSitesWithCursor(args: $args) {
      page {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            _id
            dataSite {
              name
              type
            }
            url
          }
        }
      }
      pageData {
        count
        limit
        offset
      }
    }
  }
`;

export async function marketingGetSitesWithCursor(
  args: ConnectionArgs,
):Promise<ListSite> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    next: {revalidate: 5},
    body: JSON.stringify({
      query: MARKETING_GET_SITES_WITH_CURSOR,
      variables: {
        args: args,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((res) => res.marketingGetSitesWithCursor)
}

