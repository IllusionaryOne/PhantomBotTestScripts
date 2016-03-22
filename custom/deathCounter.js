/**
 * deathCounter.js
 *
 * A death counter.
 */

(function() {

  function deathClearFile() {
    var deathFile = "./addons/deathctr/deathctr.txt";
    $.writeToFile("0", deathFile, false);
  }

  function deathUpdateFile() {
    var game = ($.getGame($.channelName).length > 0 ? $.getGame($.channelName) : "Some Game"),
        deathFile = "./addons/deathctr/deathctr.txt",
        deathCounter = parseInt($.inidb.get('deaths', game));
  

    if (isNaN(deathCounter)) { deathCounter = 0; }
    $.writeToFile(deathCounter.toFixed(0), deathFile, false);
  }

  /**
   * @event command
   */
  $.bind('command', function(event) {
    var sender = event.getSender();
    var username = $.username.resolve(sender);
    var command = event.getCommand();
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
    var args = event.getArgs();
    var game = ($.getGame($.channelName) != '' ? $.getGame($.channelName) : "Some Game");
  
    if (command.equalsIgnoreCase("death") || command.equalsIgnoreCase("deaths") ||
        command.equalsIgnoreCase("deathcounter") || command.equalsIgnoreCase("deathctr")) {
  
      if (argsString.isEmpty()) {
        var deathCounter = parseInt($.inidb.get('deaths', game));
        if (isNaN(deathCounter) || parseInt(deathCounter) == 0) {
          $.say($.lang.get("deathcounter.none", $.ownerName, game));
        } else {
          $.say($.lang.get("deathcounter.counter", $.ownerName, game, deathCounter));
        }
      } else {
        if (argsString.equalsIgnoreCase("reset")) {
          if (!$.isAdmin(sender)) {
            $.say($.getWhisperString(sender) + $.adminmsg);
            return;
          }
  
          var deathCounter = parseInt($.inidb.get('deaths', game));
          if (isNaN(deathCounter) || parseInt(deathCounter) == 0) {
            $.say($.getWhisperString(sender) + $.lang.get("deathcounter.reset-nil", game));
          } else {
            $.inidb.set('deaths', game, 0);
            $.say($.getWhisperString(sender) + $.lang.get("deathcounter.reset", game, deathCounter));
            $.deathUpdateFile();
          }
          return;
        }
  
        if (args[0].equalsIgnoreCase("set")) {
          if (!$.isAdmin(sender)) {
            $.say($.getWhisperString(sender) + $.adminmsg);
            return;
          }
  
          if (isNaN(parseInt(argsString2))) {
            $.say($.getWhisperString(sender) + $.lang.get("deathcounter.set-error"));
            return;
          } else {
            var setDeath = parseInt(argsString2);
            $.inidb.set('deaths', game, setDeath);
            $.say($.getWhisperString(sender) + $.lang.get("deathcounter.set-success", game, setDeath));
            $.deathUpdateFile();
            return;
          }
        }
  
        if (argsString.equalsIgnoreCase("add") || argsString.equalsIgnoreCase("incr") || argsString.equalsIgnoreCase("+")) {
          if (!$.isAdmin(sender)) {
            $.say($.getWhisperString(sender) + $.adminmsg);
            return;
          }
  
          $.inidb.incr('deaths', game, 1);
          $.say($.lang.get("deathcounter.add-success", $.ownerName, game, $.inidb.get('deaths', game)));
          $.deathUpdateFile();
          return;
        }
  
        if (argsString.equalsIgnoreCase("sub") || argsString.equalsIgnoreCase("decr") || argsString.equalsIgnoreCase("-")) {
          if (!$.isAdmin(sender)) {
            $.say($.getWhisperString(sender) + $.adminmsg);
            return;
          }
          if (isNaN($.inidb.get('deaths', game)) || parseInt($.inidb.get('deaths', game)) == 0) {
            $.say($.lang.get("deathcounter.sub-zero", game));
            return;
          }
  
          $.inidb.decr('deaths', game, 1);
          $.say($.lang.get("deathcounter.sub-success", game, $.inidb.get('deaths', game)));
          $.deathUpdateFile();
          return;
        }
      }
    }
  });

  /**
   * @event initReady
   */
  $.bind('initReady', function () {
    if ($.bot.isModuleEnabled('./addons/deathCounter.js')) {
      $.registerChatCommand('./addons/deathCounter.js', 'death', 7);
      $.registerChatCommand('./addons/deathCounter.js', 'deaths', 7);
      $.registerChatCommand('./addons/deathCounter.js', 'deathcounter', 7);
      $.registerChatCommand('./addons/deathCounter.js', 'deathctr', 7);
    }
  });

  $.deathClearFile = deathClearFile;
  $.deathUpdateFile = deathUpdateFile;
      
})();
