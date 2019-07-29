/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  text: `Thank you for participating in this study. In this study we will test your memory.
    <strong>It is very important that you remain perfectly focused</strong>. Please turn off anything that might disturb you
    (such as background music, your television, instant messaging, ...). This experiment will last approximately 15 minutes.`,
  buttonText: 'Begin the experiment'
});

const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instrucions',
  title: 'Instructions',
  text: `During each trial, a sequence of numbers will be displayed, one at a time. Memorize these numbers.
    After a short pause, three questions marks followed by a single number will appear.
    You are to answer whether this number was present in or absent from the sequence.
    Press <strong>F if it was ${f_content}</strong>, and <strong>J if it was ${j_content}</strong>. Try to respond as quickly as possible while maintaining accuracy. The first set of trials are practice trials.`,
  buttonText: 'Go to practice trials'
});

const begin_main = magpieViews.view_generator("begin", {
  trials: 1,
  name: 'begin_main',
  title: '',
  text: `Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin.`,
  buttonText: 'Go to main trials'
});

// the post questionnaire can be translated
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional, except that <strong>you have to enter your student ID if you need course credit.</strong>',
  languages_question: '<strong>Student ID</strong>',
  languages_more: '(obligatory for course credit!)',
  edu_question: 'Study program',
  edu_graduated_high_school: 'CogSci BSc',
  edu_graduated_college: 'CogSci MSc',
  edu_higher_degree: 'other'

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// the 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
    - trial_type: string - the name of the trial type as you want it to appear in the submitted data
    - data: array - an array of trial objects

    * Optional properties

        - pause: number (in ms) - blank screen before the fixation point or stimulus show
        - fix_duration: number (in ms) - blank screen with fixation point in the middle
        - stim_duration: number (in ms) - for how long to have the stimulus on the screen
          More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

        - hook: object - option to hook and add custom functions to the view
          More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    * All about the properties of trial views
    * https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
    */

const practice_trials = main_trials_constructor({
  trials: key_press_practice_trials.length,
  trial_type: 'practice_trial',
  name: 'practice_trial',
  data: key_press_practice_trials,
  hook: {
    after_pause: show_digits,
    after_fix_point: show_instructions,
    after_stim_shown: show_nothing,
    after_stim_hidden: show_probe
  }
});

const main_trials = main_trials_constructor({
  trials: key_press_trials.length,
  trial_type: 'main_trial',
  name: 'main_trial',
  data: key_press_trials,
  hook: {
    after_pause: show_digits,
    after_fix_point: show_instructions,
    after_stim_shown: show_nothing,
    after_stim_hidden: show_probe
  }
});
