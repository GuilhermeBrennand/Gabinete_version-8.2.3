import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import { ListsAtividades, TablesDemandas } from '../../../_metronic/partials/widgets'
import { Toolbar } from '../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../_metronic/layout/components/Content'
import { UsersListHeader } from './users-list/components/header/UsersListHeader'
import { KTCard } from '../../../_metronic/helpers'
import { QueryRequestProvider } from '../../modules/apps/user-management/users-list/core/QueryRequestProvider'
import { QueryResponseProvider as ResponseDemanda } from './users-list/core/QueryResponseProviderDemanda'
import { QueryResponseProvider as ResponseAtividade } from '../../modules/apps/user-management/users-list/core/QueryResponseProviderAtividade'
import { ListViewProvider } from '../../modules/apps/user-management/users-list/core/ListViewProvider'



const DashboardPage = () => (
  <>
    <Toolbar />
    <Content>
    <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsAtividades className='card card-flush h-xl-100' atividade={[]} />
      </div>

      <KTCard className='col-xl-8'>
        <UsersListHeader />
        <TablesDemandas className='card-xxl-stretch mb-5 mb-xl-8' />
      </KTCard>
      </div>
    </Content>
  </>
)

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <QueryRequestProvider>
        <ResponseDemanda>
          <ListViewProvider>
            <ResponseAtividade>
              <DashboardPage />
            </ResponseAtividade>
          </ListViewProvider>
        </ResponseDemanda>
      </QueryRequestProvider>
    </>
  )
}

export {DashboardWrapper}
