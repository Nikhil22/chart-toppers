function slicePie(topCategories, preparedPieChartData) {
    preparedPieChartData[0]['data'].forEach(function(category) {
        if (category['name'] === topCategories[0]) {
            category['selected'] = true;
            category['sliced'] = true;
        }
    })
}

module.exports = {
    "slicePie": slicePie
}
