// @ts-nocheck
import { Column } from 'react-table'
import { UserInfoCell } from './UserInfoCell'
import { UserActionsCell } from './UserActionsCell'
import { UserSelectionCell } from './UserSelectionCell'
import { UserCustomHeader } from './UserCustomHeader'
import { UserSelectionHeader } from './UserSelectionHeader'
import { Demanda } from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Demanda>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Título' className='min-w-125px' />,
    id: 'titulo',
    Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Demandante' className='min-w-125px' />,
    accessor: 'demandante',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Criada' className='min-w-125px' />,
    accessor: 'criada',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Responsável' className='min-w-125px' />,
    accessor: 'responsavel',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Status' className='min-w-50px' />,
    accessor: 'status',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Ações' className='text-end min-w-125px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <UserActionsCell demandaId={props.data[props.row.index].id} />,
  },
]

export { usersColumns }
