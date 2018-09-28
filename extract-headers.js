const extractHeaderIndexes = (filteredArray) => {
  const tempObj = {
    indexCountry: filteredArray.indexOf('CountryName'),
    indexYear: filteredArray.indexOf('Year'),
    indexIndicatorCode: filteredArray.indexOf('IndicatorCode'),
    indexValue: filteredArray.indexOf('Value'),
    indexCountryCode: filteredArray.indexOf('CountryCode'),
  };
  return tempObj;
};

module.exports = extractHeaderIndexes;
