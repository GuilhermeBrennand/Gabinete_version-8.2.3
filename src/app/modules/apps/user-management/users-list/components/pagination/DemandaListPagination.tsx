/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useMemo } from 'react'

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const DemandaListPagination = ({
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

    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_Demanda_paginate'>
          <ul className='pagination'>
            <li
              className={clsx('page-item', {
                disabled: isLoading || paginationState.page === 1,
              })}
            >
              <a onClick={() => updatePage(1)} style={{ cursor: 'pointer' }} className='page-link'>
                First
              </a>
            </li>
            {paginationLinks
              ?.map((link) => {
                return { ...link, label: mappedLabel(link.label) }
              })
              .map((link) => (
                <li
                  key={link.label}
                  className={clsx('page-item', {
                    active: paginationState.page === link.page,
                    disabled: isLoading,
                    previous: link.label === 'Previous',
                    next: link.label === 'Next',
                  })}
                >
                  <a
                    className={clsx('page-link', {
                      'page-text': link.label === 'Previous' || link.label === 'Next',
                      'me-5': link.label === 'Previous',
                    })}
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
                Last
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { DemandaListPagination }
