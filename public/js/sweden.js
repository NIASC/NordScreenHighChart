$(function () {
	
	var xaxis_value = $('input[name=x-axis]:checked').val();
	var country = 'sweden';
	
	//Not used currently
	var series = ["25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "All ages: 30-59 years"];
	
	
	//Define the chart options
	
	var initialChartOptions = {
			chart: {
				renderTo: 'lineChart'
			},
			title: {
				text: 'Cervical Test Coverage',
				x: -20
			},
			subtitle: {
	            text: null,
	            x: -20
	        },
			xAxis: {
				categories: []
			},
			yAxis: {
				title: {
					text: 'Test Coverage (%)'
				},
				min: 0,
				max: 100,
				plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
			},
			
			tooltip: {
	            valueSuffix: '%'
	        },
	        labels: {
	            items: [{
	                style: {
	                    left: '40px',
	                    top: '8px',
	                    color: 'black',
	                    font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
	                }
	                
	            }]
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        credits: {
                    text: 'NordScreen (licence: CC BY 4.0)'
                },
			series: []
        };
	
	
	var lineChart =  new Highcharts.Chart(initialChartOptions);
	
	
	
	    
	    
	
	
	//Define two possible dropdown list
	var indicator_dropdown = ["Follow-up time (years)",1, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5];
	//var year_dropdown = ["Choose calendar year",1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014];
	var year_dropdown = ["Choose calendar year",1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
	
	//Show the test coverage by calendar year when the page loads
	if($(".x-axis:radio:checked").val() === "year"){
		fill_dropdown(indicator_dropdown);
		drawLineChart('sweden', 'year', 5.5);
		$("#chartType").val("5.5");
	}
	
	
	//Radio button change function (Show test coverage according to selected indicators)
	$(".x-axis").change(function() {
		
		xaxis_value = this.getAttribute("value");
		
        if (xaxis_value === 'year') {
        	fill_dropdown(indicator_dropdown);
        	drawLineChart('sweden', 'year', 5.5);
        	$("#chartType").val("5.5");
        } 
        else if (xaxis_value === 'indicator'){
        	fill_dropdown(year_dropdown);
        	drawLineChart('sweden', 'indicator', 2014);
        	$("#chartType").val("2014");
        }
        else if (xaxis_value === 'age'){
        	fill_dropdown(year_dropdown);
        	drawLineChart('sweden', 'age', 2014);
        	$("#chartType").val("2014");
        }
        
        
	});
	
	//Function to fill the dropdown
	function fill_dropdown (array) {
		$('#chartType').empty();
		$.each(array, function(i, p) {
		    $('#chartType').append($('<option></option>').val(p).html(p));
		});	
		
	}
	
	
	//Function that associates the contents of two arrays as key-value pairs
	Array.prototype.associate = function (keys) {
		  var result = {};

		  this.forEach(function (el, i) {
		    result[keys[i]] = el;
		  });

		  return result;
	};
	
	//Function to capitalize the first letter of the string
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	
	
	
	//Function to draw the chart
	function drawLineChart(country, xaxis_value, type){
		//Remove all the series data in the beginning when the function is called.
		while (lineChart.series.length > 0) {
        	lineChart.series[0].remove(true);
		}
		
		//Another way to remove all the series data is to destroy the chart and again reinitialize it. Gives the same result as above loop.
		/*
		lineChart.destroy();
		lineChart =  new Highcharts.Chart(initialChartOptions);
		*/
		
		var xaxis_array = [];
		var xaxis_array_value = [];
		var c = {}
		var d = $.Deferred();
		

		if(xaxis_value === "year"){
			var url = httpdomain+"/assets/text_files/"+country+"_year/"+parseInt(type)+".txt";
		}
		else if (xaxis_value === "indicator"){
			var url = httpdomain+"/assets/text_files/"+country+"_indicator/"+parseInt(type)+".txt";
		}
		else if (xaxis_value === "age"){
			var url = httpdomain+"/assets/text_files/"+country+"_age/"+parseInt(type)+".txt";
		}
		
		
		
		$.get(url, function(data) {
				
					xaxis_array.length = 0;
					
					var array_data = data.split('\n');	
					
					var first_line = array_data[0];
					
					$.each(first_line.split(','), function(i, v) {
						if(i > 0){
							xaxis_array.push(v);
						}
						
					});
					
					
					$.each(array_data, function (key, value){
						
						if(key > 0){
							var line = value.split(',');
							xaxis_array_value.length = 0;
							var name;
							$.each(line, function(i, v) {
								
								if(i === 0){
									name = v;
								}
								else{
									xaxis_array_value.push(v);
								}
								
								if(i === line.length - 1){
									c[name]=xaxis_array_value.associate(xaxis_array);
								}
								
								
							});
						
						}
						
					});
					

		}).complete(d.resolve);
			
		
		
		
		$.when(d).done(function() {
		
			//xaxis_array = xaxis_array.sort((a, b) => a - b);
			//xaxis_array = xaxis_array.sort();
			//console.log(xaxis_array);
			lineChart.xAxis[0].setCategories(xaxis_array);

			$.each(c, function(key, value) {
				
				var data = [];
				data.length = 0;
			    
			    
			    $(xaxis_array).each(function (i, v) {
					if(v in value){
						data.push(parseFloat(value[v]));
					}
					else data.push(null);
				});
			    
			    
			    var series = { 
			    		name: key.capitalize(), 
			    		data:data
				};
			    
			    if(!(key === "All ages: 30-59 years" || key === "Follow-up time: 1 year")){
			    	series.visible = false;
			    }
			    
			    
			    lineChart.addSeries(series);
			});
			
			if(xaxis_value === "year"){
				if(type === "1"){
					lineChart.subtitle.update({ text: 'Follow-up time: ' + type + ' year' });
				}
				else lineChart.subtitle.update({ text: 'Follow-up time: ' + type + ' years' });
			}
			else{
				lineChart.subtitle.update({ text: 'Calendar year: ' + type });
			}
			
			
		});
		
	}
	
	
	
	
	//Onchange of dropdown, call the function drawLineChart
	$("#chartType").change(function() {
		var type = this.value;
	    drawLineChart(country, xaxis_value, type);
	});       
	        
	
	
});
