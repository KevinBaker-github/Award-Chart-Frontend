import {
    Input,
    Typography,
} from "@material-tailwind/react";
import CenteredDialog from "./CenteredDialog";
import { useForm } from "react-hook-form";
import StandardButton from "./StandardButton";
import useAuthUser from "../hook/getUser";
import { useEffect } from "react";


/**
 * Award Chart Form: Equiped with create and edit capabilities, just by using the states following states
 * from the caller: 
 * setIsEdit(true/false);
 * setCurrentRecord(dataToBeEdited);
 * In this case, this form is only used for creating, since the editing functionality is made field by field.
 * @param {*} param0 
 * @returns 
 */
const AwardChartForm = ({dialogOpen, modalHandler, creationHandler, editionHandler, defaultData, isEdit}) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const userInfo = useAuthUser();

    useEffect(() => {
        if(isEdit){
            console.log('reseting use efffect');
            reset(defaultData);
        } else {
            reset({});
        }
    }, [defaultData]);

    /**
     * Custom Form data handler to apply additional business logic 
     * after form validation and send the form data back to the caller.
     * @param {*} data 
     */
    const handleFormSubmit = (data) => {
        data.updateUser = userInfo?.name;

        if (isEdit){ // Send data back to the caller
            console.log('before editing');
            handleResetForm();
            editionHandler(data);
        } else {
            handleResetForm();
            data.category = Number(data.category);
            creationHandler(data);
        }
    }

    /**
     * Reset the form and close modal
     */
    const handleResetForm = () => {
        console.log('reseting normal fform');
        reset({})
        modalHandler(); // Close modal
    }

    return (
        <>
            <CenteredDialog dialogOpen={dialogOpen}
                handleDialogOpen={handleResetForm}
                title={'Award Chart Item'}>
                <form onSubmit={handleSubmit(handleFormSubmit)} >
                    <div className="flex flex-col gap-3">
                        <Input label="Category" size="lg" color="black" 
                            type="text" {...register('category', {
                                required: true,
                                maxLength: 10
                            })} 
                            disabled={isEdit} />
                            {errors.category?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                            {errors.category?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
                        

                        <div>
                            <select id="Room Category" 
                                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-black
                                focus:border-black block w-full p-2.5"
                                {...register('roomCategory', {
                                    required: true
                                })}
                                disabled={isEdit} >
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>

                        <div>
                            <select id="pricingLevel" 
                                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-black
                                focus:border-black block w-full p-2.5"
                                {...register('pricingLevel', {
                                    required: true
                                })}
                                disabled={isEdit} >
                                <option value="RewardSaver">Reward Saver</option>
                                <option value="Standard">Standard</option>
                                <option value="BasePeak">Base Peak</option>
                                <option value="Premium">Premium</option>
                                <option value="PremiumPeak">Premium Peak</option>
                            </select>
                        </div>

                        <Input label="Points" size="lg" color="black"
                            type="text" {...register('points', {
                                required: true,
                                maxLength: 10
                            })} />
                            {errors.points?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                            {errors.points?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
                    </div>
                    <div className="flex pt-3 items-center justify-end">
                        <StandardButton message={'Confirm'} type={'submit'}/>
                    </div>
                </form>
            </CenteredDialog>
        </>
    )
}

export default AwardChartForm;