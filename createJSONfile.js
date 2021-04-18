const fs = require('fs');
const path = require('path')

// create json files for coins array
function coinJSON(coinArr){
    let coinFilePath = path.join("Cryptocoins"+".json");
    if(!fs.existsSync(coinFilePath)){
        let jsonFile = fs.createWriteStream(coinFilePath);
        jsonFile.end();
    }
    return coinFilePath;
}

module.exports = {
    fileCreate: coinJSON
}