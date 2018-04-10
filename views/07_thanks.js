config_views.thanks = {
    "message": "Thank you for taking part in this experiment!"
};

// creates Thanks View
var initThanksView = function() {
    var view = {};
    view.name = 'thanks';
    view.template = $('#thanks-view').html();

    // needed for private server
    var data = {
        author: config_deploy.author,
        experiment_id: config_deploy.experiment_id,
        trials: exp.data.out,
        description: config_deploy.description,
        startDateTime: exp.data.startDate,
        totalExpTimeMinutes: (Date.now() - exp.data.startTime) / 60000,
        age: exp.data.out.age,
        studentID: exp.data.out.studentID,
        languages: exp.data.out.languages,
        comments: exp.data.out.comments,
        userAgent: exp.data.userAgent
    };

    // needed for the submission to MTurk's server
    if (config_deploy.is_MTurk) {
        var HITData = getHITData();

        // updates the fields in the hidden form with info for the MTurk's server
        $('main').html(Mustache.render(view.template, {
            thanksMessage: config_views.thanks.message,
            mturk_server: config_deploy.MTurk_server,
            assignmentId: HITData['assignmentId'],
            author: config_deploy.author,
            experimentId: config_deploy.experiment_id,
            startDateTime: exp.data.startDate,
            totalExpTimeMinutes: (Date.now() - exp.data.startTime) / 60000,
            trials: JSON.stringify(exp.data.out),
            description: config_deploy.description,
            workerId: HITData['workerId'],
            userAgent: exp.data.userAgent
        }));

        // MTurk expects a key 'assignmentId' for the submission to work, that is why is it not consistent with the snake case that the other keys have
        data['assignmentId'] = HITData['assignmentId'];
        data['workerId'] = HITData['workerId'];
        data['HITId'] = HITData['HITId'];
    } else if (config_deploy.deployMethod === 'Prolific') {
        var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

        $('main').html(Mustache.render(view.template, {
            thanksMessage: config_views.thanks.message,
            extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
        }));

        data['participant_id'] = exp.data.out.participant_id;
    } else if (config_deploy.deployMethod === 'directLink'){
    	$('main').html(Mustache.render(view.template, {
    		thanksMessage: config_views.thanks.message
    	}));

        data['participant_id'] = exp.data.out.participant_id;
    } else if (config_deploy.deployMethod === 'debug') {
        $('main').html(Mustache.render(view.template, {}));
    } else {
        console.log('no such config_deploy.deployMethod');
    }

    // if the experiment is set to live (see config.js liveExperiment)
    // the results are sent to the server
    // if it is set to false
    // the results are displayed on the thanks slide
    if (config_deploy.liveExperiment) {
        console.log('submits');
        submitResults(config_deploy.contact_email, data);
    } else {
        // hides the 'Please do not close the tab.. ' message in debug mode
        $('.warning-message').addClass('nodisplay');
        console.log('debug mode');
        jQuery('<h3/>', {
            text: 'Debug Mode'
        }).appendTo($('.view'));
        jQuery('<p/>', {
            class: 'debug-results',
            text: JSON.stringify(data)
        }).appendTo($('.view'));
    }

    return view;
};
