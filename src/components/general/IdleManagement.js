import { useState } from "react";
import useIdleTimeout from "../../hook/useIdleTimeout";
import IdleAlert from "./IdleAlert";


const IdleManagement = () => {
    const idleAllowedTime = process.env.REACT_APP_IDLE_TIMEOUT_TIME ? process.env.REACT_APP_IDLE_TIMEOUT_TIME: 300;
    const [idleAlertIsOpen, setIdleAlertIsOpen] = useState(false);
	const idleHandler = () => setIdleAlertIsOpen(true);
	const { idleTimer } = useIdleTimeout({ onIdle: idleHandler, idleTime: idleAllowedTime });

    const stayHandler = () => {
		setIdleAlertIsOpen(false);
		idleTimer.reset();
	}

    return (
        <>
            <IdleAlert isOpen={idleAlertIsOpen} setOpen={setIdleAlertIsOpen} 
        		stayHandler={stayHandler}/>
        </>
    )
}

export default IdleManagement;