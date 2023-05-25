const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');
dotenv.config();



const app = express();

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

// GET ALL RECIPES
app.get('/recipes', (req, res) => {
    Recipe.find()
        .then(result => {
        //  res.send(result)
            res.render('recipes', { recipes: result })
        })
        .catch(err => console.log(err))
})


// Create a new recipe
app.post('/new-recipe', (req, res) => {
    const { receipeName, receipeTime, ingredeints, serves } = req.body;
    const recipe = new Recipe({ receipeName, receipeTime, ingredeints, serves });
console.log(recipe);

    recipe.save()
      .then(() => {
        res.send('Recipe saved to database');
      })
      .catch((err) => {
        res.json({err : err})

      });
  });

//   Delete  a recipe
app.delete('/delete-receipe/:id', (req, res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)

        .then(result => {
            res.send('Recipe deleted from database');
        })
        .catch(err => console.log(err))
})

// Update a recipe
app.put('/update-receipe/:id', (req, res) => {
    const id = req.params.id;
    const { receipeTime, serves } = req.body;
    Recipe.findByIdAndUpdate(id, { receipeTime, serves })

        .then(result => {
            res.send('Recipe updated in database');
        })
        .catch(err => console.log(err))
})

   

// DATABASE CONNECTION

app.listen(process.env.PORT , () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Database connected successfully'),
        console.log(`Server running on port ${process.env.PORT}`))
        .catch(err => console.log('Error connecting to database : ' + err));


   
})


app.get('/', (req, res) => {
res.redirect('/recipes')
}
);





