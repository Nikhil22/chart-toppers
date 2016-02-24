function getLikesCountAndDates(allLikesArray) {

    //stores the total 'like' count for each category
    var likesCategoryCount = {};

    //stores all the dates @ which each category was liked
    var datesOfCategoryLikes = {};

    allLikesArray.map(function(like) {
        var category = like['category'];
        likesCategoryCount[category] = (likesCategoryCount[category] || 0) + 1;

        if (datesOfCategoryLikes.hasOwnProperty(category)) {
          datesOfCategoryLikes[category].push(new Date(like['created_time']));
        }else {
          datesOfCategoryLikes[category] = [new Date(like['created_time'])]
        }

    });
    return {
      "likesCategoryCount": likesCategoryCount,
      "datesOfCategoryLikes": datesOfCategoryLikes
    };
}

function sortLikesCountDesc(likesCategoryCount) {
    return Object.keys(likesCategoryCount).sort(function(a, b) { return likesCategoryCount[b] - likesCategoryCount[a] });
}

function getTopXCategoriesLiked(sortedLikesCount, numCategories) {
    var topCategories = [];
    for (var count = 0; count < numCategories; count++) {
        topCategories.push(sortedLikesCount[count])
    }
    return topCategories;
}

module.exports = {
    "getLikesCountAndDates": getLikesCountAndDates,
    "sortLikesCountDesc": sortLikesCountDesc,
    "getTopXCategoriesLiked": getTopXCategoriesLiked
}
