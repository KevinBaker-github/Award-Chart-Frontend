import { Input } from "@material-tailwind/react";

/**
 * Allows to search through a search term or criteria and it will call
 * the handler whenever the user put in each character.
 * @param {*} placeholder - Default message on input
 * @param {*} dataError - error from caller
 * @param {*} reference - instance of useRef [react hook]
 * @param {*} searchHandler - on change handler 
 * @returns 
 */
const StandardSearchInput = ({
    placeholder,
    dataError,
    reference,
    searchHandler
}) => {
    
    return (
        <div className="flex w-full">
            <Input disabled={dataError ? true : false} label={placeholder ? placeholder : "Search...."} color="black" ref={reference} onChange={(e) => searchHandler(e.target)} />
        </div>
    )
}


export default StandardSearchInput;