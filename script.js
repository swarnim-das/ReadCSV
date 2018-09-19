var assign = require("./objectAssign");
var createJSON = require("./writeJSON");

/**********  variable to store CSV File   *********/
const csvFile = "./Indicators.csv";

/**********  variable to store modules   *********/
const fs = require('fs');
const readline = require('readline');

/**********  variable to store column header index   *********/
let indexYear;
let indexCountry;
let indexValue;
let indexIndicatorCode;

/**********  Array variable to store Filtered Array of Objects  *********/
let indiaPopulationArray = [];
let indiaPopulationGrowthArray = [];

/**********  Array variables to store specific Objects ********/
let indiaUrban = [];
let indiaRural = [];
let arr_ur_growth = [];

let countries=['India','Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei'
,'Cambodia','China','Cyprus','Georgia','Indonesia','Iran','Iraq','Israel','Japan','Jordan','Kazakhstan'
,'Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman'
,'Pakistan','Palestine','Philippines','Qatar','Russia','Saudi Arabia','Singapore','South Korea'
,'Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Turkey','Turkmenistan'
,'United Arab Emirates','Uzbekistan','Vietnam','Yemen'];

let asiaRural = [];
let asiaUrban = [];
let asiaArray = [];

let cn = 0;
/**********  counter variable for  storing header indexes   *********/
let counter = 0;

/**********  Custom Remove function to remove specific array elements   *********/
function remove(array, element) {
    return array.filter(e => e !== element);
}

/**********  Reading CSV File by creating Read Stream Interface   *********/
const rl = readline.createInterface({
    input: fs.createReadStream(csvFile)
});

/**********  Reading the Stream Line by Line *********/
rl.on('line', (line)=>{

    counter++;

    /**********  Array to store each line of CSV  ;   Using Regex to ignore commas between double quotes *********/
    let arr = line.split((/(".*?"|[^",]+)(?=,|$)+/g));

    /**********  Filtered Array by removing nulls & commas   *********/
    let filteredArray = remove(arr,",");
    filteredArray = remove(filteredArray, "");

    /**********  Using counter to store header indexes   *********/
    if(counter === 1){
        indexCountry = filteredArray.indexOf("CountryName");
        indexYear = filteredArray.indexOf("Year");
        indexIndicatorCode = filteredArray.indexOf("IndicatorCode");
        indexValue = filteredArray.indexOf("Value");
        indexCountryCode = filteredArray.indexOf("CountryCode");
    }

    /**********  Filtering the dataset according to Country-India and IndicatorName*********/

    if(filteredArray[indexCountry] === "India") {

        if(filteredArray[indexIndicatorCode] === "SP.RUR.TOTL.ZS") {
            
            let tempObj = {
                year: filteredArray[indexYear],
                rur_pop: filteredArray[indexValue],
            };
            
            indiaRural.push(tempObj);

        }
        else if(filteredArray[indexIndicatorCode] === "SP.URB.TOTL.IN.ZS"){
            
            let tempObj = {
                year: filteredArray[indexYear],
                urb_pop: filteredArray[indexValue],
            };

            indiaUrban.push(tempObj);

        }
        else if(filteredArray[indexIndicatorCode] === "SP.URB.GROW"){
            let tempObj = {
                year: filteredArray[indexYear],
                growth_val: filteredArray[indexValue]
            }
            
            arr_ur_growth.push(tempObj);
        }
    }

    for(let i=0;i<countries.length;i++) {
        if(countries[i]===filteredArray[indexCountry]) {
            if(filteredArray[indexIndicatorCode]==="SP.RUR.TOTL") {
                let tempObj = {
                    country: filteredArray[indexCountry],
                    rur_val: filteredArray[indexValue]
                }
                asiaRural.push(tempObj);
            }
            else if(filteredArray[indexIndicatorCode]==="SP.URB.TOTL") {
                let tempObj = {
                    country: filteredArray[indexCountry],
                    urb_val: filteredArray[indexValue]
                }
                asiaUrban.push(tempObj);
            }                        
        }
    }

}).on('close', () => {
console.log("here.....")


    assign.arrayMerge(indiaRural,indiaUrban,indiaPopulationArray);
    assign.arrayMerge(asiaRural,asiaUrban,asiaArray);

    indiaPopulationGrowthArray = arr_ur_growth;

    /**********  creating JSON file from Array of Objects  *********/
    var myJSON = JSON.stringify(indiaPopulationArray, 1,1);
    var myJSON2 = JSON.stringify(indiaPopulationGrowthArray, 1, 1);
    var myJSON3 = JSON.stringify(asiaArray, 1, 1);

    createJSON.write(fs,myJSON,"indiaPopulationArray.json");
    createJSON.write(fs,myJSON2,"indiaPopulationGrowthArray.json");
    createJSON.write(fs,myJSON3,"asiaArray.json");

});