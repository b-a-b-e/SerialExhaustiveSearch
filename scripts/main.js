// create and return an object ('data') where the experiment's info is stored
// includint a placeholder exp.out in which to store participants' responses
var prepareData = function() {

    // this should ideally be read in from a separate file
    function generateTrials(number) {

        var trials = [];

        function generateSingleTrial() {
            var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var length = Math.floor((Math.random() * 6) + 1);
            var sequence = _.sampleSize(digits, length);
            var present = _.sample([true, false]);
            var probe;
            var trial_type;

            if(present === true) {
                trial_type = 'present';
                probe = _.sample(sequence);
            }
            else if(present !== true) {
                var difference = [];
                trial_type = 'absent';
                jQuery.grep(digits, function(el) {
                    if (jQuery.inArray(el, sequence) == -1) difference.push(el);
                });
                probe = _.sample(difference);
            };
            return {stimulus: sequence, probe: probe, trial_type: trial_type};
        };

        for (var i = 0; i < number; i++) {
            trials.push(generateSingleTrial());
        }
        return trials

    }

    var trials_raw = generateTrials(144);

    var practice_trials = generateTrials(24);

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
