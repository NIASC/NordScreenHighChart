
$(function () {
	
	// define the chart
	var lineChart =  new Highcharts.Chart({
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
		});
	
	
	
	
	// text files according to indicators
	var text_file_1 = "http://188.114.242.3:9000/assets/text_files/estonia_year/1.txt";
	
	// text files according to years
	var text_file_2015 = "http://188.114.242.3:9000/assets/text_files/estonia_indicator/2015.txt";
	var text_file_2016 = "http://188.114.242.3:9000/assets/text_files/estonia_indicator/2016.txt";
	
	// text files according for age as X-axis
	var text_age_2015 = "http://188.114.242.3:9000/assets/text_files/estonia_age/2015.txt";
	var text_age_2016 = "http://188.114.242.3:9000/assets/text_files/estonia_age/2016.txt";
	
	// define two possible dropdown list
	var indicator_dropdown = ["Follow-up time (years)",1];
	var year_dropdown = ["Choose calendar year", 2015, 2016];
	
	// function to fill the dropdown
	function fill_dropdown (array) {
		$('#chartType').empty();
		$.each(array, function(i, p) {
		    $('#chartType').append($('<option></option>').val(p).html(p));
		});	
		
	}
	
	// filling the linechart with data from the text files 
	function fill_linechart (text_file, number) {
		
		while (lineChart.series.length > 0) {
        	lineChart.series[0].remove(true);
		}
		
	    $.get(text_file, function(data) {
	    	
			// Split the lines
			
			var lines = data.split('\n');
			$.each(lines, function(lineNo, line) {
				var items = line.split(',');
				// header line contains categories
				if (lineNo == 0) {
					
					var categories = [];
				
					$.each(items, function(itemNo, item) {
						if (itemNo > 0) categories.push(item);
					});
					// define the X-axis 
					lineChart.xAxis[0].setCategories(categories, false);
					// set the subtitle according to a type of text file: if it starts with number more than 1990 then X-axis is Calendar years
					if (categories[0] > 1900) {
						// correct English
						if (number == 1) {
							lineChart.setSubtitle({ text: 'Follow-up time: ' + number + ' year' });
						} else {
							lineChart.setSubtitle({ text: 'Follow-up time: ' + number + ' years' });
						}
					} else {
						lineChart.setSubtitle({ text: 'Calendar year: ' + number });
					}
				}
				// the rest of the lines contain data with their name in the first position
				else {
					var series = { 
						data: []
					};
					$.each(items, function(itemNo, item) {
						if (itemNo == 0) {
							series.name = item;
							if (series.name == 'All ages: 30-59 years') {
								series.color = Highcharts.getOptions().colors[7];
							}
							if (series.name == 'All ages: 30-59 years' || series.name == 'Follow-up time: 1 year') {
								series.visible = true;
							} else {
								series.visible = false;
							}
						} else {
							series.data.push(parseFloat(item));
						}
					}); // each
					lineChart.addSeries(series); // add data and draw the chart
				} // if else
			}); // each 
	
		}); // $.get
	} // function fill_linechart
	
	if (document.getElementById('years').checked) {
		fill_dropdown(indicator_dropdown);
		fill_linechart(text_file_1, 1);
	}
	
	
	// radio button change function
	$(".x-axis").change(function() {
        value = this.getAttribute("value");
        
        if (value == 'indicator') {
        	fill_dropdown(year_dropdown);
    		fill_linechart(text_file_2016, 2016);
    		
        } else if  (value == 'year') {
        	fill_dropdown(indicator_dropdown);
    		fill_linechart(text_file_1, 1);
        }
        
        else if  (value == 'age') {
        	fill_dropdown(year_dropdown);
    		fill_linechart(text_age_2016, 2016);
        }
	});
	
	
	// dropdown change function
	$("#chartType").change(function() {
		var type = this.value;
	        
	    if (type == 1) {
	    	fill_linechart(text_file_1, type);
	    } else if (type == 2015) {
	    	if (document.getElementById('indicators').checked) {
	    		fill_linechart(text_file_2015, type);
	    	} else if (document.getElementById('ages').checked) {
		        fill_linechart(text_age_2015, type);
		    }
	    } else if (type == 2016) {
	    	if (document.getElementById('indicators').checked) {
	    		fill_linechart(text_file_2016, type);
	    	} else if (document.getElementById('ages').checked) {
		        fill_linechart(text_age_2016, type);
		    }
	    }
	});       
	        

	var options_comboChart = {
			chart: {
				renderTo: 'comboChart'
			},
			title: {
				text: 'Cervical Test Coverage',
				x: -20
			},
			subtitle: {
	            text: 'Follow-up time: 5 years',
	            x: -20
	        },
			xAxis: {
				categories: []
			},
			yAxis: {
				title: {
					text: 'Test Coverage (%)'
				},
				plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
			},
			tooltip: {
	            valueSuffix: '%'
	        },
			
	        plotOptions: {
	            series: {
	                marker: {
	                	lineWidth: 2,
	                	lineColor: 'red',
	                	fillColor: 'black'
	                }
	            }
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
			series: []
		};
	

                $.get('http://188.114.242.3:9000/assets/text_files/combination_chart/norway.txt', function(data) {
    		// Split the lines
    		var lines = data.split('\n');

    		$.each(lines, function(lineNo, line) {
    			var items = line.split(',');

    			// header line containes categories
    			if (lineNo == 0) {
    				$.each(items, function(itemNo, item) {
    					if (itemNo > 0) options_comboChart.xAxis.categories.push(item);
    				});
    			}
    			// the rest of the lines contain data with their name in the first position
    			else {
    				var series = {
    					data: []
    				};
    				$.each(items, function(itemNo, item) {
    					if (itemNo == 0) {
    					   if (item != 'All ages: 30-59 years') {
    						   series.name = item;
    						   series.type = 'column';
    					   } else {
    						   series.name = 'All ages: 30-59 years';
    						   series.type = 'spline';
    						   series.color = Highcharts.getOptions().colors[7];
    					   }

    					   if (series.name == 'All ages: 30-59 years' || series.name == '25-29' || series.name == '30-34' || series.name == '35-39' || series.name == '45-49') {
                           		series.visible = true;
                           	} else {
                           		series.visible = false;
                           	}

    					} else {
    						series.data.push(parseFloat(item));
    					}
    				});
    				options_comboChart.series.push(series);
    			}
    		});
    		var chart = new Highcharts.Chart(options_comboChart);
    	});
		
	
});
