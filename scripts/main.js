// create and return an object ('data') where the experiment's info is stored
// includint a placeholder exp.out in which to store participants' responses
var prepareData = function() {

    // this should ideally be read in from a separate file
    var trials_raw = [
        {stimulus: [1,6,9,8], probe: "7", trial_type: 'absent'},
	{stimulus: [5,2,8,1,3], probe: "4", trial_type: 'absent'},
    ];

    // this should ideally be read in from a separate file
    var practice_trials = [
        {stimulus: [0, 4, 5], probe: "4", trial_type: 'present'},
        {stimulus: [0, 1, 3, 4, 5, 9], probe: "6", trial_type: 'absent'},
        {stimulus: [0, 9, 1, 7], probe: 0, trial_type: 'present'},
        {stimulus: [1, 2, 5, 6, 7], probe: 9, trial_type: 'absent'},
        {stimulus: [0, 1, 3, 5, 8], probe: 8, trial_type: 'present'},
        {stimulus: [0, 2, 5, 7, 8, 9], probe: 8, trial_type: 'present'},
        {stimulus: [0, 2, 4, 5], probe: 4, trial_type: 'present'},
        {stimulus: [0, 1, 2, 4, 7, 8], probe: 2, trial_type: 'present'},
        {stimulus: [0, 1, 3, 4, 5, 8], probe: 6, trial_type: 'absent'},
        {stimulus: [2, 3, 5, 6, 7, 9], probe: 4, trial_type: 'absent'},
        {stimulus: [3, 4, 5, 6], probe: 5, trial_type: 'present'},
        {stimulus: [0, 3, 4, 5, 7, 8], probe: 8, trial_type: 'present'},
        {stimulus: [2, 4, 5, 6, 7], probe: 4, trial_type: 'present'},
        {stimulus: [2, 4, 5, 6, 9], probe: 5, trial_type: 'present'},
        {stimulus: [3, 4, 6, 8, 9], probe: 2, trial_type: 'absent'},
        {stimulus: [1, 3, 5, 6, 7, 9], probe: 0, trial_type: 'absent'},
        {stimulus: [0, 8, 6, 7], probe: 9, trial_type: 'absent'},
        {stimulus: [0, 2, 3, 7, 8], probe: 6, trial_type: 'absent'},
        {stimulus: [8, 2, 5], probe: 6, trial_type: 'absent'},
        {stimulus: [8, 0, 2, 1], probe: 4, trial_type: 'absent'},
        {stimulus: [0, 2, 5, 7, 8], probe: 3, trial_type: 'absent'},
        {stimulus: [8, 1, 5, 6], probe: 7, trial_type: 'absent'},
        {stimulus: [0, 1, 2, 6, 7, 8], probe: 2, trial_type: 'present'},
        {stimulus: [1, 3, 4, 6, 9], probe: 6, trial_type: 'present'}
    ];

    var data = {
	'trials': shuffleComb(trials_raw),  // items in data.trials are shuffled randomly upon initialization
	'practice_trials': practice_trials, // practice trials occur in the same order for all participants
	'out': [] // mandatory field to store results in during experimental trials
    };

    return data;
};

// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {
    exp.init();
    // prevent scrolling when space is pressed (firefox does it)
    window.onkeydown = function(e) {
	if (e.keyCode == 32 && e.target == document.body) {
	    e.preventDefault();
	}
    };
});

// empty shells for 'exp' and 'config_views' objects;
// to be filled with life later
var exp = {};
var config_views = {};


// navigation through the views and steps in each view;
// shows each view (in the order defined in 'config_general') for
// the given number of steps (as defined in 'config_general')
exp.findNextView = function() {
    if (this.currentViewStepCounter < config_general.viewSteps[this.currentViewCounter]) {
	this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
	this.currentViewStepCounter ++;
    } else {
	this.currentViewCounter ++;
	this.currentViewStepCounter = 0;
	this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
	this.currentViewStepCounter ++;
    }
};

// attaches exp.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by
// the conditionals in exp.findNextView() which is located in main.js
// if the button has id='send-data' (the button in subj info template has it),
// the data is collected sent before exp.findNextView(); is called
var showNextView = function() {
    var nexts = $('.next-view');
    for (var i=0; i<nexts.length; i++){
	if (nexts[i].id === 'sends-data') {
	    nexts[i].addEventListener('click', function() {
		for (var i=0; i<exp.data.out.length; i++) {
		    exp.data.out[i].age = $('#age').val(),
		    exp.data.out[i].gender = $('#gender').val(),
		    exp.data.out[i].education = $('#education').val(),
		    exp.data.out[i].languages = $('#languages').val(),
		    exp.data.out[i].comments = $('#comments').val().trim()
		}
		exp.findNextView();
	    });
	} else {
	    nexts[i].addEventListener('click', function() {
		exp.findNextView();
	    });
	}
    }
};

// initialize the experiment
exp.init = function() {

    // record current date and time
    this.startDate = Date();
    this.startTime = Date.now();

    // initialize counters and generate first view
    this.currentViewCounter = 0;
    this.currentViewStepCounter = 0;
    this.view = this.findNextView();

    // prepate data
    this.data = prepareData();

};
