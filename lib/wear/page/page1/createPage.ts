import { CreatePage, Page } from "@/interface/page.interface";

export const WEAR_CREATE_PAGE1 = `
  mutation WearCreatePage1($inputCreate: CreatePage!) {
    wearCreatePage1(inputCreate: $inputCreate) {
      parentId
    }
  }
`;

export async function wearCreatePage1(
  inputCreate: CreatePage,
): Promise<Page> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: WEAR_CREATE_PAGE1,
      variables: { inputCreate: inputCreate },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.wearCreatePage1);
}
