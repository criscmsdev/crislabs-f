export const WEAR_DELETE_SITE = `
mutation WearDeleteSite($id: String!) {
  wearDeleteSite(id: $id)
}
`;
export async function wearDeleteSite(
  id: string,
): Promise<string> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: WEAR_DELETE_SITE,
      variables: { id: id },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.wearDeleteSite);
}

export const WEAR_DELETE_SITES = `
mutation WearDeleteSites($ids: [String!]!) {
  wearDeleteSites(ids: $ids)
}
`;

export async function wearDeleteSites(
  ids: string[],
): Promise<string[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: WEAR_DELETE_SITES,
      variables: { ids: ids },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.wearDeleteSites);
}
