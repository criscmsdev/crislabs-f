import { Page } from "@/interface/page.interface";


export const WEAR_GET_PAGE1 = `
query WearGetPage1($id: String!){
  wearGetPage1(id: $id){
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

export async function wearGetPage1(id: string):Promise<Page> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: WEAR_GET_PAGE1,
      variables: {id: id},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.wearGetPage1)
  
}

