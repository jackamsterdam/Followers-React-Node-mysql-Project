import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import "./AddVacation.css";
import { Typography, TextField, Button } from '@mui/material/'
import SendIcon from '@mui/icons-material/Send';
import authService from "../../../../Services/AuthService";


function AddVacation(): JSX.Element {

    const [minFromDate, setMinFromDate] = useState(new Date().toISOString().split('T')[0])
    const [minToDate, setMinToDate] = useState(new Date().toISOString().split('T')[0])

    const { register, handleSubmit, formState, setFocus } = useForm<VacationModel>()
    const navigate = useNavigate()

    useEffect(() => {
        setFocus('destination')
    }, [setFocus])

    function changeMinFromDate(e: SyntheticEvent) {
        const fromSelectedDateValue = (e.target as HTMLInputElement).value;
        if (fromSelectedDateValue === '') return
        const selectedDate = new Date(fromSelectedDateValue);
        const dayAfterTommorow = new Date(selectedDate.getTime() + 86400000).toISOString().split('T')[0];

        setMinToDate(dayAfterTommorow)
    }

    async function submit(vacation: VacationModel): Promise<void> {

        try {

            await vacationsService.addVacation(vacation)
            notify.success('Vacation has been added.')
            navigate('/admin/home')

        } catch (err: any) {
            if (err.response.status === 401) {
                authService.logout()
                navigate('/login')
            } else {
                notify.error(err)
            }
        }
    }


    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(submit)} noValidate>

                <TextField label="Destination" variant="filled" className="TextBox" type="text" {...register('destination', {
                    required: { value: true, message: "Missing destination" },
                    minLength: { value: 2, message: "Destination length is too short" },
                    maxLength: { value: 100, message: "Destination length is too long" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.destination?.message}</Typography>

                <TextField label="Description" variant="filled" className="TextBox" type="text" {...register('description', {
                    required: { value: true, message: "Missing description" },
                    minLength: { value: 2, message: "Description length is too short" },
                    maxLength: { value: 1000, message: "Description length is too long" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.description?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true }} label="From" variant="filled" className="TextBox" type="date" inputProps={{ min: minFromDate }} {...register('fromDate', {
                    onChange: changeMinFromDate,
                    required: { value: true, message: "Missing date" }
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.fromDate?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true }} label="To" variant="filled" className="TextBox" type="date" inputProps={{ min: minToDate, format: "YYYY/MM/DD" }}  {...register('toDate', {
                    required: { value: true, message: "Missing date" },
                    min: { value: minToDate, message: "Date can't be before previous date" }
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.toDate?.message}</Typography>

                <TextField inputProps={{ step: 0.01 }} label="Price" type="number" variant="filled" className="TextBox"  {...register('price', {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 100000, message: "Price can't exceed 100,000" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.price?.message}</Typography>

                <TextField label="Star" type="number" variant="filled" className="TextBox" inputProps={{ max: 5, min: 1 }} {...register('star', {
                    required: { value: true, message: "Missing stars" },
                    min: { value: 0, message: "Star count can't be negative" },
                    max: { value: 5, message: "Stars can't exceed 5" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.star?.message}</Typography>

                <label className='ImageUploader'>Image:</label>
                <input type="file" accept="image/*" className="TextBox" {...register('image', {
                    required: { value: true, message: 'Missing photo' }
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.image?.message}</Typography>

                <Button endIcon={<SendIcon />} fullWidth color="primary" variant="contained" type="submit">Add</Button>
            </form>
        </div>
    );
}

export default AddVacation;

