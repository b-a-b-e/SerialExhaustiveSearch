const n_main_trials = 3;
const n_practice_trials = 2;

function generate_single_trial() {
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
    return {question: "",
            key1: 'f',
            key2: 'j',
            f: 'present',
            j: 'absent',
            expected: trial_type,
            stimulus: sequence,
            probe: probe,
            trial_type: trial_type,
            size: length,
            probe_position: _.indexOf(sequence, probe)};
};

const key_press_trials = _.map(_.range(n_main_trials), generate_single_trial);

const key_press_practice_trials = _.map(_.range(n_main_trials), generate_single_trial);
