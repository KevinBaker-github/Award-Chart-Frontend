import {
    Button
} from "@material-tailwind/react";


const StandardButton = ({message, clickHandler, type}) => {

    return (
        <>
            <Button className="bg-black hover:scale-105"
                onClick={clickHandler} type={type}>{message}</Button>
        </>
    )
}

export default StandardButton;