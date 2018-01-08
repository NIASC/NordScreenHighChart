$(function () {
	
	$(document).ready(function() {
		$(".x-axis").parent().hide();
		$("#bothsamecountries").hide();
	});
	
	var xaxis_value = $('input[name=x-axis]:checked').val();
	var countries = [];
	
	//Not used currently
	var series = ["25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "All ages: 30-59 years"];
	
	
	// define the chart
	
	var initialChartOptions = {
			chart: {
				renderTo: 'lineChart'
			},
			title: {
				text: 'Cervical Test Coverage (All ages: 30-59 years)',
				x: -20
			},
			subtitle: {
	            text: ' ',
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
	            }],
	            id: 'tc'
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
            /*series:  [{
	            	   data:[]
	            	}]*/
		};
	var lineChart =  new Highcharts.Chart(initialChartOptions);
	
	
	
	
	
	
	
	/*$("#country1").change(function(){
		country1 = $.trim($("#country1").val());
		if(country1 !== "" && country2 !== ""){
			if(country1 !== country2){
				$("#bothsamecountries").hide();
				lineChart.destroy();
				lineChart =  new Highcharts.Chart(initialChartOptions);
				$(".x-axis").parent().show();
				
				if($(".x-axis:radio:checked").val() === "year"){
					fill_dropdown(indicator_dropdown);
				}
				else{
					fill_dropdown(year_dropdown);
				}
			}
			else {
				$("#bothsamecountries").show();
				lineChart.destroy();
				lineChart =  new Highcharts.Chart(initialChartOptions);
				$(".x-axis").parent().hide();
			}
		}
	});
	
	$("#country2").change(function(){
		country2 = $.trim($("#country2").val());
		if(country1 !== "" && country2 !== ""){
			if(country1 !== country2){
				$("#bothsamecountries").hide();
				lineChart.destroy();
				lineChart =  new Highcharts.Chart(initialChartOptions);
				$(".x-axis").parent().show();

				if($(".x-axis:radio:checked").val() === "year"){
					fill_dropdown(indicator_dropdown);
				}
				else{
					fill_dropdown(year_dropdown);
				}
			}
			else {
				$("#bothsamecountries").show();
				lineChart.destroy();
				lineChart =  new Highcharts.Chart(initialChartOptions);
				$(".x-axis").parent().hide();
			}
		}
	});
*/
	
	
	$('.form-check input[type="checkbox"]').change(function () {
		countries.length = 0;
	    if ($(this).closest('.form-check').find('input[type="checkbox"]:checked').length >= 2) {
	    	$.each($("input[name='countries']:checked"), function(){            
	    		countries.push($(this).val());
	        });
	    	
	    	$(".x-axis").parent().show();
	    	
	    	if($(".x-axis:radio:checked").val() === "year"){
				fill_dropdown(indicator_dropdown);
				lineChart.destroy();
				lineChart =  new Highcharts.Chart(initialChartOptions);
			}
			else{
				fill_dropdown(year_dropdown);
				lineChart.destroy();
				lineChart =  new Highcharts.Chart(initialChartOptions);
			}
	    }
	    else{
	    	$(".x-axis").parent().hide();
	    	lineChart.destroy();
			lineChart =  new Highcharts.Chart(initialChartOptions);
	    }
	});
	
	
	// define two possible dropdown list
	var indicator_dropdown = ["Follow-up time (years)",1, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5];
	//var year_dropdown = ["Choose calendar year",1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014];
	var year_dropdown = ["Choose calendar year",1986, 1987, 1988 ,1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
	
	// function to fill the dropdown
	function fill_dropdown (array) {
		$('#chartType').empty();
		$.each(array, function(i, p) {
		    $('#chartType').append($('<option></option>').val(p).html(p));
		});	
		
	}
	
	
	
	Array.prototype.associate = function (keys) {
		  var result = {};

		  this.forEach(function (el, i) {
		    result[keys[i]] = el;
		  });

		  return result;
	};
	
	
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	
	/*function drawLineChart(text_file_url_country1, text_file_url_country2, xaxis_value, type){

		while (lineChart.series.length > 0) {
        	lineChart.series[0].remove(true);
		}
		
		var xaxis_array = [];
		var xaxis_array_country1_index = [];
		var xaxis_array_country1_value = [];
		var xaxis_array_country2_index = [];
		var xaxis_array_country2_value = [];
		var c1 = {};
		var c2 = {};
		
		
		
		function fixXaxisAndDrawSeries (callback){
			var d1 = $.Deferred();
			var d2 = $.Deferred();

			var j1 = $.get(text_file_url_country1, 
						function(data) {
							var array_data = data.split('\n');				
							var first_line = array_data[0];
							
							$.each(first_line.split(','), function(i, v) {
								if(i > 0){
									xaxis_array.push(v);
									xaxis_array_country1_index.push(v);
								}
							});
							
							var last_line_country1 = array_data[array_data.length - 1];
							
							$.each(last_line_country1.split(','), function(i, v) {
								if(i > 0){
									xaxis_array_country1_value.push(v);
								}
							});
							
							c1 = xaxis_array_country1_value.associate(xaxis_array_country1_index);
							
				
					}).complete(d1.resolve);
			
			
			var j2 = $.get(text_file_url_country2, 
						function(data) {
						var array_data = data.split('\n');	
						var first_line = array_data[0];
						
						$.each(first_line.split(','), function(i, v) {
							if(i > 0 && $.inArray(v, xaxis_array) == -1){
								xaxis_array.push(v);
							}
							if(i > 0){
								xaxis_array_country2_index.push(v);
							}
						});
						
						var last_line_country2 = array_data[array_data.length - 1];
						
						$.each(last_line_country2.split(','), function(i, v) {
							if(i > 0){
								xaxis_array_country2_value.push(v);
							}
						});
						
						c2 = xaxis_array_country2_value.associate(xaxis_array_country2_index);
						
					
					}).complete(d2.resolve);


			$.when(d1, d2).done(function() {
			     // will fire when j1 AND j2 are both resolved OR rejected
			     // check j1.isResolved() and j2.isResolved() to find which failed
				console.log(c1);
				callback(xaxis_array.sort((a, b) => a - b));
			});
						
			
			
		}
		
		
		
		
		fixXaxisAndDrawSeries(function (result){
			var datac1 = [];
			var datac2 = [];
			
			$(xaxis_array).each(function (i, v) {
				if(v in c1){
					datac1.push(parseFloat(c1[v]));
				}
				else datac1.push(null);
				
				if(v in c2){
					datac2.push(parseFloat(c2[v]));
				}
				else datac2.push(null);
				
			});
			
			lineChart.addSeries({name: country1.capitalize(), data:datac1});
			lineChart.addSeries({name: country2.capitalize(), data:datac2});
			
			lineChart.xAxis[0].setCategories(result);
			
			if(xaxis_value === "year"){
				lineChart.subtitle.update({ text: 'Follow-up time: ' + type + ' years' });
			}
			else{
				lineChart.subtitle.update({ text: 'Calendar year: ' + type });
			}
			
			
		});
		
	
		
	}*/
	
	
	function compareCountries(arr, xaxis_value, type){
		
		while (lineChart.series.length > 0) {
        	lineChart.series[0].remove(true);
		}
		
		var xaxis_array = [];
		var xaxis_array_index = [];
		var xaxis_array_value = [];
		var c = {}
		var d = [];
		
		$.each(arr, function (i, name) {
			d[i] = $.Deferred();
			
			if(xaxis_value === "year"){
				var url = httpdomain+"/assets/text_files/"+name+"_year/"+parseInt(type)+".txt";
			}
			else{
				var url = httpdomain+"/assets/text_files/"+name+"_indicator/"+parseInt(type)+".txt";
			}
			
			
			
			
			$.get(url, function(data) {
					
						xaxis_array_index.length = 0;
						xaxis_array_value.length = 0;
						var array_data = data.split('\n');	
						var first_line = array_data[0];
						
						$.each(first_line.split(','), function(i, v) {
							if(i > 0 && $.inArray(v, xaxis_array) == -1){
								xaxis_array.push(v);
							}
							if(i > 0){
								xaxis_array_index.push(v);
							}
						});
						
						
						var last_line = array_data[array_data.length - 1];
						
						$.each(last_line.split(','), function(i, v) {
							if(i > 0){
								xaxis_array_value.push(v);
							}
						});
						c[name]=xaxis_array_value.associate(xaxis_array_index);
						
						
						
	
					}
			).complete(d[i].resolve);
			
		});
		
		
		
		$.when.apply($, d).then(function(){
			
			
			//xaxis_array = xaxis_array.sort((a, b) => a - b);
			xaxis_array = xaxis_array.sort();
			//console.log(xaxis_array);
			var data = [];
			
			
			lineChart.xAxis[0].setCategories(xaxis_array);
			$.each(c, function(key, value) {
				data.length = 0;
			    //console.log(key, value);
			    
			    
			    $(xaxis_array).each(function (i, v) {
					if(v in value){
						data.push(parseFloat(value[v]));
					}
					else data.push(null);
					
					
					
				});
			    lineChart.addSeries({name: key.capitalize(), data:data});
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
	
	// radio button change function
	$(".x-axis").change(function() {
		
		xaxis_value = this.getAttribute("value");
		
        if (xaxis_value == 'indicator') {
        	fill_dropdown(year_dropdown);
        	lineChart.destroy();
			lineChart =  new Highcharts.Chart(initialChartOptions);
    		
    		
        } else if  (xaxis_value == 'year') {
        	fill_dropdown(indicator_dropdown);
        	lineChart.destroy();
			lineChart =  new Highcharts.Chart(initialChartOptions);
    		
        }
        
        /*else if  (xaxis_value == 'age') {
        	fill_dropdown(year_dropdown);
        	lineChart.destroy();
			lineChart =  new Highcharts.Chart(initialChartOptions);
    		
        }*/
	});
	
	
	// dropdown change function
	$("#chartType").change(function() {
		var type = this.value;
	    
	    if(xaxis_value === "year"){
	    	compareCountries(countries, xaxis_value, type);
	    }
	    
	    if(xaxis_value === "indicator"){
	    	compareCountries(countries, xaxis_value, type);
	    }
	    
	    /*if(xaxis_value === "age"){
	    	text_file_url_country1 = httpdomain+"/assets/text_files/"+country1+"_age/"+parseInt(type)+".txt";
	    	text_file_url_country2 = httpdomain+"/assets/text_files/"+country2+"_age/"+parseInt(type)+".txt";
	    	drawLineChart (text_file_url_country1, text_file_url_country2, xaxis_value, type);
	    }*/
	    
	    
	});       
	        





	
	
});
