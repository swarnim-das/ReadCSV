var labelWithTime = "label " + Date.now();
console.time(labelWithTime);
const fs = require('fs');
const readline = require('readline');
const createJSON = require("./writeJSON");
const extractHeaders = require("./extractHeaders");
const indiaPopulationGrowthPercentage = require('./indiaPopulationGrowthPercentage');
const asiaPopulationData = require('./asiaPopulationData');
const indiaUrbanPopulationGrowth = require('./indiaUrbanPopulationGrowth');

const inputFile = "./Indicators.csv";

let indexObj = {};
let indiaPopulationObject = {};
let indiaPopulationUrbanGrowthObject = {};
let asiaPopulationObject = {};
let indiaPopulationArray = [];
let indiaPopulationUrbanGrowth = [];
let asiaPopulation = [];

let countries=['India','Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei'
,'Cambodia','China','Cyprus','Georgia','Indonesia','Iran','Iraq','Israel','Japan','Jordan','Kazakhstan'
,'Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman'
,'Pakistan','Palestine','Philippines','Qatar','Russia','Saudi Arabia','Singapore','South Korea'
,'Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Turkey','Turkmenistan'
,'United Arab Emirates','Uzbekistan','Vietnam','Yemen'];

let counter = 0;

/**********  Reading CSV File by creating Read Stream Interface   *********/
const rl = readline.createInterface({
    input: fs.createReadStream(inputFile)
});

/**********  Reading the Stream Line by Line *********/
rl.on('line', (line)=> {

    counter++;

    let filteredArray = line.split((/(".*?"|[^",]+)(?=,|$)+/g))
                            .filter(e => e !== ",")
                            .filter(e => e !== "");
    
    if (counter === 1) {
        indexObj = extractHeaders(filteredArray);
    }

    indiaPopulationObject = indiaPopulationGrowthPercentage(filteredArray, indexObj, indiaPopulationObject);
    asiaPopulationObject = asiaPopulationData(filteredArray, indexObj, countries, asiaPopulationObject);
    indiaPopulationUrbanGrowthObject = indiaUrbanPopulationGrowth(filteredArray,indexObj,indiaPopulationUrbanGrowthObject);
    console.log(indiaPopulationUrbanGrowthObject);
}).on('close', () => {

    indiaPopulationArray = Object.values(indiaPopulationObject);
    asiaPopulation = Object.values(asiaPopulationObject);

    createJSON.write(fs,JSON.stringify(indiaPopulationArray, 1,1),"indiaPopulation.json");
    createJSON.write(fs,JSON.stringify(indiaPopulationUrbanGrowth, 1, 1),"indiaPopulationGrowth.json");
    createJSON.write(fs,JSON.stringify(asiaPopulation, 1, 1),"asiaCountries.json");

    console.timeEnd(labelWithTime);

});