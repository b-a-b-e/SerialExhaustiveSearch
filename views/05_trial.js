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

    // listen for key press and record response time
    function allowResponse(startTime) {
        var endTime
        addEventListener('keydown', function(event) {
            if(event.keyCode == 68 && probeQuestion === true) {
                probeQuestion = false
                endTime = Date.now()
                trial_data = {
                    trial_type: trial_type,
                    trial_number: CT+1,
                    stimulus: stimulus,
                    probe: probe,
                    response: 'wasPresent',
                    RT: endTime - startTime
                }
                exp.data.out.push(trial_data)
                exp.findNextView()
            }
            else if(event.keyCode == 75 && probeQuestion === true) {
                probeQuestion = false
                endTime = Date.now()
                trial_data = {
                    trial_type: trial_type,
                    trial_number: CT+1,
                    stimulus: stimulus,
                    probe: probe,
                    response: 'wasAbsent',
                    RT: endTime - startTime
                }
                exp.data.out.push(trial_data)
                exp.findNextView()
            }
        })
    }



    // shows the probe digit and allow response after specified delay
    function displayProbe(delay) {
        var probeTime = Date.now() + delay + showTime
        setTimeout(function() {$('#stimulustext').text('·')}, delay)
        setTimeout(function() {$('#stimulustext').text(probe)
                               probeQuestion = true}, delay + showTime)
        setTimeout(function() {allowResponse(probeTime)}, delay + showTime)
    }

    // shows one digit and clears display after correct delay
    function loopDisplay(digit){
        setTimeout(function() {displayDigit(digit)}, (showTime + blinkTime) * digit + blinkTime)
        setTimeout(clearDisplay, (showTime + blinkTime) * (digit + 1))
    }

    // show all digits in sequence
    setTimeout(function() {digits.map(loopDisplay)}, pauseTime)

    // display probe after correct delay
    var probeDelay = pauseTime + stimulus.length * (showTime + blinkTime) + blinkTime + pauseTime
    displayProbe(probeDelay)

    return view;
}
