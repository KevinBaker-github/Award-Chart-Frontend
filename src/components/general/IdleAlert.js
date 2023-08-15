import { Alert, Button, Typography } from "@material-tailwind/react";
import { GoAlertFill } from 'react-icons/go'
import StandardButton from "./StandardButton";


/**
 * Idle alert on the screen.
 * @param {*} isOpen 
 * @param {*} setOpen 
 * @param {*} stayHandler - handler when the user reacts and confirm to stay on the app
 * @returns 
 */
const IdleAlert = ({isOpen, setOpen, stayHandler}) => {
    
    const handleCloseAlert =() => {
        setOpen(false);
        stayHandler();
    }

    return (
        <>
            {
                isOpen ? 
                (<section className='fixed top-0 left-0 w-full h-screen z-50 overflow-hidden opacity-90 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm'>
                    <Alert
                        open={isOpen}
                        className="max-w-screen-md"
                        color="amber"
                        icon={<GoAlertFill className="h-8 w-8"/>}
                        onClose={() => handleCloseAlert()} >

                        <div className="flex flex-col gap-3">
                            <Typography variant="h5" color="black">
                                Alert!!!
                            </Typography>
                            <Typography color="black" className="mt-2 font-normal">
                                Your session is about to expire. You will be automatically signed out.
                                Do you want to stay signed in? If so, click yes or close the alert.
                            </Typography>
                        </div>

                        <div className="flex pt-4 items-center justify-center">
                            <StandardButton message={'Yes, Stay In'} type={'button'}
                                clickHandler={() => handleCloseAlert()} />
                        </div>

                    </Alert>
                </section>) :
                (<></>)
            }
        </> 
    )
}

export default IdleAlert;