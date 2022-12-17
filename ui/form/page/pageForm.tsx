import { CreatePage, ListPage, Page } from '@/interface/page.interface';
import { wearCreatePage0 } from '@/lib/wear/page/page0/createPage';
import { wearCreatePage1 } from '@/lib/wear/page/page1/createPage';
import { wearCreatePage2 } from '@/lib/wear/page/page2/createPage';
import { useSearch } from '@/src/context/SearchContext';
import { useUI } from '@/src/hooks/useUI';
import {
  getQuery,
  SwalMessageSiteCreate,
  SwalMessageSiteCreateError,
  typePageEcommerce,
  typePageEducation,
  typePageFood,
  typePageFoodCategory,
  typePageMarketing,
  typePagePortfolio,
  typePageWear,
  typePageWearCategory,
} from '@/src/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRef, FC, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface PageForm {
  page?: Page;
  type?: string;
}

export interface Page0 {
  title: string;
  description: string;
  site: string;
  parent: string;
  type: string;
}
interface Error {
  response: { errors: [{ message: string }] };
}
interface FormValues {
  title: string;
  description: string;
  type: string;
}

export const PageForm: FC<PageForm> = ({ page, type }) => {
  console.log('type', type);
  const {
    toggle: {
      actions: { toggle, setLeft },
    },
  } = useUI();

  const query = getQuery();

  const queryClient = useQueryClient();
  const { connectionArgs } = useSearch();

  const { mutate: createWearPage0 } = useMutation({
    mutationFn: async (inputCreate: CreatePage) =>
      await wearCreatePage0(inputCreate),
    onSuccess: async ({ parentId }) => {
      queryClient.invalidateQueries<ListPage>({
        queryKey: ['wear-get-pages0-with-cursor', connectionArgs, parentId],
      });
      await SwalMessageSiteCreate();
      toggle();
    },
    onError: (error: Error) => {
      SwalMessageSiteCreateError(error.response.errors[0].message);
    },
  });
  const { mutate: createWearPage1 } = useMutation({
    mutationFn: async (inputCreate: CreatePage) =>
      await wearCreatePage1(inputCreate),
    onSuccess: async ({ parentId }) => {
      queryClient.invalidateQueries<ListPage>({
        queryKey: ['wear-get-pages1-with-cursor', connectionArgs, parentId],
      });
      await SwalMessageSiteCreate();
      toggle();
    },
    onError: (error: Error) => {
      SwalMessageSiteCreateError(error.response.errors[0].message);
    },
  });
  const { mutate: createWearPage2 } = useMutation({
    mutationFn: async (inputCreate: CreatePage) =>
      await wearCreatePage2(inputCreate),
    onSuccess: async ({ parentId }) => {
      queryClient.invalidateQueries<ListPage>({
        queryKey: ['wear-get-pages2-with-cursor', connectionArgs, parentId],
      });
      await SwalMessageSiteCreate();
      toggle();
    },
    onError: (error: Error) => {
      SwalMessageSiteCreateError(error.response.errors[0].message);
    },
  });

  const [radio, setRadio] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: page
      ? {
          title: page?.dataPage.seoPage.title,
          description: page?.dataPage.seoPage.description,
          type: page?.dataPage.type,
        }
      : { title: '', description: 'page description', type: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const form = {
      ...data,
      title: data.title.trim(),
      description: data.description.trim(),
      siteId: query[3],
      uid: '123456',
    };
    const formUpdate = {
      ...data,
      title: data.title.trim(),
      description: data.description.trim(),
      siteId: page?.siteId!,
      parentId: page?.parentId!,
    };

    if (page) {
      if (query.length > 4 && query[4] === 'page1') {
        // updatePage1Food({ id: page._id, input: formUpdate })
      } else if (query.length > 4 && query[4] === 'page0') {
        // updatePage0Food({ id: page._id, input: formUpdate })
      }
    } else {
      if (query.length === 4) createWearPage0({ ...form, parentId: query[3] });
      if (query.length === 6 && query[4] === 'page0')
        createWearPage1({ ...form, parentId: query[5] });
      if (query.length === 6 && query[4] === 'page1')
        createWearPage2({ ...form, parentId: query[5] });

      // if (query.length > 4 && query[4] === 'page1') {
      //   // createPage2(form)
      // } else if (query.length > 4 && query[4] === 'page0') {
      //   // createPage1Food(form)
      // } else if (query.length === 4) {

      // }
    }
    // toggle()
  };
  const cancelButtonRef = useRef(null);
  const ref = createRef();

  // const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-5">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="label-form">Title</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="input-form"
                  {...register('title', {
                    required: 'Title required!!',
                    minLength: { value: 2, message: 'min 2 characters' },
                  })}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm">This is required!!</p>
                )}
              </div>

              <div className="col-span-6">
                <label className="label-form">Description</label>
                <div className="mt-1">
                  <textarea
                    rows={3}
                    className="input-form"
                    {...register('description', {
                      required: 'Title required!!',
                      minLength: { value: 2, message: 'min 2 characters' },
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm">This is required!!</p>
                  )}
                </div>
              </div>

              <div className="col-span-6 mb-5">
                <h2 className="contents text-sm font-medium text-gray-700">
                  Type{' '}
                </h2>
                <div className="grid grid-cols-2">
                  {page ? (
                    <>
                      {query[2] === 'wear' &&
                        query.length === 6 &&
                        typePageWear.map((data) => (
                          <div
                            className="flex items-center my-2"
                            key={data.label}
                          >
                            <input
                              type="radio"
                              id={data.value}
                              value={data.value}
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={({ target }) =>
                                setValue('type', target.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            <label className="ml-3 label-form">
                              {data.label}
                            </label>
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      {type === 'wear' &&
                        typePageWear.map((data) => (
                          <div
                            className="flex items-center my-2"
                            key={data.label}
                          >
                            <input
                              type="radio"
                              id={data.value}
                              value={data.value}
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={({ target }) =>
                                setValue('type', target.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            <label className="ml-3 label-form">
                              {data.label}
                            </label>
                          </div>
                        ))}

                      {['category', 'sub-category'].includes(type!) &&
                        typePageWearCategory.map((data) => (
                          <div
                            className="flex items-center my-2"
                            key={data.label}
                          >
                            <input
                              type="radio"
                              id={data.value}
                              value={data.value}
                              {...register('type', { required: true })}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={({ target }) =>
                                setValue('type', target.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            <label className="ml-3 block text-sm text-gray-500">
                              {data.label}
                            </label>
                          </div>
                        ))}
                    </>
                  )}
                  {errors.type && (
                    <p className="text-red-600 text-sm">This is required!!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="group-button-form ">
          <button type="submit" className="btn-primary ">
            {page ? 'Update' : 'Created'}
          </button>
          <button
            type="button"
            className="btn-default"
            onClick={setLeft}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
