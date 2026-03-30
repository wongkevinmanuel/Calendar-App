import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from './hooks'

export const useAuthStore = ()=>{
    const dispatch = useAppDispatch();
    const { status,user, errorMessage } = useAppSelector( state => state.auth);

    const startLogin = async({email, password}: {email: string; password: string}) =>{
        dispatch( onChecking() );
        try{
            const resp = await calendarApi.post(`/auth`,{email, password});
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            dispatch( onLogin({name: resp.data.name, email: resp.data.email}));

        }catch(error){
            
            console.log(error);
            dispatch( onLogout({error: 'Credenciales incorrectas'}) );
            setTimeout(()=>{
                dispatch( clearErrorMessage() );
            }, 10)
        }
    }

    interface registerUser {
        registerName:       string,
        registerEmail:      string,
        registerPassword:   string,
        registerPassword2:  string,
}
    const startRegisterUser = async( { registerName, registerEmail
        , registerPassword, registerPassword2 }:registerUser) =>{
        
            console.log('startRegisterUser');
            console.log({ registerName, registerEmail, registerPassword, registerPassword2 });
            dispatch( onChecking() );
            try{
                const resp = await calendarApi.post(`/auth/new`,{ name: registerName, email: registerEmail, password: registerPassword });
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('token-init-date' , new Date().getTime().toString() );
                dispatch( onLogin({name: resp.data.name, email: resp.data.email }));
            
            }catch(error: any){
                console.log(error);
                dispatch(onLogout( error.response.data?.msg ? 
                    {error: error.response.data.msg} :
                    {error: 'Error al registrar usuario'}));
                setTimeout(()=>{
                    dispatch( clearErrorMessage());
                })
            }
    }

    return {
        //*Propiedades
        status,
        user,
        errorMessage,
        //*Metodos
        startLogin,
        startRegisterUser
    }
}