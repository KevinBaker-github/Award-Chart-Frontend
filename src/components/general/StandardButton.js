import {
    Button
} from "@material-tailwind/react";


/**
 * Standar button to use accross all pages and components.
 * @param {*} message 
 * @param {*} clickHandler 
 * @param {*} type 
 * @returns 
 */
const StandardButton = ({message, clickHandler, type}) => {

    return (
        <>
            <Button className="bg-black hover:scale-105"
                onClick={clickHandler} type={type}>{message}</Button>
        </>
    )
}

export default StandardButton;