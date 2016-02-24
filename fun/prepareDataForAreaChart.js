//creates a sub-object of datesOfCategoryLikes, based on the top X categories selected
//this process is necessary for our area chart
function getDatesOfCategoryLikesSubObjects(topCategories, datesOfCategoryLikes) {

    var datesOfCategoryLikesSubObj = {};

    for (var category in datesOfCategoryLikes) {

        if (topCategories.indexOf(category) > -1) {
            datesOfCategoryLikesSubObj[category] = datesOfCategoryLikes[category];
        }
    }

    return datesOfCategoryLikesSubObj;
}

function sortDatesLikedAsc(datesOfCategoryLikesSubObj) {
    var sortedDatesOfCategoryLikesSubObj = {};

    for (var category in datesOfCategoryLikesSubObj) {
        sortedDatesOfCategoryLikesSubObj[category] =
          datesOfCategoryLikesSubObj[category].sort(function(a, b) { return a - b });
    }
    return sortedDatesOfCategoryLikesSubObj;

}

//Check if a Date is the same month & year as given month & year inputs
function isSameMonthSameYear(theDate, month, year) {
    var dateMonth = theDate.getMonth();
    var dateYear = theDate.getFullYear();

    if (dateMonth === month && dateYear === year) {
        return true;
    }else {
      return false;
    }
}

//Check if a Date is a diff month & same year as given month & year inputs
function isDiffMonthSameYear(theDate, month, year) {
    var dateMonth = theDate.getMonth();
    var dateYear = theDate.getFullYear();

    if (dateMonth !== month && dateYear === year) {
        return true;
    }else {
      return false;
    }
}

/* THE FUNCTION BELOW IS A BIT LENGTHY BUT IT'S VERY STRAIGHTFORWARD: */

//DEFINITION: Find the number of likes each category received per month, starting from the month of the earliest 'like'
//RETURN VALUE: datesOfCategoryLikesSubObjByMonth
/*EXAMPLE of datesOfCategoryLikesSubObjByMonth var:
{
  "Movie": {
    "months": [
      {
          "month":"January",
          "year": "2019"
          "dates":"[]",
          "likeCount": "4"
      },

      {}...
   ]

  },
  {...}
}
*/

function calcNumLikesPerMonth(datesOfCategoryLikesSubObj) {
    var currentMonth = '';
    var currentYear = '';
    var currentMonthLikeCount = 0;

    var datesOfCategoryLikesSubObjByMonth = {};
    var datesInCurrentMonth = [];

    for (var category in datesOfCategoryLikesSubObj) {
        datesOfCategoryLikesSubObj[category].forEach(function(dateOfLike, index){

            if (currentMonth === '') currentMonth = dateOfLike.getMonth()
            if (currentYear === '') currentYear = dateOfLike.getFullYear();

            if (index === datesOfCategoryLikesSubObj[category].length - 1) {
              datesOfCategoryLikesSubObjByMonth[category]['months'].push({
                  "month": currentMonth,
                  "year": currentYear,
                  "dates": datesInCurrentMonth,
                  "likeCount": currentMonthLikeCount
               });

               currentMonth = dateOfLike.getMonth();
               currentYear = dateOfLike.getFullYear();
               currentMonthLikeCount = 1;
               datesInCurrentMonth = [dateOfLike];
            }

            if (isSameMonthSameYear(dateOfLike, currentMonth, currentYear)) {
                currentMonthLikeCount ++;
                datesInCurrentMonth.push(
                    dateOfLike
                )
            } else if (isDiffMonthSameYear(dateOfLike, currentMonth, currentYear)) {

                if (!datesOfCategoryLikesSubObjByMonth.hasOwnProperty(category)) {
                    datesOfCategoryLikesSubObjByMonth[category] = {"months":[]}
                }

                datesOfCategoryLikesSubObjByMonth[category]['months'].push({
                    "month": currentMonth,
                    "year": currentYear,
                    "dates": datesInCurrentMonth,
                    "likeCount": currentMonthLikeCount
                 });

                 currentMonth = dateOfLike.getMonth();
                 currentMonthLikeCount = 1;
                 datesInCurrentMonth = [dateOfLike];

            } else {

              if (!datesOfCategoryLikesSubObjByMonth.hasOwnProperty(category)) {
                  datesOfCategoryLikesSubObjByMonth[category] = {"months":[]}
              }

               datesOfCategoryLikesSubObjByMonth[category]['months'].push({
                  "month": currentMonth,
                  "year": currentYear,
                  "dates": datesInCurrentMonth,
                  "likeCount": currentMonthLikeCount
               });

                currentMonth = dateOfLike.getMonth();
                currentYear = dateOfLike.getFullYear();
                currentMonthLikeCount = 1;
                datesInCurrentMonth = [dateOfLike];

            }

        });
    }
    return datesOfCategoryLikesSubObjByMonth;
}

function getPreparedDataForAreaChart(datesOfCategoryLikesSubObjByMonth) {
    var preparedAreaChartData = [];

    for (var category in datesOfCategoryLikesSubObjByMonth) {

        var currentMonthData = [];

        datesOfCategoryLikesSubObjByMonth[category]['months'].forEach(function(currMonth) {
          var month = currMonth['month'];
          var year = currMonth['year'];
          var likeCount = currMonth['likeCount'];
          var dateFromMonthYear = new Date(year, month).toUTCString();

          currentMonthData.push(
              [dateFromMonthYear, likeCount]
            )
        });
        preparedAreaChartData.push(
            {
              "name":category,
              "data": currentMonthData
            }
        )
    }
    return preparedAreaChartData;
}

module.exports = {
    "getDatesOfCategoryLikesSubObjects": getDatesOfCategoryLikesSubObjects,
    "sortDatesLikedAsc": sortDatesLikedAsc,
    "calcNumLikesPerMonth": calcNumLikesPerMonth,
    "getPreparedDataForAreaChart": getPreparedDataForAreaChart
}
