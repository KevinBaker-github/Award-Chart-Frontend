import {
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import CardContainer from "../components/CardContainer";
import FullScreen from "../components/FullScreen";


const Wellcome = () => {

	return (
        <FullScreen>
            <CardContainer>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex flex-col items-center">
                        <Typography variant="h4" className="text-black">
                            SRD Dynamic Price Dashboard
                        </Typography>
                        <Typography color="gray" className="mt-4 font-normal">
                            Wellcome, this dashboard is POC for the SRD dynamic price application.
                        </Typography>
                    </div>
                </CardHeader>
                
            </CardContainer>
        </FullScreen>
	);
};

export default Wellcome;