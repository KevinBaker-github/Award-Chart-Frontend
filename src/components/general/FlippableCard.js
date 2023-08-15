import { GoEye } from "react-icons/go";
import { TbReload } from 'react-icons/tb';


/**
 * Flippable card allows to show either 1 or multiple values,
 * on 1 or multiples lines in the card.
 * @param {*} dataList 
 * @param {*} isValuePerLine 
 * @param {*} width
 * @param {*} height 
 * @returns 
 */
const FlippableCard = ({
    dataList,
    isValuePerLine,
    width,
    height
}) => {

    const prepareValues = dataList.map(value => value.key).join('    ');

    return (
        <div className={`flex ${height ? height : 'h-16'} ${width ? width : 'w-80'} items-center justify-center}`}>
            <div className={`group ${height ? height : 'h-16'} ${width ? width : 'w-80'} [perspective:1000px]`}>
                <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-black text-white rounded-xl">
                        <div className="flex min-h-full flex-col justify-center">
                            <div className="flex justify-center">
                                <p className="text-xl">{dataList[0].key}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`"absolute inset-0 h-full w-full rounded-xl bg-black px-12 text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] ${isValuePerLine ? 'overflow-y-scroll' : ''}`}>
                        <div className="flex min-h-full flex-col items-center justify-center">
                            {dataList && isValuePerLine && dataList.map(dataItem => {
                                return (
                                    <p className="text-base">{dataItem.key}</p>
                                )
                            })}

                            {dataList && !isValuePerLine && (
                                <p className="text-base">{prepareValues}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlippableCard;



