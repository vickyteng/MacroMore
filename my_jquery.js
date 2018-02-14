
var lowerCaseRecipes = {};
Recipe.find({}, function(err, recipe) {
    if (err) throw err;

    _.each(recipe, function(i) {
        lowerCaseRecipes[i.name.toLowerCase()] = i.name;
    });
});

$("#input_recipe").on("keyup", function() {
    console.log("this is happening");
    $("#recipeList").empty();
    var s = $("#input_recipe").val();

    var r = s.toLowerCase();
     // if input is a state, append
     //checkIfInArray(r);

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

});
