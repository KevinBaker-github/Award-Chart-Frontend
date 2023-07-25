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
import { AiFillEdit, AiOutlineSearch, AiFillDelete } from 'react-icons/ai'
import ValueIndicator from "../components/ValueIndicator";
import { useEffect, useState } from "react";
import axios from "axios";
import AwardChartForm from "../components/AwardChartForm";

const TABLE_HEAD = ["Category", "Room Category", "Pricing Level", "Points", "UpdateUser", "UpdateDatetime", "Options"];


const AwardChart = () => {
	const [data, setData] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [currentRecord, setCurrentRecord] = useState({});
  	const handleDialogOpen = () => setDialogOpen((currentState) => !currentState);

	useEffect(()=> {
		reloadTableData();
	}, [])
	
	const tableValueClickHandler = (identifier) => {
		console.log('Category Id: ' + identifier);
	}

	const reloadTableData = () => {
		axios.get('http://localhost:8080/awardCharts')
		.then(res => {
			console.log(res.data)
			setData(res.data)
		})
		.catch(err => console.log(err))
	}

	const initCreateDialog = () => {
		setIsEdit(false);
		handleDialogOpen();
	}

	const initEditDialog = (id) => {
		// Load record
		axios.get('http://localhost:8080/awardCharts/' + id)
		.then(res => {
			console.log(res.data);
			setIsEdit(true);
			setCurrentRecord(res.data);
			handleDialogOpen();
		})
		.catch(err => {
			console.log(err);
		})
	}


	const createSubmitionHandler = (data) => {
		console.log('Data: ' + data);
		//Submit data to REST API
		axios.post('http://localhost:8080/awardCharts', data)
		.then(res => {
			console.log(res.data);
			resetValues();
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
		resetValues();
	}

	const editSubmitionHandler = (id, body) => {
		axios.put('http://localhost:8080/awardCharts/' + id, body)
		.then(res => {
			console.log(res.data);
			resetValues();
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
	}

	const deleteHandler = (id) => {
		axios.delete('http://localhost:8080/awardCharts/' + id)
		.then(res => {
			console.log(res.data);
			resetValues();
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
	}

	const resetValues = () => {
		console.log('final reset...');
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
										{TABLE_HEAD.map((head, index) => (
											<th
											key={head}
											className="border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
									{data.map(({id, category, roomCategory, pricingLevel, points, updateDatetime, updateUser }, index) => {
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
												<ValueIndicator value={roomCategory} rowIdentifier={id} 
													clickHandler={tableValueClickHandler} comparedValue={'Premium'} 
													specialColor={'yellow'} specialWord={'PREMIUM'} />
											</td>

											<td className={classes}>
												<Typography variant="small" color="blue-gray" className="font-normal">
													{pricingLevel}
												</Typography>
											</td>
											<td className={classes}>
												<Typography variant="small" color="blue-gray" className="font-normal">
													{points}
												</Typography>
											</td>
											<td className={classes}>
												<Typography variant="small" color="blue-gray" className="font-normal">
													{updateDatetime}
												</Typography>
											</td>
											<td className={classes}>
												<Typography variant="small" color="blue-gray" className="font-normal">
													{updateUser}
												</Typography>
											</td>

											<td className={classes}>
												<Tooltip content="Edit">
													<IconButton variant="text" color="blue-gray" onClick={() => initEditDialog(id)}>
														<AiFillEdit className="h-4 w-4" />
													</IconButton>
												</Tooltip>
												<Tooltip content="Delete">
													<IconButton variant="text" color="blue-gray" onClick={() => deleteHandler(id)}>
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