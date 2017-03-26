const app = angular.module('stockApp', []);
app.controller('stockCtrl', function($scope, $http) {
  $scope.stockData = [];

  // This will make an AJAX request to the specified route
  // and then we will store this in our $scope object
  // for use in our HTML code. We are using the data returned in the HTML table.
  $http.get('/api/stocks')
    .then(function(response) {
      // console.log(response.data);
      let stockData = response.data;
      $scope.stockData = stockData.children;
      createGraph(stockData);
    });

  // Here we use the D3.js library to create our stock graph
  function createGraph(quotes) {

    // main config
    var width = 960; // chart width
    var height = 700; // chart height
    var format = d3.format(",d");  // convert value to integer
    var color = d3.scaleOrdinal(d3.schemeCategory20);  // create ordial scale with 20 colors

    // svg config
    var svg = d3.select("#stock-chart").append("svg") // append to DOM
      .attr("width", width)
      .attr("height", height)
      .attr("class", "bubble");

    // tooltip config
    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "rgba(0, 0, 0, 0.75)")
      .style("border-radius", "6px")
      .style("font", "12px sans-serif")
      .text("tooltip");

      // bubble config
      var bubble = d3.pack(quotes)
        .size([width, height])  // chart layout size
        .padding(1);

      var nodes = d3.hierarchy(quotes).sum(function(d) { return d.price; });

      var node = svg.selectAll('.node')
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d) { return !d.children; })
        .append('g')
        .attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

      node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style('fill', function(d) { return color(d.data.symbol); })

        .on("mouseover", function(d) {
          tooltip.text(d.data.name + ": $" + d.data.price);
          tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

        node.append('text')
          .attr("dy", ".3em")
          .style('text-anchor', 'middle')
          .text(function(d) { return d.data.symbol; });
  }
});
