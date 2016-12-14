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

            for (i = (wordPos - 1); i < messageSplit.length; i++) {
                doReplace = 1;
                if (i != (wordPos - 1)) {
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
                    var replaceTries = 0;
                    randReplace = lastReplace;
                    while (randReplace == lastReplace) {
                        randReplace = $.rand(replaceMax + 1);
                        if (replaceTries++ > 5) {
                            break;
                        }
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
        if ($.getIniDbString('swearjar_users', sender, 'off').equals('off')) {
            return 0;
        }

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

    function swearJarCommand(chatName, sender, args) {
        var jarAmount = $.inidb.get('swearjar_amount', sender),
            maxStealAmount,
            stealAmount;

        if (args.length == 0) {
            if (jarAmount == null) {
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar-none', chatName));
                return;
            } else if (parseInt(jarAmount) == 0) {
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar-empty', chatName));
            } else {
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar-amount', jarAmount, (parseInt(jarAmount) == 1 ? $.pointNameSingle : $.pointNameMultiple), chatName));
            }
            return;
        }

        if (args[0].equalsIgnoreCase('toggle')) {
            var jarSetting = $.inidb.get('swearjar_users', sender);
            if (jarSetting == null || jarSetting == 'off') {
                $.inidb.set('swearjar_users', sender, 'on');
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar-on', chatName));
                return;
            } else {
                $.inidb.set('swearjar_users', sender, 'off');
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar-off', chatName));
                return;
            }
        }

        if (args[0].equalsIgnoreCase('steal')) {
            if (jarAmount == null) {
                maxStealAmount = 0;
            } else if (jarAmount == 0) {
                maxStealAmount = 0;
            } else {
                maxStealAmount = parseInt(jarAmount * (parseInt($.lang.get('randomtext.swearjar.steal.take.maxpercent')) / 100));
            }

            if (args.length == 1) {
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.usage', getPointsString(maxStealAmount)));
                return;
            }
            if (isNaN(args[1])) {
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.usage', getPointsString(maxStealAmount)));
                return;
            }
            if (parseInt(args[1]) > maxStealAmount) {
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.usage', getPointsString(maxStealAmount)));
                return;
            }
            stealAmount = parseInt(args[1]);

            var randNumber = $.rand(100);
            if (randNumber < parseInt($.lang.get('randomtext.swearjar.steal.oddspercent'))) {
                stealAmount = parseInt(stealAmount * ($.randRange(parseInt($.lang.get('randomtext.swearjar.steal.win.minpercent')), 100) / 100));
                $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.success', getPointsString(stealAmount)));
                $.inidb.incr('points', sender, stealAmount);
                $.inidb.decr('swearjar_amount', sender, stealAmount);
            } else {
                var penaltyPoints = parseInt($.lang.get('randomtext.swearjar.steal.penalty.points'));
                var penaltySeconds = parseInt($.lang.get('randomtext.swearjar.steal.penalty.timeout'));

                if (penaltyPoints == 0 && penaltySeconds == 0) {
                    $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.caught.nopenalty'));
                } else if (penaltyPoints > 0 && penaltySeconds == 0) {
                    if (penaltyPoints <= $.getIniDbNumber('points', sender, 0)) {
                        $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.caught.penalty.points', getPointsString(penaltyPoints)));
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.caught.nopenalty'));
                    }
                } else if (penaltyPoints == 0 && penaltySeconds > 0) {
                    $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.caught.penalty.timeout', penaltySeconds));
                } else if (penaltyPoints > 0 && penaltySeconds > 0) {
                    if (penaltyPoints <= $.getIniDbNumber('points', sender, 0)) {
                        $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.caught.penalty.both', getPointsString(penaltyPoints), penaltySeconds));
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.get('randomtext.swearjar.steal.caught.penalty.timeout', penaltySeconds));
                    }
                }

                if (penaltyPoints > 0) {
                    if (penaltyPoints <= $.getIniDbNumber('points', sender, 0)) {
                        $.inidb.decr('points', sender, penaltyPoints);
                    }
                }

                if (penaltySeconds > 0) {
                    $.say('.timeout ' + sender + ' ' + penaltySeconds);
                }
            }
        }
    }

    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            chatName = $.username.resolve(sender, event.getTags()),
            command = event.getCommand(),
            args = event.getArgs();

        if (command.equalsIgnoreCase('swearjar')) {
            swearJarCommand(chatName, sender, args);
            return;
        }
    });

    $.bind('ircChannelMessage', function(event) {
        var sender = event.getSender().toLowerCase(),
            chatName = $.username.resolve(sender, event.getTags()),
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
            $.registerChatSubcommand('swearjar', 'steal', 7);
            $.registerChatSubcommand('swearjar', 'toggle', 7);
        }
    });
})();
