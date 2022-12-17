import { ListPage } from '@/interface/page.interface';
import { ConnectionArgs } from '@/interface/site.interface';

export const WEAR_GET_PAGES3_WITH_CURSOR = `
  query WearGetPages3WithCursor($args: ConnectionArgs!, $parentId: String!) {
    wearGetPages3WithCursor(args: $args, parentId:$parentId) {
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
            dataPage {
              seoPage{
                title
                image{
                  src
                  alt
                }
              }
              type
            }
            siteId
            slug
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

export async function wearGetPages3WithCursor(
  args: ConnectionArgs,
  parentId: string,
): Promise<ListPage> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: WEAR_GET_PAGES3_WITH_CURSOR,
      variables: {
        args: args,
        parentId: parentId,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((res) => res.wearGetPages3WithCursor);
}
