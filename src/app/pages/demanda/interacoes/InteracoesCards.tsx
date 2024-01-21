import React from "react"
import { useListView } from "../atividades/core/ListViewProvider"
import { UserActionsCell } from "../../../../_metronic/partials/widgets/tables/table-demandas/columns/UserActionsCell"
import { Interacao } from "../../../modules/apps/user-management/users-list/core/_models"


type Props = {
    interacoes: any
}
const InteracoesCards: React.FC<Props> = ({ interacoes }) => {
    let color: string;
    const { setItemIdInteracao } = useListView();
    const { setItemIdDemanda } = useListView();
    const arrColor = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
    const randomColor = () => arrColor[Math.floor(Math.random() * 6)];

    if (interacoes && interacoes.data) {
        return interacoes.data.map((interacao: Interacao, i: number) => (
            <div id={`divInteracao${i}`} key={interacao.id} className='mb-15 ' style={{ position: 'relative' }}>
                <div className="mb-9">
                    <div key={interacao.id} className={`col-md-2 d-flex flex-row-reverse`}
                        style={{ position: 'absolute', top: '15%', right: '3%', zIndex: '1' }}>
                        <UserActionsCell demandaId={interacao.idDemanda} interacaoId={interacao.id} />
                    </div>
                    <div className="card card-bordered w-100">
                        <div className="card-body"
                            onClick={() => {
                                setItemIdDemanda(interacao.idDemanda);
                                setItemIdInteracao(interacao.id);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="col-md-9 w-100 d-flex flex-stack mb-8">
                                <div className="d-flex align-items-center f">
                                    <div className="symbol symbol-50px me-5">
                                        <div hidden>{color = randomColor()}</div>
                                        <div className={`symbol-label fs-1 fw-bold bg-light-${color} text-${color}`}>{interacao?.responsavel?.substr(0, 1)}</div>
                                    </div>
                                    <div className="d-flex flex-column fw-semibold fs-5 text-gray-600 text-dark">
                                        <div className="d-flex align-items-center">
                                            <a href="../../demo52/dist/pages/user-profile/overview.html"
                                                className="text-gray-800 fw-bold text-hover-primary fs-5 me-3">{interacao?.responsavel}
                                            </a>
                                            <span className="m-0"></span>
                                        </div>
                                        <span className="text-muted fw-semibold fs-6">{interacao?.criada}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="fw-normal fs-5 text-gray-700 m-0">{interacao?.textoInteracao}</p>
                        </div>
                    </div>
                </div>
            </div>

        ))
    }
}

export { InteracoesCards }