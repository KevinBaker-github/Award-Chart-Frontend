import { IconButton } from "@material-tailwind/react";


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
                    key={number}
                    variant={`${selected === number ? "outlined" : "text"}`}
                    onClick={() => {
                        paginationHandler(number);
                    }} >
                    {number}
                </IconButton>
            ))}

            
            {/* <IconButton variant="outlined" size="sm">
                1
            </IconButton>
            <IconButton variant="text" size="sm">
                2
            </IconButton>
            <IconButton variant="text" size="sm">
                3
            </IconButton>
            <IconButton variant="text" size="sm">
                ...
            </IconButton>
            <IconButton variant="text" size="sm">
                8
            </IconButton> */}
        </div>
    )
}



export default StandardPagination;