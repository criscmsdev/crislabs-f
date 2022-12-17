import { CreatePage, Page } from "@/interface/page.interface";

export const WEAR_CREATE_PAGE0 = `
  mutation WearCreatePage0($inputCreate: CreatePage!) {
    wearCreatePage0(inputCreate: $inputCreate) {
      parentId
    }
  }
`;

export async function wearCreatePage0(
  inputCreate: CreatePage,
): Promise<Page> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: WEAR_CREATE_PAGE0,
      variables: { inputCreate: inputCreate },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.wearCreatePage0);
}
