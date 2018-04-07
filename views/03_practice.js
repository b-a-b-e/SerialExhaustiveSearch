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
        setTimeout(function() {$('#probe').show()
                              probeQuestion = true}, delay)
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
            RT = Date.now() - startingTime
            trial_data = {
                trial_type: trial_type,
                trial_number: CPT+1,
                response: 'd',
                RT: RT
            }
            exp.data.out.push(trial_data)
            exp.findNextView()
        }
        else if(event.keyCode == 75 && probeQuestion === true) {
            probeQuestion = false
            RT = Date.now() - startingTime
            trial_data = {
                trial_type: "main",
                trial_number: CPT+1,
                response: 'k',
                RT: RT
            }
            exp.data.out.push(trial_data)
            exp.findNextView()
        }
    })

    // start with probe hidden
    $('#probe').hide()

    // make list of indices for stimulus list
    var digits = [];
    for (var i = 0; i < stimulus.length; i++) {
        digits.push(i);
    }

    // get time from start
    startingTime = Date.now() + probeDelay
    // show all digits in sequence
    setTimeout(function() {digits.map(loopDisplay)}, pauseTime)

    // display probe after correct delay
    var probeDelay = pauseTime + stimulus.length * (showTime + blinkTime) + blinkTime + pauseTime
    displayProbe(probeDelay)

    return view;
}
