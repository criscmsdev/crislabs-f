import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { EdgePage } from '@/interface/page.interface';
import { useSelection } from '@/src/context/SelectionContext';
import { getQuery } from '@/src/utils';


interface CardPage2Pagination {
  page?: EdgePage;
}
export function CardPage2Pagination({ page }: CardPage2Pagination) {
  const { selected, toggle, isSelected } = useSelection();

  const query = getQuery()
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(page?.node._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(page?.node._id!)}
        checked={isSelected(page?.node._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            page?.node.dataPage.seoPage?.image?.src! ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            page?.node.dataPage.seoPage?.image?.alt! || 'image description'
          }
        />
        <Link
          href={`/dashboard/sites/${query[2]}/${page?.node.siteId}/page2/${page?.node._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {page?.node.dataPage.seoPage.title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
