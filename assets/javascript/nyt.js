// Declared Variables ----------------------------------------------------
// Search bars

var search = $("#search").val();
var number = $("#number").val();
var start = $("#start").val();
var end = $("#end").val();

// Buttons

var searchButton = $("#searchButton");
var clearResults = $("clearResults");

// Url of website

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Functions -------------------------------------------------------------







// Main code


// Getting the Json info
url += '?' + $.param({
  'api-key': "2a966230874544079d3f4400ec3ef469"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});



