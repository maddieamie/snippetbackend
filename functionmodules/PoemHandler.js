'use strict'

const Poem = require('../model/Poem'); 

const PoemHandler = {};

PoemHandler.getPoems = function(req, res, next){

  
  console.log('User Email:', req.user.email);
  Poem.find({ email: req.user.email })
      .then(data => res.status(200).send(data))
      .catch(err => {
        console.error('Error:', err);
        next(err)});
};

PoemHandler.postPoems = function(req, res, next){

    const reqPoem = req.body;
    Poem.create({ ...reqPoem, email: req.user.email })
        .then(createdPoem => res.status(201).send(createdPoem.title))
        .catch(err => {
            console.error('Error:', err);
            next(err)});
}

PoemHandler.deletePoems = function (req, res, next) {
    const { id } = req.params;
  
    Poem.findOne({ _id: id, email: req.user.email })
      .then((poem) => {
        if (!poem) {
          res.status(400).send('Unable to delete poem');
        } else {
          return Poem.findByIdAndDelete(id);
        }
      })
      .then(() => {
        res.status(204).send('That lil poem was deleted!');
      })
      .catch((error) => {
        console.error('Error:', error);
        next(error);
      });
  };
  

  PoemHandler.putPoems = function (req, res, next) {
    const { id } = req.params;
    //const { email } = req.user.email;
    const newpoem = req.body;
    
    console.log(id);
    console.log('the new poem is:', newpoem);
    // Find the poem based on criteria
    Poem.findOne({ _id: id})
      .then(existingPoem => {
        console.log(existingPoem);
        if (!existingPoem) {
          res.status(400).send('Unable to update poem');
        } else {
         
          return Poem.findByIdAndUpdate(
            id,
            { ...newpoem},
            { new: true, overwrite: true }
          );
        }
      })
      .then(updatedPoem => {
        res.status(200).send(updatedPoem);
      })
      .catch(err => {
        next(err);
      });
  };
  

  


module.exports = PoemHandler;