/**
 * countdown.js
 * 
 * Perform a countdown in chat.
 */
(function() {
    var isRunning = false;
    var firstMsg = true;
    var seconds = 0;
    var counter = 0;

    /**
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            count;

        /**
         * @commandpath countdown [seconds] - Start a countdown timer for [seconds] seconds.
         */
        if (command.equalsIgnoreCase('countdown')) {
            if (args.length == 0) {
                $.say($.whisperPrefix(sender) + 'usage: countdown [seconds]');
                return;
            }
            if (isNaN(args[0])) {
                $.say($.whisperPrefix(sender) + 'usage: countdown [seconds]');
                return;
            }
            if (isRunning) {
                $.say($.whisperPrefix(sender) + 'Countdown is already running.');
                return;
            }
            isRunning = true;
            seconds = parseInt(args[0]);
            counter = seconds + 1;
            firstMsg = true;

            $.say('Drop sync in...');

            var interval = setInterval(function() {
                if (counter == 0) {
                    $.say('CLICK!');
                    isRunning = false;
                    clearInterval(interval);
                    return;
                } 
                   
                if (firstMsg) {
                    firstMsg = false;
                    $.say('North American Servers Only...');
                } else {
                    $.say(counter + '...');
                }
                counter--;
            }, 1e3, 'scripts::custom::countdown');
        }

    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./custom/countdown.js', 'countdown', 2);
    });
})();
