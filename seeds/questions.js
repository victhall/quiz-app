const mongoose = require('mongoose');
const Questions = require('../models/questions')

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

  const seedQuestions = [
    {
      question: 'What are the top two most popular spices in the world?',
      options: ['salt and pepper', 'turmeric and curry', 'star anise and ginger', 'Pepper and Mustard'],
      correct_option: 'Pepper and Mustard'
    },
    {
      question: 'What is used to make hummus?',
      options: ['Pigeon Peas', 'Butter Beans', 'Lentils', 'Chickpeas'],
      correct_option: 'Chickpeas'
    },
    {
      question: 'Which famous soft drink was invented in 1892?',
      options: ['Pepsi', 'Fanta', 'Coca-Cola', 'Root Beer'],
      correct_option: 'Coca-Cola'
    },
    {
      question: 'How much caffeine needs to be taken out of coffee for it to be described as decaffeinated?',
      options: ['10%', '88%', '97%', '99%'],
      correct_option: '97%'
    },
    {
      question: 'If you ordered an Omelet Arnold Bennett, what fish would you find in it?',
      options: ['Cod', 'Salmon', 'Haddock', 'Halibut'],
      correct_option: 'Haddock'
    },
    {
      question: 'What does \'Dorito\' actually mean?',
      options: ['Triangle', 'Nacho', 'Little Golden Things', 'Cheese Chips'],
      correct_option: 'Little Golden Things'
    },
    {
      question: 'Baked beans are traditionally made from what type of bean?',
      options: ['Haricot Beans', 'Black Beans', 'Pinto Beans', 'Flat Beans'],
      correct_option: 'Haricot Beans'
    },
    {
      question: 'If you asked for \'unagi\' in a Japanese restaurant, what would you get?',
      options: ['Sea Urchin', 'Eel', 'Fish Roe', 'Snails'],
      correct_option: 'Eel'
    }
  ];
  
  const seedDB = async () => {
    await Questions.deleteMany({});
    await Questions.insertMany(seedQuestions);
};

  seedDB().then(() => {
      mongoose.connection.close();
  });