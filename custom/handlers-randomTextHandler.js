/*
 * handlers-randomTextHandler.js
 *
 * Language file for scripts/handlers/randomTextHandler.js
 * @author IllusionaryOne
 */

/* Configuration for the random text generator. PhantomBot will randomly reply in chat with a line that
 * someone else produced, with random words replaced.
 *
 * randomtext.replace-max must always be the number of the last randomtext.replace-xx entry.
 * randomtext.replace-odds are the odds that a line will be replaced after the cooldown has passed (1-100)
 * randomtext.replace-cooldown is the number of minutes between when the bot randomly will reply.
 * randomtext.replace-word-pos is the position to use to replace words with. 2 replaces every other word. 3 every third word. 4 every fourth word, and so on.
 * randomtext.replace-xx are the words to use as replacements.
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

$.lang.register('randomtext.swearjar-none', 'You do not have a swear jar, $1');
$.lang.register('randomtext.swearjar-empty', 'Your swear jar is empty, $1');
$.lang.register('randomtext.swearjar-amount', 'You have $1 $2 in your jar, $3');
$.lang.register('randomtext.swearjar-on', 'You will now use a swear jar, $1');
$.lang.register('randomtext.swearjar-off', 'You will no longer use a swear jar, $1');
$.lang.register('randomtext.swearjar-add', 'You add a $1 to your swear jar, $2');
$.lang.register('randomtext.swearjar-broke', 'You have nothing to put into the swear jar, $1');

/* Configure a list of words that costs a user a point.
 *
 * randomtext-swearjar-words are words that will cost a point. Use pipes to separate the word (or phrase). This is case insensitive.
 * randomtext.swearjar-emotes are emotes that will cost a point. Use pipes to seperate the emotes. This is case sensitive like emotes are.
 *
 * If you do not want any words, just use an empty string ('').
 */
$.lang.register('randomtext.swearjar-words', 'fuck|shit|asshole|cunt|goddam|god dam|cocksucker|bollocks|bullocks|boner');
$.lang.register('randomtext.swearjar-emotes', '');
