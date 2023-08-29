import {
    Input,
    Button,
    Typography,
    CardHeader,
    CardBody,
    Progress,
    Card,
    List,
    ListItem,
    Chip
} from "@material-tailwind/react";
import CardContainer from "../components/layout/CardContainer";
import FullScreen from "../components/layout/FullScreen";
import { useState } from "react";
import { FaFileCsv } from 'react-icons/fa';
import { useUploadForm } from "../hook/useUploadForm";
import { useForm } from "react-hook-form";
import { managePropertyConfigBulkError, managePropertyConfigBulkResponse,
    managePropertyConfigBulkRejected } 
    from '../utils/helpers/propertyConfig/PropertyConfigBulkErrorsHelpers';
import NotificationDialog from "../components/general/NotificationDialog";

/**
 * Property Config Bulk page.
 * @param {*} isLoading - if it is loading
 * @param {*} setIsLoading - to change the spinner loader
 * @returns 
 */
const PropertyConfigBulk = ({isLoading, setIsLoading}) => {
    const { isUploadSuccess, progress, isUploading, uploadForm} = useUploadForm('/imports/propertyConfig/csv/bulk');
    const {register, formState: {errors}, handleSubmit, reset, watch} = useForm({mode: "onChange"});
    const [bulkResults, setBulkResults] = useState({});
    const [successCount, setSuccessCount] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('This is a message');
    const [notificationCategory, setNotificationCategory] = useState('success');
    const [isReportReady, setIsReportReady] = useState(false);

    const handleNotificationOpen = () => setNotificationOpen((currentState) => !currentState);

    const uploadFileHandler = async (data) => {
        console.log('Uploading file');
        const formData = new FormData();
        formData.append('file', data.file[0]);
        return await uploadForm(formData);
    }

    const filteredSuccess = (statusList) => {
        return statusList.filter(item => {
            if(!item.error){
                return true;
            }
          return false;
        }).length;
    } 

    const filteredFail = (statusList) => {
        return statusList.filter(item => {
            if(item.error){
                return true;
            }
          return false;
        }).length;
    }

    const handleFormSubmit = (data) => {
        setIsReportReady(false);
        uploadFileHandler(data)
        .then(res => {
            console.log(res);
            reset({});

            if(res.code == 'ERR_NETWORK'){
                setNotificationCategory('error');
                managePropertyConfigBulkRejected(setNotificationOpen, setDisplayMessage);
                return
            }

            if(res?.status != 200){
                setNotificationCategory('error');
                managePropertyConfigBulkResponse(res, setNotificationOpen, setDisplayMessage);
                return
            }

            setBulkResults(res.data);
            setSuccessCount(filteredSuccess(res.data.recordStatus));// List of status
            setFailCount(filteredFail(res.data.recordStatus));// List of status
            setIsReportReady(true);
        })
        .catch(err => {
            console.log(err);
            reset({});
            setBulkResults({});
            setNotificationCategory('error');
            managePropertyConfigBulkError(err, setNotificationOpen, setDisplayMessage);
            setSuccessCount(0);
            setFailCount(0);

        });
    }

    const renderRecordErrors = (errors) => {
        console.log(errors);
        let result = "";
        if(errors.length == 0){
            result = 'Unexpected error!';
        } else {
            result = errors.join(', ');
        }

        return (
            result
        );
    }

	return (
		<FullScreen>
            <NotificationDialog title={''} description={displayMessage} dialogOpen={notificationOpen} 
				dialogHandler={handleNotificationOpen} notificationCategory={notificationCategory}/>
			<CardContainer>
				<CardHeader floated={false} shadow={false} className="rounded-none">
					<div className="flex flex-col items-start">
						<Typography variant="h4" color="blue-gray">
							Bulk Upload Utility
						</Typography>
						<Typography color="gray" className="mt-2 font-normal">
							Here you can upload bulk data through CSV files.
						</Typography>
					</div>
				</CardHeader>
	
				<CardBody className="px-4">
					<div className="flex flex-col w-full items-center justify-center mt-8 gap-8">
                        {/* File Uploader */}
                        <form onSubmit={handleSubmit(handleFormSubmit)} >
                            <div className="flex items-center justify-center gap-4">
                                <div>
                                    <Input variant="static" color={"black"} label="" placeholder="File Path" 
                                        className="cursor-pointer" type="file"
                                        {...register('file', {
                                            required: true,
                                            validate: {
                                                lessThan2MB: (files) => files[0]?.size < 2000000,
                                                acceptedFormats: (files) => ["text/csv"].includes(files[0]?.type)
                                            }
                                        })}  />
                                    {errors.file?.type === 'required' && <Typography variant="paragraph" color="red">The field is required</Typography>}
                                    {errors.file?.type === 'lessThan2MB' && <Typography variant="paragraph" color="red">Max file size: 2MB</Typography>}
                                    {errors.file?.type === 'acceptedFormats' && <Typography variant="paragraph" color="red">Only csv files are accepted</Typography>}
                                </div>
                                <div>
                                    <Button variant="gradient" type="submit" className="flex items-center gap-2 from-black to-blue-gray-900 hover:scale-105"
                                        disabled={isUploading || errors.file}>
                                        Upload
                                        <FaFileCsv size={22}/>
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* Spinner - Indicator */}
                        <div className="w-[40%]">
                            <Progress value={progress} label="Completed" color="yellow" />
                        </div>

                        {/* Results */}
                        { isReportReady && isUploadSuccess && (
                            <div className="flex items-center justify-center w-[70%]">
                                <Card className="w-full max-w-[38rem]">
                                    <CardHeader
                                        color="gray"
                                        floated={false}
                                        shadow={false}
                                        className="m-0 grid place-items-center rounded-b-none py-4 px-4 text-center bg-black" >
                                        <Typography variant="h4" color="white">
                                            Upload Results
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="flex flex-col gap-4 w-full">
                                            {/* Result section */}
                                            <Card className="w-full h-full max-h-[16rem]">
                                                <List className="overflow-y-scroll">
                                                    {bulkResults.recordStatus.map(({recordNumber, propertyConfig, messages, error}, index) => (
                                                        <ListItem key={index}>
                                                            <div className="flex gap-4">
                                                                Record {recordNumber}:
                                                                <Chip
                                                                    value={error ? 'NA' : propertyConfig.property}
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className={`rounded-full ${error ? 'bg-deep-orange-700' : 'bg-green-700'}`} />
                                                                    - {!error ? 'Success' : 'Errors: ' + renderRecordErrors(messages) }.
                                                            </div>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Card>

                                            {/* Stats */}
                                            <div className="flex flex-col gap-1">
                                                <Typography color="gray" className="font-normal">
                                                    <b>Total success records:</b> {successCount}
                                                </Typography>
                                                <Typography color="gray" className="font-normal">
                                                    <b>Total failed records:</b> {failCount}
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        )}
					</div>

				</CardBody>
	
			</CardContainer>

		</FullScreen>
	);
};

export default PropertyConfigBulk;