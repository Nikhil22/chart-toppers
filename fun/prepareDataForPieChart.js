function getPreparedDataForPieChart(likesCategoryCount) {
    var preparedPieChartData = [
      {
        "name": "Categories",
        "data": []
      }
    ];

    for (var category in likesCategoryCount) {
        preparedPieChartData[0]['data'].push(
            {
              "name": category,
              "y": likesCategoryCount[category]
            }
        );
    }
    return preparedPieChartData;
}

module.exports = {
    "getPreparedDataForPieChart": getPreparedDataForPieChart
}
