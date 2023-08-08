import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch( onChecking() );

    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch( onLogin({ name: data.name, uid: data.uid }) );
    } catch (error) {
      dispatch( onLogout('Usuario y Contraseña no son correctos') );
      
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
    }
  }

  const startRegister = async ({ name, email, password }) => {
    dispatch( onChecking() );

    try {
      const { data } = await calendarApi.post("/auth/new", { name, email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {
      if( error.response.data.errors ) {
        dispatch( onLogout( Object.values( error.response.data.errors )[0].msg ) );
      }
      else {
        dispatch( onLogout( error.response.data?.msg || 'Ocurrio un Error!' ) );
      }

      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    
    if( !token ) {
      return dispatch( onLogout() );
    }

    try {
      const { data } = await calendarApi.get("/auth/renew");
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {
      console.log({error});
      localStorage.clear();
      return dispatch( onLogout() );
    }
  }


  return {
    //* Properties
    status,
    user,
    errorMessage,
    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
  }
}