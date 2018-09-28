const getPopulationGrowthData = (filteredArray, indexHeaders, indiaPopulation) => {
  if (filteredArray[indexHeaders.indexCountry] === 'India') {
    if (filteredArray[indexHeaders.indexIndicatorCode] === 'SP.RUR.TOTL.ZS') {
      if (indiaPopulation[filteredArray[indexHeaders.indexYear]]) {
        indiaPopulation[filteredArray[indexHeaders.indexYear]].rural = filteredArray[indexHeaders.indexValue];
      } else {
        indiaPopulation[filteredArray[indexHeaders.indexYear]] = {};
        indiaPopulation[filteredArray[indexHeaders.indexYear]].rural = filteredArray[indexHeaders.indexValue];
        indiaPopulation[filteredArray[indexHeaders.indexYear]].year = filteredArray[indexHeaders.indexYear];
      }
    } else if (filteredArray[indexHeaders.indexIndicatorCode] === 'SP.URB.TOTL.IN.ZS') {
      if (indiaPopulation[filteredArray[indexHeaders.indexYear]]) {
        indiaPopulation[filteredArray[indexHeaders.indexYear]].urban = filteredArray[indexHeaders.indexValue];
      } else {
        indiaPopulation[filteredArray[indexHeaders.indexYear]] = {};
        indiaPopulation[filteredArray[indexHeaders.indexYear]].urban = filteredArray[indexHeaders.indexValue];
        indiaPopulation[filteredArray[indexHeaders.indexYear]].year = filteredArray[indexHeaders.indexYear];
      }
    }
  }
  return indiaPopulation;
};

module.exports = getPopulationGrowthData;
