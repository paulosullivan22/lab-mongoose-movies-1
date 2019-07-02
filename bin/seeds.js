const mongoose = require('mongoose')
const Celebrity = require('../models/Celebrity')

mongoose.connect('mongodb://localhost/lab-mongoose-movies', 
 { useNewUrlParser: true })

const celebrities = [
  {
    name: "Angelina Jolie",
    occupation: "Actress",
    catchPhrase: "I cannot take it!"
  },
  {
    name: "Brad Pitt",
    occupation: "Actor",
    catchPhrase: "Fuck it!"
  },
  {
    name: "Matt Damon",
    occupation: "Actor",
    catchPhrase: "Matt Damon"
  }
]

Celebrity.insertMany(celebrities)
  .then(data => {
    console.log(`Successfully added ${data.length} celebrities to the DB`);
    mongoose.connection.close()
  })
  .catch(err => {
    console.log('Error adding celebrities to DB: ' + err )
  })