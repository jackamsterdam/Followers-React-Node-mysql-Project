import { useNavigate, NavLink  } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import "./Login.css";
import { useForm } from 'react-hook-form'
import notify from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import store from "../../../Redux/Store";
import {useEffect} from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { Send } from "@material-ui/icons";

function Login(): JSX.Element {

    const { register, handleSubmit, formState, setFocus } = useForm<CredentialsModel>()
    const navigate = useNavigate()
    // const textBoxRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>()



useEffect(() => {
    setFocus("username");
  }, [setFocus]);

async function submit(credentials: CredentialsModel): Promise<void> {
        // console.log("credentials", credentials);
        try {
            await authService.login(credentials)
          

            //Check if user role in token is admin and if so navigate to admins portal
            if(store.getState().authState.user.roleId === 2) {
                navigate('/admin/home')
                return
            }
            // console.log("store.getState().authState.user.roleId", store.getState().authState.user.roleId);

            notify.success('You are now logged-in!')
            
            //if user.roleId = 1 -regular user than navigate to home
            navigate('/home')
            
            
        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="Login Box">
            {/* <input type="text" ref={textBoxRef}/> */}
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Typography variant="h4">Login</Typography>
<br />

                <TextField className="TextBox" variant="outlined" label="Username" type="text" {...register('username', {
                    required: {value: true, message: "Missing username"},
                    minLength: {value: 2, message: "Username must be more than 2 characters"},
                    maxLength: {value: 100, message: "Username must not exceed 100 characters"}

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.username?.message}</Typography>

                <TextField label="Password" variant="outlined" className="TextBox" type="text" {...register('password', {
                    required: {value: true, message: 'Missing password'},
                    minLength: {value: 2, message: "Password must be more than 2 characters"},
                    maxLength: {value: 100, message: "Password must not exceed 100 characters"}
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.password?.message}</Typography>


                <Button endIcon={<Send/>} type="submit" variant="contained" fullWidth color="primary">Login</Button>

                <p>New user? <NavLink to='/register'>Register</NavLink></p>
                {/* <button onClick={() => navigate('/register')}>Register</button> */}
            </form>
        </div>
    );
}

export default Login;


// old: 

// <div className="Login Box">
// {/* <input type="text" ref={textBoxRef}/> */}
// <form onSubmit={handleSubmit(submit)}>
//     <h1>Login</h1>


//     <label>Username:</label>
//     <input type="text" {...register('username', {
//         required: {value: true, message: "Missing username"},
//         minLength: {value: 2, message: "Username must be more than 2 characters"},
//         maxLength: {value: 100, message: "Username must not exceed 100 characters"}

//     })} />
//     <span>{formState.errors?.username?.message}</span>

//     <label>Password:</label>
//     <input type="text" {...register('password', {
//         required: {value: true, message: 'Missing password'},
//         minLength: {value: 2, message: "Password must be more than 2 characters"},
//         maxLength: {value: 100, message: "Password must not exceed 100 characters"}
//     })} />
//     <span>{formState.errors?.password?.message}</span>


//     <button>Login</button>
//     <p>New user? <NavLink to='/register'>Register</NavLink></p>
//     {/* <button onClick={() => navigate('/register')}>Register</button> */}
// </form>
// </div>