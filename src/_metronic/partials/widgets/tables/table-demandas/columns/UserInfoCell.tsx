/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { Demanda } from '../../../../../../app/modules/apps/user-management/users-list/core/_models'

type Props = {
  user: Demanda
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 fs-8 text-hover-primary mb-1'>
        {user.titulo}
      </a>
      {/* <span>{user.email}</span> */}
    </div>
  </div>
)

export {UserInfoCell}
