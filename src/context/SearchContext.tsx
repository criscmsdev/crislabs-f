'use client'
import { ConnectionArgs } from '@/interface/site.interface';
import React, { useContext } from 'react';

type SearchAction =
  | {type: 'connectionArgs', payload: ConnectionArgs}
  | {type: 'amount', payload: number}
  | {type: 'toggleSearch', payload: ConnectionArgs}

export const searchReducer = (state: SearchState, action: SearchAction):SearchState => {
  switch (action.type) {
    case 'connectionArgs':
        return {
          ...state,
          connectionArgs:  action.payload
        }
  
    default:
      return state;
  }
}



type SeachContextProps = {
  searchState: SearchState
  toggleSearch: (connectionArgs: ConnectionArgs) => void
}

export const SearchContext = React.createContext<SeachContextProps>({} as SeachContextProps)


interface SearchProvider{
  children: React.ReactNode
}
export interface SearchState{
  connectionArgs: ConnectionArgs
  amount: number
}

const INITIAL_STATE:SearchState = {
  connectionArgs: { first: 12},
  amount: 12
}

export const SearchProvider = ({ children }: SearchProvider) => {
  const [searchState, dispatch] = React.useReducer(searchReducer, INITIAL_STATE)
  const toggleSearch = (connectionArgs: ConnectionArgs) => {
    dispatch({type: 'connectionArgs', payload: connectionArgs})
  }
  return <SearchContext.Provider value={{searchState, toggleSearch}}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const {searchState, toggleSearch} = useContext(SearchContext)
  const {connectionArgs, amount} = searchState
  return {
    connectionArgs, amount, toggleSearch
  }
}