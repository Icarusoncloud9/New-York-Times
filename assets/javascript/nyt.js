// Declared Variables ----------------------------------------------------
// Search bars

var search = $("#search").val();
var number = $("#number").val();
var start = $("#start").val();
var end = $("#end").val();

// Buttons

var searchButton = $("#searchButton");
var clearResults = $("#clearResults");

// Url of website

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Functions -------------------------------------------------------------

searchButton.on("click", function() {
 	url += '?' + search + '?' + 5 + '?' + start;
 	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
	  console.log(result.response);
	}).fail(function(err) {
	  throw err;
	});


});

clearResults.on("click", function() {
	$("#search").val('');
	$("#number").val('');
	$("start").val('');
	$("end").val('');
});




// Main code


// Getting the Json info




