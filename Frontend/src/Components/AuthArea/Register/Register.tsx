// import { Button, TextField, Typography } from "@material-ui/core";
import {Typography, TextField, Button} from '@mui/material/'
// import { Send } from "@material-ui/icons";
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

   const {register, handleSubmit, formState, setFocus} = useForm<UserModel>()
   const navigate = useNavigate() 

   useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

async function submit(user: UserModel):Promise<void> {
//  console.log("user", user);
 try {
     await authService.register(user)
     notify.success('You are now registered!')
     navigate('/home')
 } catch (err: any) {
     notify.error(err)
 }
 
}

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(submit)} noValidate>

                <TextField label="First Name" variant="filled" className="TextBox" type="text" {...register('firstName', {
                    required: {value: true, message: "Missing first name"},
                    minLength: {value: 2, message: "First Name must be more than 2 characters" },
                    maxLength: {value: 100, message: "First Name must not exceed 100 characters" }
                })}/>
                <Typography component="span" className="ErrorMsg">{formState.errors?.firstName?.message}</Typography>

                <TextField label="Last Name" variant="filled" className="TextBox"  type="text" {...register('lastName', {
                    required: {value: true, message: "Missing last name"},
                    minLength: {value: 2, message: "Last Name must be more than 2 characters" },
                    maxLength: {value: 100, message: "Last Name must not exceed 100 characters" }
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.lastName?.message}</Typography>

                <TextField label="Username" variant="filled" className="TextBox"  type="text" {...register('username', {
                    required: {value: true, message: "Missing username"},
                    minLength: {value: 2, message: "Username must be more than 2 characters" },
                    maxLength: {value: 100, message: "Username must not exceed 100 characters" }
                })}/>
                <Typography component="span" className="ErrorMsg">{formState.errors?.username?.message}</Typography>

                <TextField label="Password" variant="filled" className="TextBox"  type="text" {...register('password', {
                    required: {value: true, message: "Missing password"},
                    minLength: {value: 2, message: "Password must be more than 2 characters" },
                    maxLength: {value: 100, message: "Password must not exceed 100 characters" }
                })}/>
                <Typography component="span" className="ErrorMsg">{formState.errors?.password?.message}</Typography>

                <Button type="submit" endIcon={<SendIcon/>} fullWidth color="primary" variant="contained" >Register</Button>

                <Typography className='LoginText'>Have an account already? <NavLink to="/login">Log in</NavLink></Typography>
            </form>
			
        </div>
    );
}

export default Register;
