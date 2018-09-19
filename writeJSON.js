exports.write = function(fs, JSON, fileName) {
    const path = "./output/" + fileName;
    fs.writeFile(path, JSON, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file" + fileName + " has been saved.");
    });
}