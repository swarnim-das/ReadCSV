/* eslint-disable */
const indiaUrbanPopulationGrowth = (filteredArray, indexObj, indiaPopulationUrbanGrowthObject) => {
  if (filteredArray[indexObj.indexCountry] === 'India') {
    if (filteredArray[indexObj.indexIndicatorCode] === 'SP.URB.GROW') {
      indiaPopulationUrbanGrowthObject.year = filteredArray[indexObj.indexYear];
      indiaPopulationUrbanGrowthObject.growth_value = filteredArray[indexObj.indexValue];
    }
  }
};

module.exports = indiaUrbanPopulationGrowth;
