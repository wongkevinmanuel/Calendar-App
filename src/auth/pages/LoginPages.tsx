import { useForm } from '../../hookscust/useForm'
import './LoginPages.css'

const loginInitialForm = {
    loginEmail:     '',
    loginPassword:  '',
}

const registerInitialForm = {
    registerName:       '',
    registerEmail:      '',
    registerPassword:   '',
    registerPassword2:  '',
}

const loginFormValidations = {
    loginEmail:      [ ( value: string) => value.includes(`@`), 'El correo debe tener una @'],
    loginPassword:   [ (value: string) => value.length >= 6, `La contraseña debe tener al menos 6 caracteres`],

}

//TODO: REALIZAR VALIDACIONES DE REGISTER USER
const registerFormValidations = {
    registerName:   '',
    registerEmail:  '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPages = () => {
    //Login
    const {formState, onInputChange, isFormValid, formValidation} = useForm(loginInitialForm,loginFormValidations);
    
    //TODO: REALIZAR VALIDACIONES DE REGISTER USER
    //Register
    const {formState : registerFormState
        , onInputChange : onRegisterInputChange , 
        isFormValid: isRegisterFormValid
    } = useForm(registerInitialForm);

    //login
    const {loginEmail, loginPassword } = formState;
    const {loginEmailValid, loginPasswordValid } = formValidation;

    //Register
    const {
        registerName        ,
        registerEmail       ,      
        registerPassword    ,   
        registerPassword2   ,  
    } = registerFormState;
    //TODO: REALIZAR VALIDACIONES DE REGISTER USER

    const loginHandleSumit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //!isFormValid

        if(isFormValid) {
            console.log(formState);
        }
    }

    const RegisterHandleSumit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Registro');
        console.log(registerFormState)
    }

  return(
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginHandleSumit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"

                                name='loginEmail'
                                value={loginEmail}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"

                                name='loginPassword'
                                value={loginPassword}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={RegisterHandleSumit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"

                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="loginEmail"
                                className="form-control"
                                placeholder="Correo"

                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="loginPassword"
                                className="form-control"
                                placeholder="Contraseña" 

                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="loginPassword"
                                className="form-control"
                                placeholder="Repita la contraseña"

                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
