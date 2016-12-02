/*
 * Interacts with the "Cain" WebService
 *
 * @author illusionaryone
 */

(function() {

    /**
     * @function pullCain
     * @param {String} quoteID
     * @return {String} quote
     */
    function pullCain(quoteID) {
        var url = 'http://twitch.center/customapi/quote?token=0e81807c&data=' + quoteID + '&no_id=1';
        var HttpResponse = Packages.com.gmt2001.HttpResponse;
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, "", new HashMap());

        return responseData.content;
    }

    /**
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            username = (args[0] ? args[0].toLowerCase() : false);

        if (command.equalsIgnoreCase('cain')) {

            if (args.length == 0) {
                $.say(pullCain(''));
                return;
            }

            if (args[0].equalsIgnoreCase('list')) {
                $.say('Tell the user the URL for the list here...');
                return;
            }

            if (isNaN(args[0])) {
                $.say('A quote ID must be a number');
                return;
            }
            $.say(pullCain(args[0]));
        }

    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        if ($.bot.isModuleEnabled('./games/cain.js')) {
            $.registerChatCommand('./games/cain.js', 'cain', 7);
            $.registerChatSubcommand('cain', 'list', 7);
        }
    });


})();
