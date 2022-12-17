'use client'
import { useSelections } from 'ahooks';
import React  from "react";


type SelectionContextProps = {
  selected: string[];
  noneSelected: boolean;
  allSelected: boolean;
  partiallySelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  isSelected: (item: string) => boolean;
  select: (item: string) => void;
  unSelect: (item: string) => void;
  toggle: (item: string) => void;
  selectAll: () => void;
  unSelectAll: () => void;
  toggleAll: () => void;
}

export const SelectionContext = React.createContext<SelectionContextProps>({ } as SelectionContextProps)


interface SelectionProvider{
  children: React.ReactNode
  ids: string[]
}

export const SelectionProvider = ({ children, ids }: SelectionProvider) => {
  const selections = useSelections(ids);
  return <SelectionContext.Provider value={selections}>{children}</SelectionContext.Provider>;
};


export const useSelection = () => {
  const {
    selected,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    isSelected,
    select,
    unSelect,
    toggle,
    selectAll,
    unSelectAll,
    toggleAll,
  } = React.useContext(SelectionContext);
  return {
    selected,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    isSelected,
    select,
    unSelect,
    toggle,
    selectAll,
    unSelectAll,
    toggleAll,
  };
};