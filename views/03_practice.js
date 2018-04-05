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
	
    // how long each digit is shown for
    var showTime = 1200;
    // time between each digit
    var blinkTime = 50;
    // time between stimulus and probe
    var pauseTime = 2000;
    var dateStart, rt
    function displayDigit(digit){
	    $('#stimulustext').text(stimulus[digit])
    $('#probe').hide()
    displayDigit(stimulus[0]
    for (digit = 1; digit < stimulus.length; digit++) {
        setTimeout(displayDigit(stimulus[digit]), showTime)
    }
    return view;
};
