// import { Article } from "../article/article.interface";
// import { Product } from "../product/product.interface";
// import { Food } from "./product/food.interface";
import { Image, Seo } from "./site.interface";

export interface Page {
  _id: string;
  dataPage: DataPage;
  slug: string;
  parentId: string;
  // articles: Article[];
  pages: Page[];
  // products: Food[];
  siteId: string
}

interface DataPage {
  type: string;
  icon: Image;
  seoPage: Seo;
}

export interface CreatePage {
  title: string
  description: string
  type: string
  parentId: string
  siteId: string
}
export interface UpdatePage {
  id:string
  input:{
    title: string
    description: string
    type: string
  }
}
export interface UpdateImagePage {
  id:string
  inputImage: {
    src: string
    alt: string
  }
  uid: string
}
export interface DeletePages {
  ids:string[]
}

export interface ListPage {
  page: ConnectionPage
  pageData: PageDataPage
}
export interface ConnectionPage {
  edges: EdgePage[]
  pageInfo: PageInfoPage
}
export interface EdgePage {
  cursor: string
  node: Page
}
export interface PageInfoPage {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataPage {
  count: number
  limit: number
  offset:number
}
