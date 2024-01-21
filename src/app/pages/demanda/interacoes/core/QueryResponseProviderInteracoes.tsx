/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import {
    createResponseContext,
    ID,
    initialQueryResponse,
    initialQueryState,
    PaginationState,
    QUERIES,
    stringifyRequestQuery,
    WithChildren,
} from '../../../../../_metronic/helpers'
import { Interacao } from '../../../../modules/apps/user-management/users-list/core/_models'
import { getInteracoesPaginadas } from './_requests'
import { useParams } from 'react-router-dom'
import { useQueryRequest } from './QueryRequestProviderInteracoes'

const QueryResponseContext = createResponseContext<Interacao>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
    const { id } = useParams();
    const idDemanda = Number(id);
    const { state } = useQueryRequest();
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);
    const [prevId, setPrevId] = useState<ID>(idDemanda);

    useEffect(() => {
        if (idDemanda) {
            setPrevId(idDemanda)
        }
    }, [idDemanda, prevId]);

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
            refetch()
        }
    }, [updatedQuery]);

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        `${QUERIES.INTERACOES}-${updatedQuery}`,
        () => {
            return getInteracoesPaginadas(prevId, updatedQuery)
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    )

    return (
        <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
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