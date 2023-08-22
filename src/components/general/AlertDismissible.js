import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";

/**
 * Shows an alart on the screen's upper position.
 * @param {*} isAlertOpen 
 * @param {*} setIsAlertOpen 
 * @param {*} alertType 
 * @param {*} message 
 * @returns 
 */
const AlertDismissable = ({isAlertOpen, setIsAlertOpen, alertType, message}) => {
    const [backgroundColor, setBackgroundColor] = useState(''); 

    useEffect(() => {
        setBackgroundColor(getBackgroundColor());
    }, [isAlertOpen, alertType, message])
    

    const getBackgroundColor = () => {
        console.log(alertType);
        switch (alertType){
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            case 'warning':
                return 'amber';
            default:
                return 'red'
        } 
    }

    return (
        <>
            {isAlertOpen && (
                <div className="flex flex-col items-center justify-center fixed top-0 left-0 right-0 z-50 mt-2">
                    <Alert color={`${backgroundColor}`} variant="gradient"
                        open={isAlertOpen} 
                        onClose={() => setIsAlertOpen(false)} 
                        className="w-[50%] text-center bg-green-700 shadow-2xl">
                        {message ? message : 'Something unexpected happened!!!'}
                    </Alert>
                </div>
            )}
        </>
    )
}

export default AlertDismissable;