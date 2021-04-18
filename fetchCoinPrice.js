const cheerio = require('cheerio');
const axios = require('axios');
const jsonFileObj = require('./createJSONfile');

async function coinPriceInfo(site){
    try{
        
        const { data } = await axios({
            method: "GET",
            url: site,
        })
        
        const $ = cheerio.load(data);
        const elemSelector = '#__next > div > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr'

        const keys = [
            'rank',
            'name',
            'price',
            '24h',
            '7d',
            'marketCap',
            'volume',
            'circulatingSupply'
        ]

        const coinArr = [];

        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0;
            let coinObj = {};

            if(parentIdx <= 9){
                $(parentElem).children().each((childIdx, childElem) => {
                    let tdValue = $(childElem).text();
                    
                    if(keyIdx === 1 || keyIdx === 6){
                        tdValue = $(`p:first-child`, $(childElem).html()).text();
                    }

                    if(tdValue){
                        coinObj[keys[keyIdx]] = tdValue;
                        keyIdx++;
                    }
                })
                coinArr.push(coinObj);     
            }
        })
        // Display Cryptocoins Info on console
        console.table(coinArr);

        // Pass Cryptocoins Array to create JSON File
        let filePath = jsonFileObj.fileCreate(coinArr);
        console.log("JSON File created at " + filePath);

    }catch(err){
        console.log(err);
    }
}
// coinPriceInfo("https://www.coinmarketcap.com/");

module.exports = {
    cryptoCoinInfo: coinPriceInfo
}