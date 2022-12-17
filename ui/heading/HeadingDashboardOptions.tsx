import { ListSite } from '@/interface/site.interface';
import { wearDeleteSites } from '@/lib/wear/site/deleteSites';
import { useSearch } from '@/src/context/SearchContext';
import { useSelection } from '@/src/context/SelectionContext';
import { getQuery } from '@/src/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export function HeadingDashboardOption() {
  const { selected, allSelected, toggleAll, unSelectAll } = useSelection();
  const query = getQuery();
  const { connectionArgs } = useSearch()

  const queryClient = useQueryClient();

  const { mutate: deleteSitesWear } = useMutation(
    {
      mutationFn: async (ids: string[]) => await wearDeleteSites(ids),
      onSuccess:  (deleteSitesMarketing) => {
        queryClient.invalidateQueries<ListSite>({queryKey: ["wear-get-sites-with-cursor", connectionArgs]});
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        unSelectAll()
      },
      onError: (error: { response: { errors: [{ message: string }] } }) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.errors[0].message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    }
  );
  const deleteHandle = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (query[2] === 'wear') {
          {
            query.length === 3 && deleteSitesWear(selected);
          }
          {
            // query.length === 4 && deletePages0Marketing(selected);
          }
        }
        // refresh()
      }
    });
  };
  return (
    <div
      className={` ${
        selected.length !== 0 ? 'opacity-100' : 'hidden  -translate-y-6 '
      } `}
    >
      <div className="mx-auto max-w-7xl pt-3 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
          <input
            type="checkbox"
            className="h-5 w-5  rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 bg-white"
            onChange={() => toggleAll}
            checked={allSelected}
            onClick={toggleAll}
          />
            
            <p className="ml-2 text-sm font-medium">Select All</p>
          </div>

          <span
            className={`block opacity-100 transition ease-in-out delay-150`}
            >
            <button className="btn-default" onClick={() => deleteHandle()}>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <p className="">({selected.length})</p>
            </button>
          </span>
        </div>
      </div>
      </div>

  );
}
