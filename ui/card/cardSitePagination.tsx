// 'use client'

import { EdgeSite } from '@/interface/site.interface';
import { useSelection } from '@/src/context/SelectionContext';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import React from 'react';

interface CardSitePagination {
  site?: EdgeSite;
}
export function CardSitePagination({ site }: CardSitePagination) {
  const { selected, toggle, isSelected } = useSelection();

  const ref = React.useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(site?.node._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group">
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(site?.node._id!)}
        checked={isSelected(site?.node._id!)}
      />
      <div ref={ref}>
        <img
          className="h-[12rem] w-full object-cover"
          src={
            site?.node.dataSite.imageSite?.banner.src! ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            site?.node.dataSite.imageSite?.banner.alt! || 'image description'
          }
        />
        <Link
          href={`/dashboard/sites/${site?.node.dataSite.type}/${site?.node._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {site?.node.dataSite.name}
          </h2>
        </Link>
      </div>
    </div>
  );
}
