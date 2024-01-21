import { FC, useState, createContext, useContext } from 'react'
import {
  ID,
  WithChildren,
  ListViewContextPropsInteracao,
  initialListViewInteracao,
} from '../../../../../_metronic/helpers'


const ListViewContext = createContext<ListViewContextPropsInteracao>(initialListViewInteracao)
const ListViewProvider: FC<WithChildren> = ({ children }) => {

  const [itemIdDemanda, setItemIdDemanda] = useState<ID>(initialListViewInteracao.itemIdDemanda)
  const [itemIdInteracao, setItemIdInteracao] = useState<ID>(initialListViewInteracao.itemIdInteracao)

  return (
    <ListViewContext.Provider
      value={{
        itemIdDemanda,
        itemIdInteracao,
        setItemIdDemanda,
        setItemIdInteracao,
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useListView = () => useContext(ListViewContext)

export { ListViewProvider, useListView }
