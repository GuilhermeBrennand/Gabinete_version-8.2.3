import { useContext, useEffect, useState } from "react"
import { QUERIES, createResponseContext, initialQueryResponse } from "../../../../../_metronic/helpers"
import { useQuery } from "react-query";
import { getTodasAtividadesInteracao } from "./_requests";
import { Atividade } from "./_models";

import { ListsAtividades } from "../../../../../_metronic/partials/widgets";
import { useListView } from "./ListViewProvider";


const QueryResponseContext = createResponseContext<Atividade>(initialQueryResponse)
const QueryResponseProviderAtividade = () => {
  const { itemIdDemanda } = useListView();
  const { itemIdInteracao } = useListView();
  const [previousIdDemanda, setPreviousIdDemanda] = useState<number | null>(itemIdDemanda || null);
  const [previousIdInteracao, setPreviousIdInteracao] = useState<number | null>(itemIdInteracao || null);

  useEffect(() => {
    if (itemIdDemanda && itemIdDemanda !== previousIdDemanda) {
      setPreviousIdDemanda(itemIdDemanda);
    }
  }, [itemIdDemanda, previousIdDemanda]);

  useEffect(() => {
    if (itemIdInteracao && itemIdInteracao !== previousIdInteracao) {
      setPreviousIdInteracao(itemIdInteracao);
    }
  }, [itemIdInteracao, previousIdInteracao]);
console.log(previousIdInteracao)
  const {
    data: response,
    refetch
  } = useQuery({
    queryFn: () => getTodasAtividadesInteracao(previousIdDemanda, previousIdInteracao),
    queryKey: [QUERIES.ATIVIDADES],
    enabled: !!previousIdInteracao,
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (previousIdInteracao !== null) {
      refetch();
    }
  }, [previousIdInteracao, refetch]);
console.log(response)
  return (
    <ListsAtividades className='card-xxl-stretch mb-5 mb-xl-8' atividade={response} />
  );
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const { response } = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

export {
  QueryResponseProviderAtividade,
  useQueryResponse,
  useQueryResponseData,
}