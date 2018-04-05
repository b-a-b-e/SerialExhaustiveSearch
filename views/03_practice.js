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
	
    // how long stimulus is shown for
    var showTime = 3000;
    // time between stimulus and probe
    var blinkTime = 1000;
    var dateStart, rt
    $('#probe').hide()
    setTimeout(function() {
        $('#stimulus').hide();
    }, showTime); // <-- time in milliseconds
    setTimeout(function() {
        $('#probe').show();
    }, showTime + blinkTime); // <-- time in milliseconds

    return view;
};
