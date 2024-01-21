/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { MenuComponent } from '../../../../../assets/ts/components'
import { ID, KTIcon, QUERIES } from '../../../../../../_metronic/helpers'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useListView as InteracoesContext } from '../../../../../../app/pages/demanda/interacoes/core/ListViewProvider'
import { useListView as DemandaContext } from '../../../../../../app/pages/dashboard/users-list/core/ListViewProvider'
import { useQueryResponse } from '../../../../../../app/pages/dashboard/users-list/core/QueryResponseProviderDemanda'
import { deleteDemanda } from '../../../../../../app/pages/dashboard/users-list/core/_requests';
import { deleteInteracao } from '../../../../../../app/pages/demanda/interacoes/core/_requests';

type Props = {
  demandaId: ID
  interacaoId?: ID
}

const UserActionsCell: FC<Props> = ({ demandaId, interacaoId }) => {
  const { query } = useQueryResponse()
  const queryClient = useQueryClient()
  const { setItemIdDemanda, setItemIdInteracao } = InteracoesContext()
  const { setItemId } = DemandaContext()

  useEffect(() => {
    if (demandaId) {
      setItemId(demandaId)
    }
  }, [demandaId, setItemId])

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])



  const deleteConfirm = (demandaId: ID, interacaoId:ID) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDelete.mutate({ idDemanda: demandaId, idInteracao: interacaoId });
      }
    })
  }

  const mutationDelete = useMutation((params: { idDemanda: ID, idInteracao?: ID }) => {
    return queryDelete(params.idDemanda, params.idInteracao)
  }
    ,
    {
      onSuccess: () => {
        Swal.fire(
          'Excluído!',
          'Seu arquivo foi excluído.',
          'success'
        )
        queryClient.invalidateQueries([`${QUERIES.DEMANDAS}-${query}`])
        queryClient.invalidateQueries([`${QUERIES.INTERACOES}-${query}`])
      },
    });

  const queryDelete = (demandaId: ID, interacaoId:ID) => {
    if (interacaoId) {
      return deleteInteracao(demandaId, interacaoId);
    } else {
      return deleteDemanda(demandaId);
    }
  }

  const scrollAndFocusWithSetValues = () => {
    const targetFocus = document.getElementById('textareaInteracao');
    const targetScroll = document.getElementById('interacaoForm');

    if (targetScroll) {
      targetScroll.scrollIntoView({ behavior: "smooth" })
    }

    setTimeout(() => {
      if (targetFocus) {
        targetFocus.focus()
      }
    }, 800);

    setItemIdDemanda(demandaId);
    setItemIdInteracao(interacaoId);

  }

  let link = `/demanda/${demandaId}`;

  if (interacaoId) {
    link = ''
  }

  return (
    <>
      <div className='d-flex justify-content-end flex-shrink-0'>
        <Link to={link}
          onClick={() => {
            scrollAndFocusWithSetValues()
          }}
          className='btn btn-icon fs-10 btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <KTIcon iconName='switch' className='fs-3' />
        </Link>
        <a
          href='#'
          className='btn btn-icon fs-10 btn-bg-light btn-active-color-primary btn-sm'
          onClick={() => deleteConfirm(demandaId, interacaoId)}
        >
          <KTIcon iconName='trash' className='fs-3' />
        </a>
      </div>
    </>
  )
}

export { UserActionsCell }
