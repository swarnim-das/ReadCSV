/** ********  variable to store CSV File   ******** */
const csvFile = './Indicators.csv';

/** ********  variable to store modules   ******** */
const fs = require('fs');
const readline = require('readline');

/** ********  variable to store column header index   ******** */
let indexYear;
let indexCountry;
let indexValue;
let indexIndicatorCode;

/** ********  Array variable to store Filtered Array of Objects  ******** */
const newArray = [];
let newArrayGrowth = [];

/** ********  Array variables to store specific Objects ******* */
const arrUrban = [];
const arrRural = [];
const arrUrbanGrowth = []

const countries = ['India', 'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'];

const asiaRural = [];
const asiaUrban = [];
const asiaArray = [];

/** ********  counter variable for  storing header indexes   ******** */
let counter = 0;

/** ********  Custom Remove function to remove specific array elements   ******** */
function remove(array, element) {
  return array.filter(e => e !== element);
}

/** ********  Reading CSV File by creating Read Stream Interface   ******** */
const rl = readline.createInterface({
  input: fs.createReadStream(csvFile),
});

/** ********  Reading the Stream Line by Line ******** */
rl.on('line', (line) => {
  counter += 1;

  /** ********  Array to store each line of CSV  ;
   * Using Regex to ignore commas between double quotes ******** */
  const arr = line.split((/(".*?"|[^",]+)(?=,|$)+/g));

  /** ********  Filtered Array by removing nulls & commas   ******** */
  let filteredArray = remove(arr, ',');
  filteredArray = remove(filteredArray, '');

  /** ********  Using counter to store header indexes   ******** */
  if (counter === 1) {
    indexCountry = filteredArray.indexOf('CountryName');
    indexYear = filteredArray.indexOf('Year');
    indexIndicatorCode = filteredArray.indexOf('IndicatorCode');
    indexValue = filteredArray.indexOf('Value');
  }

  /** ********  Filtering the dataset according to Country-India and IndicatorName******** */

  if (filteredArray[indexCountry] === 'India') {
    if (filteredArray[indexIndicatorCode] === 'SP.RUR.TOTL.ZS') {
      const tempObj = {
        year: filteredArray[indexYear],
        rur_pop: filteredArray[indexValue],
      };

      arrRural.push(tempObj);
    } else if (filteredArray[indexIndicatorCode] === 'SP.URB.TOTL.IN.ZS') {
      const tempObj = {
        year: filteredArray[indexYear],
        urb_pop: filteredArray[indexValue],
      };

      arrUrban.push(tempObj);
    } else if (filteredArray[indexIndicatorCode] === 'SP.URB.GROW') {
      const tempObj = {
        year: filteredArray[indexYear],
        growth_val: filteredArray[indexValue],
      };

      arrUrbanGrowth.push(tempObj);
    }
  }

  for (let i = 0; i < countries.length; i += 1) {
    if (countries[i] === filteredArray[indexCountry]) {
      if (filteredArray[indexYear] === '2000') {
        if (filteredArray[indexIndicatorCode] === 'SP.RUR.TOTL') {
          const outobj = {
            country: filteredArray[indexCountry],
            rur_val: filteredArray[indexValue],
          };
          asiaRural.push(outobj);
        } else if (filteredArray[indexIndicatorCode] === 'SP.URB.TOTL') {
          const outobj = {
            country: filteredArray[indexCountry],
            urb_val: filteredArray[indexValue],
          };
          asiaUrban.push(outobj);
        }
      }
    }
  }
}).on('close', () => {

  for (let i = 0; i < arrRural.length; i += 1) {
    for (let j = 0; j < arrUrban.length; i += 1) {
      if (i === j) {
        const tempObj = Object.assign(arrRural[j], arrUrban[j]);
        /** ********  pushing the objects to Array of Objects  ******** */
        newArray.push(tempObj);
      }
    }
  }

  for (let i = 0; i < asiaRural.length; i += 1) {
    for (let j = 0; j < asiaUrban.length; j += 1) {
      if (i === j) {
        const tempObj = Object.assign(asiaRural[j], asiaUrban[j]);
        asiaArray.push(tempObj);
      }
    }
  }

  newArrayGrowth = arrUrbanGrowth;
  /** ********  creating JSON file from Array of Objects  ******** */
  const myJSON = JSON.stringify(newArray, 1, 1);
  const myJSON2 = JSON.stringify(newArrayGrowth, 1, 1);
  const myJSON3 = JSON.stringify(asiaArray, 1, 1);
  fs.writeFile('output.json', myJSON, 'utf8', (err) => {
    if (err) throw err;
  });
  fs.writeFile('output2.json', myJSON2, 'utf8', (err) => {
    if (err) throw err;
  });
  fs.writeFile('output3.json', myJSON3, 'utf8', (err) => {
    if (err) throw err;
  });
});