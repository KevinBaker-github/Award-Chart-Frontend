import { Select, Option, Input, Alert, Typography, Tooltip, IconButton, Card } from "@material-tailwind/react";
import { AiOutlineSearch, AiFillDelete } from 'react-icons/ai'
import StandardPagination from "./StandardPagination";
import { useEffect, useRef, useState } from "react";
import ValueIndicator from "../ValueIndicator";

const AwardChartsDataTable = ({
    headers,
    data,
    isLoading,
    searchableColumns,
    rowsPerPageList,
    dataError,
    itemClickHandler,
    deleteHandler
    }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageList[0].value);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalRows, setTotalRows] = useState(0);
    const [currentRows, setCurrentRows] = useState([]);
    const searchInput = useRef();

    useEffect(() => {
        const filteredTotalRows = () => {
            return data.filter(item => {
              for (var searchableColumn of searchableColumns) {
                if(searchableColumn.level1 !== '' && searchableColumn.level2 !== ''){
                  if(item[`${searchableColumn.level1}`][`${searchableColumn.level2}`].toString().includes(searchTerm)){
                    return true;
                  }
                } else {
                  if(item[`${searchableColumn.level1}`].toString().includes(searchTerm)){
                    return true;
                  }
                }
              }
              return false;
            }).length;
        }
          
      
        const filteredCurrentRows = (indexOfLastRow, indexOfFirstRow) => {
            return data.filter(item => {
                for (var searchableColumn of searchableColumns) {
                  if(searchableColumn.level1 !== '' && searchableColumn.level2 !== ''){
                    if(item[`${searchableColumn.level1}`][`${searchableColumn.level2}`].toString().includes(searchTerm)){
                      return true;
                    }
                  } else {
                    if(item[`${searchableColumn.level1}`].toString().includes(searchTerm)){
                      return true;
                    }
                  }
                }
                return false;
            })
            .slice(indexOfFirstRow, indexOfLastRow);
        }
      
        // Only if it is not loading and it has no error, all parameters will be calculated
        if(!isLoading && !dataError) {
            console.log('NO HAY ERROR');
            const indexOfLastRow = currentPage * rowsPerPage;
            const indexOfFirstRow = indexOfLastRow - rowsPerPage;
            setTotalRows(filteredTotalRows());
            setCurrentRows(filteredCurrentRows(indexOfLastRow, indexOfFirstRow));
        } else if(!isLoading && dataError) {
            console.log('HAY UN ERROR');//TODO: Delete
        }
    }, [data, currentPage, rowsPerPage, searchTerm, isLoading, dataError])
    

    const paginationHandler = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowsPerPageChange = (option) => { //TODO: Pending...
        setCurrentPage(1);
        setRowsPerPage(option.value);
    };

    const handleClickSearch = (e) => {
      e.preventDefault();
      setCurrentPage(1);
      setSearchTerm(searchInput.current.value);
    };

    const handleSearch = (searchValue) => {
      setCurrentPage(1);
      setSearchTerm(searchValue);
    };
    
    const validateData = () => {
        return (
          <>
            {dataError
              ? renderDataError()
              : validateRenderTableBody()}
          </>
        );
    };

    const renderDataError = () => {
      return (
        <tr key={0}>
          <td colSpan={headers.length + 1}>
              <Alert color="amber">Error loading data!</Alert>
          </td>
        </tr>
      );
    };

    const validateRenderTableBody = () => {
      return (
        <>
          {currentRows.length > 0
            ? renderTableWithResults()
            : renderTableNoResults()}
        </>
      );
    };
    
    const renderTableWithResults = () => {
      return (
        <>
          {currentRows.map( ({category, rewardSaver, standard, basePeak, premium, premiumPeak }, index) => {
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
                    clickHandler={itemClickHandler} comparedValue={rewardSaver.points} 
                    specialColor={'blue'} specialWord={rewardSaver.points === '' ? 'N/A' : rewardSaver.points} 
                    isClickable={rewardSaver.points !== ''} />
                </td>

                <td className={classes}>
                  <ValueIndicator value={standard.points} data={{category, ...standard}}
                    clickHandler={itemClickHandler} comparedValue={standard.points} 
                    specialColor={'blue'} specialWord={standard.points === '' ? 'N/A' : standard.points} 
                    isClickable={standard.points !== ''} />
                </td>

                <td className={classes}>
                  <ValueIndicator value={basePeak.points} data={{category, ...basePeak}}
                    clickHandler={itemClickHandler} comparedValue={basePeak.points} 
                    specialColor={'blue'} specialWord={basePeak.points === '' ? 'N/A' : basePeak.points} 
                    isClickable={basePeak.points !== ''} />
                </td>
                
                <td className={classes}>
                  <ValueIndicator value={premium.points} data={{category, ...premium}}
                    clickHandler={itemClickHandler} comparedValue={premium.points} 
                    specialColor={'yellow'} specialWord={premium.points === '' ? 'N/A' : premium.points} 
                    isClickable={premium.points !== ''} />
                </td>

                <td className={classes}>
                  <ValueIndicator value={premiumPeak.points} data={{category, ...premiumPeak}}
                    clickHandler={itemClickHandler} comparedValue={premiumPeak.points} 
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
        </>
      );
    };
    
  const renderTableNoResults = () => {
    return (
      <tr>
        <td colSpan={headers.length + 1}>
          <Alert color="amber">No results!</Alert>
        </td>
      </tr>
    );
  };


  return (
    <div className="flex w-full flex-col justify-between gap-4 mt-4">
      {/* Pages size and search section */}
      <div className="flex w-full justify-between">
          <div>
              <Select color="blue-gray" label="Rows per page" size="md" onChange={(e) => handleRowsPerPageChange(e.target)}>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
              </Select>
          </div>
          <div className="flex w-[50%]">
              <Input label="Search" color="black" ref={searchInput} onChange={(e) => handleSearch(e.target.value)}
                icon={<AiOutlineSearch className="h-5 w-5 text-black cursor-pointer hover:scale-125" 
                  onClick={handleClickSearch} />} />
          </div>
      </div>

      {/* Table section */}
      
      <Card className="h-full w-full rounded-md shadow-md">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th colSpan="1"></th>
              <th colSpan="3" className="text-center border-blue-gray-600 bg-blue-gray-200 p-2 rounded-tl-md rounded-tr-md">Standard</th>
              <th colSpan="2" className="text-center border-blue-gray-600 bg-yellow-200 p-2 rounded-tl-md rounded-tr-md">Premium</th>
            </tr>
            <tr>
              {headers.map((head, index) => (
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
            {!isLoading && validateData() }
          </tbody>

        </table>
      </Card>

      {/* Pagination section */}
      <div className="flex items-center">
          <StandardPagination totalItems={totalRows} itemsPerPage={rowsPerPage} 
              paginationHandler={paginationHandler} selected={currentPage} />
      </div>
    
    </div>
  )
}

export default AwardChartsDataTable;