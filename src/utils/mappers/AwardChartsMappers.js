
/**
 * Map the original list to the structured required for the table and operations.
 * ASSUMPTIONS: Each category must have at least 1 pricingLevel, therefore there 
 * should be at least the following json nodes: [category, roomCategories, name, pricingLevels, pricingLevel, points]
 * @param {*} data 
 * @returns 
 */
export const mapAwardChartsList = (data) => {
    let dataMapped = []

    for (let i = 0; i < data.length; i++) { // Categories
        let mapped = {}
        const currentNode = data[i]
        mapped['category'] = currentNode['category']

        if(currentNode['roomCategories'].length){ // Exists Room Categories (MUST HAVE)
            let standardPosition = 0;
            let premiumPosition = 0;

            if(currentNode['roomCategories'][0]?.name === 'Standard') {
                standardPosition = 0; // Not required, but just in case
            } else if(currentNode['roomCategories'][1]?.name === 'Standard') {
                standardPosition = 1;
            }

            if(currentNode['roomCategories'][0]?.name === 'Premium') {
                premiumPosition = 0; // Not required, but just in case
            } else if(currentNode['roomCategories'][1]?.name === 'Premium') {
                premiumPosition = 1;
            }

            // Standards
            const standardPricingLevels = currentNode['roomCategories'][standardPosition]['pricingLevels'];

            let rewardSaver = {}
            rewardSaver['roomCategory'] = 'Standard'
            rewardSaver['pricingLevel'] = 'RewardSaver'
            rewardSaver['points'] = standardPricingLevels.length === 0 ? '0' : extractPricingLevelPoints(standardPricingLevels, 'RewardSaver');
            mapped['rewardSaver'] = rewardSaver

            let standard = {}
            standard['roomCategory'] = 'Standard'
            standard['pricingLevel'] = 'Standard'
            standard['points'] = standardPricingLevels.length === 0 ? '0' : extractPricingLevelPoints(standardPricingLevels, 'Standard');
            mapped['standard'] = standard

            let basePeak = {}
            basePeak['roomCategory'] = 'Standard'
            basePeak['pricingLevel'] = 'BasePeak'
            basePeak['points'] = standardPricingLevels.length === 0 ? '0' : extractPricingLevelPoints(standardPricingLevels, 'BasePeak');
            mapped['basePeak'] = basePeak
            
            
            // Premiums
            const premiumPricingLevels = currentNode['roomCategories'][premiumPosition]['pricingLevels'];

            let premium = {}
            premium['roomCategory'] = 'Premium'
            premium['pricingLevel'] = 'Premium'
            premium['points'] = premiumPricingLevels.length === 0 ? '0' : extractPricingLevelPoints(premiumPricingLevels, 'Premium');
            mapped['premium'] = premium

            let premiumPeak = {}
            premiumPeak['roomCategory'] = 'Premium'
            premiumPeak['pricingLevel'] = 'PremiumPeak'
            premiumPeak['points'] = premiumPricingLevels.length === 0 ? '0' : extractPricingLevelPoints(premiumPricingLevels, 'PremiumPeak');
            mapped['premiumPeak'] = premiumPeak
        }
        
        dataMapped.push(mapped)
    }

    console.log(dataMapped);
    return dataMapped;
}


function extractPricingLevelPoints(pricingLevelList, pricingLevelName){
    let defaultPoints = '0';
    for(let j=0; pricingLevelList.length; j++){
        if(pricingLevelList[j].pricingLevel === pricingLevelName){
            return pricingLevelList[j].points;
        }
    }
    return defaultPoints;
}