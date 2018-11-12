/*
 * Copyright (C) 2016-2018 phantombot.tv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * SLpointSystem.js
 *
 * Allows for the exchange of StreamLabs loyalty points and gifting of points to all in chat.
 * Drop into the scripts/systems directory.  Requires PhantomBot 2.4.2
 */
(function() {
    var minimumExchange = $.getSetIniDbNumber('SLpointSettings', 'minExchange', 50),
        exchangeRate = $.getSetIniDbNumber('SLpointSettings', 'exchangeRate', 1);

    /**
     * @function updateSettings
     */
    function updateSettings() {
        minimumExchange = $.getIniDbNumber('SLpointSettings', 'minExchange');
        exchangeRate = $.getIniDbNumber('SLpointSettings', 'exchangeRate');
    };


    /**
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            username = $.username.resolve(sender, event.getTags()),
            command = event.getCommand(),
            args = event.getArgs(),
            points = 0;

        /**
         * @commandpath slexchange [points] - Exchange points for StreamLabs points
         */
        if (command.equalsIgnoreCase('slexchange')) {
            if (!args[0]) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchange.usage', $.pointNameMultiple, minimumExchange, exchangeRate));
                return;
            }
            if (isNaN(args[0])) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchange.usage', $.pointNameMultiple, minimumExchange, exchangeRate));
                return;
            }
            points = parseInt(args[0]);
            if (points < minimumExchange) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchange.notmin', $.getPointsString(minimumExchange)));
                return;
            }
            if (points > $.getIniDbNumber('points', sender)) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchange.notenough'));
                return;
            }
            var slpoints = parseInt($.streamLabsAPI.GetPoints(sender, $.channelName));
            if (slpoints === -1) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchange.streamlabserror'));
                return;
            }
            var newslpoints = $.streamLabsAPI.SetPoints(sender, slpoints + parseInt(points / exchangeRate));
            if (newslpoints === -1) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchange.streamlabserror'));
                return;
            }
            $.inidb.decr('points', sender, points);
            $.say($.whisperPrefix(sender) + $.lang.get('slpoints.slexchange.success', parseInt(points / exchangeRate), $.getPointsString(points), newslpoints));
            return;
        }

        /*
         * @commandpath slgiveall [amount] - Give StreamLabs loyalty points to all in chat.
         */
        if (command.equalsIgnoreCase('slgiveall')) {
            if (!args[0]) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slgiveall.usage'));
                return;
            }
            if (isNaN(args[0])) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slgiveall.usage'));
                return;
            }

            points = parseInt(args[0]);
            if (points <= 0) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slgiveall.usage'));
                return;
            }

            if ($.streamLabsAPI.AddToAllPoints($.channelName, points)) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slgiveall.success', points));
            } else {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slgiveall.failed'));
            }
            return;
        }

        /*
         * @commandpath slexchangerate [amount] - Set how many points exchange per StreamLabs loyalty point.
         */
        if (command.equalsIgnoreCase('slexchangerate')) {
            if (!args[0]) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchangerate.usage', $.pointNameMultiple, exchangeRate));
                return;
            }
            if (isNaN(args[0])) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchangerate.usage', $.pointNameMultiple, exchangeRate));
                return;
            }

            points = parseInt(args[0]);
            if (points <= 0) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchangerate.usage', $.pointNameMultiple, exchangeRate));
                return;
            }

            exchangeRate = parseInt(args[0]);
            $.setIniDbNumber('SLpointsSettings', 'exchangeRate', exchangeRate);
            $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchangerate.success', exchangeRate));
            return;
        }

        /*
         * @commandpath slexchangemin [amount] - Set the minimum number of points that may be exchanged.
         */
        if (command.equalsIgnoreCase('slexchangemin')) {
            if (!args[0]) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchangemin.usage', $.pointNameMultiple, minimumExchange));
                return;
            }
            if (isNaN(args[0])) {
                $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchangemin.usage', $.pointNameMultiple, minimumExchange));
                return;
            }
            minimumExchange = parseInt(args[0]);
            $.setIniDbNumber('SLpointsSettings', 'minExchange', minimumExchange);
            $.say($.whisperPrefix(sender) + $.lang.get('slpointsystem.slexchangemin.success', minimumExchange));
            return;
        }
            
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./systems/SLpointSystem.js', 'slexchange', 7);
        $.registerChatCommand('./systems/SLpointSystem.js', 'slexchangerate', 1);
        $.registerChatCommand('./systems/SLpointSystem.js', 'slexchangemin', 1);
        $.registerChatCommand('./systems/SLpointSystem.js', 'slgiveall', 1);
    });

})();
