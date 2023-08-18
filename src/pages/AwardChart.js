import {
    Button,
    Typography,
    CardHeader,
    CardBody
} from "@material-tailwind/react";
import CardContainer from "../components/layout/CardContainer";
import FullScreen from "../components/layout/FullScreen";
import { TfiReload } from 'react-icons/tfi'
import { FaFileCsv, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { useEffect, useRef, useState } from "react";
import AwardChartForm from "../components/awardChart/AwardChartForm";
import * as AwardChartService from '../services/awardCharts/awardChartsService';
import { mapAwardChartsList } from '../utils/mappers/AwardChartsMappers';
import NotificationDialog from "../components/general/NotificationDialog";
import { manageAwardChartCreationError } from "../utils/helpers/awardChart/AwardChartsErrorsHelper";
import AwardChartsDataTable from "../components/awardChart/AwardChartsDataTable";

const tableHeaders = ["Category", "Reward Saver", "Standard", "Base Peak", "Premium", "Premium Peak", "Options"];

const rowsPerPageList = [
	{
	  key: 1,
	  value: 2,
	},
	{
	  key: 2,
	  value: 3,
	},
	{
	  key: 3,
	  value: 4,
	},
	{
	  key: 4,
	  value: 5,
	},
	{
	  key: 5,
	  value: 10,
	},
];

const searchableColumns = [
	{"level1": "category", "level2": ""},
	{"level1": "rewardSaver", "level2": "points"},
	{"level1": "standard", "level2": "points"},
	{"level1": "basePeak", "level2": "points"},
	{"level1": "premium", "level2": "points"},
	{"level1": "premiumPeak", "level2": "points"}
];

/**
 * Award charts page.
 * @param {*} isLoading - if it is loading
 * @param {*} setIsLoading - to change the spinner loader
 * @returns 
 */
const AwardChart = ({isLoading, setIsLoading}) => {
	const [data, setData] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false); // Use if edit by modal
	const [currentRecord, setCurrentRecord] = useState({}); // Use if edit by modal
	const [displayMessage, setDisplayMessage] = useState('This is a message');
	const [notificationCategory, setNotificationCategory] = useState('success');
	const [notificationOpen, setNotificationOpen] = useState(false);
	const [dataError, setDataError] = useState(false);
	const dataTableRef = useRef();

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

	const initExport = (type) => {
		dataTableRef.current.exportAsFile(type);
	}

	const exportHandler = (type, currentRows) => {
		let categoryList = [];
		currentRows.map(item => categoryList.push(item.category))
		const data = {"categories": categoryList}

		if(type === 'excel'){
			AwardChartService.exportAwardChartCsv(data);
		} else {
			//TODO: Implement
		}
	}

	return (
		<FullScreen>
			<AwardChartForm dialogOpen={dialogOpen} modalHandler={handleDialogOpen} 
				creationHandler={createSubmitionHandler} editionHandler={editSubmitionHandler} 
				isEdit={isEdit} defaultData={currentRecord} />
			<NotificationDialog title={''} description={displayMessage} dialogOpen={notificationOpen} 
				dialogHandler={handleNotificationOpen} notificationCategory={notificationCategory}/>
			
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
							onClick={initCreateDialog} disabled={dataError ? true : false}>
							CREATE
						</Button>
						<Button variant="gradient" className="flex items-center gap-2 from-black to-blue-gray-900 hover:scale-105"
							onClick={reloadTableData}>
							RELOAD
							<TfiReload/>
						</Button>
						<Button variant="gradient" className="flex items-center gap-2 from-black to-blue-gray-900 hover:scale-105"
							onClick={() => initExport('excel')} disabled={dataError ? true : false}>
							EXCEL
							<FaFileExcel size={22}/>
						</Button>
						<Button variant="gradient" className="flex items-center gap-2 from-black to-blue-gray-900 hover:scale-105"
							onClick={() => initExport('pdf')} disabled={dataError ? true : false}>
							PDF
							<FaFilePdf size={22}/>
						</Button>
					</div>

					<div className="w-full mt-8">
						<AwardChartsDataTable headers={tableHeaders} data={data} 
							isLoading={isLoading} searchableColumns={searchableColumns}
							rowsPerPageList={rowsPerPageList} dataError={dataError} 
							itemClickHandler={initEditDialog} deleteHandler={deleteHandler}
							exportHandler={exportHandler} ref={dataTableRef} />
					</div>

				</CardBody>
	
			</CardContainer>

		</FullScreen>
	);
};

export default AwardChart;