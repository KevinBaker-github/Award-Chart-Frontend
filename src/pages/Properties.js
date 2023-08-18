import {
    Button,
    Typography,
    CardHeader,
    CardBody
} from "@material-tailwind/react";
import CardContainer from "../components/layout/CardContainer";
import FullScreen from "../components/layout/FullScreen";
import { TfiReload } from 'react-icons/tfi'
import { FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { useEffect, useState } from "react";
import PropertiesDataTable from "../components/properties/PropertiesDataTable";


const tableHeaders = ["Id", "Processed date", "Forecast date", "Standard rate", "Premium rate"];

const rowsPerPageList = [
	{
	  key: 1,
	  value: 1,
	},
	{
	  key: 2,
	  value: 2,
	},
	{
	  key: 3,
	  value: 3,
	},
	{
	  key: 4,
	  value: 4,
	},
	{
	  key: 5,
	  value: 5,
	},
];

const searchableColumns = [
	{"level1": "column1", "level2": ""},
	{"level1": "column2", "level2": "key"},
	{"level1": "column3", "level2": "key"}
];

const tableData = [
    {
        "column1": 1,
        "column2": [
            {
                "key": "15 aug 2023"
            }
        ],
        "column3": [
            {
                "key": "16 aug 2023"
            }
        ],
        "column4": [
            {
                "key": "1000"
            }
        ],
        "column5": [
            {
                "key": "4000"
            },
            {
                "key": "1000"
            },
            {
                "key": "1000"
            }
        ]
    },
    {
        "column1": 2,
        "column2": [
            {
                "key": "16 aug 2023"
            }
        ],
        "column3": [
            {
                "key": "17 aug 2023"
            }
        ],
        "column4": [
            {
                "key": "3000"
            },
            {
                "key": "2000"
            },
            {
                "key": "1000"
            }
        ],
        "column5": [
            {
                "key": "4000"
            }
        ]
    },
    {
        "column1": 3,
        "column2": [
            {
                "key": "15 aug 2023"
            }
        ],
        "column3": [
            {
                "key": "16 aug 2023"
            }
        ],
        "column4": [
            {
                "key": "8000"
            },
            {
                "key": "4000"
            },
            {
                "key": "2000"
            }
        ],
        "column5": [
            {
                "key": "7000"
            },
            {
                "key": "3000"
            },
            {
                "key": "1000"
            }
        ]
    },
]

/**
 * Properties page.
 * @param {*} isLoading - if it is loading
 * @param {*} setIsLoading - to change the spinner loader
 * @returns 
 */
const Properties = ({isLoading, setIsLoading}) => {
	const [data, setData] = useState([])
	const [dataError, setDataError] = useState(false);

	useEffect(()=> {
		reloadTableData();
	}, [])

	const reloadTableData = () => {//TODO: Fix this
        setIsLoading(true);
        setData(tableData);
        setIsLoading(false);
	}

	const generateCsvHandler = () => {
		console.log('Generating CSV file....');
	}

	return (
		<FullScreen>	
			<CardContainer>
				<CardHeader floated={false} shadow={false} className="rounded-none">
					<div className="flex flex-col items-start">
						<Typography variant="h4" color="blue-gray">
							Properties
						</Typography>
						<Typography color="gray" className="mt-2 font-normal">
							Here you can list multiple properties.
						</Typography>
					</div>
				</CardHeader>
	
				<CardBody className="px-4">
					<div className="flex w-[50%] justify-start gap-4">
						<Button variant="gradient" className="flex items-center gap-2 from-black to-blue-gray-900 hover:scale-105"
							onClick={reloadTableData}>
							RELOAD
							<TfiReload/>
						</Button>
						<Button variant="gradient" className="flex items-center gap-2 from-black to-blue-gray-900 hover:scale-105"
							onClick={generateCsvHandler} disabled={dataError ? true : false}>
							CSV
							<FaFileCsv size={22}/>
						</Button>
						<Button variant="gradient" className="flex items-center gap-2 from-black to-blue-gray-900 hover:scale-105"
							onClick={generateCsvHandler} disabled={dataError ? true : false}>
							PDF
							<FaFilePdf size={22}/>
						</Button>
					</div>

					<div className="w-full mt-8">
						<PropertiesDataTable headers={tableHeaders} data={data} 
							isLoading={isLoading} searchableColumns={searchableColumns}
							rowsPerPageList={rowsPerPageList} dataError={dataError} />
					</div>

				</CardBody>
	
			</CardContainer>

		</FullScreen>
	);
};

export default Properties;