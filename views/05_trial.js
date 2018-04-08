config_views.trial = {
};

// creates Practice view
var initTrialView = function(CT) {
    var view = {};
    view.name = 'trial',
    view.template = $('#trial-view').html();
    $('#main').html(Mustache.render(view.template, {
	title: "d = present, k = absent",
	stimulustext: '',
	probe: exp.data.trials[CT].probe
    }));

    // type of trial (present, absent)
    var trial_type = exp.data.trials[CT].trial_type

    // how long each digit is shown for
    var showTime = 1200

    // time between each digit
    var blinkTime = 50;

    // time between stimulus and probe
    var pauseTime = 2000;

    var stimulus =  exp.data.trials[CT].stimulus

    var trial_type = exp.data.trials[CT].trial_type

    var probe = exp.data.trials[CT].probe

    var probeQuestion = false

    // make list of indices for stimulus list
    var digits = [];
    for (var i = 0; i < stimulus.length; i++) {
        digits.push(i);
    }

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
                               probeQuestion = true}, delay + showTime)
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
                trial_number: CT+1,
                stimulus: stimulus,
                probe: probe,
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
                trial_type: trial_type,
                trial_number: CT+1,
                stimulus: stimulus,
                probe: probe,
                response: 'k',
                RT: RT
            }
            exp.data.out.push(trial_data)
            exp.findNextView()
        }
    })

    // start with probe hidden
    $('#probe').hide()

    // get time from start
    startingTime = Date.now() + probeDelay
    // show all digits in sequence
    setTimeout(function() {digits.map(loopDisplay)}, pauseTime)

    // display probe after correct delay
    var probeDelay = pauseTime + stimulus.length * (showTime + blinkTime) + blinkTime + pauseTime
    displayProbe(probeDelay)

    return view;
}
