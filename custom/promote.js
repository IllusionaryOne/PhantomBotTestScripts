/**
 * promote.js
 *
 * Install under /scripts/custom at this time.
 *
 * Once installed and bot is restarted:
 * !promote channel discord_channel - Channel to send promotion messages to.
 * !promote streamchannel discord_channel - Channel to send go-live messages to.
 * !promote toggleselfmanage - If you do not want people to add themselves.
 * !promote setinterval - Change the interval for promotion messages from 120 minutes to something else.
 *
 * Then have folks !promote add themselves or you can !promote addother for them.
 *
 * TODO:
 * - Support more than 100 streamers.
 * - Split out !promote to !promote and !promoteadmin (maybe?)
 * - Add controls to the Beta Panel once that is the formal release.
 * - Allow streamers to set their own colors (maybe?)
 * - Add more fields?  Perhaps optionally !promote twitter or something?  I suppose the biography could have the twitter link in it though if people want.
 * 
 */
(function() {
    var promoteChannel = $.getSetIniDbString('promotesettings', 'channel', '');
    var streamChannel = $.getSetIniDbString('promotesettings', 'streamchannel', '');
    var allowSelfManage = $.getSetIniDbBoolean('promotesettings', 'allowselfmanage', true);
    var lastIdx = $.getSetIniDbNumber('promotesettings', 'lastidx', 0);
    var promoteInterval = $.getSetIniDbNumber('promotesettings', 'promoteinterval', 120);
    var promoteIntervalID = -1;

    /**
     * @event discordChannelCommand
     */
    $.bind('discordChannelCommand', function(event) {
        var channel = event.getChannel(),
            command = event.getCommand();

        if (command.equalsIgnoreCase('promote')) {
            var sender = event.getSender(),
                channel = event.getChannel(),
                command = event.getCommand(),
                mention = event.getMention(),
                args = event.getArgs(),
                action = args[0];

            if (action === undefined) {
                $.discord.say(channel, $.discord.userPrefix(mention) + 
                              '!promote add | delete | addother | delother | channel | streamchannel | revoke | allow | toggleselfmanage | list | setinterval');
                return;
            }

            if (action.equalsIgnoreCase('add') || action.equalsIgnoreCase('delete')) {
                if (!allowSelfManage) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'No one is allowed to manage themselves, please speak to a moderator to be added or deleted.');
                    return;
                }
                var twitchName = $.discord.resolveTwitchName(event.getSenderId());
                if (twitchName === null || twitchName === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.accountlink.usage.nolink'));
                    return;
                }
                var twitchID = $.username.getID(twitchName);
                if ($.inidb.exists('promoterevoke', twitchID)) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'You are no longer allowed to add yourself.');
                    return;
                }
            }
          
            if ((action.equalsIgnoreCase('add') || action.equalsIgnoreCase('delete') ||
                action.equalsIgnoreCase('addother') || action.equalsIgnoreCase('delother')) &&
                (promoteChannel.length === 0 && streamChannel.length === 0))  {
                $.discord.say(channel, $.discord.userPrefix(mention) + 'Ask an admin to set a promote channel with !promote channel and/or !promote streamchannel');
                return;
            }
            

            if (action === undefined) {
                $.discord.say(channel, $.discord.userPrefix(mention) + '!promote add [biography] | delete - Either add or ' +
                              'delete yourself from being promoted automatically. When you add yourself, provide a short biography.');
                return;
            }

            if (action.equalsIgnoreCase('add')) {
                if ($.inidb.GetKeyList('promoteids', '').length > 99) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Only 100 streamers may be promoted at this time. Please ask an admin to remove someone.');
                    return;
                }
                if (args[1] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'You need to provide a short biography.');
                    return;
                }
                var biography = args.splice(1).join(' ');
                $.inidb.set('promotebio', twitchID, biography);
                $.inidb.set('promoteids', twitchID, twitchName);
                $.discord.say(channel, $.discord.userPrefix(mention) + 'You (' + twitchName + ') will now be promoted.');
                return;
            }

            if (action.equalsIgnoreCase('delete')) {
                $.inidb.del('promotebio', twitchID);
                $.inidb.del('promoteids', twitchID);
                $.discord.say(channel, $.discord.userPrefix(mention) + 'You (' + twitchName + ') will no longer be promoted.');
                return;
            }

            if (action.equalsIgnoreCase('addother')) {
                if ($.inidb.GetKeyList('promoteids', '').length > 99) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Only 100 streamers may be promoted at this time. Please remove someone.');
                    return;
                }
                if (args[1] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Promote whom?');
                    return;
                }
                
                var twitchID = $.username.getID(args[1]);
                if (twitchID.equals('0')) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Account does not appear to exist in Twitch: ' + args[1]);
                    return;
                }
                if (args[2] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'You need to provide a short biography.');
                    return;
                }
                var biography = args.splice(2).join(' ');
                $.inidb.set('promotebio', twitchID, biography);
                $.inidb.set('promoteids', twitchID, args[1]);
                $.discord.say(channel, $.discord.userPrefix(mention) + args[1] + ' will now be promoted.');
                return;
            }

            if (action.equalsIgnoreCase('delother')) {
                if (args[1] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Stop promoting whom?');
                    return;
                }
                
                var twitchID = $.username.getID(args[1]);
                if (twitchID.equals('0')) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Account does not appear to exist in Twitch: ' + args[1]);
                    return;
                }

                $.inidb.del('promotebio', twitchID);
                $.inidb.del('promoteids', twitchID);
                $.discord.say(channel, $.discord.userPrefix(mention) + args[1] + ' will no longer be promoted.');
                return;
            }

            if (action.equalsIgnoreCase('channel')) {
                if (args[1] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Use which channel for promotions? To remove current channel use !promote channel clear');
                    return;
                }
            
                promoteChannel = args[1].replace('#', '').toLowerCase();
                if (promoteChannel.equals('clear')) {
                    $.inidb.set('promotesettings', 'channel', '');
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Promote channel has been cleared.');
                } else {
                    $.inidb.set('promotesettings', 'channel', promoteChannel);
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Promote channel has been set to: #' + promoteChannel);
                }
                return;
            }

            if (action.equalsIgnoreCase('streamchannel')) {
                if (args[1] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Use which channel for stream announcements? To remove current channel use !promote streamchannel clear');
                    return;
                }
            
                streamChannel = args[1].replace('#', '').toLowerCase();
                if (streamchannel.equals('clear')) {
                    $.inidb.set('promotesettings', 'streamchannel', '');
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Stream announcement channel has been cleared.');
                } else {
                    $.inidb.set('promotesettings', 'streamchannel', streamChannel);
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Stream announcement channel has been set to: #' + streamChannel);
                }
                return;
            }

            if (action.equalsIgnoreCase('revoke')) {
                if (args[1] == undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Revoke the privilege of which user to be able to add themselves?');
                    return;
                }

                var twitchID = $.username.getID(args[1]);
                if (twitchID.equals('0')) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Account does not appear to exist in Twitch: ' + args[1]);
                    return;
                }

                $.inidb.del('promotebio', twitchID);
                $.inidb.del('promoteids', twitchID);
                $.inidb.set('promoterevoke', twitchID);
                $.discord.say(channel, $.discord.userPrefix(mention) + 'You (' + args[1] + ') will no longer be promoted in #' + promoteChannel);
                return;
            }

            if (action.equalsIgnoreCase('allow')) {
                if (args[1] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Allow which user to be able to add themselves again?');
                    return;
                }

                var twitchID = $.username.getID(args[1]);
                if (twitchID.equals('0')) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Account does not appear to exist in Twitch: ' + args[1]);
                    return;
                }

                $.inidb.del('promoterevoke', twitchID);
                $.discord.say(channel, $.discord.userPrefix(mention) + args[1] + ' will be allowed to add themselves again.');
                return;
            }

            if (action.equalsIgnoreCase('toggleselfmanage')) {
                if (allowSelfManage) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Users will no longer be able to manage themselves via !promote add and delete.');
                } else {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Users will now be able to manage themselves via !promote add and delete.');
                }
                allowSelfManage = $.setIniDbBoolean('promotesettings', 'allowselfmanage', !allowSelfManage);
                return;
            }

            if (action.equalsIgnoreCase('list')) {
                var twitchIDs = $.inidb.GetKeyList('promoteids', '');
                if (twitchIDs.length === 0) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'No users are presently being promoted.');
                    return;
                }

                var twitchNames = [];
                for (var i = 0; i < twitchIDs.length; i++) {
                    twitchNames.push($.inidb.get('promoteids', twitchIDs[i]));   
                }
                
                $.discord.say(channel, $.discord.userPrefix(mention) + 'Users being promoted: ' + twitchNames.join(', '));
                return;
            }

            if (action.equalsIgnoreCase('setinterval')) {
                if (args[1] === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Provide an interval in minutes.');
                    return;
                }
                if (isNaN(args[1])) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'Provide an interval in minutes.');
                    return;
                }
                var newPromoteInterval = parseInt(args[1]);
                if (newPromoteInterval < 15) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + 'The interval should be 15 minutes or more as to not spam the channel.');
                    return;
                }
                $.setIniDbNumber('promotesettings', 'promoteinterval', newPromoteInterval);
                promoteInterval = newPromoteInterval;
                $.discord.say(channel, $.discord.userPrefix(mention) + 'The interval for promoting streamers has been set to ' + promoteInterval + ' minutes.');
                startPromote();
                return;
            }
        }
    });

    /**
     * Check for online status of channels every minute.
     */
    setInterval(function() {
        if ($.inidb.get('promotesettings', 'streamchannel').equals('')) {
            return;
        }

        var twitchIDs = $.inidb.GetKeyList('promoteids', '');
        if (twitchIDs.length === 0) {
            return;
        }
        var queryString = twitchIDs.join(',') + '&stream_type=live';
        var jsonObject = $.twitch.GetStreams(queryString);

        if (!jsonObject.has('_total') || !jsonObject.has('streams')) {
            return;
        }

        if (jsonObject.getInt('_total') === 0) {
            return;
        }

        var liveStreamers = [];
        var jsonStreams = jsonObject.getJSONArray('streams');
        for (var i = 0; i < jsonStreams.length(); i++) {
            var twitchID = jsonStreams.getJSONObject(i).getJSONObject('channel').getInt('_id').toString();
            var logoUrl = jsonStreams.getJSONObject(i).getJSONObject('channel').getString('logo');
            var url = jsonStreams.getJSONObject(i).getJSONObject('channel').getString('url');
            var game = jsonStreams.getJSONObject(i).getJSONObject('channel').getString('game');
            var title = jsonStreams.getJSONObject(i).getJSONObject('channel').getString('status');
            var twitchName = jsonStreams.getJSONObject(i).getJSONObject('channel').getString('display_name');
            var followers = jsonStreams.getJSONObject(i).getJSONObject('channel').getInt('followers');
            var views = jsonStreams.getJSONObject(i).getJSONObject('channel').getInt('views');
            liveStreamers.push(twitchID);

            if (!$.inidb.exists('promoteonline', twitchID)) {
                if ($.systemTime() - $.getIniDbNumber('promoteonlinetime', twitchID, 0) >= (6e4 * 5)) {
                    $.inidb.set('promoteonlinetime', twitchID, $.systemTime());
                    $.discordAPI.sendMessageEmbed($.inidb.get('promotesettings', 'streamchannel'), new Packages.sx.blah.discord.util.EmbedBuilder()
                                                  .withThumbnail(logoUrl)
                                                  .withTitle($.username.resolve(twitchName) + ' is LIVE @ https://twitch.tv/' + twitchName)
                                                  .withColor(100, 65, 164)
                                                  .withTimestamp(Date.now())
                                                  .appendField('Now Playing', game, true)
                                                  .appendField('Stream Title', title, true)
                                                  .appendField('Followers', followers, true)
                                                  .appendField('Views', views, true)
                                                  .withFooterText($.inidb.get('promotebio', twitchID))
                                                  .withUrl('https://twitch.tv/' + twitchName).build());
                }
            }
        }

        $.inidb.RemoveFile('promoteonline');
        for (var i = 0; i < liveStreamers.length; i++) {
            $.inidb.set('promoteonline', liveStreamers[i], $.inidb.get('promoteids', liveStreamers[i]));
        }
    }, 6e4, 'scripts::promote.js::checkstreams');

    /**
     * Send out biography information every so often.
     */
    function startPromote() {
        if (promoteIntervalID != -1) {
           $.consoleLn('Restarting the Promotion Interval Handler');
           clearInterval(promoteIntervalID);
        }

        promoteIntervalID = setInterval(function() {
            if ($.inidb.get('promotesettings', 'channel').equals('')) {
                return;
            }
    
            var twitchIDs = $.inidb.GetKeyList('promoteids', '');
            if (twitchIDs.length === 0) {
                return;
            }
    
            if (++lastIdx >= twitchIDs.length) {
                lastIdx = 0;
            }
            $.setIniDbNumber('promotesetings', 'lastidx', lastIdx);
    
            var twitchName = $.inidb.get('promoteids', twitchIDs[lastIdx]);
            var biography = $.inidb.get('promotebio', twitchIDs[lastIdx]);
            $.discordAPI.sendMessageEmbed($.inidb.get('promotesettings', 'channel'), new Packages.sx.blah.discord.util.EmbedBuilder()
                                          .withThumbnail('http://iotv.me/i/followontwitch.jpg')
                                          .withTitle('https://twitch.tv/' + twitchName)
                                          .withDesc('Be sure to follow and check out ' + $.username.resolve(twitchName))
                                          .withColor(31, 158, 242)
                                          .appendField('Bio', biography, true)
                                          .withUrl('https://twitch.tv/' + twitchName).build());
        }, promoteInterval * 6e4, 'scripts::promote.js::biography'); 
    }
    
    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.discord.registerCommand('./custom/promote.js', 'promote', 0);
        $.discord.registerSubCommand('promote', 'add', 0);
        $.discord.registerSubCommand('promote', 'delete', 0);
        $.discord.registerSubCommand('promote', 'addother', 1);
        $.discord.registerSubCommand('promote', 'delother', 1);
        $.discord.registerSubCommand('promote', 'channel', 1);
        $.discord.registerSubCommand('promote', 'streamchannel', 1);
        $.discord.registerSubCommand('promote', 'revoke', 1);
        $.discord.registerSubCommand('promote', 'allow', 1);
        $.discord.registerSubCommand('promote', 'toggleselfmanage', 1);
        $.discord.registerSubCommand('promote', 'list', 1);
        $.discord.registerSubCommand('promote', 'setinterval', 1);

        startPromote();
    });
})();
