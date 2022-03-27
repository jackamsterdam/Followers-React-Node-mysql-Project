import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import "./Login.css";
import { useForm } from 'react-hook-form'
import notify from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
// import { RefObject, useRef } from "react";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>()
    const navigate = useNavigate()
//     const textBoxRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>()

// function focusa() {
//     textBoxRef.current.focus()
// }
// focusa()

async function submit(credentials: CredentialsModel): Promise<void> {
        console.log("credentials", credentials);
        try {
            await authService.login(credentials)
            notify.success('You are now logged-in!')
            navigate('/home')
            
            
        } catch (err: any) {
            notify.error(err)
        }
    }




    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(submit)}>
                <h1>Login</h1>


                <label>Username:</label>
                <input type="text" {...register('username', {
                    required: {value: true, message: "Missing username"},
                    minLength: {value: 2, message: "Username must be more than 2 characters"},
                    maxLength: {value: 100, message: "Username must not exceed 100 characters"}

                })} />
                <span>{formState.errors?.username?.message}</span>

                <label>Password:</label>
                <input type="text" {...register('password', {
                    required: {value: true, message: 'Missing password'},
                    minLength: {value: 2, message: "Password must be more than 2 characters"},
                    maxLength: {value: 100, message: "Password must not exceed 100 characters"}
                })} />
                <span>{formState.errors?.password?.message}</span>


                <button>Login</button>
                <p>New user? <NavLink to='/register'>Register</NavLink></p>
                {/* <button onClick={() => navigate('/register')}>Register</button> */}
            </form>
        </div>
    );
}

export default Login;
