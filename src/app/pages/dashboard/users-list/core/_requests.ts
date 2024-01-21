import axios, { AxiosResponse } from 'axios'
import { ID, Response } from '../../../../../_metronic/helpers'
import { Demanda, UsersQueryResponse } from '../../../../modules/apps/user-management/users-list/core/_models'

const API_URL = import.meta.env.VITE_APP_GABINETE_API_URL;

const getDemandas = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${API_URL}/Demanda/Todos?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getDemandaById = (idDemanda: ID, query: string): Promise<Demanda | undefined> => {
  return axios
    .get(`${API_URL}/Demanda/Obter/${idDemanda}/?${query}`)
    .then((response: AxiosResponse<Response<Demanda>>) => response.data)
    .then((response: Response<Demanda>) => response.data)
}

const updateDemanda = (demanda: Demanda): Promise<Demanda | undefined> => {
  return axios
    .post(`${API_URL}/Demanda/Criar`, demanda)
    .then((response: AxiosResponse<Response<Demanda>>) => response.data)
    .then((response: Response<Demanda>) => response.data)
}

const deleteDemanda = (id: ID): Promise<void> => {
  return axios.delete(`${API_URL}/Demanda/Excluir/${id}`).then(() => { })
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${API_URL}/${id}`))
  return axios.all(requests).then(() => { })
}

export { getDemandas, deleteDemanda, deleteSelectedUsers, getDemandaById, updateDemanda }
