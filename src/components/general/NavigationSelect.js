import { Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";

/**
 * INCOMPLETE COMPONENT.
 * @param {*} param0 
 * @returns 
 */
const NavigationSelect = ({label}) => {
    //TODO: Complete this element
    return (
        <Select color="gray" label={label} className="text-black bg-white">
            <Link to="/awardChart">
                <Option className="text-black bg-white">Award Chart</Option>
            </Link>
            <Link to="/calculation">
                <Option className="text-black bg-white">Calculation</Option>
            </Link>
            <Link to="/properties">
                <Option className="text-black bg-white">Properties</Option>
            </Link>
            <Link to="/propertyConfigBulk">
                <Option className="text-black bg-white">Property Config Bulk</Option>
            </Link>
      </Select>
    )
}

export default NavigationSelect;