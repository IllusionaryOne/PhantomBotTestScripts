/*
 * This script utilizes the supported API from Extra Life.
 * https://github.com/DonorDrive/PublicAPI
 *
 * No warranty is implied or provided.
 *
 * @author illusionaryone
 */

(function() {
    var extraLifeID = $.getSetIniDbString('extralife', 'extraLifeID', ''),
        extraLifeURL = 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=';

    /**
     * NOTICE: Presently, this does NOT use a language file! You may change the $.say()
     * statements directly if you desire.
     */

    /**
     * @function pullExtraLifeTotalGoal
     * @return {String} userInformation
     *
     * NOTICE! The return values here are used to populate the output to PhantomBot. If you wish
     * to display different text, change values here.
     */
    function pullExtraLifeTotalGoal() {
        var url = 'https://www.extra-life.org/api/participants/' + extraLifeID;
        var HttpResponse = Packages.com.gmt2001.HttpResponse;
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, "", new HashMap());
        var jsonObj = JSON.parse(responseData.content);

        var totalRaised = jsonObj['sumDonations'];
        var fundRaisingGoal = jsonObj['fundraisingGoal'];

        return 'Extra Life Donation Total Raised / Goal: ' +  totalRaised + ' / ' + fundRaisingGoal + '. Thanks for all of the support!';
    }

    /**
     * @function pullExtraLifeLastDonation
     * @return {String} donationInformation
     *
     * NOTICE! The return values here are used to populate the output to PhantomBot. If you wish
     * to display different text, change values here.
     */
    function pullExtraLifeLastDonation() {
        var url = 'https://www.extra-life.org/api/participants/' + extraLifeID + '/donations?limit=1';
        var HttpResponse = Packages.com.gmt2001.HttpResponse;
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, "", new HashMap());
        var jsonObj = JSON.parse(responseData.content);

        if (jsonObj[0] === undefined) {
            return 'No recent donations found!';
        }

        var message = jsonObj[0].message;
        var donorName = jsonObj[0].displayName;
        var donationAmount = jsonObj[0].amount;

        if (message === null) {
            message = "no message was provided";
        }

        return 'Last donation was in the amount of $' + donationAmount + ' received from ' + donorName + ' with this message: ' + message;
    }

    /**
     * @function pullExtraLifeDonations
     */
    function pullExtraLifeDonationsInterval() {
        if (extraLifeID.length > 0) {
            return;
        }

        var url = 'https://www.extra-life.org/api/participants/' + extraLifeID + '/donations';
        var HttpResponse = Packages.com.gmt2001.HttpResponse;
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, "", new HashMap());
        var jsonObj = JSON.parse(responseData.content);
        var firstRun = $.getIniDbBoolean('extralife', 'firstrun', true);

        if (jsonObj[0] === undefined) {
            if (firstRun) {
                $.inidb.set('extralife', 'firstrun', 'false');
            }
            return;
        }

        for (var i = 0; i < jsonObj.length; i++) {
            var message = jsonObj[i].message;
            var donorName = jsonObj[i].displayName;
            var donationAmount = jsonObj[i].amount;
            var createdOn = jsonObj[i].createdDateUTC;
            var donationID = jsonObj[i].donorID;

            if ($.inidb.exists('extralife', donationID)) {
                continue;
            }

            $.inidb.set('extralife', donationID, donationAmount);

            /* If this is the first time that this has ever been ran, do not output any data to chat. This way we do not spam out
             * any previous donations.  Do note that this will spam out any donations that are received within the interval window.
             */
            if (!firstRun) {
                if (message === null) {
                    message = "no message was provided";
                }
                $.say('Received a new donation of $' + donationAmount + ' from ' + donorName + ' with this message: ' + message);
            }
        }

        if (firstRun) {
            $.inidb.set('extralife', 'firstrun', 'false');
        }
    }

    /**
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs();

        if (command.equalsIgnoreCase('extralifeid')) {
            if (args[0] === undefined) {
                $.say('Please provide an ID or run \'!extralifeid remove\' to remove the ID.');
                return;
            }
            if (args[0].equalsIgnoreCase('remove')) {
                extraLifeID = '';
                $.setIniDbString('extralife', 'extraLifeID', '');
                $.say('Removed Extra Life ID.');
                return;
            }
            if (isNaN(args[0])) {
                $.say('Currently all Extra Life IDs are numerical.  Please check the ID.');
                return;
            }
            $.say('Set Extra Life ID to ' + args[0]);
            extraLifeID = args[1];
            $.setIniDbString('extralife', 'extraLifeID', extraLifeID);
        }

        if (command.equalsIgnoreCase('extralife')) {
            if (args.length == 0 && extraLifeID.length == 0) {
                $.say('Sorry! The caster has not setup their Extra Life ID!');
                return;
            }

            if (args.length == 0 && extraLifeID.length > 0) {
                $.say('I am participating in Extra Life! Please consider making a donation at: ' + extraLifeURL + extraLifeID);
                return;
            }

            if (args[0].equalsIgnoreCase('total') && extraLifeID.length > 0) {
                $.say(pullExtraLifeTotalGoal());
                return;
            }

            if (args[0].equalsIgnoreCase('last') && extraLifeID.length > 0) {
                $.say(pullExtraLifeLastDonation());
                return;
            }

            if (args[0].equalsIgnoreCase('setid')) {
            }
        }

    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        if ($.bot.isModuleEnabled('./systems/extraLifeSystem.js')) {
            $.registerChatCommand('./systems/extraLifeSystem.js', 'extralife', 7);
            $.registerChatCommand('./systems/extraLifeSystem.js', 'extralifeid', 1);
            $.registerChatSubcommand('extralife', 'last', 7);
            $.registerChatSubcommand('extralife', 'total', 7);

            setInterval(function() { pullExtraLifeDonationsInterval(); }, 30e3);
        }
    });
})();
