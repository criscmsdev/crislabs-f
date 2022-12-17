import { Page } from "@/interface/page.interface";


export const WEAR_GET_PAGES0 = `
query WearGetPages0{
  wearGetPages0{
    _id
    parentId
    siteId
  }
}
`;

export async function wearGetPages0():Promise<Page[]> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: WEAR_GET_PAGES0,
      variables: {},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.wearGetPages0)
}
