import {
    Typography,
    Chip
} from "@material-tailwind/react";

/**
 * This component displays a value and additionally allows to customize its background color
 * and a special word replacing the value depending on a condition.
 * @param {*} param0 
 * @returns 
 */
const ValueIndicator = ({value, data, clickHandler, comparedValue, specialColor, specialWord}) => {
    
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
                        className="cursor-pointer hover:scale-110"
                        onClick={() => clickHandler(data)}
                    />
		        </div>
            ): (
                <Typography variant="small" color="blue-gray" 
                    className="font-normal cursor-pointer"
                    onClick={() => clickHandler(data)}>
					{value}
				</Typography>
            )
            }
        </>
    )
}

export default ValueIndicator;