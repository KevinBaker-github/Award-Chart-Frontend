
export const managePropertyConfigBulkResponse = (response, setOpenNotification, setDisplayMessage) => {
    // Error treatment
    if(response?.status == 400){
        setDisplayMessage(response.data.errorMessage);
    } else {
        setDisplayMessage('There was an unexpected error!!!');
    }
    setOpenNotification(true);
}


export const managePropertyConfigBulkError = (error, setOpenNotification, setDisplayMessage) => {
    // Error treatment
    if(error?.code === 500){
        setDisplayMessage(error.errorMessage);
    } else {
        setDisplayMessage('There was an unexpected error!!!');
    }
    setOpenNotification(true);
}

export const managePropertyConfigBulkRejected = (setOpenNotification, setDisplayMessage) => {
    setDisplayMessage('There was an unexpected error!!!!');
    setOpenNotification(true);
}