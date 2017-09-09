(function() {
    /**
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            commandArg = args[0],
            subCommandArg = args[1];

        /**
         * @commandpath twitter - Twitter base command
         */
        if (command.equalsIgnoreCase('twitter')) {
            if (commandArg === undefined) {
               $.say($.whisperPrefix(sender) + $.lang.get('twitterdata.id',
                         $.ownerName, $.getIniDbString('twitterdata', 'twitter_id', '[not set yet]')));
               return;
            }

            /**
             * @commandpath twitter register - Register the broadcaster ID.
             */
            if (commandArg.equalsIgnoreCase('register')) {
                if (subCommandArg === undefined) {
                    $.say($.whisperPrefix(sender) + 'Please provide the broadcaster Twitter ID.');
                    return;
                }
                $.setIniDbString('twitterdata', 'twitter_id', subCommandArg);
                $.say($.whisperPrefix(sender) + 'Set Twitter ID for broadcaster to ' + subCommandArg);
                return;
            }
        } /* if (command.equalsIgnoreCase('twitter')) */
    }); /* @event command */

    /**
     * Set the langauge.
     */
    $.lang.register('twitterdata.id', '$1 is on Twitter! Go and follow them at twitter.com/$2');

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./custom/twitterHandler.js', 'twitter', 7);
        $.registerChatSubcommand('twitter', 'register', 1);
    });
})();
