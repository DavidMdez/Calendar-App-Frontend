import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { ShowPassword } from '../components/ShowPassword';

import googleUrl from '../../img/icons/google.png';
// import githubUrl from '../../img/icons/github.png';
import './LoginPage.css';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordConfirm: '',
}

export const LoginPage = () => {

  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerPasswordConfirm, onInputChange:onRegisterInputChange } = useForm(registerFormFields);

  const [selectRegister, setSelectRegister] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  
  const [remenber, setRemenber] = useState(false);

  const onSelectRegister = () => {
    if (selectRegister) return;

    document.getElementById('switch').checked = true;
    setSelectRegister(true);
  }

  const onSelectLogin = () => {
    if (!selectRegister) return;

    document.getElementById('switch').checked = false;
    setSelectRegister(false);
  }

  const onCheck = () => {
    setRemenber(!remenber)
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword }); 
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    if(registerPassword !== registerPasswordConfirm) {
      Swal.fire({
        title: 'Error!',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    startRegister({ name: registerName, email: registerEmail, password: registerPassword });
  }

  useEffect(() => {
    if (errorMessage !== undefined ) {
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }, [errorMessage])


  return (
    <div className='bg-dark px-4 screen-style'>
      <div className="container login-container">
        <div className="row" style={{ position: 'relative' }}>
          <div className="col-md-6 login-form-1 bg-white">
            <h3>Ingreso</h3>
            <form onSubmit={loginSubmit}>
              <div className="mb-3">
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                  autoComplete="email"
                  type='email'
                  InputLabelProps={{
                    style: { backgroundColor: "#fff", paddingRight: '6px', paddingLeft: '6px', borderRadius: '4px', },
                  }}
                />
              </div>

              <div className="form-group mb-2 position-relative">
                <TextField
                  type={showPasswordLogin ? 'text' : 'password'}
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  autoComplete="current-password"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  inputProps={{
                    style: { paddingRight: '2.625rem' }
                  }}
                  InputLabelProps={{
                    style: { backgroundColor: "#fff", paddingRight: '6px', paddingLeft: '6px', borderRadius: '4px', },
                  }}
                />
                <ShowPassword show={showPasswordLogin} setShow={setShowPasswordLogin} />
              </div>

              <div className='d-flex mb-3' style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div className='d-flex align-items-center'>
                  <div onClick={onCheck}>
                    { remenber
                      ? <CheckBoxIcon style={{ cursor: 'pointer' }} className='d-flex align-items-center mr-1' color='dark' />
                      : <CheckBoxOutlineBlankIcon style={{ cursor: 'pointer' }} className='d-flex align-items-center mr-1' color='dark' />
                    }
                  </div>

                  <span className='label-key'>Recordar</span>
                  <div className='icon-key'>
                    <VpnKeyIcon/>
                  </div>
                </div>
                
                <span className='label-underlined d-flex align-items-center' style={{ textDecoration: 'underline', cursor: 'pointer' }}>Recuperar contraseña</span>
              </div>

              <div className="form-group mb-2">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Iniciar sesión"
                />
              </div>

              <div className="form-group mb-2">
                <div
                  className="btn-google d-flex align-items-center"
                >
                  <img src={googleUrl} alt="google" width={'20px'}/>
                  <span className='d-flex align-items-center justify-content-center' style={{ flexWrap: 'wrap', width: '100%' }}>Continuar con Google</span>
                </div>
              </div>

              {/* <div className="form-group mb-3">
                <div
                  className="btn-github d-flex align-items-center bg-dark"
                >
                  <img src={githubUrl} alt="github" width={'20px'}/>
                  <span className='d-flex align-items-center justify-content-center' style={{ flexWrap: 'wrap', width: '100%' }}> Continuar con Github</span>
                </div>
              </div> */}
              
              <div className='text-dark d-flex' style={{ justifyContent: 'center', flexWrap: 'wrap' }} >
                No tienes una cuenta?
                <span
                  className='ml-2 label-underlined'
                  style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}
                  onClick={onSelectRegister}
                >
                  Registrarse
                </span>
              </div>
            </form>
          </div>

          <input type="checkbox" id="switch" className='switch' style={{ display: 'none' }} />

          <div className='img-contain'>
            <div className='img-calendar' />
          </div>

          <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={registerSubmit}>
              <div className="form-group mb-3">
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  name="registerName"
                  autoComplete="username"
                  value={registerName}
                  onChange={onRegisterInputChange}
                  InputLabelProps={{
                    style: { backgroundColor: "#fff", paddingRight: '6px', paddingLeft: '6px', borderRadius: '4px', },
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="registerEmail"
                  type='email'
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                  autoComplete="email"
                  InputLabelProps={{
                    style: { backgroundColor: "#fff", paddingRight: '6px', paddingLeft: '6px', borderRadius: '4px', },
                  }}
                />
              </div>
              <div className="form-group mb-3 position-relative">
                <TextField
                  type={showPasswordRegister ? 'text' : 'password'}
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                  autoComplete="new-password"
                  InputLabelProps={{
                    style: { backgroundColor: "#fff", paddingRight: '6px', paddingLeft: '6px', borderRadius: '4px', },
                  }}
                />
                <ShowPassword show={showPasswordRegister} setShow={setShowPasswordRegister} />
              </div>

              <div className="form-group mb-3 position-relative">
                <TextField
                  type={showPasswordConfirm ? 'text' : 'password'}
                  label="Confirme la contraseña"
                  variant="outlined"
                  fullWidth
                  name="registerPasswordConfirm"
                  value={registerPasswordConfirm}
                  onChange={onRegisterInputChange}
                  autoComplete="new-password"
                  InputLabelProps={{
                    style: { backgroundColor: "#fff", paddingRight: '6px', paddingLeft: '6px', borderRadius: '4px', },
                  }}
                  // color='white'
                  // inputProps={{
                  //   style: { backgroundColor: 'white', borderRadius: '5px', paddingRight: '2.625rem' }
                  // }}
                  // InputLabelProps={{
                  //   className: 'label-white'
                  // }}
                />
                <ShowPassword show={showPasswordConfirm} setShow={setShowPasswordConfirm} />
              </div>

              <div className="form-group mb-3">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Crear cuenta"
                />
              </div>

              <div className='text-dark d-flex' style={{ justifyContent: 'center', flexWrap: 'wrap' }} >
                Tienes una cuenta?
                <span
                  className='ml-2 label-underlined'
                  style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}
                  onClick={onSelectLogin}
                >
                  Iniciar sesión
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
