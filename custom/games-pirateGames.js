/**
 * games-pirateGames.js
 * 
 * Language file for pirateGames.js.
 *
 * @author illusionaryone
 *
 * You may add as many win/lost (loss) messages as desired to each type of pirate game.
 * Do be sure to always provide a related 'points' entry to each win/lost message.  There
 * do not have to be equal amounts of win/lost messages.
 *
 * A game must either have all $1 or all $1 and $2 entries (to indicate a victim).  The
 * script will look at the first entry to determine if two parameters exist ($1 and $2)
 * and if so, it assumes all other win/lost messages for that game require a victim.
 * If a game does have a victim, then add pirate.game.needvictim to produce a message
 * to the user if they do not provide a victim (!game victimName).
 *
 * A game with a victim needs a 'needvictim' language entry, like seen below in the
 * sample. An optional 'notself' language entry, like seen below, will not allow
 * the sender to specify themselves as a victim. If 'notself' is not present for
 * the command, then, the sender may specify themselves as the victim.
 */
$.lang.register('pirate.console.loaded', 'Loaded Pirate Game Win/Loss Messages and Points');

$.lang.register('pirate.repair.win.1', '$1 Win 1');
$.lang.register('pirate.repair.win.2', '$1 Win 2');
$.lang.register('pirate.repair.lost.1', '$1 Lost 1');
$.lang.register('pirate.repair.lost.2', '$1 Lost 2');
$.lang.register('pirate.repair.win.points.1', '5');
$.lang.register('pirate.repair.win.points.2', '10');
$.lang.register('pirate.repair.lost.points.1', '5');
$.lang.register('pirate.repair.lost.points.2', '10');

$.lang.register('pirate.pirates.win.1', '$1 Win 1');
$.lang.register('pirate.pirates.win.2', '$1 Win 2');
$.lang.register('pirate.pirates.lost.1', '$1 Lost 1');
$.lang.register('pirate.pirates.lost.2', '$1 Lost 2');
$.lang.register('pirate.pirates.win.points.1', '5');
$.lang.register('pirate.pirates.win.points.2', '10');
$.lang.register('pirate.pirates.lost.points.1', '5');
$.lang.register('pirate.pirates.lost.points.2', '10');

$.lang.register('pirate.duel.needvictim', 'Avast! You need a person to fight!');
$.lang.register('pirate.duel.notself', 'You cannot duel yourself!');
$.lang.register('pirate.duel.win.1', '$1 beat $2 1');
$.lang.register('pirate.duel.win.2', '$1 beat $2 2');
$.lang.register('pirate.duel.lost.1', '$1 lost to $2 1');
$.lang.register('pirate.duel.lost.2', '$1 lost to $2 2');
$.lang.register('pirate.duel.win.points.1', '5');
$.lang.register('pirate.duel.win.points.2', '10');
$.lang.register('pirate.duel.lost.points.1', '5');
$.lang.register('pirate.duel.lost.points.2', '10');

$.lang.register('pirate.promotion.win.1', '$1 Win 1');
$.lang.register('pirate.promotion.win.2', '$1 Win 2');
$.lang.register('pirate.promotion.lost.1', '$1 Lost 1');
$.lang.register('pirate.promotion.lost.2', '$1 Lost 2');
$.lang.register('pirate.promotion.win.points.1', '5');
$.lang.register('pirate.promotion.win.points.2', '10');
$.lang.register('pirate.promotion.lost.points.1', '5');
$.lang.register('pirate.promotion.lost.points.2', '10');
