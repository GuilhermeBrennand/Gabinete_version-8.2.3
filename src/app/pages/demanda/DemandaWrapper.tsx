import {
    ListsAtividades
} from '../../../_metronic/partials/widgets'
import { Content } from '../../../_metronic/layout/components/Content'
import { QueryResponseProvider } from '../dashboard/users-list/core/QueryResponseProviderDemanda'

import { DemandaInteracoesWrapper } from './edit-demanda/DemandaInteracoesWrapper'
import { QueryResponseProviderAtividade } from './atividades/core/QueryResponseProviderAtividadeInteracao'
import { QueryRequestProvider } from './interacoes/core/QueryRequestProviderInteracoes'
import { Toolbar } from '../../../_metronic/layout/components/toolbar/Toolbar'
import { ListViewProvider } from './interacoes/core/ListViewProvider'
import { useListView } from './atividades/core/ListViewProvider'





const Demandas = () => {
    const { itemIdDemanda } = useListView();
    const { itemIdInteracao } = useListView();
console.log(itemIdDemanda, itemIdInteracao)
    return (
        <>
            <Toolbar />
            <Content>
                <div className='row gy-5 g-xl-8'>
                    <div className='col-xl-8'>
                        <DemandaInteracoesWrapper />
                    </div>
                    <div className='col-xxl-4'>
                        {!itemIdDemanda && !itemIdInteracao ?
                            <ListsAtividades className='card-xxl-stretch mb-5 mb-xl-8' atividade={[]} />
                            :
                            <QueryResponseProviderAtividade />
                        }
                    </div>
                </div>
            </Content>
        </>
    )
}

const DemandaWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider>
                    <ListViewProvider>
                        <Demandas />
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    )
}

export { DemandaWrapper }
