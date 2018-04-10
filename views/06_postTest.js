config_views.postTest = {
    "title": "Additional Info",
    "text": "Please supply your student ID and answer the following questions. Leaving a comment is optional.",
    "buttonText": "Continue"
};

var initPostTestView = function() {
	var view = {};
	view.name = 'postTest';
	view.template = $('#post-test-view').html();

	$('main').html(Mustache.render(view.template, {
		title: config_views.postTest.title,
		text: config_views.postTest.text
	}));

	$('#next').on('click', function(e) {
		// prevents the form from submitting
		e.preventDefault();
		// records the post test replies
/*		exp.data.out.push({
			age: $('#age').val(),
			gender: $('#gender').val(),
			education: $('#education').val(),
			languages: $('#languages').val(),
			comments: $('#comments').val().trim()
		});*/
	        exp.data.out.studentID = $('#studentID').val();
		exp.data.out.age = $('#age').val();
		exp.data.out.languages = $('#languages').val();
		exp.data.out.comments = $('#comments').val().trim();
		// moves to the next view
		exp.findNextView();
	});

	return view;
};
