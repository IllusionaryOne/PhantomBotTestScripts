/**
 * pirateGames.js
 * 
 * Various pirate themed games.
 *
 * @author illusionaryone
 */
(function() {

    /* List of pirate themed game commands. */
    var commandList = [ 'repair', 'pirates', 'duel', 'promotion' ];

    /* Attempt, within reason, to always generate a random response. */
    var lastRandom = {};

    /* Keep track of the number of responses. */
    var responseCounts = {};
    responseCounts.loaded = false;

    /* Populate the response counts and last random objects. */
    for (idx in commandList) {
        lastRandom[commandList[idx]] = -1;
        responseCounts[commandList[idx]] = {};
        responseCounts[commandList[idx]].win = 0;
        responseCounts[commandList[idx]].lost = 0;
    }
    
    /**
     * @function loadResponses
     */
    function loadResponses() {
        var i;

        for (idx in commandList) {
            for (i = 1; $.lang.exists('pirate.' + commandList[idx] + '.win.' + i); i++) {
                responseCounts[commandList[idx]].win++;
            }
            for (i = 1; $.lang.exists('pirate.' + commandList[idx] + '.lost.' + i); i++) {
                responseCounts[commandList[idx]].lost++;
            }
        }

        $.consoleDebug($.lang.get('pirate.console.loaded'));
        responseCounts.loaded = true;
    };

    /**
     * @event command
     */
    $.bind('command', function(event) {
          var sender = event.getSender().toLowerCase(),
            command = event.getCommand().toLowerCase(),
            args = event.getArgs(),
            victim = '',
            random,
            d1,
            d2,
            loopCtr = 0;

        /**
         * @commandpath repair - Attempt to repair the airship, receive a reward or a penalty
         * @commandpath pirates - Attempt to fight pirates, receive a reward or a penalty
         * @commandpath duel - Attempt to duel the captain, receive a reward or a penalty
         * @commandpath promotion - Attempt to receive a promotion, receive a reward or a penalty
         */
        if ($.list.hasKey(commandList, command)) {
            d1 = $.randRange(1, 2);
            d2 = $.randRange(1, 2);

            /* If the first entry for a game has two parameters, we will assume that all entries for
             * the game requires a sender and a victim.
             */
            if ($.lang.paramCount('pirate.' + command + '.win.1') == 2) {
                if (args.length < 1) {
                    $.say($.lang.get('pirate.' + command + '.needvictim'));
                    return;
                }
                if (!$.userExists(args[0])) {
                    $.say($.lang.get('pirate.' + command + '.needvictim'));
                    return;
                } else {
                    victim = args[0];
                }
            }

            if (d1 == d2) {
                do {
                    random = $.randRange(1, responseCounts[command].win);
                    loopCtr++;
                } while (random == lastRandom[command] && loopCtr < 5); // Provide Sanity
                lastRandom[command] = random;
                $.say($.lang.get('pirate.' + command + '.win.' + random, $.resolveRank(sender), $.resolveRank(victim)));
                $.inidb.incr('points', sender, $.lang.get('pirate.' + command + '.win.points.' + random));
            } else {
                do {
                    random = $.randRange(1, responseCounts[command].lost);
                    loopCtr++;
                } while (random == lastRandom[command] && loopCtr < 5); // Provide Sanity
                lastRandom[command] = random;
                $.say($.lang.get('pirate.' + command + '.lost.' + random, $.resolveRank(sender), $.resolveRank(victim)));
                $.inidb.decr('points', sender, $.lang.get('pirate.' + command + '.lost.points.' + random));
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        if ($.bot.isModuleEnabled('./games/pirateGames.js')) {
            if (!responseCounts.loaded) {
                loadResponses();
            }
            for (idx in commandList) {
                $.registerChatCommand('./games/pirateGames.js', commandList[idx], 7);
            }
        }
    });
})();
