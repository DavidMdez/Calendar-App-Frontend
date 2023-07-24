import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export const ShowPassword = ({ show, setShow }) => {
  return (
    show
      ? <VisibilityOutlinedIcon
        className='position-absolute'
        style={{ right: '15px', top: '30%', cursor: 'pointer' }}
        onClick={() => setShow(!show)}
      />
      : <VisibilityOffOutlinedIcon
        className='position-absolute'
        style={{ right: '15px', top: '30%', cursor: 'pointer' }}
        onClick={() => setShow(!show)}
      />
  )
}