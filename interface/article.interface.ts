import { Image, Seo, Tags, UpdateDate } from "./site.interface";


export interface Article {
  _id: string;
  dataArticle: DataArticle;
  siteId: string
  parentId: string
  slug: string
}

export interface DataArticle {
  title: string;
  slug: string;
  content: string;
  category: string;
  description: string;
  meta: string;
  tags: Tags[];
  author: string;
  thumbnail: Image;
  seoArticle: Seo;
}

export interface ListArticle {
  page: ConnectionArticle
  pageData: PageDataArticle
}
export interface ConnectionArticle {
  edges: EdgeArticle[]
  pageInfo: PageInfoArticle
}
export interface EdgeArticle {
  cursor: string
  node: Article
}
export interface PageInfoArticle {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataArticle {
  count: number
  limit: number
  offset:number
}



export interface CreateArticle {
  title: string
  author: string
  description: string
  site: string
  parent: string
  category: string
}
export interface UpdateArticle {
  _id:string
  input:{
    title: string
    author: string
    description: string
    category: string
    src: string
    alt: string
    content: string
    meta: string
    tags: string[]
  }
}