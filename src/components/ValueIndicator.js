import {
    Typography,
    Chip
} from "@material-tailwind/react";


const ValueIndicator = ({value, rowIdentifier, clickHandler, comparedValue, specialColor, specialWord}) => {


    return (
        <>
            {value === comparedValue 
            ? (
                <div className="w-max">
                    <Chip
                        variant="ghost"
                        size="sm"
                        value={specialWord ? specialWord : value}
                        color={specialColor? specialColor : "blue-gray" }
                        className="cursor-pointer"
                        onClick={() => clickHandler(rowIdentifier)}
                    />
		        </div>
            ): (
                <Typography variant="small" color="blue-gray" 
                    className="font-normal cursor-pointer"
                    onClick={() => clickHandler(rowIdentifier)}>
					{value}
				</Typography>
            )
            }
        </>
    )
}

export default ValueIndicator;