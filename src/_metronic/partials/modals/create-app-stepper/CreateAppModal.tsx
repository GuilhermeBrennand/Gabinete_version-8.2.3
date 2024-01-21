/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon, QUERIES, stringifyRequestQuery } from '../../../helpers'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import { Demanda, initialDemanda } from '../../../../app/modules/apps/user-management/users-list/core/_models'
import { useQueryClient } from 'react-query'

import clsx from 'clsx'
import { updateDemanda } from '../../../../app/pages/dashboard/users-list/core/_requests'
import { useQueryRequest } from '../../../../app/pages/dashboard/users-list/core/QueryRequestProvider'



type Props = {
  show: boolean;
  handleClose: () => void;
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateAppModal = ({ show, handleClose }: Props) => {
  const queryClient = useQueryClient();
  const { state } = useQueryRequest();
  const [query] = useState<string>(stringifyRequestQuery(state));
  const [editorTouched, setEditorTouched] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  const registrationSchema = Yup.object().shape({
    titulo: Yup.string().required('Titulo é obrigatório'),
    categoria: Yup.string().required('Categoria é obrigatório'),
    responsavel: Yup.string().required('Responsável é obrigatório'),
  })

  const handleSubmit = async (values: Demanda, actions: FormikHelpers<Demanda>) => {
    if (editorContent === '') return
    values.descricao = editorContent;
    await updateDemanda(values).then(() => {
      handleClose();
      actions.resetForm();
      setEditorContent('');
      queryClient.invalidateQueries(`${[QUERIES.DEMANDAS]}-${query}`);
    });
  }

  const formik = useFormik<Demanda>({
    initialValues: initialDemanda,
    validationSchema: registrationSchema,
    onSubmit: handleSubmit
  });

  const CancelDelete = () => {
    Swal.fire({
      text: "Are you sure you would like to cancel?",
      icon: 'warning',
      color: 'black',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, return',
    }).then((result) => {
      if (result.isDismissed) {
        Swal.fire(
          {
            text: "Your form has not been cancelled!.",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok, got it!',
          }
        )
      } else {
        handleClose();
      }
    })
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-750px'
      show={show}
      onHide={handleClose}
    >

      {/* begin::Close */}
      <form onSubmit={formik.handleSubmit}>
        <div className="modal-header pb-0 border-0 justify-content-end __web-inspector-hide-shortcut__">
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        {/* end::Close */}
        <div className='mb-3 text-center'>
          <h1>Criar Demanda</h1>
        </div>

        <div className='modal-body py-lg-10 px-lg-10'>
          <div className="mb-10 ">
            <label className="required form-label">Título</label>
            <input
              type="text"
              {...formik.getFieldProps('titulo')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.titulo && formik.errors.titulo },
                {
                  'is-valid': formik.touched.titulo && !formik.errors.titulo,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting}
              placeholder="Example input"
            />
            {formik.touched.titulo && formik.errors.titulo && (
              <div className='fv-plugins-message-container mt-2'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.titulo}</span>
                </div>
              </div>
            )}
          </div>

          <div className='row mb-10'>
            <div className="col-lg-6 ">
              <label className="required form-label">Categoria</label>
              <select
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.categoria && formik.errors.categoria },
                  {
                    'is-valid': formik.touched.categoria && !formik.errors.categoria,
                  }
                )}
                {...formik.getFieldProps('categoria')}
                aria-label="Select example"
              >
                <option value=''>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.categoria && formik.errors.categoria && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.categoria}</div>
                </div>
              )}
            </div>

            <div className="col-lg-6 ">
              <label className="required form-label">Responsável</label>
              <select
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.responsavel && formik.errors.responsavel },
                  {
                    'is-valid': formik.touched.responsavel && !formik.errors.responsavel,
                  }
                )}
                {...formik.getFieldProps('responsavel')}
                aria-label="Select example"
              >
                <option value=''>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.responsavel && formik.errors.responsavel && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.responsavel}</div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-10 form-control form-control-solid">
            <label className="required form-label">Descrição</label>
            <CKEditor
              editor={ClassicEditor}
              data={editorContent}
              config={
                {
                  language: 'pt-br'
                }
              }
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorContent(data)
              }}
              onFocus={() => setEditorTouched(true)}
            />

            {formik.touched.descricao && editorTouched && !editorContent && (
              <div className='fv-plugins-message-container mt-2'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>A descrição é obrigatória</span>
                </div>
              </div>
            )}
          </div>

          <div className="fv-row mb-8 dropzone">
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dz-message needsclick align-items-center">
                  <input {...getInputProps()} name='arquivo' />
                  <i className="ki-duotone ki-file-up fs-3hx text-primary"><span className="path1"></span><span className="path2"></span></i>
                  <div className="ms-4">
                    <h3 className="fs-5 fw-bold text-gray-900 mb-1">Drop files here or click to upload.</h3>
                    <span className="fw-semibold fs-7 text-gray-500">Upload up to 10 files</span>
                  </div>
                </div>
              )}
            </Dropzone>
          </div>

          <div className="mb-15 fv-row fv-plugins-icon-container">
            <div className="d-flex flex-stack">
              <div className="fw-semibold me-5">
                <label className="fs-6">Notificações</label>
                <div className="fs-7 text-gray-500">Permitir Notificações por Telefone ou Email</div>
              </div>
              <div className="d-flex align-items-center">
                <label className="form-check form-check-custom form-check-solid me-10">
                  <input className="form-check-input h-20px w-20px" type="checkbox" {...formik.getFieldProps('email')} />
                  <span className="form-check-label fw-semibold">
                    Email
                  </span>
                </label>
                <label className="form-check form-check-custom form-check-solid">
                  <input className="form-check-input h-20px w-20px" type="checkbox" {...formik.getFieldProps('telefone')} />
                  <span className="form-check-label fw-semibold">
                    Phone
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="reset"
              id="kt_modal_new_ticket_cancel"
              className="btn btn-light me-3"
              onClick={CancelDelete}
            >
              Cancel
            </button>

            <button type="submit" id="kt_modal_new_ticket_submit" className="btn btn-primary">
              <span className='indicator-label'>Submit</span>
              {(formik.isSubmitting) && (
                <span className='indicator-progress'>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>

        </div>
      </form>
    </Modal>,
    modalsRoot
  )
}

export { CreateAppModal }
