import { InteracoesListPagination } from "../../../modules/apps/user-management/users-list/components/pagination/InteracoesListPagination"
import { InteracoesCards } from "./InteracoesCards"
import { QueryRequestProvider, useQueryRequest } from "./core/QueryRequestProviderInteracoes"
import { QueryResponseProvider, useQueryResponse, useQueryResponseData, useQueryResponseLoading, useQueryResponsePagination } from "./core/QueryResponseProviderInteracoes"
import { ListViewProvider } from "./core/ListViewProvider"
import { InteracaoForm } from "./InteracoesForm"

const Interacoes = () => {

    const pagination = useQueryResponsePagination()
    const { updateState } = useQueryRequest()
    const { response } = useQueryResponse()
    const isLoading = useQueryResponseLoading()
    const interacao = useQueryResponseData();

    const updatePage = (page: number | undefined | null) => {
        if (!page || isLoading || pagination.page === page) {
            return
        }

        updateState({ page, items_per_page: pagination.items_per_page || 4 })
    }

    return (
        <>
            <InteracaoForm interacao={interacao} />
            <InteracoesCards interacoes={response} />
            <InteracoesListPagination
                paginationState={pagination}
                isLoading={isLoading}
                updatePage={updatePage}
                PAGINATION_PAGES_COUNT={4}
            />
        </>
    )
}

const InteracoesWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider>
                    <ListViewProvider>
                        <Interacoes />
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    )
}

export { InteracoesWrapper }