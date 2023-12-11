'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const OpenAI = require('openai');


const Themer = {};
const username = process.env.username;
const password = process.env.password;
const clusterName = process.env.clusterName;
const apikey= process.env.OPENAI_API_KEY;


const openai = new OpenAI(apikey);  

Themer.makeTheme = async function (req, res, next) {
    try {
        const theme = req.query.theme;
        const existingTheme = await getThemeFromDB();

        const phrases = await generatePoemTiles(theme, existingTheme);

        await saveThemeToDB({ theme, phrases });

        res.status(201).send({ phrases });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

Themer.fetchTheme = async function (req, res, next) {
    try {
        const themeName = req.query.themeName; // Assuming themeName is the parameter for the specific theme
        const theme = await getThemeFromDB(themeName);
        res.status(200).send({ theme });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

Themer.fetchAllThemes = async function (req, res, next) {
   
     try {
            
        await mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.wopnada.mongodb.net/?retryWrites=true&w=majority`);
        const db = mongoose.connection;
        const collection = db.collection('themes');
    
        const responses = await collection.find({}).toArray();
        res.status(200).send({ responses });
     } finally {
        await mongoose.disconnect();
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
        max_tokens: 150,  // Adjust based on your preference
        n: 1,  // Number of phrases to generate
        temperature: 0.75,  // You can experiment with temperature
        response_format: { type: 'json_object' },  // Enable JSON mode
    });

    const phrases = response.choices.map(choice => choice.message.content.trim());
    return phrases;
}

//response.choices[0].message.content

async function saveThemeToDB(response) {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.wopnada.mongodb.net/?retryWrites=true&w=majority`);
        const db = mongoose.connection;
        const collection = db.collection('themes');

        // Insert the response into the database
        await collection.insertOne(response);
    } finally {
        await mongoose.disconnect();
    }
}

async function getThemeFromDB(themeName) {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.wopnada.mongodb.net/?retryWrites=true&w=majority`);
        const db = mongoose.connection;
        const collection = db.collection('themes');

        // Retrieve the specific theme from the database based on themeName
        const response = await collection.findOne({ theme: themeName });
        return response ? [response] : []; // Return an array for consistency with other functions
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = Themer;


