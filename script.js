/**********  variable to store CSV File   *********/
const csvFile = "./Indicators.csv";

/**********  variable to store modules   *********/
const fs = require('fs');
const readline = require('readline');

/**********  variable to store column header index   *********/
let indexYear;
let indexCountry;
let indexUrbanPopulation;
let indexIndicatorCode;

/**********  Array variable to store Filtered Array of Objects  *********/
let newArray = [];

/**********  Array variables to store specific Objects ********/
let arr_urban = [];
let arr_rural = [];

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
        //console.log(arr);
        indexCountry = filteredArray.indexOf("CountryName");
        indexYear = filteredArray.indexOf("Year");
        indexIndicatorCode = filteredArray.indexOf("IndicatorCode");
        indexUrbanPopulation = filteredArray.indexOf("Value");
    }



    /**********  Filtering the dataset according to Country-India and IndicatorName*********/

    if(filteredArray[indexCountry] === "India") {

        if(filteredArray[indexIndicatorCode] === "SP.RUR.TOTL") {

            let temp_obj = {
                year: filteredArray[indexYear],
                rur_pop: filteredArray[indexUrbanPopulation]
            };
            arr_rural.push(temp_obj);

        }
        else if(filteredArray[indexIndicatorCode] === "SP.URB.TOTL"){

            let temp_obj = {
                year: filteredArray[indexYear],
                urb_pop: filteredArray[indexUrbanPopulation]
            };
            arr_urban.push(temp_obj);

        }
    }


}).on('close', () => {

    for(i=0;i<arr_rural.length;i++) {
        for(j=0;j<arr_urban.length;j++) {
            if(i===j) {
               let temp_Obj = Object.assign(arr_rural[j],arr_urban[j]);
               /**********  pushing the objects to Array of Objects  *********/
               newArray.push(temp_Obj);
            }
        }
    }


    /**********  creating JSON file from Array of Objects  *********/
    var myJSON = JSON.stringify(newArray);

    fs.writeFile("output.json", myJSON, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
});