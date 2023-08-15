import { IconButton } from "@material-tailwind/react";


/**
 * Standard pagination
 * @param {*} itemsPerPage - number of items per page
 * @param {*} totalItems - total items
 * @param {*} paginationHandler - in case of a click
 * @param {*} selected - indicates which is the current selected element.
 * @returns 
 */
const StandardPagination = ({
    itemsPerPage,
    totalItems,
    paginationHandler,
    selected
  }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center gap-2 ">
            { pageNumbers.length > 0 && 
                pageNumbers.map((number) => (
                <IconButton
                    color="blue-gray"
                    key={number}
                    variant={`${selected === number ? "outlined" : "text"}`}
                    onClick={() => {
                        paginationHandler(number);
                    }} >
                    {number}
                </IconButton>
            ))}
        </div>
    )
}



export default StandardPagination;