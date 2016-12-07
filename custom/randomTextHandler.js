(function() {
    function handleReplace(message) {
        var randReplace,
            lastReplace,
            replace_random_time,
            replaceMax = parseInt($.lang.get('randomtext.replace-max')),
            replaceOdds = parseInt($.lang.get('randomtext.replace-odds')),
            replaceCooldown = parseInt($.lang.get('randomtext.replace-cooldown'));

        if ($.inidb.get('random_num', 'replace_random_time') == null) {
            replace_random_time = Date.now();
            $.inidb.set('random_num', 'replace_random_time', replace_random_time);
        } else {
            replace_random_time = parseInt($.inidb.get('random_num', 'replace_random_time'));
        }

        var randReplace = $.rand(100);
        if (randReplace < replaceOdds) {
            var doReplace = 1;
            var lastReplacePos = 0;
            var wordPos = parseInt($.lang.get('randomtext.replace-word-pos'));
            var current_time = Date.now();
            var time_diff = (current_time - replace_random_time) / (60 * 1000) % 60;
            if (time_diff < replaceCooldown)
                return 1;

            // If not enough has been said, then leave.
            var messageSplit = message.split(' ');
            if (messageSplit.length < wordPos + 2)
                return 1;

            if ($.inidb.get('random_num', 'replacetxt_last') != null) {
                lastReplace = parseInt($.inidb.get('random_num', 'replacetxt_last'));
            } else {
                lastReplace = -1;
            }

            for (i = wordPos; i < messageSplit.length; i++) {
                doReplace = 1;
                if (i != wordPos) {
                    if (i - lastReplacePos < wordPos) {
                        doReplace = 0;
                    } else {
                        if ($.rand(10) <= 3) {
                            doReplace = 0;
                        }
                    }
                }

                if (doReplace) {
                    // Determine which word to use in the random list.
                    randReplace = lastReplace;
                    while (randReplace == lastReplace) {
                        randReplace = $.rand(replaceMax);
                    }
                    lastReplace = randReplace;
                    $.inidb.set('random_num', 'replacetxt_last', randReplace);
                    messageSplit[i] = $.lang.get('randomtext.replace-' + randReplace);
                    lastReplacePos = i;
                }
            }
            newMessage = messageSplit.join(' ');
            $.say(newMessage);
            $.inidb.set('random_num', 'replace_random_time', current_time);
        }
        return 0;
    }

    function handleSwearJar(chatName, sender, message) {
        if ($.inidb.get('swearjar_users', sender) == 'off')
            return 0;

        var foundSwear = false;
            swearWords = $.lang.get('randomtext.swearjar-words'),
            reSwearWords = new RegExp(swearWords, 'i'),
            swearEmotes = $.lang.get('randomtext.swearjar-emotes'),
            reSwearEmotes = new RegExp(swearEmotes),
            haveSwearWords = $.lang.get('randomtext.swearjar-words').length > 0,
            haveSwearEmotes = $.lang.get('randomtext.swearjar-emotes').length > 0;

        if (haveSwearWords && haveSwearEmotes) {
           foundSwear = message.match(reSwearWords) || message.match(reSwearEmotes);
        } else if (haveSwearWords && !haveSwearEmotes) {
           foundSwear = message.match(reSwearWords);
        } else if (!haveSwearWords && haveSwearEmotes) {
           foundSwear = message.match(reSwearEmotes);
        } 

        if (foundSwear) {
            if (parseInt($.inidb.get('points', sender)) <= 0) {
                $.say($.lang.get('randomtext.swearjar-broke', chatName));
            } else {
                $.say($.lang.get('randomtext.swearjar-add', $.pointNameSingle, chatName));
                $.inidb.incr('swearjar_amount', sender, 1);
                $.inidb.decr('points', sender, 1);
            }
            return 1;
        }
        return 0;
    }

    function swearJarCommand(chatName, sender, argsString) {
        if (argsString.equalsIgnoreCase('toggle')) {
            var jarSetting = $.inidb.get('swearjar_users', sender);
            if (jarSetting == null || jarSetting == 'off') {
                $.inidb.set('swearjar_users', sender, 'on');
                $.say($.lang.get('randomtext.swearjar-on', chatName));
                return;
            } else {
                $.inidb.set('swearjar_users', sender, 'off');
                $.say($.lang.get('randomtext.swearjar-off', chatName));
                return;
            }
        }

        var jarAmount = $.inidb.get('swearjar_amount', sender);
        if (jarAmount == null) {
            $.say($.lang.get('randomtext.swearjar-none', chatName));
            return;
        } else if (parseInt(jarAmount) == 0) {
            $.say($.lang.get('randomtext.swearjar-empty', chatName));
        } else {
            $.say($.lang.get('randomtext.swearjar-amount', jarAmount, (parseInt(jarAmount) == 1 ? $.pointNameSingle : $.pointNameMultiple), chatName));
        }
        return;
    }

    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            chatName = $.username.resolve(sender, event.getTags()),
            command = event.getCommand(),
            argsString = event.getArguments().trim();

        if (command.equalsIgnoreCase('swearjar')) {
            swearJarCommand(chatName, sender, argsString);
            return;
        }
    });

    $.bind('ircChannelMessage', function(event) {
        var sender = event.getSender().toLowerCase(),
            message = event.getMessage();

        /* The bot is immune. */
        if (sender.equalsIgnoreCase($.botName.toLowerCase())) {
            return;
        }

        handleSwearJar(chatName, sender, message);
        handleReplace(message);
    });

    $.bind('initReady', function() {
        if ($.bot.isModuleEnabled('./handlers/randomTextHandler.js')) {
            $.registerChatCommand('./handlers/randomTextHandler.js', 'swearjar', 7);
        }
    });
})();
