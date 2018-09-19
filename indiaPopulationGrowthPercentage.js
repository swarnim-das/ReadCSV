const getPopulationGrowthData = (filteredArray, indexObj, indiaPopulationObject) => {

    if(filteredArray[indexObj.indexCountry] === "India") {
        if(filteredArray[indexObj.indexIndicatorCode] === "SP.RUR.TOTL.ZS") {
            if(indiaPopulationObject[filteredArray[indexObj.indexYear]]) {
                indiaPopulationObject[filteredArray[indexObj.indexYear]]['rural']
                                = filteredArray[indexObj.indexValue];     
            }
            else {
                indiaPopulationObject[filteredArray[indexObj.indexYear]] = {};
                indiaPopulationObject[filteredArray[indexObj.indexYear]]['rural']
                                = filteredArray[indexObj.indexValue];
                indiaPopulationObject[filteredArray[indexObj.indexYear]]['year']
                                = filteredArray[indexObj.indexYear];

            }
        }
        else if(filteredArray[indexObj.indexIndicatorCode] === "SP.URB.TOTL.IN.ZS") {
            if(indiaPopulationObject[filteredArray[indexObj.indexYear]]) {
                indiaPopulationObject[filteredArray[indexObj.indexYear]]['urban'] 
                                = filteredArray[indexObj.indexValue];     
            }
            else {
                indiaPopulationObject[filteredArray[indexObj.indexYear]] = {};
                indiaPopulationObject[filteredArray[indexObj.indexYear]]['urban'] 
                                = filteredArray[indexObj.indexValue];
                indiaPopulationObject[filteredArray[indexObj.indexYear]]['year']
                                = filteredArray[indexObj.indexYear];
            }    
        }
    }
    return indiaPopulationObject;
}

module.exports = getPopulationGrowthData;

