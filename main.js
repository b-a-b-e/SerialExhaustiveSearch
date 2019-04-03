// initialises a babe experiment with babeInit
$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    };

    // calls babeInit
    // in debug mode this returns the babe-object, which you can access in the console of your browser
    // in all other modes null will be returned
    window.babe_monitor = babeInit({
        views_seq: [
            intro,
            instructions,
            practice_trials,
            begin_main,
            main_trials,
            post_test,
            thanks,
        ],
        deploy: {
            experimentID: "49",
            serverAppURL: "https://mcmpact.ikw.uni-osnabrueck.de/babe/api/submit_experiment/",
            deployMethod: "directLink",
            contact_email: "michael.franke@uni-osnabrueck.de",
            prolificURL: "https://app.prolific.ac/submissions/complete?cc=SAMPLE1234"
        },
        progress_bar: {
            in: [
                "practice_trial",
                "main_trial"
            ],
            style: "separate",
            width: 100
        }
    });
});
