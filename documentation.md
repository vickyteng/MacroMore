
# MacroMore

---

Name: Victoria Teng

Date: December 7th, 2017

Project Topic: Macro-Friendly Recipes

URL: https://final-project-bumbjjdafc.now.sh/

---


### 1. Data Format and Storage

Data point fields:
For recipeSchema:
- `Field 1`:     name               `Type: String`
- `Field 2`:     author             `Type: String`
- `Field 3`:     servings           `Type: Number`
- `Field 4`:     calories           `Type: Number`
- `Field 5`:     protein            `Type: Number`
- `Field 6`:     carbs              `Type: Number`
- `Field 7`:     fats               `Type: Number`
- `Field 8`:     ingredients        `Type: String`
- `Field 9`:     directions         `Type: String`
- `Field 10`:    reviewSchema       `Type: [reviewSchema]`

For reviewSchema:
- `Field 1`:     rating         `Type: String`
- `Field 2`:     comments       `Type: String`
- `Field 3`:     image          `Type: String`
- `Field 4`:     author         `Type: String`
- `Field 5`:     date           `Type: String`

recipeSchema:
```javascript
{
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
    servings: {
        type: Number,
        min: 1,
        required: true
    },
    calories: {
        type: Number,
        min: 1,
        required: true
    }
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
}
```

reviewSchema:
```javascript
}
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
}
```

### 2. Add New Data

HTML form route: `/`
POST endpoint route: `/api/getRecipes`

Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'https://final-project-bumbjjdafc.now.sh/api/getRecipes',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
       name: 'Soft-Boiled Eggs',
       author: 'Vic',
       servings: '1',
       calories: '60',
       protein: '9',
       carbs: '3',
       fats: '2',
       ingredients: 'Eggs',
       directions: 'Place a pot of water on stove on high heat until it is rapid boiling. With a slotted spoon, slowly place eggs into the bottom of the pot. Put a cover on and bring the heat down to medium. Let boil for 5-6 minutes. Remove the eggs from boiling water with a slotted spoon and place into an ice bath. Crack eggs to remove shell and enjoy!'
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

HTML form route: `/add/:id`
POST endpoint route: `/api/add/:id`

Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'https://final-project-bumbjjdafc.now.sh/api/add/:id',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
       rating: '5.0',
       author: 'Victoria',
       date: '12/5/17',
       comment: 'Tasty',
       image: 'http://cdn-image.myrecipes.com/sites/default/files/image/recipes/ay/08/chicken-rice-ay-1875585-x.jpg'
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getRecipes`

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. All Recipes -> `  /  `
2. Low Carb Recipes -> `  /lowcarb  `
3. High Protein Recipes -> `  /highprotein  `
4. Low Fat Recipes -> `  /lowfat  `
5. Low Calorie Recipes -> `  /lowcalorie  `
