/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
  atividade: [] | {}
}

function createDivItem(data) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "1":
        return 'text-success';
      case "2":
        return 'text-warning';
      case "3":
        return 'text-primary';
      case "4":
        return 'text-danger';
      default:
        return 'text-success';
    }
  }

  function getStatusMuted(status) {

    switch (status) {
      case "3":
        return "text-muted";
      case "4":
        return "text-muted";
      default:
        return "";
    }

  }


  return data.map((element, i: number) => (
    <div key={i} id={`divElement${i}`} className='timeline-item'>
      <div className='timeline-label text-gray-800 fs-6'>{element.criado.slice(11, 16)}</div>
      <div className='timeline-badge'>
        <i className={`fa fa-genderless ${getStatusBadge(element.status)} fs-1`}></i>
      </div>
      <div className={`fw-mormal timeline-content ${getStatusMuted(element.status)} ps-3`}>
        {element.titulo}
      </div>
    </div>
  ))
}

const ListsAtividades: React.FC<Props> = ({ className, atividade }) => {
  let renderedItem = '';

  if (atividade) {
    renderedItem = createDivItem(atividade);
  }

  return (
    <div className={`card ${className}`}>
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bold mb-2'>Atividades</span>
        </h3>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          <Dropdown1 />
        </div>
      </div>
      <div className='card-body pt-5'>
        <div className='timeline-label'>
          {renderedItem}
        </div>
      </div>
    </div>
  )
}

export { ListsAtividades }

