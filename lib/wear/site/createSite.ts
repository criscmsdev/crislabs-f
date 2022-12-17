import { CreateSite, Site } from "@/interface/site.interface";


export const WEAR_CREATE_SITE = `
  mutation WearCreateSite($inputCreate: CreateSite!) {
    wearCreateSite(inputCreate: $inputCreate) {
      _id
    }
  }
`;

export async function wearCreateSite(inputCreate: CreateSite):Promise<Site> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     query: WEAR_CREATE_SITE,
     variables: {inputCreate: inputCreate},
   }),
 }).then(res => res.json())
 .then((res)=> res.data)
 .then((res) => res.wearCreateSite)
}