import { useIdleTimer } from "react-idle-timer"
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

/**
 * 
 * @param {onIdle} - function to notify user when idle timeout is close
 * @param {idleTime} - number of seconds to wait before user is logged out, default 300 seconds
 * @returns 
 */
const useIdleTimeout = ({ onIdle, idleTime = 300 }) => {
    const idleTimeout = 1000 * idleTime;
    const [isIdle, setIdle] = useState(false);
    const { oktaAuth } = useOktaAuth();

    const handleIdle = () => {
        setIdle(true);
        oktaAuth.signOut();
    }

    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        promptTimeout: idleTimeout / 2,
        onPrompt: onIdle,
        onIdle: handleIdle,
        debounce: 500
    })

    return { // Can use these objects from any other component
        isIdle,
        setIdle,
        idleTimer
    }
}

export default useIdleTimeout;