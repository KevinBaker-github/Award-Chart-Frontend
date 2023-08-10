import {
    Input,
    Typography,
    CardHeader,
    CardBody} from "@material-tailwind/react";
import CardContainer from "../components/CardContainer";
import FullScreen from "../components/FullScreen";
import { useState } from "react";
import StandardButton from "../components/StandardButton";
import { useForm } from "react-hook-form";
import useAuthUser from "../hook/getUser";
import * as calculationService from '../services/calculation/calculationService';
import IdleManagement from "../components/general/IdleManagement";

const Calculation = ({setIsLoading}) => {
	const [data, setData] = useState({})
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

		calculationService.calculate(data)
		.then(res => {
			console.log(res.data);
			setData(res.data);
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
					<div className="flex gap-20">
						
						<form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">

							<div className="flex flex-col items-center justify-center text-center gap-4">
							
								<Input type="text" size="lg" label="Category" color="black" {...register('category', {
									required: true,
									maxLength: 10,
									minLength: 1
								})} />
								{errors.category?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
								{errors.category?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
								{errors.category?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
								
								<Input type="text" size="lg"  label="Base or Premium" color="black" {...register('roomCategory', {
									required: true,
									maxLength: 10,
									minLength: 1
								})}  />
								{errors.roomCategory?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
								{errors.roomCategory?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
								{errors.roomCategory?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}

								<Input type="text" size="lg"  label="Forecast BAR" color="black" {...register('forecastedBar', {
									required: true,
									maxLength: 10,
									minLength: 1
								})}  />

								{errors.forecastedBar?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
								{errors.forecastedBar?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
								{errors.forecastedBar?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
								
								<Input type="text" size="lg"  label="Forecast Occupancy" color="black" {...register('forecastedOccupancy', {
									required: true,
									maxLength: 10,
									minLength: 1
								})}  />
								{errors.forecastedOccupancy?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
								{errors.forecastedOccupancy?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
								{errors.forecastedOccupancy?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
					
								<Input type="text" size="lg"  label="RewardSaver Occupancy Threshold" color="black" {...register('rewardSaverOccupancy', {
									required: true,
									maxLength: 10,
									minLength: 1
								})}  />
								{errors.rewardSaverOccupancy?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
								{errors.rewardSaverOccupancy?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
								{errors.rewardSaverOccupancy?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
				
								<Input type="text" size="lg"  label="Property Value" color="black" {...register('propertyValue', {
									required: true,
									maxLength: 10,
									minLength: 1
								})}  />
								{errors.propertyValue?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
								{errors.propertyValue?.type === 'maxLength' && <Typography variant="paragraph" color="red">The field length should be less than 10</Typography>}
								{errors.propertyValue?.type === 'minLength' && <Typography variant="paragraph" color="red">The field length should be more than 1</Typography>}
								
								<StandardButton message={'Calculate'} type={'submit'}/>
								
							</div>
						</form>

						<div className="flex flex-col gap-3 m-4">
							{
								data && (
									<>
										<Typography variant="h4" color="black">
											Calculation Result
										</Typography>
										<Typography variant="p" color="blue-gray">
											Pricing:  {data.pricing}
										</Typography>
										<Typography variant="p" color="blue-gray">
											Floating Point Level: {data.floatingPointLevel}
										</Typography>
										<Typography variant="p" color="blue-gray">
											Room Type: {data.roomType}
										</Typography>
										<Typography variant="p" color="blue-gray">
											Calculated Pricing Level: {data.calculatedPricingLevel}
										</Typography>
										<Typography variant="p" color="blue-gray">
											Floating Above Standard: {data.floatingAboveStandard}
										</Typography>
										<Typography variant="p" color="blue-gray">
											Occupancy Threshold Above: {data.occupancyThresholdAbove}
										</Typography>
										<Typography variant="p" color="blue-gray">
											Floating Above Base Peak: {data.floatingAboveBasePeak}
										</Typography>
									</>
								)
							}
							
							
						</div>
					</div>
					
				</CardBody>
			</CardContainer>
		</FullScreen>
	);
};

export default Calculation;