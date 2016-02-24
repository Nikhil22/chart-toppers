$(function () {
    $.getJSON('http://localhost:8000/dataForBothCharts', function (data) {

      $('#areaChart').highcharts({
          chart: {
              type: 'area',
              zoomType: 'x',
              spacingBottom: 30
          },
          title: {
              text: 'Top 3 Categories Liked ~ Monthly Data'
          },
          subtitle: {
              text: '',
              floating: true,
              align: 'right',
              verticalAlign: 'bottom',
              y: 15
          },
          legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 150,
              y: 100,
              floating: true,
              borderWidth: 1,
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
          },
          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              title: {
                  text: '# of Likes'
              },
              labels: {
                  formatter: function () {
                      return this.value;
                  }
              }
          },
          tooltip: {
              formatter: function () {
                  return '<b>' + this.series.name + '</b><br/>' +
                      this.x + ': ' + this.y;
              }
          },
          plotOptions: {
              area: {
                  fillOpacity: 0.5
              }
          },
          credits: {
              enabled: false
          },
          series: data['preparedAreaChartData']
      });

    });
});
