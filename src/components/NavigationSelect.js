import { Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";


const NavigationSelect = ({label}) => {
    
    return (
        <Select color="gray" label={label} className="text-black bg-white">
            <Link to="/awardChart">
                <Option className="text-black bg-white">Award Chart</Option>
            </Link>
            <Link to="/awardChart">
                <Option className="text-black bg-white">Prop Category</Option>
            </Link>
            <Link to="/awardChart">
                <Option className="text-black bg-white">System Defaults</Option>
            </Link>
      </Select>
    )
}

export default NavigationSelect;