import { FC, useState, createContext, useContext } from 'react'
import {
  WithChildren,
  initialQueryRequestInteracao,
  QueryStateInteracao,
  QueryRequestContextPropsInteracao,
} from '../../../../../_metronic/helpers'

const QueryRequestContext = createContext<QueryRequestContextPropsInteracao>(initialQueryRequestInteracao)
const QueryRequestProvider: FC<WithChildren> = ({ children }) => {
  const [state, setState] = useState<QueryStateInteracao>(initialQueryRequestInteracao.state)
  const updateState = (updates: Partial<QueryStateInteracao>) => {
    const updatedState = { ...state, ...updates } as QueryStateInteracao
    setState(updatedState)
  }

  return (
    <QueryRequestContext.Provider value={{ state, updateState }}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export { QueryRequestProvider, useQueryRequest }
