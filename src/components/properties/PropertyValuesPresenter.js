import ValueIndicator from "../general/ValueIndicator";
import FlippableCard from "../general/FlippableCard";

/**
 * Allows to show either 1 or multiple values.
 * 1 value: Chip component is used
 * 2 or more values: A flippable small card will be used 
 * @param {*} dataList - data list with values to show 
 * @returns 
 */
const PropertyValuesPresenter = ({
    dataList,
    isValuePerLine,
    width,
    height
}) => {

    const validateData = () => {
        return (
            <>
              {dataList.length > 1 
                ? renderMultipleItems()
                : renderSingleItem()}
            </>
        );
    }

    const renderSingleItem = () => {
        const dataValue = dataList[0].key;
        return (
            <div className="flex items-center justify-center">
                <ValueIndicator value={dataValue} data={dataValue}
                    clickHandler={() => {}} comparedValue={dataValue} 
                    specialColor={'blue'} specialWord={dataValue === '' ? 'N/A' : dataValue} 
                    isClickable={false} />
            </div>
        );
    };

    const renderMultipleItems = () => {
        return (
          <div className="flex items-center justify-center">
            <FlippableCard dataList={dataList} isValuePerLine={isValuePerLine} 
                width={width} height={height} />
          </div>
        );
    };


    return (
        <>
            {dataList && isValuePerLine !== undefined &&
                width != undefined && height != undefined 
                && validateData() }
        </>
    )
}


export default PropertyValuesPresenter;