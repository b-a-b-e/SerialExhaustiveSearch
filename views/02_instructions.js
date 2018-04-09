config_views.instructions = {
    // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "During each trial, a sequence of numbers will be displayed, one at a time. Memorize these numbers. After a short pause, a dot followed by a single number will appear. You are to answer whether this number was present in or absent from the sequence. Press D if it was present, and K if it was absent. Try to respond as quickly as possible while maintaining accuracy. The first set of trials are practice trials. Press SPACE to begin the practice trials.",
    // instuction's slide proceeding button text
    "buttonText": "Go to practice trial"
};

// creates Instruction view
var initInstructionsView = function() {
	var view = {};
	view.name = 'instructions';
	view.template = $("#instructions-view").html();
	$('#main').html(Mustache.render(view.template, {
		title: config_views.instructions.title,
		text: config_views.instructions.text,
		button: config_views.instructions.buttonText
	}));

    instructionScreen = true

        addEventListener('keydown', function(event) {
        if(event.keyCode == 32 && instructionScreen === true) {
            instructionScreen = false
            exp.findNextView()
        }
    })


	showNextView();

	return view;
};
