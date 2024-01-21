/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext } from 'react'
import { useQuery } from 'react-query'
import {
    createResponseContext,
    initialQueryResponse,
    initialQueryState,
    PaginationState,
    QUERIES,
    WithChildren,
} from '../../../../../../_metronic/helpers'
import { Atividade } from '../../../../../pages/dashboard/users-list/core/_models'
import { getAtividades } from './_requests'

const QueryResponseContext = createResponseContext<Atividade>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
    let id = 0;
    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        `${QUERIES.ATIVIDADES}`,
        () => {
            return getAtividades(id)
        },
        { enabled: id !== 0, cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    )

    return (
        <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query: '' }}>
            {children}
        </QueryResponseContext.Provider>
    )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
    const { response } = useQueryResponse()

    if (!response) {
        return []
    }
    return response?.data || []
}

const useQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const { response } = useQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useQueryResponseLoading = (): boolean => {
    const { isLoading } = useQueryResponse()
    return isLoading
}

export {
    QueryResponseProvider,
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading,
}