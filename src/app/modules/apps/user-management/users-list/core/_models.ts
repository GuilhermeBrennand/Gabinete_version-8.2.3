import { ID, Response } from '../../../../../../_metronic/helpers'

export type Interacao =
  {
    id?: ID
    categoria?: string
    titulo?: string
    responsavel?: string
    status?: string,
    prioridade?: string
    textoInteracao?: string
    criada?: string
    idDemanda?: ID
  }


export type Demanda = {
  id?: ID
  titulo?: string
  categoria?: string
  responsavel?: string
  status?: number
  demandante?: string
  criada?: string
  descricao?: string
  email?: boolean
  telefone?: boolean
  arquivo?: string
  interacoes?: Interacao[]
}

export type UsersQueryResponse = Response<Array<Demanda>>
export type InteracaoQueryResponse = Response<Array<Interacao>>

export const initialInteracao: Interacao = {
  id: 0,
  categoria: "",
  titulo: "",
  responsavel: "",
  status: "",
  prioridade: "",
  textoInteracao: "",
  idDemanda: 0
}

export const initialDemanda: Demanda = {
  id: 0,
  titulo: "",
  demandante: "",
  categoria: "",
  criada: "",
  responsavel: "",
  arquivo: "",
  email: false,
  telefone: false,
  status: 0,
  descricao: ""
}
