import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import "./AddVacation.css";
import {Typography, TextField, Button, Fab} from '@material-ui/core'
import {Send} from '@material-ui/icons'

function AddVacation(): JSX.Element {


    const {register, handleSubmit, formState, setFocus} = useForm<VacationModel>()
  const navigate = useNavigate()

  useEffect(() => {
    setFocus('destination')
  },[setFocus])


async function submit(vacation:VacationModel):Promise<void>{
    // console.log("vacation", vacation);

    try {
        await vacationsService.addVacation(vacation)
        notify.success('Vacation has been added.')
        navigate('/admin/home')
    } catch (err: any) {
        notify.error(err)
    }

}


    return (
        //!!!!!!!!!!!!!!!! https://mui.com/components/pickers/
        <div className="AddVacation Box">
			<form onSubmit={handleSubmit(submit)} noValidate>
                <Typography variant="h4">Add Vacation</Typography>
                <br />

                <TextField label="Destination" variant="outlined" className="TextBox" type="text" {...register('destination', {
                    required: {value: true, message: "Missing destination"},
                    minLength: {value: 2, message: "Destination length is too short"},
                    maxLength: {value: 100, message: "Destination length is too long"}

                })} />
                {/*! variant="caption"  or component span??  */}
                <Typography component="span" className="ErrorMsg">{formState.errors?.destination?.message}</Typography>

                <TextField label="Description" variant="outlined" className="TextBox" type="text" {...register('description', {
                    required: {value: true, message: "Missing description"},
                    minLength: {value: 2, message: "Description length is too short"},
                    maxLength: {value: 1000, message: "Description length is too long"}

                })} />
                <Typography  component="span" className="ErrorMsg">{formState.errors?.description?.message}</Typography>

                <TextField   InputLabelProps={{ shrink: true}} label="From" variant="outlined" className="TextBox" type="date" {...register('fromDate', {
                    required: {value: true, message: "Missing date"}
                })} />
                <Typography  component="span" className="ErrorMsg">{formState.errors?.fromDate?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true}} label="To" variant="outlined" className="TextBox"  type="date" {...register('toDate', {
                    required: {value: true, message: "Missing date"}
                })} />
                <Typography  component="span" className="ErrorMsg">{formState.errors?.toDate?.message}</Typography>

                {/* step={0.01} */}
                <TextField inputProps={{ step: 0.01 }} label="Price" type="number" variant="outlined"  className="TextBox" {...register('price', {
                    required: {value: true, message: "Missing price"},
                    min: {value: 0, message: "Price can't be negative"},
                    max: {value: 100000, message: "Price can't exceed 100,000"}

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.price?.message}</Typography>




{/* **************************************************************************************************** */}
                <label>Image:</label>
                <input type="file" accept="image/*" className="TextBox" {...register('image', {
                    required: {value: true, message: 'Missing photo'}
                })} />
                <Typography  component="span" className="ErrorMsg">{formState.errors?.image?.message}</Typography>

{/* cannot read properties of undefined reading item  */}
                {/* <br />
                    <br />
                    <br />


                <label htmlFor="upload-photo">

                   
                    <input
                        // style={{ display: 'none' }}
                        accept="image/*"
                        id="upload-photo"
                        // name="upload-photo"
                        type="file"
                        hidden
                    />

                    <Button color="secondary" variant="contained" component="span">
                        Upload Image
                    </Button>
                    </label> */}

{/* **************************************************************************************************** */}

      

                <Button endIcon={<Send/>} fullWidth color="primary" variant="contained" type="submit">Add</Button>
            </form>
        </div>
    );
}

export default AddVacation;


// original: without material ui: 

{/* <div className="AddVacation Box">
<form onSubmit={handleSubmit(submit)}>
    <h1>Add Vacation</h1>

    <label>Destination:</label>
    <input type="text" {...register('destination', {
        required: {value: true, message: "Missing destination"},
        minLength: {value: 2, message: "Destination length is too short"},
        maxLength: {value: 100, message: "Destination length is too long"}

    })} />
    <span>{formState.errors?.destination?.message}</span>

    <label>Description:</label>
    <input type="text" {...register('description', {
        required: {value: true, message: "Missing description"},
        minLength: {value: 2, message: "Description length is too short"},
        maxLength: {value: 1000, message: "Description length is too long"}

    })} />
    <span>{formState.errors?.description?.message}</span>

    <label>From:</label>
    <input type="date" {...register('fromDate', {
        required: {value: true, message: "Missing date"}
    })} />
    <span>{formState.errors?.fromDate?.message}</span>

    <label>To:</label>
    <input type="date" {...register('toDate', {
        required: {value: true, message: "Missing date"}
    })} />
    <span>{formState.errors?.toDate?.message}</span>

    <label>Price:</label>
    <input type="number" step={0.01} {...register('price', {
        required: {value: true, message: "Missing price"},
        min: {value: 0, message: "Price can't be negative"},
        max: {value: 100000, message: "Price can't exceed 100,000"}

    })} />
    <span>{formState.errors?.price?.message}</span>

    <label>Image:</label>
    <input type="file" accept="image/*" {...register('image', {
        required: {value: true, message: 'Missing photo'}
    })} />
    <span>{formState.errors?.image?.message}</span>

    <button>Add</button>
</form>
</div> */}