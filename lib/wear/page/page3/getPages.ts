import { Page } from "@/interface/page.interface";

export const WEAR_GET_PAGES2 = `
query WearGetPages2{
  wearGetPages2{
    _id
    parentId
    siteId
  }
}
`;

export async function wearGetPages2():Promise<Page[]> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: WEAR_GET_PAGES2,
      variables: {},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.wearGetPages2)
}
