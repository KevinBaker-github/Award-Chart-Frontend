

/**
 * Manages the creation error, it expects the setOpenNotification to trigger the desired notification UI, along with
 * setDisplayMessage and setNotificationCategory to specify which notification UI type is required [success, warning, error].
 * @param {*} param0 
 */
export const manageAwardChartCreationError = (error, setOpenNotification, setDisplayMessage) => { //TODO: Change when backend has appropiate error messages
    // Error treatment
    if(error?.code === 500){
        setDisplayMessage(error.message);
    } else {
        setDisplayMessage('There was an unexpected error!!!');
    }
    setOpenNotification(true);
}