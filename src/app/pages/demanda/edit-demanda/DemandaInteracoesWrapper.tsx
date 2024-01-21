import { useQuery } from 'react-query'
import { isNotEmpty, QUERIES, stringifyRequestQuery } from '../../../../_metronic/helpers'
import { DemandaDetalhes } from '../interacoes/DemandaDetalhes'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import { getDemandaById } from '../../dashboard/users-list/core/_requests'
import { InteracoesWrapper } from '../interacoes/InteracoesWrapper'
import { useQueryRequest } from '../interacoes/core/QueryRequestProviderInteracoes'

const DemandaInteracoesWrapper = () => {
  const { id } = useParams();
  const [previousId, setPreviousId] = useState<string | null>(null);
  const enabledQuery = isNotEmpty(id);
  const { state } = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [query, updatedQuery])

  useEffect(() => {
    if (id && id !== previousId) {
      setPreviousId(id);
    }
  }, [id, previousId]);

  const {
    data: demanda,
  } = useQuery(
    `${QUERIES.DEMANDAS}`,
    () => {
      return getDemandaById(Number(previousId), query)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery && !!previousId,
      onError: (err) => {
        console.error(err)
      },
    }
  )

  return (

    <DemandaDetalhes className='card-xxl-stretch mb-5 mb-xl-8' demanda={demanda}>
      <InteracoesWrapper />
    </DemandaDetalhes>

  );
}

export { DemandaInteracoesWrapper }