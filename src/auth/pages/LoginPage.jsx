import { useState } from 'react';
import TextField from '@mui/material/TextField';

import './LoginPage.css';

export const LoginPage = () => {

  const [selectRegister, setSelectRegister] = useState(false);

  const onSelectRegister = () => {
    if(selectRegister) return;

    document.getElementById('switch').checked = true;
    setSelectRegister(true);
  }

  const onSelectLogin = () => {
    if(!selectRegister) return;

    document.getElementById('switch').checked = false;
    setSelectRegister(false);
  }

  return (
    <div className='bg-dark px-4 screen-style'>
      <div className="container login-container">
        <div className="row" style={{ position: 'relative' }}>
          <div className="col-md-6 login-form-1 bg-white">
            <h3>Ingreso</h3>
            <form>
              <div className="mb-3">
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  name="email"
                  autoComplete="username"
                  InputLabelProps={{
                    style: { backgroundColor: "#fff", paddingRight: '6px', paddingLeft: '6px', borderRadius: '4px', },
                  }}
                />
              </div>

              <div className="form-group mb-3">
                <TextField
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  autoComplete="current-password"
                  name="password"
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Iniciar sesión"
                />
              </div>

              <div className='text-dark d-flex' style={{ justifyContent: 'center', flexWrap: 'wrap' }} >
                No tienes una cuenta?
                <span
                  className='ml-2 label-register'
                  style={{ textDecoration: 'underline', cursor: 'pointer', userSelect: 'none' }}
                  onClick={onSelectRegister}
                >
                  Registrarse
                </span>
              </div>
            </form>
          </div>

          <input type="checkbox" id="switch" className='switch' style={{ display: 'none' }}/>

          <div className='img-contain'>
            <div className='img-calendar'/>
          </div>

          <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form>
              <div className="form-group mb-3">
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  name="name"
                  color='white'
                  inputProps={{
                    style: { backgroundColor: 'white', borderRadius: '5px' },
                  }}
                  InputLabelProps={{
                    className: 'label-white'
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  autoComplete="email"
                  color='white'
                  inputProps={{
                    style: { backgroundColor: 'white', borderRadius: '5px' }
                  }}
                  InputLabelProps={{
                    className: 'label-white'
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <TextField
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  name="password"
                  color='white'
                  inputProps={{
                    style: { backgroundColor: 'white', borderRadius: '5px' }
                  }}
                  InputLabelProps={{
                    className: 'label-white'
                  }}
                />
              </div>

              <div className="form-group mb-3">
                <TextField
                  type="password"
                  label="Confirme la contraseña"
                  variant="outlined"
                  fullWidth
                  name="passworConfirm"
                  color='white'
                  inputProps={{
                    style: { backgroundColor: 'white', borderRadius: '5px' }
                  }}
                  InputLabelProps={{
                    className: 'label-white'
                  }}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="submit"
                  className="btnSubmit btn-blur"
                  value="Crear cuenta"
                />
              </div>

              <div className='text-white d-flex' style={{ justifyContent: 'center', flexWrap: 'wrap' }} >
                Tienes una cuenta?
                <span
                  className='ml-2 label-login'
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
