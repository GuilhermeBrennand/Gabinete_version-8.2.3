import axios, { AxiosResponse } from 'axios'
import { ID } from '../../../../../../_metronic/helpers'
import { UsersQueryResponse } from './_models'

const getAtividades = (id: number): Promise<UsersQueryResponse> => {
  return axios
    .get(`${process.env.VITE_APP_GABINETE_API_URL}/ObterAtividades/${id}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${process.env.VITE_APP_GABINETE_API_URL}}/${id}`))
  return axios.all(requests).then(() => { })
}

export { getAtividades, deleteSelectedUsers }  
