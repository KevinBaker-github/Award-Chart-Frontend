import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Input,
    Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import StandardButton from "./StandardButton";

/**
 * Edit Award Chart Value: Used to update a single value (Points). Contains its own form and 
 * validations. It is meant to appear just down the value to be updated.
 * @param {*} param0 
 * @returns 
 */
const EditAwardChartValue = ({editHandler, valueName, data, userInfo, children}) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    
    useEffect(() => {
        reset({'points': data.points});
    }, [data]);

    const calculateTime = () => { //TODO: Delete
        var d = new Date();
        d = new Date(d.getTime() - 3000000);
        return d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    }

    const handleFormSubmit = (formData) => {
        data.updateUser = userInfo?.name;
        data.updateDatetime = calculateTime(); //TODO: Delete
        data['points'] =  formData.points ? formData.points : "0";
        editHandler(data.category, data);
    }

    return (
        <Popover placement="bottom">
            <PopoverHandler>
                {children}
            </PopoverHandler>
            <PopoverContent className="w-22">
                <form onSubmit={handleSubmit(handleFormSubmit)} >
                    <div className="flex flex-col gap-2">
                        <Input label={valueName} type="text"
                            color="black" {...register('points', {
                                maxLength: 10
                            })}/>
                        {errors.points?.type === 'maxLength' && <Typography variant="paragraph" color="red">Max 10 chatacters allowed</Typography>}
                        <StandardButton message={'Confirm'} type={'submit'}/>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default EditAwardChartValue;