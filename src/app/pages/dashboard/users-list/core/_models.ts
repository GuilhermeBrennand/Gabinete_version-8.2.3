import { Response} from '../../../../../_metronic/helpers'
export type Atividade = {
  time?: string
  text?: string
  status?: number
}

export type UsersQueryResponse = Response<Array<Atividade>>

export const initialUser: Atividade = {
  time: "",
  text: "",
  status: 0
}
