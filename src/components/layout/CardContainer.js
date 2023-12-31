import {
    Card
} from "@material-tailwind/react";

/**
 * General card container.
 * @param {*} children 
 * @returns 
 */
const CardContainer = ({children}) => {

    return (
        <Card className="w-full mx-6 mt-6 mb-auto shadow-md shadow-gray-800">
            {children}
        </Card>
    )
}

export default CardContainer;