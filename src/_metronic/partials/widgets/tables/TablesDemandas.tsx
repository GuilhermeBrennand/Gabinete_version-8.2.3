/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react'
import { ColumnInstance, Row, useTable } from 'react-table'

import { usersColumns } from './table-demandas/columns/_columns'
import { CustomHeaderColumn } from './table-demandas/columns/CustomHeaderColumn'
import { CustomRow } from './table-demandas/columns/CustomRow'

import { useQueryResponseData, useQueryResponseLoading, useQueryResponsePagination } from '../../../../app/pages/dashboard/users-list/core/QueryResponseProviderDemanda'
import { Demanda } from '../../../../app/modules/apps/user-management/users-list/core/_models'
import { useQueryRequest } from '../../../../app/modules/apps/user-management/users-list/core/QueryRequestProvider'
import { DemandaListPagination } from '../../../../app/modules/apps/user-management/users-list/components/pagination/DemandaListPagination'
import { DemandaListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/DemandaListLoading'

type Props = {
  className?: string
}

const TablesDemandas: React.FC<Props> = ({ className }) => {
  const demanda = useQueryResponseData()
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => demanda, [demanda])
  const columns = useMemo(() => usersColumns, [])
  const { updateState } = useQueryRequest()

  const updatePage = (page: number | undefined | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }

    updateState({ page, items_per_page: pagination.items_per_page || 10 })
  }

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Demandas</span>
        </h3>
      </div>
      <div className='card-body py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            {...getTableProps()}
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<Demanda>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fs-7  fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<Demanda>, i) => {
                  prepareRow(row)
                  return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <DemandaListPagination
          paginationState={pagination}
          isLoading={isLoading}
          updatePage={updatePage}
          PAGINATION_PAGES_COUNT={5}
        />
        {isLoading && <DemandaListLoading />}
      </div>
    </div>
  )
}

export { TablesDemandas }
