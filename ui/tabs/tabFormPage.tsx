// 'use client'
import { Tab } from '@headlessui/react'
import { classNames } from '@/src/utils';
import { Page } from '@/interface/page.interface';
import { PageForm } from '../form/page/pageForm';

interface TabFormPage {
  page?: Page
  type?: string
}

export function TabFormPage ({ page, type }: TabFormPage) {

  // const [state, toggle, setLeft, setRight] = useUiDashboard()

  return (
    <div className="w-full max-w-lg ">
      <Tab.Group >
        <Tab.List className="flex space-x-1 rounded-xl bg-white py-3">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700',
                // 'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white'
                  : 'text-indigo-900 hover:bg-white/[0.12] '
              )
            }
          >
            {page ? "Update" : "Create"}
          </Tab>
          <Tab
            disabled={page ? false : true}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                page ? "text-indigo-700" : "text-gray-200 opacity-40",

                // 'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white '
                  : 'text-blue-900 hover:bg-white/[0.12] '
              )
            }
          >
            Images
          </Tab>
          <Tab
            disabled={page ? false : true}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                page ? "text-indigo-700" : "text-gray-200 opacity-40",

                // 'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white '
                  : 'text-blue-900 hover:bg-white/[0.12] '
              )
            }
          >
            Images
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel
            className={classNames('rounded-xl bg-white')}
          >
            <PageForm page={page} type={type} />
            {/* <SiteForm site={site}/> */}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white'
            )}
          >
            {/* <DataBaseForm toggle={toggle} setLeft={setLeft}  site={site} /> */}

          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white'
            )}
          >
            {/* <ImageSiteForm toggle={toggle} setLeft={setLeft}  site={site} /> */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
