import { CreatePage, Page } from "@/interface/page.interface";

export const WEAR_CREATE_PAGE2 = `
  mutation WearCreatePage2($inputCreate: CreatePage!) {
    wearCreatePage2(inputCreate: $inputCreate) {
      parentId
    }
  }
`;

export async function wearCreatePage2(
  inputCreate: CreatePage,
): Promise<Page> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: WEAR_CREATE_PAGE2,
      variables: { inputCreate: inputCreate },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.wearCreatePage2);
}
