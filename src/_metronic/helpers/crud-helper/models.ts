import { Dispatch, SetStateAction } from 'react'

export type ID = undefined | null | number

export type PaginationState = {
  page: number
  items_per_page: number
  links?: Array<{ label: string; active: boolean; url: string | null; page: number | null }>
}

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}

//DEFAULT
export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  page: 1,
  items_per_page: 10,
}


export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => { },
}

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = { refetch: () => { }, isLoading: false, query: '' }

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemId?: ID
  setItemId: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => { },
  onSelectAll: () => { },
  clearSelected: () => { },
  setItemId: () => { },
  isAllSelected: false,
  disabled: false,
}


//ATIVIDADE
export type ListViewContextPropsAtividade = {
  itemIdDemanda?: ID
  itemIdInteracao?: ID
  setItemIdDemanda: Dispatch<SetStateAction<ID>>
  setItemIdInteracao: Dispatch<SetStateAction<ID>>
}

export const initialListViewAtividade: ListViewContextPropsAtividade = {
  setItemIdDemanda: () => { },
  setItemIdInteracao: () => { },
}

//INTERAÇÃO
export type ListViewContextPropsInteracao = {
  itemIdDemanda?: ID
  itemIdInteracao?: ID
  setItemIdDemanda: Dispatch<SetStateAction<ID>>
  setItemIdInteracao: Dispatch<SetStateAction<ID>>
}

export const initialListViewInteracao: ListViewContextPropsInteracao = {
  setItemIdDemanda: () => { },
  setItemIdInteracao: () => { },
}

export type QueryStateInteracao = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextPropsInteracao = {
  state: QueryStateInteracao
  updateState: (updates: Partial<QueryStateInteracao>) => void
}

export const initialQueryStateInteracao: QueryStateInteracao = {
  page: 1,
  items_per_page: 10,
}


export const initialQueryRequestInteracao: QueryRequestContextPropsInteracao = {
  state: initialQueryStateInteracao,
  updateState: () => { },
}