# Snippet Poems Backend Server
A digital magnet poetry board for creative idea generation. 
This server serves the front-end application linked below. 

# Deployed Link for Front End

[Deployed Snippet Poems link](https://snippetpoems.netlify.app)

# Project Trello Board & User Stories

[Trello Project Board](https://trello.com/b/bibHc4z5/snippets-project)

# App Vision
It is a place for creative associations with a generated theme. Users could use this as a poetry app or a place to organize associated thoughts. It should be a place to have fun with little distraction. Users should be able to save, update, and delete their own poems. They should also be able to use custom themes generated on the spot with Open AI.

# Versions & Updates

### Version 3 (current)
*12-20-23*

- Edited mongoose requirements in PoemHandler & added it into Poem Schema, in an effort to address ghosting MongoDBNotConnecting error
- README updated 

### Version 2
*12-15-23*

- Updates request and adds authorization stuff.
- npm ERR! notsup Unsupported platform for fsevents@2.3.3: wanted {"os":"darwin"} (current: {"os":"linux"}) -- switched it to "darwin", "os", "linux"
- Requests all sent as expected to the front end locally.
- Routes set up for verification and for those without user needed via Express.
- authorization.js updated.
- General debugging. 

### Version 1
*12-10-23*

Server can make requests to OpenAI and get responses back-- currently this is a server path only, not available to the front end. Server can send saved JSON files to the front end. Basic model set up for the Poems paths. Function modules for the Theme generation, the fetch themes, and for the poem manipulations in the database are written.

Still to do for MVP:
- Verify that CRUD operations work for user's poems
- Verify that a user can send requests to OpenAI to generate a theme to use
- Verify users.
- Strech: limit usage of openAI, save generated themes to database for users to use

# Languages 
Please see package.json for detailed versions. 

Languages: Node, Mongoose, Express, Cors

Services: OpenAI API, Netlify, Render, MongoDB Atlas

# Database Model
![Server DB Model (1)](https://github.com/maddieamie/snippetbackend/assets/118625447/329bfcb9-c828-482a-a192-d1e4e07b7fab)
