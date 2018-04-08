config_views.practice = {
    "title": "Practice trial: d = present, k = absent"
};



// creates Practice view
var initPracticeView = function(CPT) {
    var view = {};
    view.name = 'practice',
    view.template = $('#practice-view').html();
    $('#main').html(Mustache.render(view.template, {
	title: config_views.practice.title,
	stimulustext: '',
	probe: exp.data.practice_trials[CPT].probe
    }));

    // type of trial (present, absent)
    var trial_type = exp.data.practice_trials[CPT].trial_type

    // how long each digit is shown for
    var showTime = 1200

    // time between each digit
    var blinkTime = 50;

    // time between stimulus and probe
    var pauseTime = 2000;

    var dateStart, rt

    var stimulus =  exp.data.practice_trials[CPT].stimulus

    var probeQuestion = false

    var probe = exp.data.practice_trials[CPT].probe

    // shows one digit in the sequence
    function displayDigit(digit) {
        $('#stimulustext').text(stimulus[digit])
    }

    // clears the current digit
    function clearDisplay() {
        $('#stimulustext').text('')
    }

    // shows the probe digit and allow response after specified delay
    function displayProbe(delay) {
        setTimeout(function() {$('#stimulustext').text('·')}, delay)
        setTimeout(function() {$('#stimulustext').text(probe)
                               probeQuestion = true}, delay + showTime / 2)
    }

    // shows one digit and clears display after correct delay
    function loopDisplay(digit){
        setTimeout(function() {displayDigit(digit)}, (showTime + blinkTime) * digit + blinkTime)
        setTimeout(clearDisplay, (showTime + blinkTime) * (digit + 1))
    }

    // listen for key press and record response to probe
    addEventListener('keydown', function(event) {
        if(event.keyCode == 68 && probeQuestion === true) {
            probeQuestion = false
            exp.findNextView()
        }
        else if(event.keyCode == 75 && probeQuestion === true) {
            probeQuestion = false
            exp.findNextView()
        }
    })

    // start with probe hidden
    $('#probe').hide()

    // make list of indices for stimulus list
    var sequence = [];
    for (var i = 0; i < stimulus.length; i++) {
        sequence.push(i);
    }

    // calculate time at start of probe display
    startingTime = Date.now() + probeDelay

    // show all digits in sequence after initial pause
    setTimeout(function() {sequence.map(loopDisplay)}, pauseTime)

    // display probe after correct delay
    var probeDelay = pauseTime + stimulus.length * (showTime + blinkTime) + blinkTime + pauseTime
    displayProbe(probeDelay)

    return view;
}
