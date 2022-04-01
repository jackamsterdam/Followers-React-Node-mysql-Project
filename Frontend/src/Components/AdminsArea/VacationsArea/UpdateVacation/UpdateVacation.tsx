import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {

    const params = useParams()
    // console.log("params", params);
    const vacationId = +params.vacationId

    const { register, handleSubmit, formState, setFocus, setValue } = useForm<VacationModel>()
    const navigate = useNavigate()

    useEffect(() => {
        setFocus('destination')
    }, [setFocus])


    useEffect(() => {

        (async function () {
            try {
                const vacation = await vacationsService.getOneVacation(vacationId)
                // console.log("vacation", vacation);
                // console.log(vacation.fromDate)
                // console.log(vacation.toDate)

                setValue('destination', vacation.destination)
                setValue('description', vacation.description)
                setValue('fromDate', vacation.fromDate.slice(0,10))
                // setValue('fromDate', vacation.fromDate.slice(0,19).replace('T', ' '))
                setValue('toDate', vacation.toDate.slice(0,10))
                setValue('price', vacation.price)
            } catch (err: any) {
                notify.error(err)
            }

        })()


    }, [])

    async function submit(vacation: VacationModel) {

        try {
            vacation.vacationId = vacationId
           
            await vacationsService.updateVacation(vacation)
            notify.success('Vacation updated')
            navigate('/admin/home')
        }
        catch (err: any) {
            notify.error(err)
        }

    }




    return (
        <div className="UpdateVacation Box">
			<form onSubmit={handleSubmit(submit)}>
                <h1>Edit Vacation</h1>

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

                <button>Update</button>
            </form>
        </div>
    );
}

export default UpdateVacation;
