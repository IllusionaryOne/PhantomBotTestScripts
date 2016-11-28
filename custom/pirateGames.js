/**
 * pirateGames.js
 * 
 * Various pirate themed games.
 *
 * @author illusionaryone
 */
(function() {
    /* Attempt, within reason, to always generate a random response. */
    var lastRandom = {};
    lastRandom.repair = -1;
    lastRandom.pirates = 1;
    lastRandom.duel = -1;
    lastRandom.promotion = -1;

    /* Keep track of the number of responses. */
    var responseCounts = {};
    responseCounts.loaded = false;
    responseCounts.repair = {};
    responseCounts.pirates = {};
    responseCounts.duel = {};
    responseCounts.promotion = {};

    responseCounts.repair.win = 0;
    responseCounts.repair.lost = 0;
    responseCounts.pirates.win = 0;
    responseCounts.pirates.lost = 0;
    responseCounts.duel.win = 0;
    responseCounts.duel.lost = 0;
    responseCounts.promotion.win = 0;
    responseCounts.promotion.lost = 0;
    
    /**
     * @function loadResponses
     */
    function loadResponses() {
        var i,
            responseList = [ 'repair', 'pirates', 'duel', 'promotion' ];

        for (idx in responseList) {
            for (i = 1; $.lang.exists('pirate.' + responseList[idx] + '.win.' + i); i++) {
                responseCounts[responseList[idx]].win++;
            }
            for (i = 1; $.lang.exists('pirate.' + responseList[idx] + '.lost.' + i); i++) {
                responseCounts[responseList[idx]].lost++;
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
        if (command.equals('repair') || command.equals('pirates') || command.equals('duel') || command.equals('promotion')) {
            d1 = $.randRange(1, 2);
            d2 = $.randRange(1, 2);

            if (d1 == d2) {
                do {
                    random = $.randRange(1, responseCounts[command].win);
                    loopCtr++;
                } while (random == lastRandom[command] && loopCtr < 5); // Provide Sanity
                lastRandom[command] = random;
                $.say($.lang.get('pirate.' + command + '.win.' + random, $.resolveRank(sender)));
                $.inidb.incr('points', sender, $.lang.get('pirate.' + command + '.win.points.' + random));
            } else {
                do {
                    random = $.randRange(1, responseCounts[command].lost);
                    loopCtr++;
                } while (random == lastRandom[command] && loopCtr < 5); // Provide Sanity
                lastRandom[command] = random;
                $.say($.lang.get('pirate.' + command + '.lost.' + random, $.resolveRank(sender)));
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
            $.registerChatCommand('./games/pirateGames.js', 'repair', 7);
            $.registerChatCommand('./games/pirateGames.js', 'pirates', 7);
            $.registerChatCommand('./games/pirateGames.js', 'duel', 7);
            $.registerChatCommand('./games/pirateGames.js', 'promotion', 7);
        }
    });
})();
