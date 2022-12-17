import { Site } from "@/interface/site.interface";



export const WEAR_GET_SITE = `
query WearGetSite($id: String!) {
  wearGetSite(id: $id) {
    _id
    dataSite {
      name
      description
      type
      
      dbSite {
        uid
        label
        slug
      }
      infoSite{
        clientId
      }
      imageSite {
        banner {
          src
          alt
        }
        logo {
          src
          alt
        }
        icon {
          src
          alt
        }
      }
      
    }
    url
  }
}
`;

export async function wearGetSite(id: string):Promise<Site> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: WEAR_GET_SITE,
      variables: {id: id},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  // .then((res) => res.json())
  .then((result) => result.wearGetSite)
  // .catch((err) => {console.log('error', err)});
  
}

// export async function queryFetch(query: string, variables: object){
//  await fetch('http://localhost:6002/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   cache: 'force-cache',
//   body: JSON.stringify({
//     query: query,
//     variables: variables,
//   }),
// })
//   .then((res) => res.json())
//   .then((res)=> res.data)
//   .catch((err) => {console.log('error', err)});

// }