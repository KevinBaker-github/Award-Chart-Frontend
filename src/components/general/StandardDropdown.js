import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";

/**
 * Allows to inject a list of options through a list, pass the selectedHandler,
 * select the default option and control if disabled.
 * 
 * @param {*} options - List of options in the select
 * @param {*} setSelected - handler executed when the user clic an option
 * @param {*} defaultOption - first default option's key, minimun value: 1
 * @param {*} disabled - disabling control
 * @returns 
 */
const StandardDropdown = ({
    options, 
    setSelected, 
    defaultOption,
    disabled
}) => {
    const [optionSelected, setOptionSelected] = useState(defaultOption);

    const clickHandler = (option) => {
        setSelected(option)
        setOptionSelected(option.key)
    }

    return (
        <Select color="blue-gray" label="Rows per page" size="md" 
            disabled={disabled ? true : false}
            value={options[optionSelected - 1].value} >
            {options.map((option) => (
                <Option key={option.key}
                    onClick={() => clickHandler(option)}>{option.value}</Option>
            ))}
        </Select>
    )
}

export default StandardDropdown;