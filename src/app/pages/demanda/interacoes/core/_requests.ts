import axios, { AxiosResponse } from 'axios'
import { ID, QUERIES, Response, stringifyRequestQuery } from '../../../../../_metronic/helpers'
import { Interacao, InteracaoQueryResponse } from '../../../../modules/apps/user-management/users-list/core/_models'
import { useMutation, useQueryClient } from 'react-query'
import { useQueryRequest } from './QueryRequestProviderInteracoes';
import { useEffect, useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_APP_GABINETE_API_URL;

export const getInteracoesPaginadas = (idDemanda: ID, query: string): Promise<InteracaoQueryResponse> => {
  return axios
    .get(`${API_URL}/Interacao/Todos?idDemanda=${idDemanda}&${query}`)
    .then((d: AxiosResponse<InteracaoQueryResponse>) => d.data)
}

const createInteracao = (demandaId: ID, InteracaoDaDemanda: Interacao): Promise<Interacao | undefined> => {
  return axios
    .post(`${API_URL}/Interacao/Adicionar/${demandaId}`, InteracaoDaDemanda)
    .then((response: AxiosResponse<Response<Interacao>>) => response.data)
    .then((response: Response<Interacao>) => response.data)
}

const editInteracao = (demandaId: ID, interacaoId: ID, InteracaoDaDemanda: Interacao): Promise<Interacao | undefined> => {
  return axios
    .put(`${API_URL}/Interacao/Editar/${demandaId}/${interacaoId}`, InteracaoDaDemanda)
    .then((response: AxiosResponse<Response<Interacao>>) => response.data)
    .then((response: Response<Interacao>) => response.data)
}

export const deleteInteracao = (idDemanda: ID, idInteracao: ID) => {
  return axios
    .delete(`${API_URL}/Interacao/Deletar/${idDemanda}/${idInteracao}`)
    .then(() => { })
}

export function MutateInteracao() {
  const { state } = useQueryRequest();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery, query]);

  const mutate = useMutation((params: { demandaId: ID, interacaoId?: ID, data: Interacao }) =>
    !params.interacaoId ? createInteracao(params.demandaId, params.data)
      : editInteracao(params.demandaId, params.interacaoId, params.data)
    , {
      onSuccess: () => {
        queryClient.invalidateQueries([`${QUERIES.INTERACOES}-${updatedQuery}`])
        queryClient.invalidateQueries([`${QUERIES.ATIVIDADES}`])
      }
    });

  return mutate;
}