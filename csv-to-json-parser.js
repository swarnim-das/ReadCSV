const fs = require('fs');
const readline = require('readline');
const writeJson = require('./write-json');
const extractHeaders = require('./extract-headers');
const indiaPopulationGrowthPercentage = require('./india-population-growth-percentage');
const constants = require('./constants');
const asiaPopulationData = require('./asia-population-data');
const indiaUrbanPopulationGrowth = require('./india-urban-population-growth');

const inputFile = "./input/Indicators.csv";

let indexHeaders = {};
let indiaPopulation = {};
let asiaPopulation = {};
let indiaPopulationUrbanGrowth = [];


let counter = 0;

const rl = readline.createInterface({
    input: fs.createReadStream(inputFile)
});

rl.on('line', (line)=> {

    counter++;

    line = line.split((/(".*?"|[^",]+)(?=,|$)+/g))
                            .filter(e => e !== ",")
                            .filter(e => e !== "");
    
    if (counter === 1) {
        indexHeaders = extractHeaders(line);
    }

    let countries = constants;

    indiaPopulation = indiaPopulationGrowthPercentage(line, indexHeaders, indiaPopulation);
    asiaPopulation = asiaPopulationData(line, indexHeaders, countries, asiaPopulation);

    if(line[indexHeaders.indexCountry] === "India"){
        if(line[indexHeaders.indexIndicatorCode] === "SP.URB.GROW") {
            let tempObj = {
                year: line[indexHeaders.indexYear],
                growth_value: line[indexHeaders.indexValue]
            }
            indiaPopulationUrbanGrowth.push(tempObj);   
        }    
    }
    
}).on('close', () => {

    const indPopulation = Object.values(indiaPopulation);
    const asiaCountriesPopulation = Object.values(asiaPopulation);

    let jsonFiles = [
        {
            input:indPopulation,
            output:"indiaPopulation.json"
        },
        {
            input:indiaPopulationUrbanGrowth,
            output:"indiaUrbanPopulationGrowth.json"
        },
        {
            input:asiaCountriesPopulation,
            output:"asiaCountriesPopulation.json"
        }
    ];
    
    jsonFiles.forEach((element,index) => {
        writeJson.write(JSON.stringify(jsonFiles[index].input,1,1),jsonFiles[index].output);
    });
    
});