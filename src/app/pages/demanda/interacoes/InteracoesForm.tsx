import * as Yup from 'yup'
import { useThemeMode } from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider';
import { MutateInteracao } from './core/_requests';
import { useListView } from './core/ListViewProvider';
import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { ID, isNotEmpty } from '../../../../_metronic/helpers';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Interacao, initialInteracao } from '../../../modules/apps/user-management/users-list/core/_models';

type Props = {
    interacao: Interacao[]
}
const editUserSchema = Yup.object().shape({
    categoria: Yup.string().required('Categoria é obrigatória'),
    responsavel: Yup.string().required('Responsável é obrigatório'),
});

const InteracaoForm: React.FC<Props> = ({ interacao }) => {
    let theme = useThemeMode().mode as 'light' | 'dark';
    const { id } = useParams();
    const { mutate } = MutateInteracao();
    const { itemIdInteracao, itemIdDemanda, setItemIdInteracao, setItemIdDemanda } = useListView();
    const [prevIdDemanda, setPrevIdDemanda] = useState<ID | null>(itemIdDemanda || Number(id));
    const [prevIdInteracao, setPrevIdInteracao] = useState<ID | null>(itemIdInteracao);

    useEffect(() => {
        if (itemIdInteracao && itemIdInteracao !== prevIdInteracao) {

            setPrevIdInteracao(itemIdInteracao);
        }
    }, [itemIdInteracao, prevIdInteracao]);

    useEffect(() => {
        if (itemIdDemanda && itemIdDemanda !== prevIdDemanda) {

            setPrevIdDemanda(itemIdDemanda);
        }
    }, [itemIdDemanda, prevIdDemanda]);

    const CleanFormAndId = () => {
        formik.resetForm();
        setPrevIdInteracao(null);
        setItemIdInteracao(null);
    }

    const handleSubmit = async (values: Interacao) => {

        mutate({ demandaId: prevIdDemanda, interacaoId: prevIdInteracao, data: values });

        let sucessText: string = 'criada';

        if (isNotEmpty(prevIdInteracao)) {
            sucessText = 'atualizada';
        }

        toast.success(`Interação ${sucessText} com sucesso!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: theme,
        });

        CleanFormAndId();

    };

    const formik = useFormik<Interacao>({
        initialValues: initialInteracao,
        validationSchema: editUserSchema,
        onSubmit: handleSubmit,
    });



    useEffect(() => {
        if (interacao && itemIdInteracao) {
            let interacaoSelecionada = interacao.find(i => i.id === itemIdInteracao)
            if (interacaoSelecionada) {
                formik.setValues({
                    ...initialInteracao,
                    id: interacaoSelecionada.id || initialInteracao.id,
                    categoria: interacaoSelecionada.categoria || initialInteracao.categoria,
                    titulo: interacaoSelecionada.titulo || initialInteracao.titulo,
                    responsavel: interacaoSelecionada.responsavel || initialInteracao.responsavel,
                    status: interacaoSelecionada.status || initialInteracao.status,
                    prioridade: interacaoSelecionada.prioridade || initialInteracao.prioridade,
                    textoInteracao: interacaoSelecionada.textoInteracao || initialInteracao.textoInteracao
                });
            }
        }

    }, [itemIdInteracao, interacao]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='row mb-7'>
                <div className="mb-9"></div>
                <div className="col-md-3 fv-row mb-3">
                    <label className="fs-6 fw-semibold required mb-2">Categoria</label>
                    <select
                        data-kt-select2='true'
                        className={clsx(
                            'form-select form-select-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched['categoria'] && formik.errors['categoria'] },
                            {
                                'is-valid': formik.touched['categoria'] && !formik.errors['categoria'],
                            }
                        )}
                        {...formik.getFieldProps('categoria')}
                        aria-label="Select example"
                    >
                        <option value="">Open this select menu</option>
                        <option value="1">HTML Theme</option>
                        <option value="2">Angular App</option>
                        <option value="3">Vue App</option>
                        <option value="4">React Theme</option>
                        <option value="5">Figma UI Kit</option>
                        <option value="6">Laravel App</option>
                        <option value="7">Blazor App</option>
                        <option value="8">Django App</option>
                    </select>
                </div>
                <div className="col-md-3 fv-row mb-3">
                    <label className="fs-6 fw-semibold required mb-2">Responsável</label>
                    <select
                        className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched['responsavel'] && formik.errors['responsavel'] },
                            {
                                'is-valid': formik.touched['responsavel'] && !formik.errors['responsavel'],
                            }
                        )}

                        {...formik.getFieldProps('responsavel')}
                        aria-label="Select example"
                    >
                        <option value="">Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    {formik.touched.responsavel && formik.errors.responsavel && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'></div>
                        </div>
                    )}
                </div>
                <div className="col-md-3 fv-row mb-3">
                    <label className="fs-6 fw-semibold mb-2">Status</label>
                    <select className="form-select form-select-solid"
                        data-control="select2"
                        data-allow-clear="true"
                        {...formik.getFieldProps('status')}
                        aria-label="Select example"
                    >
                        <option value="1">Aberto</option>
                        <option value="2">Pendente</option>
                        <option value="3">Resolvido</option>
                        <option value="4">Fechado</option>
                    </select>
                </div>

                <div className="col-md-3 fv-row mb-3">
                    <label className="fs-6 fw-semibold mb-2">Prioridade</label>
                    <select className="form-select form-select-solid"
                        data-control="select2"
                        data-allow-clear="true"
                        {...formik.getFieldProps('prioridade')}
                        aria-label="Select example"
                    >
                        <option value="1">Baixa</option>
                        <option value="2">Média</option>
                        <option value="3">Alta</option>
                    </select>
                </div>

                <div className="mb-0">
                    <div className="form-floating">
                        <input
                            type="text"
                            id="titulo"
                            className="form-control form-control-solid placeholder-gray-600 fw-bold fs-4 pb-5  pt-10"
                            placeholder="Title"
                            {...formik.getFieldProps('titulo')}
                        />
                        <textarea
                            id="textareaInteracao"
                            className="form-control form-control-solid placeholder-gray-600 fw-bold fs-4 ps-5 pt-5"
                            rows={4}
                            placeholder="Share Your Knowledge"
                            style={{ height: '200px', resize: 'none' }}
                            data-kt-autosize="true"
                            {...formik.getFieldProps('textoInteracao')}
                        >
                        </textarea>
                        <label htmlFor="titulo">Título da interação</label>
                    </div>
                </div>
                <div className="card-body d-flex justify-content-end align-items-center">
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary mt-n5 me-5"
                        onClick={() => { CleanFormAndId() }}
                    >
                        Discard
                    </button>
                    <button type="submit" className="btn btn-sm btn-primary mt-n5 me-n5">Enviar</button>
                </div>
            </div>
        </form>
    )
}

export { InteracaoForm }

