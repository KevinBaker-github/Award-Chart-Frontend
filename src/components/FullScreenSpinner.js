
import { Spinner } from "@material-tailwind/react";

/**
 * This blocks all the screen and present an animated spinner icon
 * @param {*} param0 
 * @returns 
 */
const FullScreenSpinner = ({isLoading}) => {

    return(
        <>
            {
                isLoading ? 
                (<section className='fixed top-0 left-0 w-full h-screen z-50 overflow-hidden opacity-90 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm'>
                    <Spinner color="yellow" className="h-16 w-16 text-gray-500" />
                </section>) :
                (<></>)
            }
        </> 
    )
}




export default FullScreenSpinner;