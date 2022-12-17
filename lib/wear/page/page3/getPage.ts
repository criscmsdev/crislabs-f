import { Page } from "@/interface/page.interface";


export const WEAR_GET_PAGE2 = `
query WearGetPage2($id: String!){
  wearGetPage2(id: $id){
    _id
    slug
    dataPage{
      seoPage{
        title
        description
      }
      type
    }
  }
}
`;

export async function wearGetPage2(id: string):Promise<Page> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: WEAR_GET_PAGE2,
      variables: {id: id},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.wearGetPage2)
  
}

