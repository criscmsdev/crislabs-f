import { Site, UpdateSite } from "@/interface/site.interface";

export const WEAR_UPDATE_SITE = `
  mutation WearUpdateSite($inputUpdate: UpdateSite!) {
    wearUpdateSite(inputUpdate: $inputUpdate) {
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

export async function wearUpdateSite(
  inputUpdate: UpdateSite,
): Promise<Site> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: WEAR_UPDATE_SITE,
      variables: { inputUpdate: inputUpdate },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.wearUpdateSite);
}
