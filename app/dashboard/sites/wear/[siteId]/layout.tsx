import { wearGetSite } from "@/lib/wear/site/getSite";
import { WearSiteProvider } from "@/src/context/WearSiteContext";


export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { siteId: string };
}) {
  const site = await wearGetSite(params.siteId);
  return (
    <WearSiteProvider site={site} >
      {children}
    </WearSiteProvider>
  );
}
