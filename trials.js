const n_main_trials = 3;
const n_practice_trials = 1;
const random_f_j = _.shuffle(['present','absent']);
const f_content = random_f_j[0];
const j_content = random_f_j[1];

function generate_single_trial() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const length = Math.floor((Math.random() * 6) + 1);
    const sequence = _.sampleSize(digits, length);
    // const present = _.sample([true, false]);
    // let probe;
    // let trial_type;
    //
    // if(present === true) {
    //     trial_type = 'present';
    //     probe = _.sample(sequence);
    // }
    // else if(present !== true) {
    //     const difference = _.difference(digits, sequence);
    //     trial_type = 'absent';
    //     // jQuery.grep(digits, function(el) {
    //     //     if (jQuery.inArray(el, sequence) == -1) difference.push(el);
    //     // });
    //     probe = _.sample(difference);
    // };

    const expected = _.sample(['present','absent']);
    const probe = expected === 'present'? _.sample(sequence) : _.sample(_.difference(digits, sequence));

    return {question: "",
            key1: 'f',
            key2: 'j',
            f: f_content,
            j: j_content,
            expected: expected,
            stimulus: sequence,
            probe: probe,
            //trial_type: trial_type, // trial_type is practice or main, `expected` is 'absent' or 'present'
            size: length,
            probe_position: _.indexOf(sequence, probe),
            show_time: 1200,
            blink_time: 50,
            pause_time: 1000
        };
};

const key_press_trials = _.map(_.range(n_main_trials), generate_single_trial);

const key_press_practice_trials = _.map(_.range(n_practice_trials), generate_single_trial);
