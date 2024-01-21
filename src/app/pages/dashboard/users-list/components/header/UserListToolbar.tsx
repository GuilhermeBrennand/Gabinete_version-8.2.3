import { useState } from 'react'
import { KTIcon } from '../../../../../../_metronic/helpers'
import { CreateAppModal } from '../../../../../../_metronic/partials'
import { useListView } from '../../core/ListViewProvider'
import { UsersListFilter } from './UsersListFilter'

const UsersListToolbar = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      <button type='button' className='btn btn-sm btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button>

      <button type='button' className='btn btn-sm btn-primary' onClick={() => setShowCreateAppModal(true)}>
        <KTIcon iconName='plus' className='fs-2' />
        Nova Demanda
      </button>
      <CreateAppModal show={showCreateAppModal} handleClose={() => setShowCreateAppModal(false)} />
    </div>
  )
}

export { UsersListToolbar }
