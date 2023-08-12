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
import AwardChartForm from "../components/AwardChartForm";
import ValueIndicator from "../components/ValueIndicator";
import * as AwardChartService from '../services/awardCharts/awardChartsService';
import { mapAwardChartsList } from '../utils/mappers/AwardChartsMappers';
import NotificationDialog from "../components/general/NotificationDialog";
import { manageAwardChartCreationError } from "../utils/helpers/awardChart/AwardChartsErrorsHelper";
import AwardChartsDataTable from "../components/general/AwardChartsDataTable";

const tableHeaders = ["Category", "Reward Saver", "Standard", "Base Peak", "Premium", "Premium Peak", "Options"];

const rowsPerPageList = [
	{
	  key: 1,
	  value: 3,
	},
	{
	  key: 2,
	  value: 4,
	},
	{
	  key: 3,
	  value: 5,
	},
];

// const searchableColumns = ["category"];

const searchableColumns = [
	{"level1": "category", "level2": ""},
	{"level1": "rewardSaver", "level2": "points"}
];


const AwardChart = ({isLoading, setIsLoading}) => {
	const [data, setData] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false); // Use if edit by modal
	const [currentRecord, setCurrentRecord] = useState({}); // Use if edit by modal
	const [displayMessage, setDisplayMessage] = useState('This is a message');
	const [notificationCategory, setNotificationCategory] = useState('success');
	const [notificationOpen, setNotificationOpen] = useState(false);
	const [dataError, setDataError] = useState(false);

  	const handleDialogOpen = () => setDialogOpen((currentState) => !currentState);
	const handleNotificationOpen = () => setNotificationOpen((currentState) => !currentState);

	useEffect(()=> {
		reloadTableData();
	}, [])

	const reloadTableData = () => {
		setIsLoading(true);
		AwardChartService.listAwardCharts()
		.then(res => {
			console.log(res.data);
			setData(mapAwardChartsList(res.data));
			setDataError(false);
			setIsLoading(false);
		})
		.catch(err => {
			setDataError(true);
			setIsLoading(false);
		})
	}

	const initCreateDialog = () => {
		setIsEdit(false);
		handleDialogOpen();
	}

	const initEditDialog = (data) => {
		setIsEdit(true);
		setCurrentRecord(data);
		handleDialogOpen();
	}

	const createSubmitionHandler = (data) => {
		setIsLoading(true);
		AwardChartService.createAwardChart(data)
		.then(res => {
			setDataError(false);
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
			setNotificationCategory('error');
			manageAwardChartCreationError(err, setNotificationOpen, setDisplayMessage);
			setDataError(true);
			setIsLoading(false);
		})
		resetValues();
	}

	const editSubmitionHandler = (data) => {
		setIsLoading(true);
		AwardChartService.editAwardChart(data)
		.then(res => {
			setDataError(false);
			reloadTableData();
		})
		.catch(err => {
			setDataError(true);
			setIsLoading(false);
		})
		resetValues();
	}

	const deleteHandler = (category) => {
		setIsLoading(true);
		AwardChartService.deleteAwardChart(category)
		.then(res => {
			setDataError(false);
			reloadTableData();
		})
		.catch(err => {
			setDataError(true);
			setIsLoading(false);
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
				isEdit={isEdit} defaultData={currentRecord} />
			<NotificationDialog title={''} description={displayMessage} dialogOpen={notificationOpen} 
				dialogHandler={handleNotificationOpen} notificationCategory={notificationCategory}/>
			
			{/* <CardContainer>
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
										{tableHeaders.map((head, index) => (
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
												<ValueIndicator value={rewardSaver.points} data={{category, ...rewardSaver}}
													clickHandler={initEditDialog} comparedValue={rewardSaver.points} 
													specialColor={'blue'} specialWord={rewardSaver.points === '' ? 'N/A' : rewardSaver.points} 
													isClickable={rewardSaver.points !== ''} />
											</td>

											<td className={classes}>
												<ValueIndicator value={standard.points} data={{category, ...standard}}
													clickHandler={initEditDialog} comparedValue={standard.points} 
													specialColor={'blue'} specialWord={standard.points === '' ? 'N/A' : standard.points} 
													isClickable={standard.points !== ''} />
											</td>

											<td className={classes}>
												<ValueIndicator value={basePeak.points} data={{category, ...basePeak}}
													clickHandler={initEditDialog} comparedValue={basePeak.points} 
													specialColor={'blue'} specialWord={basePeak.points === '' ? 'N/A' : basePeak.points} 
													isClickable={basePeak.points !== ''} />
											</td>
											
											<td className={classes}>
												<ValueIndicator value={premium.points} data={{category, ...premium}}
													clickHandler={initEditDialog} comparedValue={premium.points} 
													specialColor={'yellow'} specialWord={premium.points === '' ? 'N/A' : premium.points} 
													isClickable={premium.points !== ''} />
											</td>

											<td className={classes}>
												<ValueIndicator value={premiumPeak.points} data={{category, ...premiumPeak}}
													clickHandler={initEditDialog} comparedValue={premiumPeak.points} 
													specialColor={'yellow'} specialWord={premiumPeak.points === '' ? 'N/A' : premiumPeak.points}
													isClickable={premiumPeak.points !== ''} />
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
			</CardContainer> */}





			{/* PLAYGROUND */}
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
					<div className="flex w-[50%] justify-start gap-4">
						<Button variant="gradient" className="from-black to-blue-gray-900 hover:scale-105"
							onClick={initCreateDialog}>
							CREATE
						</Button>
					</div>

					<div className="w-full mt-8">
						<AwardChartsDataTable headers={tableHeaders} data={data} 
							isLoading={isLoading} searchableColumns={searchableColumns}
							rowsPerPageList={rowsPerPageList} dataError={dataError} 
							itemClickHandler={initEditDialog} deleteHandler={deleteHandler} />
					</div>

				</CardBody>
	
			</CardContainer>

		</FullScreen>
	);
};

export default AwardChart;