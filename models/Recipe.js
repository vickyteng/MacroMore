var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema();
reviewSchema.add({
	rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
	comment: {
        type: String
    },
    image: {
        type: String
    },
	author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

var recipeSchema = new Schema();
recipeSchema.add({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        min: 1,
        required: true
    },
    calories: {
        type: Number,
        min: 1,
        required: true
    },
    protein: {
        type: Number,
        min: 0,
        required: true
    },
    carbs: {
        type: Number,
        min: 0,
        required: true
    },
    fats: {
        type: Number,
        min: 0,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    reviews: [reviewSchema]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
