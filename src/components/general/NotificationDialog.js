import {
    Typography
} from "@material-tailwind/react";
import CenteredDialog from "../layout/CenteredDialog";
import { IconButton } from "@material-tailwind/react";
import { FaRegFrownOpen } from 'react-icons/fa'
import { VscError } from 'react-icons/vsc';
import { BiSolidError } from 'react-icons/bi';

/**
 * Used to show any error along with the title.
 * Possible values: [error, warning, success]
 * 
 * Usage: 
 * 1. First set up 3 states in your caller component
 *  const [displayMessage, setDisplayMessage] = useState('This is a message');
 *  const [notificationCategory, setNotificationCategory] = useState('success');
 *  const [notificationOpen, setNotificationOpen] = useState(false);
 * 2. Then create 1 instance inside your caller component and pass the states
 * <AbstractDialog title={''} description={displayMessage} dialogOpen={notificationOpen} 
 *      dialogHandler={setNotificationOpen} dialogCategory={notificationCategory}/>
 * 3. Interact with your own notification logic to change the states.
 * @returns 
 */
const NotificationDialog = ({dialogOpen, dialogHandler, title, description, notificationCategory}) => {
    

    return (
        <>
            <CenteredDialog dialogOpen={dialogOpen}
                handleDialogOpen={dialogHandler}
                title={title ? title.toUpperCase() : notificationCategory.toUpperCase()}>
                <div className="flex flex-col gap-3 items-center">
                    {
                        notificationCategory === 'error' && (
                            <IconButton size="lg" color="red" className="rounded-full">
                                <VscError className="h-16 w-16" />
                            </IconButton>
                        )
                    }

                    {
                        notificationCategory === 'warning' && (
                            <IconButton size="lg" color="deep-orange" className="rounded-full">
                                <BiSolidError className="h-10 w-10" />
                            </IconButton>
                        )
                    }

                    {
                        notificationCategory === 'success' && (
                            <IconButton size="lg" color="green" className="rounded-full">
                                <FaRegFrownOpen className="h-16 w-16" />
                            </IconButton>
                        )
                    }

                    <Typography color="black" className="mt-2 text-center">
                        {description}
                    </Typography>
                    
                </div>
            </CenteredDialog>
        </>
    )
}



export default NotificationDialog;