/*
 * This script utilizes the Wikia API.
 *
 * No warranty is implied or provided.
 *
 * @author illusionaryone
 */

(function() {
    /* Define the particular Wikia site that you want to use. */
    var wikiaURL = 'https://warframe.fandom.com';

    /**
     * NOTICE: Presently, this does NOT use a language file! You may change the $.say()
     * statements directly if you desire.
     */

    /**
     * @function pullWikia
     * @return {String} query 
     */
    function pullWikia(query) {
        var url = wikiaURL + '/api/v1/Search/List?query=' + query.replace(/\s/g, '+') + '&limit=1&minArticleQuality=0';
        var HttpResponse = Packages.com.gmt2001.HttpResponse;
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, "", new HashMap());
        var jsonObj = JSON.parse(responseData.content);

        var title = jsonObj['items'][0]['title'];
        var postUrl = jsonObj['items'][0]['url'];

        return 'Wiki for ' + query + ': ' + postUrl;
    }

    /**
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs();

        if (command.equalsIgnoreCase('wiki')) {
            if (args[0] === undefined) {
                $.say('usage: !wiki [search term]');
                return;
            }
            $.say(pullWikia(args.join(' ')));
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./custom/wikia.js', 'wiki', 7);
    });
})();
