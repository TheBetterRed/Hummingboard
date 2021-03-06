/**
 * Hummingboard
 * Simple but elegant Hummingbird stats page
 *
 * Written and copyrighted 2013+
 * by Sven Marc 'CybroX' Gehring
 *
 * Licensed under CC BY-SA 3.0
 * For additional informations, please read the
 * LICENSE.md file or the license deed at the
 * Creative Commons website.
 */
 
 
 
/**
 * Generate statistics
 *
 * This is the main function of the
 * generation process, it will call
 * all needed subfunctions.
 */
function generateStats(dataArray){
	
	$('#graphState').css({"width": "80%","height": "80%"});
	$('#graphRates').css({"width": "80%","height": "80%"});
	$('#graphTypes').css({"width": "80%","height": "80%"});

	generateStatsTypes(dataArray[0]);
	generateStatsState(dataArray[1]);
	generateStatsRates(dataArray[2]);
}


/**
 * Generate anime types stats
 *
 * Generate bars for the anime types
 * TV, Movie, Special, OVA, ONA
 */
function generateStatsTypes(stats){
	
	/* Generate stats array */
	var dataArray = [];
	$.each(stats, function(key, value){
		dataArray.push([value, key, '#FF8247']);
	});
	
	appendGraph("graphTypes", dataArray);
}


/**
 * Generate anime state stats
 *
 * Generate the stats for watching, planned
 * and so on, this involves two bars per
 * element, one for the anime and one for the
 * episodes.
 */
function generateStatsState(stats){
	var dataArray = [];
	
	delete stats.total;
	
	$.each(stats, function(key, value){
		
		/* Rename listpoints */
		switch(key){
			case "currently-watching": keyname = "watching"; break;
			case "plan-to-watch":      keyname = "planned";  break;
			case "on-hold":            keyname = "onhold";   break;
			default:                   keyname = key;        break;
		}
	
		dataArray.push([[value["anime"], value["episodes"]], keyname]);
	});
	
	$('#graphState').html("");
	
	var exampleContainer = $('#graphState');
	graphSizeX = exampleContainer.width();
	graphSizeY = exampleContainer.height();
	
	$('#graphState').jqBarGraph({
		data: dataArray,
		colors: ['#FF8247','#436EEE'],
		type: 'multi',
		height: graphSizeY,
		width: graphSizeX
	});
}


/**
 * Generate anime rating stats
 *
 * Generates the stats for the anime ratings
 * from 0.0 - 5.0 plus "-" (unrated)
 */
function generateStatsRates(stats){
	
	/* Generate stats array */
	var dataArray = [];
	$.each(stats, function(key, value){
		dataArray.push([value, key, '#FF8247']);
	});
	
	appendGraph("graphRates", dataArray);
}


/**
 * Append graph to target
 */
function appendGraph(target, dataArray){
	$('#'+target).html("");
	
	var exampleContainer = $('#'+target);
	graphSizeX = exampleContainer.width();
	graphSizeY = exampleContainer.height();
	
	$('#'+target).jqbargraph({
		data: dataArray,
		height: graphSizeY,
		width: graphSizeX,
		showValues: true,
		showValuesColor: '#fff'
	});
}