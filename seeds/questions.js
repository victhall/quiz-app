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
      options: ['Salt and Pepper', 'Turmeric and Curry', 'Star Anise and Ginger', 'Pepper and Mustard'],
      correct_option: 'Pepper and Mustard',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'What is used to make hummus?',
      options: ['Pigeon Peas', 'Butter Beans', 'Lentils', 'Chickpeas'],
      correct_option: 'Chickpeas',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'Which famous soft drink was invented in 1892?',
      options: ['Pepsi', 'Fanta', 'Coca-Cola', 'Root Beer'],
      correct_option: 'Coca-Cola',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'How much caffeine needs to be taken out of coffee for it to be described as decaffeinated?',
      options: ['10%', '88%', '97%', '99%'],
      correct_option: '97%',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'If you ordered an Omelet Arnold Bennett, what fish would you find in it?',
      options: ['Cod', 'Salmon', 'Haddock', 'Halibut'],
      correct_option: 'Haddock',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'What does \'Dorito\' actually mean?',
      options: ['Triangle', 'Nacho', 'Little Golden Things', 'Cheese Chips'],
      correct_option: 'Little Golden Things',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'Baked beans are traditionally made from what type of bean?',
      options: ['Haricot Beans', 'Black Beans', 'Pinto Beans', 'Flat Beans'],
      correct_option: 'Haricot Beans',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'If you asked for \'unagi\' in a Japanese restaurant, what would you get?',
      options: ['Sea Urchin', 'Eel', 'Fish Roe', 'Snails'],
      correct_option: 'Eel',
      triviaId: '623bd658ba64163af1f557c2'
    },
    {
      question: 'Which of these is another name for growth hormone?',
      options: ['Somatotrophin', 'Epinephrine', 'Glucagon', 'Insulin'],
      correct_option: 'Somatotrophin',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'What is the scientific name for red blood cells?',
      options: ['Leukocytes', 'Erythrocytes', 'Thrombocytes', 'Lymphocytes'],
      correct_option: 'Erythrocytes',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'Which of these disorders is also called Cooley anemia?',
      options: ['Pernicious Anemia', 'Sickle Cell Anemia', 'Megaloblastic Anemia', 'Thalassemia'],
      correct_option: 'Thalassemia',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'The auditory, or acoustic, nerve connects the brain with the ear. Its two parts have separate functions. One of the functions is hearing. What is the other?',
      options: ['Smell', 'Wax Production', 'Balance and Equilibrium', 'Sleep Regulation'],
      correct_option: 'Balance and Equilibrium',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'Where in the body are the adrenal glands located?',
      options: ['In the Brain', 'Under the Tongue', 'Below the Ears', 'Above the Kidneys'],
      correct_option: 'Above the Kidneys',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'Where in the human body are red blood cells produced?',
      options: ['Spleen', 'Liver', 'Bone Marrow', 'Pancreas'],
      correct_option: 'Bone Marrow',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'What determines the blood group in a person?',
      options: ['White Blood Cells', 'Platelets', 'Red Blood Cells', 'Plasma'],
      correct_option: 'Red Blood Cells',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'What digestive fluid is stored in the gallbladder?',
      options: ['Urea', 'Insulin', 'Bile', 'Pepsin'],
      correct_option: 'Bile',
      triviaId: '623bd658ba64163af1f557c3'
    },
    {
      question: 'What stuffed animal does Stewie temporarily replace Rupert with in "The Talented Mr. Stewie?"',
      options: ['Tiger', 'Giraffe', 'Dog', 'Dinosaur'],
      correct_option: 'Giraffe',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'Which of these characters is directly responsible for driving Patrick Pewterschmidt insane?',
      options: ['Jackie Gleason', 'Peter Griffin', 'Chris Farley', 'Rodney Dangerfield'],
      correct_option: 'Jackie Gleason',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'What does Quagmire\'s Quagfest celebrate?',
      options: ['Marriage', 'Family Reunion', 'Birthday', '1000th Sexual Partner'],
      correct_option: '1000th Sexual Partner',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'What\'s Brian Griffin\'s Twitter handle?',
      options: ['@briangriffin1', '@bark', '@dogbackwards', '@bdog'],
     correct_option: '@dogbackwards',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'What color is Lois\' hair in the test pilot of the show',
      options: ['Black', 'Brunette', 'Blonde', 'Red'],
      correct_option: 'Blonde',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'What is the name of Quagmire\'s long lost daughter?',
      options: ['Connie', 'Courtney', 'Meg', 'Angela'],
      correct_option: 'Courtney',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'What is the name of the dog that replaced Brian shortly after his death?',
      options: ['Vinny', 'Jasper', 'New Brian', 'Tommy'],
      correct_option: 'Vinny',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'Which one of these was NOT a classic literature book Family Guy parodied in "High School English?"',
      options: ['Of Mice and Men', 'The Great Gatsby', 'The Adventures of Huckleberry Fin', 'Lord of the Flies'],
      correct_option: 'Lord of the Flies',
      triviaId: '624602319be92623ec5aebe6'
    },
    {
      question: 'How many seasons did The Office run for?',
      options: ['9', '4', '12', '6'],
      correct_option: '9',
      triviaId: '623bd658ba64163af1f557c4'
    },
    {
      question: 'What was the fictional name of the hospital the Scrubs stars worked in?',
      options: ['County General', 'St. Eligius', 'Sacred Heart', 'Seattle Grace'],
      correct_option: 'Sacred Heart',
      triviaId: '623bd658ba64163af1f557c4'
    },
    {
      question: 'How many episodes of Game of Thrones graced our screens during the 2000s',
      options: ['73', '99', '65', '103'],
      correct_option: '73',
      triviaId: '623bd658ba64163af1f557c4'
    },
    {
      question: 'What year did the hit series "The Girls Next Door" premiere?',
      options: ['2008', '2002', '2005', '2001'],
     correct_option: '2005',
      triviaId: '623bd658ba64163af1f557c4'
    },
    {
      question: 'Breaking Bad was one of the most popular TV shows to come from the 2000s, but how many networks passed on it?',
      options: ['5', '10', '4', '8'],
      correct_option: '4',
      triviaId: '623bd658ba64163af1f557c4'
    },
    {
      question: 'What TV show were these characters from: Ted, Robin, Barney, Lily, and Marshall?',
      options: ['How I Met Your Mother', 'The Big Bang Theory', 'Friends', 'The Office'],
      correct_option: 'How I Met Your Mother',
      triviaId: '623bd658ba64163af1f557c4'
    },
    {
      question: 'Finish the "Friends" theme song lyric: "Your job\'s a joke, you\'re broke, your love life\'s ___"',
      options: ['Full of Hate', 'Really Lame', 'D.O.A', 'Fine'],
      correct_option: 'D.O.A',
      triviaId: '623bd658ba64163af1f557c4'
    },
    {
      question: 'What was the relationship between Will and Grace from "Will and Grace"?',
      options: ['Best Friends', 'Enemies', 'Lovers', 'Cousins'],
      correct_option: 'Best Friends',
      triviaId: '623bd658ba64163af1f557c4'
    }
  ];
  
  const seedDB = async () => {
    await Questions.deleteMany({});
    await Questions.insertMany(seedQuestions);
};

  seedDB().then(() => {
      mongoose.connection.close();
  });