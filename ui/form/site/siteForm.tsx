import { FC, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  getQuery,
  SwalMessageSiteCreate,
  SwalMessageSiteCreateError,
} from '@/src/utils';
import { useUI } from '@/src/hooks/useUI';
import { CreateSite, ListSite, Site, UpdateSite } from '@/interface/site.interface';
import { wearCreateSite } from '@/lib/wear/site/createSite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@/src/context/SearchContext';
import { wearUpdateSite } from '@/lib/wear/site/updateSite';
interface Error {
  response: { errors: [{ message: string }] }
}
interface SiteForm {
  site?: Site;
}
interface FormValues {
  name: string;
  domain: string;
  description: string;
  type: string;
  clientId: string;
}
export const SiteForm: FC<SiteForm> = ({ site }) => {
  const queryClient = useQueryClient();

  const {
    toggle: {
      actions: { toggle, setLeft },
    },
  } = useUI();
  const query = getQuery();
  const { connectionArgs } = useSearch();
  const { mutate: createWearSite } = useMutation({
    mutationFn: async (inputCreate: CreateSite) =>
      await wearCreateSite(inputCreate),
    onSuccess: async () => {
      queryClient.invalidateQueries<ListSite>({
        queryKey: ['wear-get-sites-with-cursor', connectionArgs],
      });
      await SwalMessageSiteCreate();
      toggle();
    },
    onError: (error: Error) => {
      SwalMessageSiteCreateError(error.response.errors[0].message);
    },
  });
  const { mutate: updateWearSite } = useMutation({
    mutationFn: async (inputUpdate: UpdateSite) => await wearUpdateSite(inputUpdate),
    onSuccess: async (updateSite, {id}) => {
      queryClient.setQueryData(['wear-get-site', id], updateSite);
      await SwalMessageSiteCreate();
      toggle();
    },
    onError: (error: Error) => {
      SwalMessageSiteCreateError(error.response.errors[0].message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: site
      ? {
          name: site?.dataSite.name,
          domain: site?.url,
          description: site?.dataSite.description,
          type: site?.dataSite.type,
          clientId: site.dataSite.infoSite.clientId,
        }
      : {
          name: '',
          domain: 'criscms.vercel.app',
          description: 'site description',
          type: query[2],
          clientId: '123456',
        },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const form = {
      ...data,
      name: data.name.trim(),
      domain: data.domain.trim(),
      description: data.description.trim(),
      uid: '1234',
      type: query[2],
    };
    const createForm = { ...form, clientId: data.clientId?.trim() };
    const updateForm = {
      ...form,
      clientId: data.clientId?.trim(),
      id: site?._id!,
    };
    if (site) {
      if (query[2] === 'wear') {updateWearSite(updateForm)}

    } else {
      if (query[2] === 'wear') createWearSite(createForm);
    }
  };

  const cancelButtonRef = useRef(null);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="grid grid-cols-1 content-between "
    >
      <div className=" sm:rounded-md px-2  inset-x-0 top-0">
        <div className="p-2 ">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label className="label-form">Name</label>
              <input
                type="text"
                autoComplete="off"
                {...register('name', {
                  required: 'Name required!!',
                  minLength: { value: 2, message: 'min 2 characters' },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">This is required!!</p>
              )}
            </div>
            <div className="col-span-6">
              <label
                // htmlFor="company-website"
                className="label-form"
              >
                Website
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                  http://
                </span>
                <input
                  type="text"
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  // value={`${setValue('domain', getValues('name'), {shouldValidate: true})}.vercel.app`}
                  placeholder="example.com"
                  {...register('domain')}
                />
              </div>
            </div>
            <div className="col-span-6">
              <label className="label-form">Description</label>
              <div className="mt-1">
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  {...register('description')}
                />
              </div>
            </div>

            {query.length === 2 && (
              <div className="col-span-6">
                <label className="label-form">Client name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  {...register('clientId')}
                />
              </div>
            )}

            {/* <div className="col-span-6">
                <fieldset>
                  <legend className="label-form">Type </legend>
                  {/* <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p> 
                  <div className=" grid grid-cols-2 ">
                    {
                      typeSite.map(data => (
                        <div className="flex items-center my-2" key={data.label}>
                          <input
                            type="radio"
                            value={data.value}
                            // onBlur={onBlur} 
                            {...register('type')}
                            onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          // {...register("type", {required:true, onChange: (e) => {setValue("type", e.target.value, {shouldValidate: true});}, onBlur: (e) => {},})}
                          />
                          {/* {errors.type && <p>This is required</p>} 
                          <label className="ml-3 block text-sm text-gray-500">
                            {data.label}
                          </label>
                        </div>)
                      )
                    }

                  </div>
                </fieldset>
              </div> */}
          </div>
        </div>
      </div>
      <div className=" group-button-form inset-x-0 bottom-0">
        <button type="submit" className="btn-primary ">
          {site ? 'Update' : 'Created'}
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
  );
};
