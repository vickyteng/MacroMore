var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
//var dataUtil = require("./data-util");
var _ = require('underscore');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

/* jQuery
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
*/

var Recipe = require('./models/Recipe');
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

// Load environment variables
dotenv.load();

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB, {
    useMongoClient: true
});
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});


/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */
// Have 5 navigation options:
/*  1. All Recipes (returns all recipes, low carb, high protein, & rest)
    2. Low Calorie
    3. Low Fat Recipes
    4. Low Carb Recipes
    5. High Protein Recipes
*/
// Have 10 endpoints, at least 5 are API
/*  1. /
    2. /api/getRecipes *
    3. /addRecipe
    4. /api/addRecipe *
    5. /review
    6. /api/getReviews *
    7. /addReview
    8. /api/addReview *
    9. Low Carb Recipes (can submit low carb recipes)
    10. High Protein Recipes (can submit high protein recipes)
    11. /api/getLowCarb *
    12. Low Fat Recipes
    13. Low Calorie Recipes


function onKeyUp() {
        console.log("this is happening");

        var count = 0;
        $("#recipeList").empty();
        var s = $(this).val();

        var r = s.toLowerCase();

         Recipe.find({}, function(err, recipe) {
             if (err) throw err;
             var count = 0;

             _.each(recipe, function(i) {
                 var name = i.name.toLowerCase();
                 if (r == name) {
                     $(this).show();
                     count++;
                 } else {
                     $(this).fadeOut();
                 }
             });
         });
         $("#recipeList").append("Number of Recipes: " + count);
};


app.get('/index.js', function(req, res) {
    res.sendFile(`${process.env.PWD}/index.js`);
});*/

// all recipes
 app.get('/', function(req, res) {
     Recipe.find({}, function(err, recipe) {
         if (err) throw err;


         return res.render('allRecipes', {
              recipe: recipe
          });
    });
});

// Api/All recipes
app.get('/api/getRecipes', function(req,res){
    Recipe.find({}, function(err, recipe) {
        if (err) throw err;

        return res.json(recipe);
    });
});

// add recipe WORKS
 app.post('/', function(req, res) {
     var name = req.body.name;
     var author = req.body.author;
     var servings = req.body.servings;
     var calories = req.body.calories;
     var protein = req.body.protein;
     var carbs = req.body.carbs;
     var fats = req.body.fats;
     var ingredients = req.body.ingredients;
     var directions = req.body.directions;
     var newRecipe = new Recipe ({
         name: name,
         author: author,
         servings: servings,
         calories: calories,
         protein: protein,
         carbs: carbs,
         fats: fats,
         ingredients: ingredients,
         directions: directions,
         reviews: []
     });
     // Save new recipe
     newRecipe.save(function(err) {
         if (err) throw err;

         return res.redirect('/');
     });
 });

// API endpoint to post
 app.post('/api/getRecipes', function(req, res) {
     var name = req.body.name;
     var author = req.body.author;
     var servings = req.body.servings;
     var calories = req.body.calories;
     var protein = req.body.protein;
     var carbs = req.body.carbs;
     var fats = req.body.fats;
     var ingredients = req.body.ingredients;
     var directions = req.body.directions;
     var newRecipe = new Recipe ({
         name: name,
         author: author,
         servings: servings,
         calories: calories,
         protein: protein,
         carbs: carbs,
         fats: fats,
         ingredients: ingredients,
         directions: directions,
         reviews: []
     });
     // Save new recipe
     newRecipe.save(function(err) {
         if (err) throw err;

         return res.json(newRecipe);
     });
 });

// api/getReviews WORKS
app.get('/api/:id/getReviews', function(req,res) {
    // Save recipe to database
    Recipe.findOne({ _id: req.params.id }, function(err, recipe) {
        if (err) throw err;

        var reviews = recipe.reviews;

        res.json(reviews);
    });
});

// view HTML form for add review WORKS
app.get('/add/:id', function(req,res) {
    Recipe.findOne({ _id: req.params.id }, function(err, recipe) {
        if (err) throw err;

        var reviews = recipe.reviews;

        return res.render('recipe', {
             recipe: recipe,
             review: reviews
        });
    });
});

// Add review WORKS DO NOT TOUCH
 app.post('/add/:id', function(req, res) {
     Recipe.findOne({ _id: req.params.id }, function(err, recipes) {
         if (err) throw err;
         if (!recipes) return res.send('No recipe found with that ID.');

         recipes.reviews.push({
             rating: parseFloat(req.body.rating),
             comment: req.body.comment,
             image: req.body.image,
             author: req.body.author,
             date: req.body.date
         });

         recipes.save(function(err) {
             if (err) throw err;
             res.redirect('/add/' + req.params.id);
         });
     });
 });

 // add review thru API endpoint
 app.post('/api/add/:id', function(req, res) {
     Recipe.findOne({ _id: req.params.id }, function(err, recipes) {
         if (err) throw err;
         if (!recipes) return res.send('No recipe found with that ID.');

         recipes.reviews.push({
             rating: parseFloat(req.body.rating),
             comment: req.body.comment,
             image: req.body.image,
             author: req.body.author,
             date: req.body.date
         });

         recipes.save(function(err) {
             if (err) throw err;
             res.json(recipes);
         });
     });
 });

// Low Carb Recipes
 app.get('/lowcarb', function(req,res) {
     Recipe.find({}, function(err, recipes) {
         if (err) throw err;

         var lowcarb = [];
         if (!recipes) return res.send('No low carb recipes found.');
         _.each(recipes, function(i) {
             if (i.carbs < 50) {
                 lowcarb.push(i);
             }
         });

         return res.render('lowcarb', { recipe: lowcarb });
     });
 });

// api/getLowCarb
 app.get('/api/getLowCarb', function(req,res) {
     Recipe.find({}, function(err, recipes) {
         if (err) throw err;

         var lowcarb = [];
         if (!recipes) return res.send('No low carb recipes found.');
         _.each(recipes, function(i) {
             if (i.carbs < 50) {
                 lowcarb.push(i);
             }
         });

         return res.json(lowcarb);
     });
 });

// High Protein Recipes
 app.get('/highprotein', function(req,res) {
     Recipe.find({}, function(err, recipes) {
         if (err) throw err;

         var highprotein = [];
         if (!recipes) return res.send('No high protein recipes found.');

         _.each(recipes, function(i) {
             if (i.protein > 20) {
                 highprotein.push(i);
             }
         });

         return res.render('highprotein', { recipe: highprotein });
     });
 });

 // Low Fat Recipes
 app.get('/lowfat', function(req,res) {
     Recipe.find({}, function(err, recipes) {
         if (err) throw err;

         var lowfat = [];
         if (!recipes) return res.send('No low fat recipes found.');

         _.each(recipes, function(i) {
             if (i.fats < 10) {
                 lowfat.push(i);
             }
         });

         return res.render('lowfat', { recipe: lowfat });
     });
 });

 // Low Calorie Recipes
 app.get('/lowcalorie', function(req,res) {
     Recipe.find({}, function(err, recipes) {
         if (err) throw err;

         var lowcal = [];
         if (!recipes) return res.send('No low calorie recipes found.');

         _.each(recipes, function(i) {
             if (i.calories <= 300) {
                 lowcal.push(i);
             }
         });

         return res.render('lowcal', { recipe: lowcal });
     });
 });

 // Deletes recipe
 app.delete('/delete/:id', function(req, res) {
      // Find recipe by id
      Recipe.findByIdAndRemove(req.params.id, function(err, recipe) {
          if (err) throw err;
          if (!recipe) {
              return res.send('No recipe found with that ID.');
          }
          res.send('Successfully deleted recipe.');
      });
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});
