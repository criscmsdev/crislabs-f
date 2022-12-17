import { Site } from "@/interface/site.interface";

export const WEAR_GET_SITES = `
  query WearGetSites {
    wearGetSites {
        _id
    }
  }
`;

export async function wearGetSites():Promise<Site[]> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: WEAR_GET_SITES,
      variables: {},
    }),
  }).then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.wearGetSites)
  
}
