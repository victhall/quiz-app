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
    image: 'https://images.unsplash.com/photo-1614442042855-e17d53875286?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    owner: '623a0200a2613a302a9cd3e9'
  },
  {
    title: 'Exploring the Human Body',
    description: 'How well do you really know your body? This quiz will test what you know about the parts of the human body and how they work or don\'t. You\'ll need to be a master of medical terminology to get a high score.',
    is_public: true,
    image: 'https://images.unsplash.com/photo-1532153470116-e8c2088b8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    owner: '623a0200a2613a302a9cd3e9'
  },
  {
    title: 'Do you know your 2000s TV Trivia?',
    description: 'Good day, and welcome to the beginning of our 2000s TV trivia questions and answers! Ready to play? Let\'s go!',
    is_public: true,
    image:'https://i.ytimg.com/vi/9pjUyyW-1h4/maxresdefault.jpg',
    owner: '623a0200a2613a302a9cd3e9'
  },
  {
    title: 'Think You Know Everything About Family Guy?',
    description: 'Since 1999, Family Guy has been making fans laugh with hilarious jokes, cutaway gags, and parodies about pop culture. To celebrate over two decades of the animated sitcom, we\'ve come up with a trivia quiz that tests fans\' knowledge of the show.',
    is_public: true,
    image:'https://images.immediate.co.uk/production/volatile/sites/3/2021/02/family-guy-6db2d52.jpg?quality=90&resize=620,413',
    owner: '623a0200a2613a302a9cd3e9'
  }
];

const seedDB = async () => {
  await Trivia.deleteMany({});
  await Trivia.insertMany(seedTrivia);
};

seedDB().then(() => {
  mongoose.connection.close();
});