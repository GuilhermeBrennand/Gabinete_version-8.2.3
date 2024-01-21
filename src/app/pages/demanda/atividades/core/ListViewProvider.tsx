import { FC, createContext, useContext, useState } from "react"
import { ID, ListViewContextPropsAtividade, WithChildren, initialListViewAtividade } from "../../../../../_metronic/helpers"

const ListViewContext = createContext<ListViewContextPropsAtividade>(initialListViewAtividade)
const ListViewProvider: FC<WithChildren> = ({ children }) => {
  const [itemIdDemanda, setItemIdDemanda] = useState<ID>(initialListViewAtividade.itemIdDemanda)
  const [itemIdInteracao, setItemIdInteracao] = useState<ID>(initialListViewAtividade.itemIdInteracao)

  return (
    <ListViewContext.Provider
      value={{
        setItemIdDemanda,
        setItemIdInteracao,
        itemIdDemanda,
        itemIdInteracao
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useListView = () => useContext(ListViewContext)

export { ListViewProvider, useListView }
