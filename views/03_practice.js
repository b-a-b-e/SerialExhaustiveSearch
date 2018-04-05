config_views.practice = {
    "title": "Practice trial"
};



// creates Practice view
var initPracticeView = function(CPT) {
    var view = {};
    view.name = 'practice',
    view.template = $('#practice-view').html();
    $('#main').html(Mustache.render(view.template, {
	title: config_views.practice.title,
	stimulus: exp.data.practice_trials[CPT].stimulus,
	probe: exp.data.practice_trials[CPT].probe
    }));
    // attaches an event listener to the yes / no radio inputs
    // when an input is selected a response property with a value equal to the answer is added to the trial object
    // as well as a readingTimes property with value - a list containing the reading times of each word

        var pause = 10;
    // how long stimulus is shown for
    var showTime = 3000;
    var dateStart, rt
    $('#probe').hide()
    setTimeout(function() {
        $('#stimulus').hide();
    }, 1000); // <-- time in milliseconds
    setTimeout(function() {
        $('#probe').show();
    }, 2000); // <-- time in milliseconds

    return view;
};
