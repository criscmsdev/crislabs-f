'use client'

import { Site } from "@/interface/site.interface"
import { wearGetSite } from "@/lib/wear/site/getSite"
import { useQuery } from "@tanstack/react-query"
import React from "react"

type WearSiteContextProps = {
  site: Site
}

export const WearSiteContext = React.createContext<WearSiteContextProps>({ } as WearSiteContextProps)


interface WearSiteProvider{
  children: React.ReactNode
  site: Site
}

export const WearSiteProvider = ({ children, site }: WearSiteProvider) => {
  const { data } = useQuery({
    queryKey: ["wear-get-site", site._id],  
    queryFn: () =>  wearGetSite(site._id), 
    initialData: site
  });
  return <WearSiteContext.Provider value={{site: data}}>{children}</WearSiteContext.Provider>;
};

export const useSiteWear = () => {
  const { site } = React.useContext(WearSiteContext);
  return {
    site,
  };
};
