
'use strict'
const RegData = require('../data/Reg.json');
const Reg2Data = require('../data/Reg2.json');
const RPData = require('../data/RuPaul.json');

const Fetcher = {};


Fetcher.fetchReg = async function (req, res) {
try {
    const innerArrayStr = RegData.phrases[0];

   // console.log('innerArrayStr:', innerArrayStr);

    // Parse the inner array string as JSON
    const innerArray = JSON.parse(innerArrayStr);
    //console.log('innerArray', innerArray);

    // Access the phrases array
    const phrases = innerArray.phrases;

    //console.log('phrases', phrases);
   
    res.status(200).send(phrases);
}
catch (error) {
    console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
}
}

Fetcher.fetchReg2 = async function (req, res) {
    try {
        const innerArrayStr = Reg2Data.phrases[0];

        // console.log('innerArrayStr:', innerArrayStr);
     
         // Parse the inner array string as JSON
         const innerArray = JSON.parse(innerArrayStr);
         //console.log('innerArray', innerArray);
     
         // Access the phrases array
         const phrases = innerArray.phrases;
     
         //console.log('phrases', phrases);
        
         res.status(200).send(phrases);
    }
    catch (error) {
        console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
    }
}

Fetcher.fetchRP = async function (req, res) {
        try {
            const innerArrayStr = RPData.phrases[0];
    
            // console.log('innerArrayStr:', innerArrayStr);
         
             // Parse the inner array string as JSON
             const innerArray = JSON.parse(innerArrayStr);
             //console.log('innerArray', innerArray);
         
             // Access the phrases array
             const phrases = innerArray.phrases;
         
             //console.log('phrases', phrases);
            
             res.status(200).send(phrases);
        }
        catch (error) {
            console.error(error);
                res.status(500).send({ error: 'Internal Server Error' });
        }

}

/*
class Theme {
        constructor(phrases) {
            this.phrases = phrases;
        }
    }*/

module.exports = Fetcher;