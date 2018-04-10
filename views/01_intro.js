// data for view
config_views.intro = {
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in this study. In this study we will test your memory. <strong>It is very important that you remain perfectly focused</strong>. Please turn off anything that might disturb you (such as background music, your television, instant messaging, ...). This experiment will last approximately 15 minutes. <br>Press SPACE to continue.",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment"
};


// creates the Introduction view
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('#main').html(Mustache.render(view.template, {
	    title: config_views.intro.title,
	    text: config_views.intro.text,
	    button: config_views.intro.buttonText
	}));

	showNextView();

    var instructionScreen = true

    addEventListener('keydown', function(event) {
        if(event.keyCode == 32 && instructionScreen === true) {
            instructionScreen = false
            exp.findNextView()
        }
    })
	return view;
};
