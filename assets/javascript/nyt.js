// =======================================================================
// Declared Global Variables
// =======================================================================

var search;

var sort = "";

var start;

var end;


// =======================================================================
// Buttons from html document
// =======================================================================

var searchButton = $("#searchButton");

var clearResults = $("#clearResults");


// =======================================================================
// Url of website
// =======================================================================

var website = "https://api.nytimes.com/svc/search/v2/articlesearch.json";


// =======================================================================
// Functions 
// =======================================================================

// This enables the dropdown menu for the search selection of the New York Times
$('.dropdown-toggle').dropdown();

// This is a function that changes the displayed value of the dropdown menu
$(function(){

	$(".dropdown-menu li a").click(function() {

		$(".dropdown-toggle:first-child").text($(this).text());

		$(".dropdown-toggle:first-child").val($(this).text());
	
	})

});

// Dynamically displaying things with the JSON info
function create(result) {

	$(".resultsDisplayed").html("");

	for(var i = 0; i < 10; i++) {

		if (result.response.docs[i].snippet === null) {

			continue;

		}

		var articleDiv = $("<div>");

			articleDiv.attr("class", "container-fluid");

			articleDiv.css({"margin-top": "15px"})

		var articleLink = $("<a>");

			articleLink.attr("href", result.response.docs[i].web_url);

			articleLink.attr("class", "list-group-item list-group-item-action articleHeading");

		var heading = $("<h5>");

			heading.attr("class", "list-group-item-heading");

			heading.text(result.response.docs[i].headline.main);

		var articleText = $("<p>");

			articleText.attr("class", "list-group-item-text articleText");

			articleText.text(result.response.docs[i].snippet);

		var articleImage = $("<img>");



		// Appending everything to the document

		articleLink.append(heading);

		articleLink.append(articleText);

		articleDiv.append(articleLink);


		if (result.response.docs[i].multimedia.length === 0 || result.response.docs[i].multimedia === 'null') {

			$(".resultsDisplayed").append(articleDiv);

			continue;

		} else {

			var imagething = "https://static01.nyt.com/" + result.response.docs[i].multimedia[1].url;

			articleImage.attr("src", imagething);

			articleImage.attr("class", "img-responsive");

			articleImage.css({"height": "250", "width": "auto"});

			articleImage.appendTo(articleLink);

		}

		$(".resultsDisplayed").append(articleDiv);

	}

}

// Ajax call on click of the searchButton
searchButton.on("click", function() {
	
		search = $("#search").val();

		sort = $("#sortitem").val();

		console.log( "Line 57", sort );
		
		start = $("#start").val();
		
		end = $("#end").val();

		if(search != "") {

			website += '?' + $.param({

	 		'api-key': "2a966230874544079d3f4400ec3ef469",

	 		'q': search,

	 		'sort': sort

	 		});

		 	if (search != "" && start != "") {

				website += '?' + $.param({

		 		'api-key': "2a966230874544079d3f4400ec3ef469",

		 		'q': search,

		 		'sort': sort,

		 		'begin_date': start

				});

			} else if (search != "" && end != "") {

				website += '?' + $.param({

		 		'api-key': "2a966230874544079d3f4400ec3ef469",

		 		'q': search,

		 		'sort': sort,

		 		'end_date': end

				});

			} else if (search != "" && start != "" && end != "") {

				website += '?' + $.param({

		 		'api-key': "2a966230874544079d3f4400ec3ef469",

		 		'q': search,

		 		'sort': sort,

		 		'begin_date': start,

		 		'end_date': end

				});

			} else {

				console.log("All good here!")

			}

		}  else if (search.length == 0) {

			alert("The search bar is empty!");

			return false;
		}
	
 	console.log(website);

 	$.ajax({

	  url: website,

	  method: 'GET',

	}).done(function( result ) {

	// console.log(result.response);
	// console.log(result.response.docs);
	// console.log(result.response.docs[0]);
	// console.log(result.response.docs[0].headline.main);
	// console.log(result.response.docs[0].web_url);
	// console.log(result.response.docs[0].snippet);

	create(result);

	}).fail(function( err ) {

		console.log("error");

		throw err;

	});

	website = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

});

// Clearing the value of each thing in the search bar
clearResults.on("click", function() {

	$("#search").val('');

	$("start").val('');

	$("end").val('');

});


