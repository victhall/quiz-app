const mongoose = require('mongoose');
const Trivia = require('../models/trivia')

mongoose.connect('mongodb://localhost:27017/quiz-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Mongo connection open');
    })
    .catch((err) => {
        console.log(err);
    });

  const seedTrivia = [
    {
      title: 'So You Think You\'re a Foodie?',
      description: 'Food, glorious food! We all eat it, and we all love it, but let\'s be honest. With so many different cuisines, ingredients and fun facts about food trivia though, it can be tricky to keep track of just what you might know about food. Whether it\'s for fuel or you\'re looking at a gourmet dish, why not put your brain to the test and see how much you know.',
      is_public: true,
    }
  ];
  
  const seedDB = async () => {
    await Trivia.deleteMany({});
    await Trivia.insertMany(seedTrivia);
};

  seedDB().then(() => {
      mongoose.connection.close();
  });