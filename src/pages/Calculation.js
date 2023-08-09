import {
    Input,
    Typography,
    CardHeader,
    CardBody} from "@material-tailwind/react";
import CardContainer from "../components/CardContainer";
import FullScreen from "../components/FullScreen";
import { useState } from "react";
import StandardButton from "../components/StandardButton";
import axiosConfig from '../services/axiosConfig';
import { useForm } from "react-hook-form";
import useAuthUser from "../hook/getUser";



const Calculation = ({setIsLoading}) => {
	const { register, formState: { errors }, handleSubmit, reset } = useForm();
	const userInfo = useAuthUser();

	// const [post, setPost] = useState({
	// 	title: '',
	// 	body: ''
	// })
	// const handleInput = (event) =>{
	// 	setPost({...post, [event.tartget.name]: event.target.event})
	// }
	// function handleSubmit(event){
	// 	event.preventDefault()
	// 	axios.post('http://localhost:8080/awardCharts/dynamicPricing', {post})
	// 	.then(response => console.log(response))
	// 	.catch(err => console.log(err))
	// }

	const handleFormSubmit = (data) => {
		setIsLoading(true);

		data.category = Number(data.category);
		data.forecastedBar = Number(data.forecastedBar);
		data.forecastedOccupancy = Number(data.forecastedOccupancy);
		data.rewardSaverOccupancy = Number(data.rewardSaverOccupancy);
		data.propertyValue = Number(data.propertyValue);

		axiosConfig.post('http://localhost:8080/awardCharts/dynamicPricing', data)
		.then(res => {
			console.log(res);
			reset({});
			setIsLoading(false);
			//TODO: SHOW RESPONSE
		})
		.catch(err => {
			console.log(err);
			setIsLoading(false);
            //TODO: USE THE ERROR HANDLING
		})
    }

	return (
		<FullScreen>

			<CardContainer>
				<CardHeader floated={false} shadow={false} className="rounded-none">
					<div className="flex flex-col items-start">
						<Typography variant="h4" color="blue-gray">
							Calculation
						</Typography>
						<Typography color="gray" className="mt-2 font-normal">
							Here you can calculate dynamic pricing
						</Typography>
					</div>
				</CardHeader>
	
				<CardBody className="px-4">
					<form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
						
						<Input type="text" size="lg" label="Category" {...register('category', {
							required: true,
							maxLength: 10,
							minLength: 1
						})} />
						{errors.category?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                        {errors.category?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
						{errors.category?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
						
						<Input type="text" size="lg"  label="Base or Premium" {...register('roomCategory', {
							required: true,
							maxLength: 10,
							minLength: 1
						})}  />
						{errors.roomCategory?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                        {errors.roomCategory?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
						{errors.roomCategory?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
						
						<Input type="text" size="lg"  label="Forecast BAR" {...register('forecastedBar', {
							required: true,
							maxLength: 10,
							minLength: 1
						})}  />
						{errors.forecastedBar?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                        {errors.forecastedBar?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
						{errors.forecastedBar?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
						
						<Input type="text" size="lg"  label="Forecast Occupancy" {...register('forecastedOccupancy', {
							required: true,
							maxLength: 10,
							minLength: 1
						})}  />
						{errors.forecastedOccupancy?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                        {errors.forecastedOccupancy?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
						{errors.forecastedOccupancy?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
						
						<Input type="text" size="lg"  label="RewardSaver Occupancy Threshold"{...register('rewardSaverOccupancy', {
							required: true,
							maxLength: 10,
							minLength: 1
						})}  />
						{errors.rewardSaverOccupancy?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                        {errors.rewardSaverOccupancy?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
						{errors.rewardSaverOccupancy?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
						
						<Input type="text" size="lg"  label="Property Value"{...register('propertyValue', {
							required: true,
							maxLength: 10,
							minLength: 1
						})}  />
						{errors.propertyValue?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                        {errors.propertyValue?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
						{errors.propertyValue?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
						
						<StandardButton message={'Calculate'} type={'submit'}/>
					</form>
				</CardBody>
	
			</CardContainer>
		</FullScreen>
	);
};

export default Calculation;