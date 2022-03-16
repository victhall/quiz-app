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
    },
    {
      title: 'Exploring the Human Body',
      description: 'How well do you really know your body? This quiz will test what you know about the parts of the human body and how they work or don\'t. You\'ll need to be a master of medical terminology to get a high score.',
      is_public: true,
    },
    {
      title: 'Do you know your 2000s TV Trivia?',
      description: 'Good day, and welcome to the beginning of our 2000s TV trivia questions and answers! In this section, you\'ll be tested on 2000s TV across the genres, characters, stats, the who\'s, what\'s when\'s, where\'s and why\'s. Here you will find some super-easy questions, some a little trickier, and some that\'ll have you racking your brains for answers you\'re almost sure you know! But, it\'s all in fun! Ready to play? Let\'s go!',
      is_public: true,
    },
    {
      title: 'Think You Know Everything About Family Guy?',
      description: 'Since 1999, Family Guy has been making fans laugh with hilarious jokes, cutaway gags, and parodies about pop culture. To celebrate over two decades of the animated sitcom, we\'ve come up with a trivia quiz that tests fans\' knowledge of the show.Below, we\'ve compiled some challenging questions from across every season that you\'re going to need to wrack your brain to solve.',
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