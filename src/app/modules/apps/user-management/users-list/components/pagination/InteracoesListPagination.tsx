import clsx from 'clsx'
import { ReactNode, useMemo } from 'react'

const mappedLabel = (label): ReactNode => {
  if (label === '&laquo; Previous') {
    return <i className="previous"></i>
  }

  if (label === 'Next &raquo;') {
    return <i className="next"></i>
  }

  return label
}

const InteracoesListPagination = ({
  paginationState,
  isLoading,
  updatePage,
  PAGINATION_PAGES_COUNT = 5,
}) => {
  const sliceLinks = (pagination) => {
    if (!pagination?.links?.length) {
      return [];
    }

    let scopedLinks = [...pagination.links]

    let pageLinks: Array<{
      label: string
      active: boolean
      url: string | null
      page: number | null
    }> = []
    let previousLink: { label: string; active: boolean; url: string | null; page: number | null } =
      scopedLinks.shift()!
    let nextLink: { label: string; active: boolean; url: string | null; page: number | null } =
      scopedLinks.pop()!

    const halfOfPagesCount = Math.floor(PAGINATION_PAGES_COUNT / 2)

    pageLinks.push(previousLink)

    if (
      pagination.page <= Math.round(PAGINATION_PAGES_COUNT / 2) ||
      scopedLinks.length <= PAGINATION_PAGES_COUNT
    ) {
      pageLinks = [...pageLinks, ...scopedLinks.slice(0, PAGINATION_PAGES_COUNT)]
    }

    if (
      pagination.page > scopedLinks.length - halfOfPagesCount &&
      scopedLinks.length > PAGINATION_PAGES_COUNT
    ) {
      pageLinks = [
        ...pageLinks,
        ...scopedLinks.slice(scopedLinks.length - PAGINATION_PAGES_COUNT, scopedLinks.length),
      ]
    }

    if (
      !(
        pagination.page <= Math.round(PAGINATION_PAGES_COUNT / 2) ||
        scopedLinks.length <= PAGINATION_PAGES_COUNT
      ) &&
      !(pagination.page > scopedLinks.length - halfOfPagesCount)
    ) {
      pageLinks = [
        ...pageLinks,
        ...scopedLinks.slice(
          pagination.page - 1 - halfOfPagesCount,
          pagination.page + halfOfPagesCount
        ),
      ]
    }

    pageLinks.push(nextLink)

    return pageLinks
  }
  const paginationLinks = useMemo(() => sliceLinks(paginationState), [paginationState]);



  return (
    <div className='row mt-10'>
      <div className='col-sm-12 col-md-12 align-items-center d-flex justify-content-center'>
        <div id='kt_table_Demanda_paginate'>
          <ul className="pagination">
            <li className={clsx('page-item active', {
              disabled: isLoading || paginationState.page === 1,
            })}>
              <a onClick={() => updatePage(1)} style={{ cursor: 'pointer' }} className="page-link"><i className="bi bi-chevron-bar-left fs-2"></i></a>
            </li>
            {paginationLinks?.map((link) => {
              return { ...link, label: mappedLabel(link.label) }
            }).map((link, index: number) => (
              <li key={index}
                className={clsx('page-item', {
                  active: paginationState.page === link.page,
                })}
              >
                <a
                  className='page-link'
                  onClick={() => updatePage(link.page)}
                  style={{ cursor: 'pointer' }}
                >
                  {mappedLabel(link.label)}
                </a>
              </li>
            ))}
            <li
              className={clsx('page-item', {
                disabled: isLoading || paginationState.page === paginationState.links?.length! - 2,
              })}
            >
              <a
                onClick={() => updatePage(paginationState.links?.length! - 2)}
                style={{ cursor: 'pointer' }}
                className='page-link'
              >
                <i className="bi bi-chevron-bar-right fs-2"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { InteracoesListPagination }