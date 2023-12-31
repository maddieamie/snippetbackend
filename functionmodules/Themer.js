'use strict';

require('dotenv').config();
const OpenAI = require('openai');
const ColorTheme = require('../data/Colorful.json');
const Theme = require('../model/Theme.js');


const Themer = {};

const apikey= process.env.OPENAI_API_KEY;


const openai = new OpenAI(apikey);  

Themer.makeTheme = async function (req, res, next) {
    try {
        const theme = req.query.theme;

        const existingTheme = await getThemeFromDB({theme, email: req.user.email});

        const phrases = await generatePoemTiles(theme, existingTheme);

        await saveThemeToDB({ email: req.user.email, theme, phrases });;

        res.status(201).send({ phrases });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error' );
    }
}

Themer.fetchTheme = async function (req, res, next) {
    try {
        const theme = req.query.theme; 
        const email = req.user.email;
        
        console.log('themename', theme)
        console.log('email', req.user.email)// Assuming themeName is the parameter for the specific theme
        const foundTheme = await getThemeFromDB({ theme, email });

        if (foundTheme && foundTheme.length > 0) {
            const array = foundTheme[0].phrases;
            res.status(200).send({ array });
        } else {
            const colors = ColorTheme[0].phrases;
            const innerArray = JSON.parse(colors);
            const phrases = innerArray.phrases;
            res.status(200).send({ phrases });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

// Themer.fetchUserTheme =async function (req, res, next) {
//     try {
//         const themeName = req.query.themeName; // Assuming themeName is the parameter for the specific theme
//         const theme = await getThemeFromDB(themeName);
//         res.status(200).send({ theme });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: 'Internal Server Error' });
//     }
// }

Themer.fetchAllThemes = async function (req, res, next) {
    try {
        const responses = await Theme.find({});
        res.status(200).send({ responses });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}



async function generatePoemTiles(theme, existingTheme) {
    const conversation = [
        { role: 'system', content: 'You are a helpful assistant designed to output JSON.' },
        { role: 'user', content: `Generate 20 magnet poetry phrases of one to three words related to the theme: ${theme}` },
    ];

    // Add existing theme to the conversation
    if (existingTheme && existingTheme.length > 0) {
        const previousTheme = existingTheme[0].theme;
        conversation.push({ role: 'assistant', content: `Last generated theme: ${previousTheme}` });
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: conversation,
        max_tokens: 150,  // Number of tokens 
        n: 1,  // Number of chat responses to generate
        temperature: 0.75,  // You can experiment with temperature
        response_format: { type: 'json_object' },  // Enable JSON mode
    });

    const phrases = response.choices.map(choice => choice.message.content.trim());
    // const innerArrayStr = phrases.phrases[0];

   // console.log('innerArrayStr:', innerArrayStr);

    const innerArray = JSON.parse(phrases);
    //console.log('innerArray', innerArray);

    // Access the phrases array
    const readyphrases = innerArray.phrases;
//return phrases
    return readyphrases;
}

//response.choices[0].message.content

async function saveThemeToDB(response) {
    try {
        const theme = new Theme(response);
        await theme.save();
        console.log('Theme saved successfully');
    } catch (error) {
        console.error(error);
        throw new Error('Internal MongoDB saving error');
    }
}

async function getThemeFromDB({ theme, email }) {
    try {
        const foundTheme = await Theme.find({ theme, email });
        return foundTheme;
    } catch (error) {
        console.error(error);
        throw new Error('Cannot find theme');
    }
}

module.exports = Themer;


