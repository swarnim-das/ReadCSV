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
let indexCountryCode;

/**********  Array variable to store Filtered Array of Objects  *********/
let newArray = [];
let newArrayGrowth = [];
let newArrayAsia = [];

/**********  Array variables to store specific Objects ********/
let arr_urban = [];
let arr_rural = [];
let arr_ur_growth = [];
let asia = ["PAK","IND","BGD","IDN","CHN","AFG"];
let countries=['India','Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei'
,'Cambodia','China','Cyprus','Georgia','Indonesia','Iran','Iraq','Israel','Japan','Jordan','Kazakhstan'
,'Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman'
,'Pakistan','Palestine','Philippines','Qatar','Russia','Saudi Arabia','Singapore','South Korea'
,'Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Turkey','Turkmenistan'
,'United Arab Emirates','Uzbekistan','Vietnam','Yemen'];

let asia_rur = [];
let asia_urb = [];
let AsiaArray = [];

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
            
            let temp_obj = {
                year: filteredArray[indexYear],
                rur_pop: filteredArray[indexValue],
            };
            
            arr_rural.push(temp_obj);

        }
        else if(filteredArray[indexIndicatorCode] === "SP.URB.TOTL.IN.ZS"){
            
            let temp_obj = {
                year: filteredArray[indexYear],
                urb_pop: filteredArray[indexValue],
            };

            arr_urban.push(temp_obj);

        }
        else if(filteredArray[indexIndicatorCode] === "SP.URB.GROW"){
            let temp_obj = {
                year: filteredArray[indexYear],
                growth_val: filteredArray[indexValue]
            }
            
            arr_ur_growth.push(temp_obj);
        }
    }

    for(let i=0;i<countries.length;i++) {
        if(countries[i]===filteredArray[indexCountry]) {
            if(filteredArray[indexIndicatorCode]==="SP.RUR.TOTL") {
                let outobj = {
                    country: filteredArray[indexCountry],
                    rur_val: filteredArray[indexValue]
                }
                asia_rur.push(outobj);
            }
            else if(filteredArray[indexIndicatorCode]==="SP.URB.TOTL") {
                let outobj = {
                    country: filteredArray[indexCountry],
                    urb_val: filteredArray[indexValue]
                }
                asia_urb.push(outobj);
            }                        
        }
    }


}).on('close', () => {
console.log("here.....")
    for(i=0;i<arr_rural.length;i++) {
        for(j=0;j<arr_urban.length;j++) {
            if(i===j) {
                let temp_Obj = Object.assign(arr_rural[j],arr_urban[j]);
                /**********  pushing the objects to Array of Objects  *********/
                newArray.push(temp_Obj);
            }
        }
    }

    for(i=0;i<asia_rur.length;i++){
        for(j=0;j<asia_urb.length;j++){
            if(i===j){
                let temp_Obj = Object.assign(asia_rur[j],asia_urb[j]);
                AsiaArray.push(temp_Obj);
            }
            
        }
    }

    // for(i=0;i<asia_rur.length;i++){
    //     for(j=0;j<asia_urb.length;j++){
    //         if(i===j){
    //             let temp_obj = {
    //                 country: countries[i],
    //                 rur_pop: asia_rur[i],
    //                 urb_pop: asia_urb[i]
    //             }
    //             newArrayAsia.push(temp_obj);
    //         }
            
    //     }
    // }

    // for(i=0;i<asia.length;i++){
    //     let temp_obj = {
    //         country: asia[i],
    //         population: asia_rur[i] + asia_urb[i]
    //     }
    //     //console.log(temp_obj);
    //     newArrayAsia.push(temp_obj);
    // }

    newArrayGrowth = arr_ur_growth;
    /**********  creating JSON file from Array of Objects  *********/
    var myJSON = JSON.stringify(newArray, 1,1);
    var myJSON2 = JSON.stringify(newArrayGrowth, 1, 1);
    var myJSON3 = JSON.stringify(AsiaArray, 1, 1);
    fs.writeFile("output.json", myJSON, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file1 has been saved.");
    });
    fs.writeFile("output2.json", myJSON2, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file2 has been saved.");
    });
    fs.writeFile("output3.json", myJSON3, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file3 has been saved.");
    });

});