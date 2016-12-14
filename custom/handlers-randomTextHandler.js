/* Configuration for the random text generator. PhantomBot will randomly reply in chat with a 
 * line that someone else produced, with random words replaced.
 *
 * randomtext.replace-max must always be the number of the last randomtext.replace-xx entry.
 *
 * randomtext.replace-odds are the odds that a line will be replaced after the cooldown has
 * passed (1-100)
 *
 * randomtext.replace-cooldown is the number of minutes between when the bot randomly will
 * reply.
 *
 * randomtext.replace-word-pos is the position to use to replace words with. 2 replaces
 * every other word. 3 every third word. 4 every fourth word, and so on.
 *
 * randomtext.replace-xx are the words to use as replacements. These are words, and not
 * phrases. Spaces are not to be used. Remember, you are replacing a word with a word.
 *
 */
$.lang.register('randomtext.replace-max', '10');
$.lang.register('randomtext.replace-odds', '30');
$.lang.register('randomtext.replace-cooldown', '5');
$.lang.register('randomtext.replace-word-pos', '6');
$.lang.register('randomtext.replace-0', 'cheez-it');
$.lang.register('randomtext.replace-1', 'snoodle');
$.lang.register('randomtext.replace-2', 'poofums');
$.lang.register('randomtext.replace-3', 'timey-wimey');
$.lang.register('randomtext.replace-4', 'putz');
$.lang.register('randomtext.replace-5', 'toots');
$.lang.register('randomtext.replace-6', 'figglefrap');
$.lang.register('randomtext.replace-7', 'spliggle');
$.lang.register('randomtext.replace-8', 'meh');
$.lang.register('randomtext.replace-9', 'monkey');
$.lang.register('randomtext.replace-10', 'shizzle');

/*
 * randomtext.swearjar.steal.oddspercent is the chance of success, 0-100. 0 would troll
 * the users as no one could ever be successful.
 *
 * randomtext.swearjar.steal.take.maxpercent is the maximum percentage of the swearjar that
 * a user may try to steal. 1 - 100. You could set to 0 and not allow anyone to steal anything.
 *
 * randomtext.swearjar.steal.win.minpercent is the minimum percentage of the amount that the
 * user is trying to steal that may be returned. That is, if the user is successful,
 * then they will get back minpercent - 100% of the amount they were attempting to steal. 
 * For example, if this was 50, then, they will get back 50-100% of what they were trying to
 * steal. The idea is, they can only stuff so much into their pockets before they might get
 * caught.
 *
 * randomtext.swearjar.steal.penalty.points is the amount of a penalty to assign, in loss
 * of points if the user is caught. 0 is fine and will avoid a penalty.
 *
 * randomtext.swearjar.steal.penalty.timeout is the amount of time, in seconds, to timeout 
 * a user if they are caught, 0 is fine and will avoid the timeout.
 *
 */
$.lang.register('randomtext.swearjar-none', 'You do not have a swear jar, $1');
$.lang.register('randomtext.swearjar-empty', 'Your swear jar is empty, $1');
$.lang.register('randomtext.swearjar-amount', 'You have $1 $2 in your jar, $3');
$.lang.register('randomtext.swearjar-on', 'You will now use a swear jar, $1');
$.lang.register('randomtext.swearjar-off', 'You will no longer use a swear jar, $1');
$.lang.register('randomtext.swearjar-add', 'You add a $1 to your swear jar, $2');
$.lang.register('randomtext.swearjar-broke', 'You have nothing to put into the swear jar, $1');
$.lang.register('randomtext.swearjar.steal.usage', 'Usage: !swearjar steal [amount]. The most you can try to steal: $1');
$.lang.register('randomtext.swearjar.steal.success', 'You sneak out past bedtime to raid your swearjar and make out with $1 before your hear someone coming!');
$.lang.register('randomtext.swearjar.steal.caught.nopenalty', 'You sneak out past bedtime to raid your swearjar and are caught!');
$.lang.register('randomtext.swearjar.steal.caught.penalty.points', 'You sneak out past bedtime to raid your swearjar and are caught and you have $1 taken away from you!');
$.lang.register('randomtext.swearjar.steal.caught.penalty.timeout', 'You sneak out past bedtime to raid your swearjar and are caught and you are grounded for $1 seconds!');
$.lang.register('randomtext.swearjar.steal.caught.penalty.both', 'You sneak out past bedtime to raid your swearjar and are caught and you have $1 taken away and are grounded for $2 seconds!');
$.lang.register('randomtext.swearjar.steal.take.maxpercent', '25');
$.lang.register('randomtext.swearjar.steal.oddspercent', '15');
$.lang.register('randomtext.swearjar.steal.win.minpercent', '50');
$.lang.register('randomtext.swearjar.steal.penalty.points', '0');
$.lang.register('randomtext.swearjar.steal.penalty.timeout', '0');

/* Configure a list of words and emotes that costs a user a point.
 *
 * randomtext-swearjar-words are words that will cost a point. Use pipes to separate the word
 * or phrase. Note that this is case insensitive and will match on the word in any context.
 * For example, fuck would also match 'fuckadoodledoo'. If you wish to capture a specific
 * word instead, use \\bword\\b. For example, \\bass\\b would match on 'ass' and not 'grass'.
 *
 * randomtext.swearjar-emotes are emotes that will cost a point. Use pipes to seperate the
 * emotes. This is case sensitive like emotes are.
 *
 * If you do not want any words or emotes, just use an empty string ('').
 */
$.lang.register('randomtext.swearjar-words', 'fuck|shit|asshole|cunt|goddam|god dam|cocksucker|bollocks|bullocks|boner|\\bass\\b');
$.lang.register('randomtext.swearjar-emotes', 'TBTacoLeft|TBTacoRight');
