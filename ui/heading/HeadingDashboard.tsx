'use client';

import React from 'react';
import { Article } from '@/interface/article.interface';
import { Page } from '@/interface/page.interface';
import { getQuery } from '@/src/utils';
import { useUI } from '@/src/hooks/useUI';
import {
  DocumentPlusIcon,
  FolderPlusIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { SlideOvers } from '../SlideOvers';
import { TabFormSite } from '../tabs/tabFormSite';
import { useSiteWear } from '@/src/context/WearSiteContext';
import { TabFormPage } from '../tabs/tabFormPage';
import { useQuery } from '@tanstack/react-query';
import { wearGetPage0 } from '@/lib/wear/page/page0/getPage';

const TitleWear = () => {
  const { site } = useSiteWear()
  return <React.Fragment>{site.dataSite.name}</React.Fragment> 
}

const TitleWearPage0 = ({page}: {page: Page}) => {
  const { data } = useQuery({
    queryKey: ["wear-get-page0", page._id],  
    queryFn: () =>  wearGetPage0(page._id), 
    initialData: page,
  })
  return <React.Fragment>{data.dataPage.seoPage.title}</React.Fragment> 
}

const TabFormSiteWear = () => {
  const { site } = useSiteWear()
  return <TabFormSite site={site} />
}

const TabFormPage0Wear = () => {

  const query = getQuery()
  const { data } = useQuery({
    queryKey: ["wear-get-page0", query[5]],  
    queryFn: () =>  wearGetPage0(query[5]), 
  })
  return <TabFormPage page={data}/>
}
interface TitleProps {
  page?: Page
}

export const Title = (props: TitleProps) => {
  const { page } = props
  const query = getQuery();
  return (
    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
      {query!.length === 3 && query[2] === 'marketing' && 'Sites Marketing'}
      {query!.length === 3 && query[2] === 'wear' && 'Sites Wear'}
      {query!.length === 4 && query[2] === 'wear' && <TitleWear />}
      {query!.length === 6 && query[2] === 'wear' && <TitleWearPage0 page={page!}/>}
    </h2>
  );
};

export const ButtonAdd = () => {
  // const [name, setName] = React.useState<string>('')
  const query = getQuery()
  const {
    toggle: {
      actions: { toggle },
    },
    children: { setChildrens },
  } = useUI();

  const handleClick = () => {
    toggle();
    if (query.length === 3) {setChildrens(<TabFormSite/>);};
    if (query.length === 4) {setChildrens(<TabFormPage />); };
    if (query.length === 6) {setChildrens(<TabFormPage />); };
  };

  return (
    <span className="block">
      <button className="btn-primary space-x-3" onClick={() => handleClick()}>
        <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
        <p className="hidden sm:block">
          { query.length === 3 && 'Add Site' }
          { query.length === 4 && 'Add Page' }
        </p>
      </button>
    </span>
  );
};

export const ButtonEdit = () => {
  const query = getQuery()
  const {
    toggle: {
      actions: { toggle },
    },
    children: { setChildrens },
  } = useUI();
  const handleClick = () => {
    toggle();
    {(query!.length === 4 && query[2] === 'wear') && setChildrens(<TabFormSiteWear/>);}
    {(query!.length === 6 && query[2] === 'wear') && setChildrens(<TabFormPage0Wear/>);}
  };

  return (
    <span className="block">
      <button
        type="button"
        className="btn-default"
        onClick={() => handleClick()}
      >
        <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        <p className="hidden sm:block">Edit</p>
      </button>
    </span>
  );
};


interface Props {
  page?: Page;
  article?: Article;
}

export function HeadingDashboard(props: Props) {
  const { page, article } = props;
  const query = getQuery()
  const {
    children: { childrens },
  } = useUI();
  return (
    <div className="">
      <div className="flex lg:items-center justify-between">
        <div className="min-w-0 flex space-x-2">
          <Title page={page} />
          {
            query.length > 3 && 
            <ButtonEdit />
          }
          {/* 
          
          {query[4] === 'page0' && (
            <Fragment>
              <ContextTitleMarketingPages0 page={page!} />
              <ContextButtonEditMarketing />
            </Fragment>
          )}
          {
            query[4] === 'article' && (
              <Fragment>
                <ContextTitleMarketingArticle article={article!} />
              </Fragment>
            )
          } */}
          {/* <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {query.length === 4 && site.dataSite.name}
            {query[4] === 'page0' && page0.slug}
          </h2> */}
          {/* {
            page &&
            <span className="block">
              <button className="btn-default space-x-3" onClick={() => editHandle('page')} >
                <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                <p className='hidden sm:block'>
                  Edit
                </p>
              </button>
            </span>
          } */}
          {/* <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Full-time
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            $120k &ndash; $140k
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Closing on January 9, 2020
          </div>
        </div> */}
        </div>
        <div className="flex">
          <ButtonAdd />
          {/* {query.length === 4 && <ContextButtonAdd type="page" />} */}
          {/* 
          {query[4] === 'page0' && <ContextButtonAdd type="article" />} */}
          {/* <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Edit
          </button>
        </span>

        <span className="ml-3 hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            View
          </button>
        </span> */}
          {/* {
            query.length === 3 &&
            <span className="block">
              <button className="btn-primary space-x-3" onClick={() => addHandle('site')} >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className='hidden sm:block'>
                  Add Site
                </p>
              </button>
            </span>
          }
          {
            (typeSite.map(data => data.value).includes(site?.dataSite.type!) || page?.dataPage.type === 'page') &&

            <button className="btn-primary space-x-3" onClick={() => addHandle('page')} >
              <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className='hidden sm:block'>
                Add Page
              </p>
            </button>
          }
          {['category', 'category-food'].includes(page?.dataPage.type!) &&

            <button className="btn-primary space-x-3" onClick={() => addHandle('category')} >
              <DocumentPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className='hidden sm:block'>
                Add Category
              </p>
            </button>
          } */}

          {/* <span className="">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              <p className='hidden sm:block'>

                New Site
              </p>
            </button>
          </span> */}

          {/* Dropdown */}
          {/* <Menu as="div" className="relative ml-3 sm:hidden">
          <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            More
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                    <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                  href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                    View
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu> */}
        </div>
      </div>
      <SlideOvers>{childrens}</SlideOvers>
    </div>
  );
}
