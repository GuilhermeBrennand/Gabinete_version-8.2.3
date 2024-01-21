import {FC} from 'react'

type Props = {
  status?: boolean
}

const UserTwoStepsCell: FC<Props> = ({status}) => (
  <> {status && <div className='badge badge-light-success fw-bolder'>Enabled</div>}</>
)

export {UserTwoStepsCell}
