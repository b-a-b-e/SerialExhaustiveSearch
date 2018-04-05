config_views.instructions = {
    // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "On each trial, a sequence of digits will appear, one at a time. Memorize these digits. Afterwards, a single digit will appear. You are to answer whether this number appeared in the list or not. We start with two practice trials.",
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

	showNextView();

	return view;
};
