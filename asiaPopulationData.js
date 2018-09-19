const getPopulationGrowthData = (filteredArray, indexObj, countries, populationObject) => {

    if(countries.indexOf(filteredArray[indexObj.indexCountry]) > -1 ) {
        if(filteredArray[indexObj.indexIndicatorCode] === "SP.RUR.TOTL") {
            if(populationObject[filteredArray[indexObj.indexCountry]]) {
                populationObject[filteredArray[indexObj.indexCountry]]['rural']
                                = filteredArray[indexObj.indexValue];     
            }
            else {
                populationObject[filteredArray[indexObj.indexCountry]] = {};
                populationObject[filteredArray[indexObj.indexCountry]]['rural']
                                = filteredArray[indexObj.indexValue];
                populationObject[filteredArray[indexObj.indexCountry]]['country']
                                = filteredArray[indexObj.indexCountry];

            }
        }
        else if(filteredArray[indexObj.indexIndicatorCode] === "SP.URB.TOTL") {
            if(populationObject[filteredArray[indexObj.indexCountry]]) {
                populationObject[filteredArray[indexObj.indexCountry]]['urban'] 
                                = filteredArray[indexObj.indexValue];     
            }
            else {
                populationObject[filteredArray[indexObj.indexCountry]] = {};
                populationObject[filteredArray[indexObj.indexCountry]]['urban'] 
                                = filteredArray[indexObj.indexValue];
                populationObject[filteredArray[indexObj.indexCountry]]['country']
                                = filteredArray[indexObj.indexCountry];
            }    
        }
    }
    return populationObject;
}

module.exports = getPopulationGrowthData;