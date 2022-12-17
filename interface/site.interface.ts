// import { Page } from "./page.interface"

export interface Site {
  _id: string
  dataSite: DataSite
  url: string
  // pages: Page[]
}

interface DataSite {
  name: string;
  description: string;
  dbSite: DataBase[]
  type: string
  infoSite: {
    clientId: string
    numberPhone: number;
    address: string;
    domain: string;
    location: string;
    
  },
  imageSite: {
    icon: Image
    banner: Image
    logo: Image
  }
  // seo: Seo;
}

export interface Seo {
  title: string;
  href: string;
  description: string;
  image: Image
}

export interface Image {
  uid?: string
  src?: string;
  alt?: string;
}
export interface ImageInterface {
  uid?: string
  src: string;
  alt: string;
}


export interface DataBase {
  uid: string
  label: string;
  value: string;
}





export interface Tags {
  uid: string;
  text: string;
  href:string;
}

export interface Register {
  uid: string;
  change: string;
  updatedAt: Date;
}
export interface UpdateDate {
  createdAt: Date;
  register: Register[];
}




export interface Timestamps {
  created: number;
  updated?: number;
}
export interface SiteForm {
  _id?: string
  title: string;
  domain: string;
  logo: string;
  icon: string;
  imageSrc: string;
  imageAlt: string;
  numberPhone: number;
  address: string;
  location: string;
  description: string;
  type: string;
  client: string;
}
// export interface ChildrenForm {
//   uid?: string
//   name: string;
//   description: string;
//   imageSrc: string;
//   imageAlt: string;
// }
export interface Domain {
  name: string;
  dlt: string;
}


export interface CreateSite {
  name: string
  domain: string
  description: string
  type: string
  clientId: string
  uid: string
  // input: {
  // }
}
export interface UpdateSite {
  name: string
  domain: string
  description: string
  type: string
  clientId: string
  uid: string
  id:string
}
export interface UpdateSiteDB {
  id:string
  type: string[]
  
}
export interface UpdateSiteImage {
  id:string
  type: string
  images: {
    src: string
    alt: string
  }
  uid: string
}

export interface DeleteManySitesById {
  ids:string[]
}
export interface ConnectionArgs {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
}


export interface ListSite {
  page: ConnectionSite
  pageData: PageDataSite
}
export interface ConnectionSite {
  edges: EdgeSite[]
  pageInfo: PageInfoSite
}
export interface EdgeSite {
  cursor: string
  node: Site
}
export interface PageInfoSite {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataSite {
  count: number
  limit: number
  offset:number
}
