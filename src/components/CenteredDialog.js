import {
    Dialog,
    Card,
    CardHeader,
    CardBody,
    Typography,
    IconButton
  } from "@material-tailwind/react";


const CenteredDialog = ({title, dialogOpen, handleDialogOpen, children}) => {
    
    return (
        <>
            <Dialog
                size="xs"
                open={dialogOpen}
                handler={handleDialogOpen}
                className="bg-transparent shadow-none"
                dismiss={{enabled: false}}>
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="flex items-center justify-between mb-0 from-black to-blue-gray-900 rounded-none">
                        <Typography variant="h3" color="black"
                            className="ml-2">
                            {title}
                        </Typography>
                        <IconButton
                            color="blue-gray"
                            size="sm"
                            variant="text"
                            onClick={handleDialogOpen} 
                            className="m-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-5 w-5" >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </IconButton>
                    </CardHeader>
                    <CardBody>
                        {children}
                    </CardBody>
                </Card>
            </Dialog>
        </>
    )
}

export default CenteredDialog;