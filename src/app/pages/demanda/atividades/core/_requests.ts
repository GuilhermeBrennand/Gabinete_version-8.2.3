import axios, { AxiosResponse } from 'axios'
import { ID, Response } from '../../../../../_metronic/helpers'
import { Atividade } from './_models'
import { Demanda } from '../../../../modules/apps/user-management/users-list/core/_models'

const API_URL = import.meta.env.VITE_APP_GABINETE_API_URL;

const createInteracao = (user: Demanda): Promise<Demanda | undefined> => {
  return axios
    .put(`${API_URL}`, user)
    .then((response: AxiosResponse<Response<Demanda>>) => response.data)
    .then((response: Response<Demanda>) => response.data)
}

const getTodasAtividadesInteracao = (idDemanda: ID, idInteracao: ID): Promise<Atividade | any> => {
  return axios
    .get(`${API_URL}/Atividade/ObterAtividades/${idDemanda}/${idInteracao}`)
    .then((response: AxiosResponse<Response<Atividade>>) => response.data)
    .then((response: Response<Atividade>) => response.data)
}

export { createInteracao, getTodasAtividadesInteracao }
