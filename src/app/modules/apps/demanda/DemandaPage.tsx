import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { useIntl } from 'react-intl'
import { DemandaWrapper } from '../../../pages/demanda/DemandaWrapper'
import { ListViewProvider } from '../../../pages/demanda/atividades/core/ListViewProvider'

const demandaBreadCrumbs: Array<PageLink> = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: false,
    isActive: false,
  },
]

const DemandaPage: React.FC = () => {
  const intl = useIntl()
  return (
    <Routes>
      <Route
        element={
          <>
            <PageTitle breadcrumbs={demandaBreadCrumbs}>Demanda</PageTitle>
            <ListViewProvider>
              <DemandaWrapper />
            </ListViewProvider>
          </>
        }
      >
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            </>
          }
        />
        <Route index element={<Navigate to='demanda/:id' />} />
      </Route>
    </Routes>
  )
}
export default DemandaPage
