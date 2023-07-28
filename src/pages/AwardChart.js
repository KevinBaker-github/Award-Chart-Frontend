import {
    Input,
    Button,
    Typography,
    Tooltip,
    IconButton,
    Card,
    CardFooter,
    CardHeader,
    CardBody
} from "@material-tailwind/react";
import CardContainer from "../components/CardContainer";
import FullScreen from "../components/FullScreen";
import { AiOutlineSearch, AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from "react";
import axios from "axios";
import AwardChartForm from "../components/AwardChartForm";
import EditAwardChartValue from "../components/EditAwardChartValue";
import useAuthUser from "../hook/getUser";

const TABLE_HEAD = ["Category", "Reward Saver", "Standard", "Base Peak", "Premium", "Premium Peak", "Options"];

const TABLE_ROWS = [
	{
		"category": 1,
		"roomCategories": [
			{
				"standard": [
					{
						"pricingLevel": "RewardSaver",
						"points": "1000"
					},
					{
						"pricingLevel": "Standard",
						"points": "1000"
					},
					{
						"pricingLevel": "BasePeak",
						"points": "1000"
					}
				]
			},
			{
				"premium": [
					{
						"pricingLevel": "Premium",
						"points": "1000"
					},
					{
						"pricingLevel": "PremiumPeak",
						"points": "1000"
					}
				]
			}
		]
	}
];

const AwardChart = () => {
	const userInfo = useAuthUser();
	const [data, setData] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false); // Use if edit by modal
	const [currentRecord, setCurrentRecord] = useState({}); // Use if edit by modal

  	const handleDialogOpen = () => setDialogOpen((currentState) => !currentState);

	useEffect(()=> {
		reloadTableData();
	}, [])

	const reloadTableData = () => {
		axios.get('http://localhost:8080/awardCharts')
		.then(res => {
			console.log(res.data)
			setData(mapData(res.data));
		})
		.catch(err => console.log(err))
	}

	const mapData = (data) => {
		let dataMapped = []

		for (let i = 0; i < data.length; i++) { // Categories
			let mapped = {}
			const currentNode = data[i]
			mapped['category'] = currentNode['category']

			if(currentNode['roomCategories'].length){ // Exists Room Categories

				// Standards
				let rewardSaver = {}
				rewardSaver['roomCategory'] = 'Standard'
				rewardSaver['pricingLevel'] = 'RewardSaver'
				rewardSaver['points'] = currentNode['roomCategories'][0]['standard'].length && currentNode['roomCategories'][0]['standard'][0] ? currentNode['roomCategories'][0]['standard'][0]['points'] : '0'
				mapped['rewardSaver'] = rewardSaver

				let standard = {}
				standard['roomCategory'] = 'Standard'
				standard['pricingLevel'] = 'Standard'
				standard['points'] = currentNode['roomCategories'][0]['standard'].length && currentNode['roomCategories'][0]['standard'][1] ? currentNode['roomCategories'][0]['standard'][1]['points'] : '0'
				mapped['standard'] = standard

				let basePeak = {}
				basePeak['roomCategory'] = 'Standard'
				basePeak['pricingLevel'] = 'BasePeak'
				basePeak['points'] = currentNode['roomCategories'][0]['standard'].length && currentNode['roomCategories'][0]['standard'][2] ? currentNode['roomCategories'][0]['standard'][2]['points'] : '0'
				mapped['basePeak'] = basePeak
				
				
				 // Premiums
				let premium = {}
				premium['roomCategory'] = 'Premium'
				premium['pricingLevel'] = 'Premium'
				premium['points'] = currentNode['roomCategories'][1]['premium'].length && currentNode['roomCategories'][1]['premium'][0] ? currentNode['roomCategories'][1]['premium'][0]['points'] : '0'
				mapped['premium'] = premium

				let premiumPeak = {}
				premiumPeak['roomCategory'] = 'Premium'
				premiumPeak['pricingLevel'] = 'PremiumPeak'
				premiumPeak['points'] = currentNode['roomCategories'][1]['premium'].length && currentNode['roomCategories'][1]['premium'][1] ? currentNode['roomCategories'][1]['premium'][1]['points'] : '0'
				mapped['premiumPeak'] = premiumPeak
			}
			
			dataMapped.push(mapped)
		}

		console.log(dataMapped);
		return dataMapped;
	}

	const initCreateDialog = () => {
		setIsEdit(false);
		handleDialogOpen();
	}

	const createSubmitionHandler = (data) => {
		console.log(data);
		axios.post('http://localhost:8080/awardCharts', data)
		.then(res => {
			console.log(res.data);
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
		resetValues();
	}

	const editSubmitionHandler = (category, body) => {
		axios.put('http://localhost:8080/awardCharts/' + category, body)
		.then(res => {
			console.log(res.data);
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
		resetValues();
	}

	const deleteHandler = (id) => {
		axios.delete('http://localhost:8080/awardCharts/' + id)
		.then(res => {
			console.log(res.data);
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
		resetValues();
	}

	const resetValues = () => {
		setIsEdit(false);
		setCurrentRecord({});
	}

	return (
		<FullScreen>
			<AwardChartForm dialogOpen={dialogOpen} modalHandler={handleDialogOpen} 
				creationHandler={createSubmitionHandler} editionHandler={editSubmitionHandler} 
				isEdit={isEdit} defaultData={currentRecord}/>
			<CardContainer>
				<CardHeader floated={false} shadow={false} className="rounded-none">
					<div className="flex flex-col items-start">
						<Typography variant="h4" color="blue-gray">
							Award Chart
						</Typography>
						<Typography color="gray" className="mt-2 font-normal">
							Here you can add new award charts for multiple categories.
						</Typography>
					</div>
				</CardHeader>
	
				<CardBody className="px-4">
					<div className="flex w-full justify-between gap-4 mt-4">
						<div className="flex flex-grow basis-0">
							<Input label="Search" color="black"
								icon={<AiOutlineSearch className="h-5 w-5 text-black" />} />
						</div>
						<Button variant="gradient" className="from-black to-blue-gray-900 hover:scale-105"
							onClick={initCreateDialog}>
							CREATE
						</Button>
					</div>
	
					<div className="w-full mt-3">
						<Card className="h-full w-full rounded-md shadow-md">
							<table className="w-full min-w-max table-auto text-left">
								<thead>
									<tr>
										<th colSpan="1"></th>
										<th colSpan="3" className="text-center border-blue-gray-600 bg-blue-gray-200 p-2 rounded-tl-md rounded-tr-md">Standard</th>
										<th colSpan="2" className="text-center border-blue-gray-600 bg-yellow-200 p-2 rounded-tl-md rounded-tr-md">Premium</th>
									</tr>
									<tr>
										{TABLE_HEAD.map((head, index) => (
											<th
											key={head}
											className="border-blue-gray-100 bg-blue-gray-100 p-4">
											<Typography
												variant="small"
												color="blue-gray"
												className="text-left font-bold leading-none opacity-70">
												{head}
											</Typography>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{data.map(({category, rewardSaver, standard, basePeak, premium, premiumPeak }, index) => {
									const isLast = index === data.length - 1;
									const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
						
									return (
										<tr key={index}>
											<td className={classes}>
												<Typography variant="small" color="blue-gray" className="font-normal">
													{category}
												</Typography>
											</td>

											<td className={classes}>
												<EditAwardChartValue
													editHandler={editSubmitionHandler}
													valueName={'Points'}
													data={{category, ...rewardSaver}} 
													userInfo={userInfo}>
														<Typography variant="small" color="blue-gray" 
															className="font-normal cursor-pointer">
															{rewardSaver.points}
														</Typography>
												</EditAwardChartValue>
											</td>

											<td className={classes}>
												<EditAwardChartValue
													editHandler={editSubmitionHandler}
													valueName={'Points'}
													data={{category, ...standard}} 
													userInfo={userInfo}>
														<Typography variant="small" color="blue-gray" 
															className="font-normal cursor-pointer">
															{standard.points}
														</Typography>
												</EditAwardChartValue>
											</td>

											<td className={classes}>
												<EditAwardChartValue 
													editHandler={editSubmitionHandler}
													valueName={'Points'}
													data={{category, ...basePeak}} 
													userInfo={userInfo}>
														<Typography variant="small" color="blue-gray" 
															className="font-normal cursor-pointer">
															{basePeak.points}
														</Typography>
												</EditAwardChartValue>
											</td>
											
											<td className={classes}>
												<EditAwardChartValue 
													editHandler={editSubmitionHandler}
													valueName={'Points'}
													data={{category, ...premium}} 
													userInfo={userInfo}>
														<Typography variant="small" color="blue-gray" 
															className="font-normal cursor-pointer">
															{premium.points}
														</Typography>
												</EditAwardChartValue>
											</td>

											<td className={classes}>
												<EditAwardChartValue 
													editHandler={editSubmitionHandler}
													valueName={'Points'}
													data={{category, ...premiumPeak}} 
													userInfo={userInfo}>
														<Typography variant="small" color="blue-gray" 
															className="font-normal cursor-pointer">
															{premiumPeak.points}
														</Typography>
												</EditAwardChartValue>
											</td>

											<td className={classes}>
												<Tooltip content="Delete">
													<IconButton variant="text" color="blue-gray" onClick={() => deleteHandler(category)}>
														<AiFillDelete className="h-4 w-4" />
													</IconButton>
												</Tooltip>
											</td>
										</tr>
									);
									})}
								</tbody>
							</table>
						</Card>
					</div>
				</CardBody>
	
				<CardFooter className="flex items-end justify-between p-4">
					<Typography variant="small" color="blue-gray" className="font-normal">
					Page 1 of 10
					</Typography>
					<div className="flex gap-2">
					<Button variant="outlined" color="blue-gray" size="sm">
						Previous
					</Button>
					<Button variant="outlined" color="blue-gray" size="sm">
						Next
					</Button>
					</div>
				</CardFooter>
			</CardContainer>
		</FullScreen>
	);
};

export default AwardChart;