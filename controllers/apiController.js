var fun = require('../fun');
var fs = require('fs');

module.exports = function(app, dir) {

  app.get('/dataForBothCharts', function(req, res) {
    var dataForBothChartsJSON = fs.readFileSync(dir + '/data/dataForBothCharts.txt');
    res.send(dataForBothChartsJSON);
  });

  app.post('/index', function(req, res) {
    /* Utility - clean up */
    /* -------------------------------------------------------------------------------------------- */
    var responseObj = fun.utility.stringToObj(req.body.userLikes);
    var allLikesArray = fun.utility.getAllLikes(responseObj)['data'];

    /* Process category likes data */
    /* -------------------------------------------------------------------------------------------- */
    var likesCountAndDates = fun.processCategoryLikesData.getLikesCountAndDates(allLikesArray);
    var likesCategoryCount = likesCountAndDates['likesCategoryCount'];
    var datesOfCategoryLikes = likesCountAndDates['datesOfCategoryLikes'];

    //Just an array of strings (categories)
    var sortedLikesCategoryCountArray = fun.processCategoryLikesData.sortLikesCountDesc(likesCategoryCount);

    var topThreeCategoriesLiked = fun.processCategoryLikesData.getTopXCategoriesLiked(sortedLikesCategoryCountArray, 3)

    /* Prepare data for Pie chart */
    /* -------------------------------------------------------------------------------------------- */
    var preparedPieChartData = fun.prepareDataForPieChart.getPreparedDataForPieChart(likesCategoryCount);

    /* Prepare data for Area chart */
    /* -------------------------------------------------------------------------------------------- */
    var datesOfCategoryLikesSubObj =
      fun.prepareDataForAreaChart.getDatesOfCategoryLikesSubObjects(topThreeCategoriesLiked, datesOfCategoryLikes);

    var sortedDatesOfCategoryLikesSubObj =
      fun.prepareDataForAreaChart.sortDatesLikedAsc(datesOfCategoryLikesSubObj);

    var datesOfCategoryLikesSubObjByMonth =
      fun.prepareDataForAreaChart.calcNumLikesPerMonth(sortedDatesOfCategoryLikesSubObj);

    var preparedAreaChartData =
      fun.prepareDataForAreaChart.getPreparedDataForAreaChart(datesOfCategoryLikesSubObjByMonth);

    // Slice the pie chart to distinguish the most liked category
    fun.slicePie.slicePie(topThreeCategoriesLiked, preparedPieChartData)

    var dataForBothCharts = {
        "preparedPieChartData": preparedPieChartData,
        "preparedAreaChartData": preparedAreaChartData
    }

    fs.writeFileSync('data/dataForBothCharts.txt', JSON.stringify(dataForBothCharts));

    res.sendFile(dir + '/public/views/index.html');
  });

}
