/* NOTICE - THE FOLLOWING FUNCTIONS ARE NOT USED IN THIS APP - READING THROUGH THESE FUNCTIONS MAY BE CONFUSING*/


//creates a sub-object of datesOfCategoryLikes & likesCategoryCount, based on the top X categories selected
//this process is necessary for our area chart
function getLikesCountAndDatesSubObjects(topCategories, likesCountAndDates) {

    var datesOfCategoryLikes = likesCountAndDates['datesOfCategoryLikes'];
    var likesCategoryCount = likesCountAndDates['likesCategoryCount'];

    var datesOfCategoryLikesSubObj = {};
    var likesCategoryCountSubObj = {};

    for (var category in datesOfCategoryLikes) {

        if (topCategories.indexOf(category) > -1) {
            datesOfCategoryLikesSubObj[category] = datesOfCategoryLikes[category];
            likesCategoryCountSubObj[category] = likesCategoryCount[category];
        }
    }

    //see function declaration below
    return combineLikesCountAndDatesSubObj(datesOfCategoryLikesSubObj, likesCategoryCountSubObj);
}

/*
The function below combines datesOfCategoryLikesSubObj & likesCategoryCountSubObj

Example:

datesOfCategoryLikesSubObj = {
              "Movie": [Date, Date, Date],
              "Model": [Date, Date, Date]
            };

likesCategoryCountSubObj = {
              "Movie": 23,
              "Model":12
            };

combinedLikesCountAndDatesSubObj = {
              "Movie": [[Date, Date, Date], 23],
              "Model": [[Date, Date, Date], 12]
            };
*/
function combineLikesCountAndDatesSubObj(datesOfCategoryLikesSubObj, likesCategoryCountSubObj) {
    var combinedLikesCountAndDatesSubObj = {};

    for (var category in datesOfCategoryLikesSubObj) {
        combinedLikesCountAndDatesSubObj[category] = [
            likesCategoryCountSubObj[category],
            datesOfCategoryLikesSubObj[category]
        ]
    }

    return combinedLikesCountAndDatesSubObj;
}

function getKeyByValue(object, value) {
  for( var prop in object ) {
      if( object.hasOwnProperty( prop ) ) {
           if( object[prop] === value )
               return prop;
      }
  }
}
