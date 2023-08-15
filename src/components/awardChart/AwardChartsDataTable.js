import { Typography, Tooltip, IconButton, Card } from "@material-tailwind/react";
import { AiFillDelete } from 'react-icons/ai'
import StandardPagination from "../general/StandardPagination";
import { useEffect, useRef, useState } from "react";
import ValueIndicator from "../general/ValueIndicator";
import StandardDropdown from "../general/StandardDropdown";
import StandardSearchInput from "../general/StandardSearchInput";


/**
 * Data table for award charts page.
 * @param {*} headers - header list as json
 * @param {*} data - data list as json
 * @param {*} isLoading - boolean to indicate if it is loading
 * @param {*} searchableColumns - list of searchable columns in the column
 * @param {*} rowsPerPageList - list of elements for the rows per page dropdown
 * @param {*} dataError - data error from the caller
 * @param {*} itemClickHandler - handler for the item's click
 * @param {*} deleteHandler - handler for the delete button
 * @returns 
 */
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

    const handleRowsPerPageChange = (option) => {
        setCurrentPage(1);
        setRowsPerPage(option.value);
    };

    const handleSearch = (targetEvent) => {
      setCurrentPage(1);
      setSearchTerm(targetEvent.value.trim());
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
            <div className="bg-red-500 rounded-bl-md rounded-br-md">
              <Typography variant="small" color="blue-gray" className="font-bold py-2 text-center">
                Error loading data!
              </Typography>
            </div>
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
            const isLast = index === currentRows.length - 1;
            const classes = isLast ? "px-4" : "px-4 border-b border-blue-gray-300";
          
            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal text-center">
                    {category}
                  </Typography>
                </td>

                <td className={classes}>
                  <div className="flex items-center justify-center">
                    <ValueIndicator value={rewardSaver.points} data={{category, ...rewardSaver}}
                      clickHandler={itemClickHandler} comparedValue={rewardSaver.points} 
                      specialColor={'blue'} specialWord={rewardSaver.points === '' ? 'N/A' : rewardSaver.points} 
                      isClickable={rewardSaver.points !== ''} />
                  </div>
                </td>

                <td className={classes}>
                  <div className="flex items-center justify-center">
                    <ValueIndicator value={standard.points} data={{category, ...standard}}
                      clickHandler={itemClickHandler} comparedValue={standard.points} 
                      specialColor={'blue'} specialWord={standard.points === '' ? 'N/A' : standard.points} 
                      isClickable={standard.points !== ''} />
                  </div>
                </td>

                <td className={classes}>
                  <div className="flex items-center justify-center">
                    <ValueIndicator value={basePeak.points} data={{category, ...basePeak}}
                      clickHandler={itemClickHandler} comparedValue={basePeak.points} 
                      specialColor={'blue'} specialWord={basePeak.points === '' ? 'N/A' : basePeak.points} 
                      isClickable={basePeak.points !== ''} />
                  </div>
                </td>
                
                <td className={classes}>
                  <div className="flex items-center justify-center">
                    <ValueIndicator value={premium.points} data={{category, ...premium}}
                      clickHandler={itemClickHandler} comparedValue={premium.points} 
                      specialColor={'yellow'} specialWord={premium.points === '' ? 'N/A' : premium.points} 
                      isClickable={premium.points !== ''} />
                  </div>
                </td>

                <td className={classes}>
                  <div className="flex items-center justify-center">
                    <ValueIndicator value={premiumPeak.points} data={{category, ...premiumPeak}}
                      clickHandler={itemClickHandler} comparedValue={premiumPeak.points} 
                      specialColor={'yellow'} specialWord={premiumPeak.points === '' ? 'N/A' : premiumPeak.points}
                      isClickable={premiumPeak.points !== ''} />
                  </div>
                </td>

                <td className={classes}>
                  <div className="flex items-center justify-center">
                    <Tooltip content="Delete">
                      <IconButton variant="text" color="blue-gray" onClick={() => deleteHandler(category)}>
                        <AiFillDelete className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </div>
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
          <div className="bg-yellow-900 rounded-bl-md rounded-br-md">
            <Typography variant="small" color="blue-gray" className="font-bold py-2 text-center">
              No results!
            </Typography>
          </div>
        </td>
      </tr>
    );
  };


  return (
    <div className="flex w-full flex-col justify-between gap-4 mt-4">
      {/* Pages size and search section */}
      <div className="flex w-full justify-between">
          {/* Rows per page */}
          <div>
            <StandardDropdown 
              options={rowsPerPageList}
              setSelected={handleRowsPerPageChange}
              defaultOption={rowsPerPageList[0].key}
              disabled={dataError}
            />
          </div>
          {/* Search */}
          <div className="flex w-[50%]">
            <StandardSearchInput placeholder={'Search...'} dataError={dataError}
              reference={searchInput} searchHandler={handleSearch}
            />
          </div>
      </div>

      {/* Table section */}
      
      <Card className="h-full w-full rounded-md shadow-xl">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th colSpan="1"></th>
              <th colSpan="3" className="text-center border-blue-gray-600 bg-blue-gray-600 py-2 text-black rounded-tl-md rounded-tr-md">Standard</th>
              <th colSpan="2" className="text-center border-blue-gray-600 bg-yellow-800 text-black py-2 rounded-tl-md rounded-tr-md">Premium</th>
            </tr>
            <tr>
              {headers.map((head, index) => (
                <th
                  key={head}
                  className="border-blue-gray-900 bg-gray-900 px-4 py-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-center font-bold leading-none text-white">
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