
/********************************************
 * 
 *           BAR CHART STARTS HERE
 * 
 * ******************************************/

// Let our bardata be from a fn
var bardata = [];

for(var i=0; i < 30; i++) {
    bardata.push(Math.round(Math.random()*30 + 20));
}

//sortting in Ascending order
/*bardata.sort(function (a, b) {
    return a -b;
});*/

//margins
var margin = { top: 30, right: 30, bottom: 40, left: 50 }

var tempColor;

/*var height = 400,
    width = 1100,
    barWidth = 50,
    barOffset = 5;*/ 
    
//first takeoff the margins    
var height = 400 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right,
    barWidth = 50,
    barOffset = 5; 
    
//Linear scale   
var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height])  

//Ordinal scale
var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width], .5); //the .2 option is for space btn bars

//Color scale. { Based on Bardata width }
/*var colors = d3.scale.linear()
        .domain([0, bardata.length])
        .range(['#FFB832', '#C61C6F'])
*/

//More few colors and values in domain
var colors = d3.scale.linear()
        .domain([0, bardata.length*.33, bardata.length*.66,  bardata.length])
        //.range(['#FFB832', '#C61C6F', '#26BBD2', '#85992C'])
        .range(['#04756F', '#FF8C00', '#D90000', '#BEDB39'])
 
//  tooltip onhovering the bars 
 var toolTip = d3.select('body')
         .append('div')
         .style('position', 'absolute')  
         .style('padding', '0 10px')  
         .style('background', 'white')  
         .style('opacity', 0);  
    
//Our d3 object into a var then we animate the whole barchart    
 var myChart = d3.select('#barchart').append('svg')
            .style('background', '#262626')
//return back the margins 
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
    //now translate this
            .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
            .selectAll('rect').data(bardata)
            .enter().append('rect')
            .style('fill', function (d, i) {
                return colors(i);
    }) //can also pass "colors" rather than a fn
            .attr('width', xScale.rangeBand())
            .attr('x', function (d, i) { //take full width
                return xScale(i);
            })
            /*.attr('height', function (d) { //take full height
                //return yScale(d);
            })*/
            .attr('height', 0)
            /*.attr('y', function (d) {
                return height - yScale(d);
            }) */
            .attr('y', height)
//Events in D3. Others valid include all those in Js
        .on('mouseover', function (d) {
            
            toolTip.transition()
                .style('opacity', .9);
        
            toolTip.html(d)
                    .style('left', (d3.event.pageX - 35) + 'px')
                    .style('top', (d3.event.pageY - 35) + 'px')
            
            tempColor = this.style.fill;
            d3.select(this)
//D3 Animations here { transition().delay(500).duration(800) }
            .style("opacity", .5)
            .style("fill", 'yellow');
        })
        .on('mouseout', function (d) {
            d3.select(this)
            .style("opacity", 1) 
            .style("fill", tempColor);
        })
            
   myChart.transition()
           .attr('height', function (d) {
                return yScale(d);
            })
           .attr('y', function (d) {
                return height - yScale(d);
            })
            .delay(function (d, i) {
                return i * 20;
            })
            .duration(1400)
            .ease('elastic')
            
//creating the guides
//Vertical Guide
var vGuideScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([height, 0])

var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(10);

var vGuide = d3.select('svg').append('g')
            vAxis(vGuide)
            
            //move the vertical guides too
            vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
            vGuide.selectAll('path')
                    .style({ fill: 'none', stroke : '#AEEE00' })
            vGuide.selectAll('line')
                    .style({ stroke : '#AEEE00' })
            
 //Horizontal guide
 var hAxis = d3.svg.axis()
         .scale(xScale)
         .orient('bottom')
 //create a certain amount of divisions regardless of the amnt of ticks.
         .tickValues(xScale.domain().filter(function (d, i) {
             return !(i % (bardata.length/5));
        }));
            
 var hGuide = d3.select('svg').append('g');
            hAxis(hGuide)            
            
            //move the Horizontal guides to smae posn to graphic as well
            hGuide.attr('transform', 'translate('+ margin.left +', '+ (height + margin.top) +')');
            hGuide.selectAll('path')
                    .style({ fill: 'none', stroke : '#AEEE00' })
            hGuide.selectAll('line')
                    .style({ stroke : '#AEEE00' })
            
            
            
            
      
            
            
            
  /********************************************
 * 
 *           PIE CHART STARTS HERE
 * 
 * ******************************************/

  var width = 400,
          height = 400,
          radius = 200,
          colors = /*d3.scale.category20c()*/
          d3.scale.ordinal()
                  .range(['#595AB7','#A57706','#D11C24','#C61C6F','#BD3613','#2176C7']);
  
  var piedata = [
      { 
          label : "Polymerjs",
          value : 50
      },
      {
          label : "Node",
          value : 30
      },
      {
          label : "Requirejs",
          value : 50
      },
      {
          label : "Knockoutjs",
          value : 70
      },
      {
          label : "Angularjs",
          value : 50
      },
      {
          label : "Wallerbyjs",
          value : 50
      },
      {
          label : "Reactjs",
          value : 40
      }
  ]
  
  var pie = d3.layout.pie()
          .value(function (d) {
              return d.value;
        });
        
  var arc = d3.svg.arc()
          .outerRadius(radius) ;
  
  var myChart = d3.select('#piechart')
          .style('background', '#262626')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g').attr('transform', 'translate('+(width - 
                radius)+', '+(height - radius)+')')
          .selectAll('path').data(pie(piedata))
          .enter().append('g')
          .attr('class', 'slice')
  
        
   var slices = d3.selectAll('g.slice')
           .append('path')
          .attr('fill', function (d, i) {
              return colors(i);
          })
          .attr('d', arc);
  
  var text = d3.selectAll('g.slice')
          .append('text')
          .text(function (d, i) {
                return d.data.label;
          })
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('transform', function (d) {
                d.innerRadius = 0;
                d.outerRadius = radius;
                return 'translate(' +arc.centroid(d)+')';
          });