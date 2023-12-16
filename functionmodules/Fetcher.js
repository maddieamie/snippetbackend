
'use strict'
const Witchy = require('../data/Witchy.json');
const Seattle = require('../data/Seattle.json');
const RPData = require('../data/RuPaul.json');
const BB = require('../data/BB.json');
const lgbt = require('../data/LGBT.json');

const Fetcher = {};


Fetcher.fetchSeattle = async function (req, res) {
try {
    //headers= req.headers.authorization;

    const innerArrayStr = await Seattle.phrases[0];

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

Fetcher.fetchWitchy = async function (req, res) {
    try {
        //headers= req.headers.authorization;
        const innerArrayStr = await Witchy.phrases[0];

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
            //headers= req.headers.authorization;
            const innerArrayStr = await RPData.phrases[0];
    
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

Fetcher.fetchBB = async function (req, res) {
    try {
        //headers= req.headers.authorization;
        const innerArrayStr = await BB.phrases[0];

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

Fetcher.fetchlgbt = async function (req, res) {
    try {
        //headers= req.headers.authorization;
        const innerArrayStr = await lgbt.phrases[0];

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