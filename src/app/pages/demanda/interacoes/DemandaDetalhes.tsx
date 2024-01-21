
import * as Yup from 'yup';
import { Demanda } from "../../../modules/apps/user-management/users-list/core/_models";

type Props = {
    className?: string
    isLoading?: boolean
    demanda?: Demanda
    children: React.ReactNode;
}

const DemandaDetalhes: React.FC<Props> = ({ className, demanda, children }) => {
    return (
        <div className={`card ${className}`}>
            <div className='card-header align-items-center border-0 mt-4'>
                <div className='card-body'>
                    <div className='row mb-7'>
                        <div className="mb-9">
                            <div className="card card-bordered w-100 mb-9" id="interacaoForm">
                                <div className="card-body">
                                    <div className="d-flex flex-column">
                                        <h1 className="text-gray-800 fw-semibold">{demanda ? demanda.titulo : ""}</h1>
                                        <div className="mb-10">
                                            <span className="fw-semibold text-muted me-6">
                                                Categoria:&nbsp;
                                                <a href="#" className="text-muted text-hover-primary">
                                                    {demanda ? demanda.titulo : ""}
                                                </a>
                                            </span>
                                            <span className="fw-semibold text-muted me-6">
                                                Demandante:&nbsp;
                                                <a href="#" className="text-muted text-hover-primary">
                                                    {demanda ? demanda.demandante : ""}
                                                </a>
                                            </span>
                                            <span className="fw-semibold text-muted">
                                                Criada:&nbsp;
                                                <span className="fw-bold text-gray-600 me-1">
                                                    {demanda ? demanda.criada : ""}
                                                </span>
                                            </span>
                                        </div>
                                        <p>
                                            {demanda ? demanda.descricao : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { DemandaDetalhes }