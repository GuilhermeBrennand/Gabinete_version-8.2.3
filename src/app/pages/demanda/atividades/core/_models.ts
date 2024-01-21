import { Response} from '../../../../../_metronic/helpers'
export type Atividade = [{
  criado?: string
  status?: string
  operacao?:  string
  titulo?:  string
}]

export type UsersQueryResponse = Response<Array<Atividade>>

export const initialUser: Atividade = [{
  criado: "",
  titulo: "",
  status: "0",
  operacao: ""
}]
