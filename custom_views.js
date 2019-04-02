const show_digits = function(data, next){
    // ********************
    // main work (from Noa)
    // ********************

    const showTime = 1200;  // how long each digit is shown for
    const blinkTime = 50;   // time between each digit
    const pauseTime = 1000; // time between stimulus and probe
    const stimulus =  data.stimulus; // stimulus to show
    const trial_type = data.trial_type;
    const probe = data.probe;
    let probeQuestion = false; // what is this?

    // make list of indices for stimulus list
    const digits = _.range(stimulus.length);
    // for (var i = 0; i < stimulus.length; i++) {
    //     digits.push(i);
    // }

    const answerContainerElem = `<div class='babe-view-answer-container'>
                                <p answerContainerElem class='babe-response-keypress-header'
                                style="font-size:20px;"><strong>${data.key1}</strong> = ${data[data.key1]}, <strong>${data.key2}</strong> = ${data[data.key2]}</p>`;
    // shows one digit in the sequence
    function displayDigit(digit) {
        $('#stimulustext').text(stimulus[digit]);
    }

    // clears the current digit
    function clearDisplay() {
        $('#stimulustext').text('');
    }

    // shows the probe digit and allow response after specified delay
    const displayProbe = function(delay) {
        setTimeout(
            function() {
                $('#instructions_text').text('prepare to answer');
                $('#stimulustext').text('???');
                $(".babe-view").append(answerContainerElem);
            },
            delay);
        setTimeout(
            function() {$('#stimulustext').text('');},
            delay + showTime);
        setTimeout(
            function() {
                $('#stimulustext').text(probe);
                //enableResponse();
                probeQuestion = true;
                next();
            },
            delay + showTime * 2);
    };
    // shows one digit and clears display after correct delay
    const loopDisplay = function(digit){
        setTimeout(
            function() {displayDigit(digit);},
            (showTime + blinkTime) * digit + blinkTime
        );
        setTimeout(
            clearDisplay,
            (showTime + blinkTime) * (digit + 1)
        );
    };

    // show all digits in sequence
    setTimeout(function() {digits.map(loopDisplay);}, pauseTime);

    // display probe after correct delay
    const probeDelay = pauseTime + stimulus.length * (showTime + blinkTime) + blinkTime + pauseTime;

    displayProbe(probeDelay);
};







const main_trials_constructor = function(config) {
        babeUtils.view.inspector.missingData(config, "key press");
        babeUtils.view.inspector.params(config, "key press");
        const keyPress = {
            name: config.name,
            title: babeUtils.view.setter.title(config.title, ""),
            render: function(CT, babe) {
                let startingTime;
                const question = babeUtils.view.setter.question(
                    config.data[CT].question
                );
                const key1 = config.data[CT].key1;
                const key2 = config.data[CT].key2;
                const value1 = config.data[CT][key1];
                const value2 = config.data[CT][key2];
                const viewTemplate = `<div class="babe-view">
                    <h1 class='babe-view-title'>${this.title}</h1>
                    <div class='babe-view-stimulus-container' style="height:70px;">
                        <div class='babe-view-stimulus' style="height:70px;font-size: 24px;" id = 'instructions_text'>memorize this sequence</div>
                    </div>
                    <div class='babe-view-stimulus-container' style="height:70px;">
                          <br>
                        <div class='babe-view-stimulus' style="height:70px;font-size: 50px;" id = 'stimulustext'>XXX</div>
                    </div>
                </div>`;


                $("#main").html(viewTemplate);


                const handleKeyPress = function(e) {

                    const keyPressed = String.fromCharCode(
                        e.which
                    ).toLowerCase();

                    if (keyPressed === key1 || keyPressed === key2) {

                        const RT = Date.now() - startingTime; // measure RT before anything else

                        let correctness;

                        if (
                            config.data[CT].expected ===
                            config.data[CT][keyPressed.toLowerCase()]
                        ) {
                            correctness = "correct";
                        } else {
                            correctness = "incorrect";
                        }

                        const trial_data = {
                            trial_type: config.trial_type,
                            trial_number: CT + 1,
                            key_pressed: keyPressed,
                            correctness: correctness,
                            RT: RT
                        };

                        for (let prop in config.data[CT]) {
                            if (config.data[CT].hasOwnProperty(prop)) {
                                trial_data[prop] = config.data[CT][prop];
                            }
                        }

                        // trial_data[config.data[CT].key1] =
                        //     config.data[CT][key1];
                        // trial_data[config.data[CT].key2] =
                        //     config.data[CT][key2];

                        if (config.data[CT].picture !== undefined) {
                            trial_data.picture = config.data[CT].picture;
                        }

                        if (config.data[CT].canvas !== undefined) {
                            if (config.data[CT].canvas.canvasSettings !== undefined) {
                                for (let prop in config.data[CT].canvas.canvasSettings) {
                                    if (config.data[CT].canvas.canvasSettings.hasOwnProperty(prop)) {
                                        trial_data[prop] = config.data[CT].canvas.canvasSettings[prop];
                                    }
                                }
                                delete trial_data.canvas.canvasSettings;
                            }
                            for (let prop in config.data[CT].canvas) {
                                if (config.data[CT].canvas.hasOwnProperty(prop)) {
                                    trial_data[prop] = config.data[CT].canvas[prop];
                                }
                            }
                            delete trial_data.canvas;
                        }

                        babe.trial_data.push(trial_data);
                        $("body").off("keydown", handleKeyPress);
                        babe.findNextView();
                    }
                };

                const enableResponse = function() {
                    $("body").on("keydown", handleKeyPress);
                    startingTime = Date.now();
                };

                // creates the DOM of the trial view
                babeUtils.view.createTrialDOM(
                    {
                        pause: config.pause,
                        fix_duration: config.fix_duration,
                        stim_duration: config.stim_duration,
                        data: config.data[CT],
                        evts: config.hook,
                        view: "keyPress"
                    },
                    enableResponse
                );
            },
            CT: 0,
            trials: config.trials
        };

        return keyPress;
}
