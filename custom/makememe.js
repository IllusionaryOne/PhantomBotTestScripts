/**
 *
 * Creates a meme from the ImgFlip API.
 * 
 * You must:
 * 
 * 1) Register for an ImpFlip account, if you do not already have
 *    one (https://imgflip.com/signup)
 *
 * 2) Place your username and password into the spots in this script
 *    that request the USERNAME and PASSWORD.
 *
 * 3) OPTIONAL. You may copy the HTML and CSS from
 *    https://illusionaryone.tv/memehelp/index.html and
 *    https://illusionaryone.tv/memehelp/main.css and use them yourself.
 *    Otherwise, you might want to remove the links shown in this script
 *    or just explain to your users that you are using a script from
 *    IllusionaryOne.
 *
 */
(function() {
    var imgFlipUser = 'MyUserName',
        imgFlipPass = 'MyPassword';

    var memeHash = {};
    memeHash['boyfriend'] = '112126428';
    memeHash['spongebob'] = '102156234';
    memeHash['batmanslap'] = '438680';
    memeHash['aliens'] = '101470';
    memeHash['offramp'] = '124822590';
    memeHash['frynotsure'] = '61520';
    memeHash['evilkermit'] = '84341851';
    memeHash['yuno'] = '61527';
    memeHash['remembers'] = '1232104';
    memeHash['expandbrain'] = '93895088';
    memeHash['2buttons'] = '87743020';
    memeHash['thinkaboutit'] = '102156234';
    memeHash['doesnotsimply'] = '61579';
    memeHash['skeleton'] = '4087833';
    memeHash['blanknutbutton'] = '119139145';
    memeHash['boardroom'] = '101470';
    memeHash['everywhere'] = '124822590';
    memeHash['interestingman'] = '61520';
    memeHash['oprah'] = '28251713';
    memeHash['wouldbegreat'] = '124055727';
    memeHash['leocheers'] = '5496396';
    memeHash['rockdriving'] = '21735';
    memeHash['trumpsigning'] = '91545132';
    memeHash['scrolltruth'] = '123999232';
    memeHash['skepticalkid'] = '101288';
    memeHash['badluckbrian'] = '84341851';
    memeHash['braceyourself'] = '61546';
    memeHash['firstworldproblem'] = '61527';
    memeHash['creepywonka'] = '61582';
    memeHash['neverland'] = '6235864';
    memeHash['disastergirl'] = '97984';
    memeHash['whowouldwin'] = '101910402';
    memeHash['wat'] = '14230520';
    memeHash['doge'] = '8072285';
    memeHash['allthe'] = '61533';
    memeHash['yoda'] = '14371066';
    memeHash['nonebusiness'] = '16464531';
    memeHash['picardfacepalm'] = '1509839';
    memeHash['successkid'] = '61544';
    memeHash['morpheus'] = '100947';
    memeHash['grandma'] = '61556';
    memeHash['likebill'] = '56225174';
    memeHash['downeyjrface'] = '9440985';
    memeHash['seagull'] = '114585149';
    memeHash['drevillaser'] = '40945639';
    memeHash['grumpycat'] = '405658';
    memeHash['squidward'] = '101511';
    memeHash['philosoraptor'] = '61516';
    memeHash['laughingsuits'] = '922147';
    memeHash['eviltoddler'] = '235589';
    memeHash['onlyone'] = '259680';
    memeHash['3rdworldsuccesskid'] = '101287';
    memeHash['patrick'] = '61581';
    memeHash['maurylie'] = '444501';
    memeHash['waithere'] = '109765';
    memeHash['sealion'] = '13757816';
    memeHash['sparta'] = '195389';
    memeHash['toohigh'] = '61580';
    memeHash['picardwtf'] = '245898';
    memeHash['heardyou'] = '101716';
    memeHash['10guy'] = '101440';
    memeHash['hidethepain'] = '27813981';
    memeHash['civilwar'] = '28034788';
    memeHash['trophy'] = '3218037';
    memeHash['confessionbear'] = '100955';
    memeHash['mugatu'] = '21604248';
    memeHash['unclesam'] = '89655';
    memeHash['nobodycares'] = '6531067';
    memeHash['blankpack'] = '79367954';
    memeHash['saythatagain'] = '124212';
    memeHash['jacksparrow'] = '460541';
    memeHash['itsgone'] = '766986';
    memeHash['lookatme'] = '29617627';
    memeHash['imaginespongebob'] = '163573';
    memeHash['losesminds'] = '1790995';
    memeHash['penguin'] = '61584';
    memeHash['badpundog'] = '12403754';
    memeHash['fist'] = '74191766';
    memeHash['shaq'] = '99683372';
    memeHash['taken'] = '1232104';
    memeHash['goodfellas'] = '47235368';
    memeHash['simba'] = '371382';
    memeHash['starwarsno'] = '19194965';
    memeHash['archer'] = '10628640';
    memeHash['mrkrabs'] = '61733537';
    memeHash['inception'] = '156892';
    memeHash['scumbag'] = '61522';
    memeHash['takemymoney'] = '176908';
    memeHash['notime'] = '442575';
    memeHash['boatcat'] = '1367068';
    memeHash['captainnow'] = '29562797';
    memeHash['spiderman'] = '107773';
    memeHash['jackiechan'] = '412211';
    memeHash['koala'] = '27920';
    memeHash['keepcalm'] = '1202623';
    memeHash['gollum'] = '681831';
    memeHash['whatdowewant'] = '19209570';
    memeHash['nothappen'] = '10364354';

    var memeIdHash = {};
    memeIdHash['112126428'] = 'https://i.imgflip.com/1ur9b0.jpg';
    memeIdHash['93895088'] = 'https://i.imgflip.com/1jwhww.jpg';
    memeIdHash['87743020'] = 'https://i.imgflip.com/1g8my4.jpg';
    memeIdHash['102156234'] = 'https://i.imgflip.com/1otk96.jpg';
    memeIdHash['438680'] = 'https://i.imgflip.com/9ehk.jpg';
    memeIdHash['89370399'] = 'https://i.imgflip.com/1h7in3.jpg';
    memeIdHash['61579'] = 'https://i.imgflip.com/1bij.jpg';
    memeIdHash['4087833'] = 'https://i.imgflip.com/2fm6x.jpg';
    memeIdHash['119139145'] = 'https://i.imgflip.com/1yxkcp.jpg';
    memeIdHash['101470'] = 'https://i.imgflip.com/26am.jpg';
    memeIdHash['1035805'] = 'https://i.imgflip.com/m78d.jpg';
    memeIdHash['124822590'] = 'https://i.imgflip.com/22bdq6.jpg';
    memeIdHash['347390'] = 'https://i.imgflip.com/7g1q.jpg';
    memeIdHash['61520'] = 'https://i.imgflip.com/1bgw.jpg';
    memeIdHash['61532'] = 'https://i.imgflip.com/1bh8.jpg';
    memeIdHash['28251713'] = 'https://i.imgflip.com/gtj5t.jpg';
    memeIdHash['124055727'] = 'https://i.imgflip.com/21uy0f.jpg';
    memeIdHash['563423'] = 'https://i.imgflip.com/c2qn.jpg';
    memeIdHash['5496396'] = 'https://i.imgflip.com/39t1o.jpg';
    memeIdHash['21735'] = 'https://i.imgflip.com/grr.jpg';
    memeIdHash['91545132'] = 'https://i.imgflip.com/1ii4oc.jpg';
    memeIdHash['123999232'] = 'https://i.imgflip.com/21tqf4.jpg';
    memeIdHash['101288'] = 'https://i.imgflip.com/265k.jpg';
    memeIdHash['84341851'] = 'https://i.imgflip.com/1e7ql7.jpg';
    memeIdHash['61585'] = 'https://i.imgflip.com/1bip.jpg';
    memeIdHash['61546'] = 'https://i.imgflip.com/1bhm.jpg';
    memeIdHash['61527'] = 'https://i.imgflip.com/1bh3.jpg';
    memeIdHash['61539'] = 'https://i.imgflip.com/1bhf.jpg';
    memeIdHash['61582'] = 'https://i.imgflip.com/1bim.jpg';
    memeIdHash['6235864'] = 'https://i.imgflip.com/3pnmg.jpg';
    memeIdHash['97984'] = 'https://i.imgflip.com/23ls.jpg';
    memeIdHash['101910402'] = 'https://i.imgflip.com/1ooaki.jpg';
    memeIdHash['14230520'] = 'https://i.imgflip.com/8h0c8.jpg';
    memeIdHash['8072285'] = 'https://i.imgflip.com/4t0m5.jpg';
    memeIdHash['61533'] = 'https://i.imgflip.com/1bh9.jpg';
    memeIdHash['14371066'] = 'https://i.imgflip.com/8k0sa.jpg';
    memeIdHash['16464531'] = 'https://i.imgflip.com/9sw43.jpg';
    memeIdHash['1509839'] = 'https://i.imgflip.com/wczz.jpg';
    memeIdHash['61544'] = 'https://i.imgflip.com/1bhk.jpg';
    memeIdHash['100947'] = 'https://i.imgflip.com/25w3.jpg';
    memeIdHash['61556'] = 'https://i.imgflip.com/1bhw.jpg';
    memeIdHash['56225174'] = 'https://i.imgflip.com/xh3me.jpg';
    memeIdHash['9440985'] = 'https://i.imgflip.com/5mcpl.jpg';
    memeIdHash['114585149'] = 'https://i.imgflip.com/1w7ygt.jpg';
    memeIdHash['40945639'] = 'https://i.imgflip.com/odluv.jpg';
    memeIdHash['405658'] = 'https://i.imgflip.com/8p0a.jpg';
    memeIdHash['101511'] = 'https://i.imgflip.com/26br.jpg';
    memeIdHash['61516'] = 'https://i.imgflip.com/1bgs.jpg';
    memeIdHash['922147'] = 'https://i.imgflip.com/jrj7.jpg';
    memeIdHash['235589'] = 'https://i.imgflip.com/51s5.jpg';
    memeIdHash['259680'] = 'https://i.imgflip.com/5kdc.jpg';
    memeIdHash['101287'] = 'https://i.imgflip.com/265j.jpg';
    memeIdHash['61581'] = 'https://i.imgflip.com/1bil.jpg';
    memeIdHash['444501'] = 'https://i.imgflip.com/9iz9.jpg';
    memeIdHash['109765'] = 'https://i.imgflip.com/2cp1.jpg';
    memeIdHash['13757816'] = 'https://i.imgflip.com/86vlk.jpg';
    memeIdHash['195389'] = 'https://i.imgflip.com/46rh.jpg';
    memeIdHash['61580'] = 'https://i.imgflip.com/1bik.jpg';
    memeIdHash['245898'] = 'https://i.imgflip.com/59qi.jpg';
    memeIdHash['101716'] = 'https://i.imgflip.com/26hg.jpg';
    memeIdHash['101440'] = 'https://i.imgflip.com/269s.jpg';
    memeIdHash['27813981'] = 'https://i.imgflip.com/gk5el.jpg';
    memeIdHash['28034788'] = 'https://i.imgflip.com/govs4.jpg';
    memeIdHash['3218037'] = 'https://i.imgflip.com/1wz1x.jpg';
    memeIdHash['100955'] = 'https://i.imgflip.com/25wb.jpg';
    memeIdHash['21604248'] = 'https://i.imgflip.com/cv1y0.jpg';
    memeIdHash['89655'] = 'https://i.imgflip.com/1x6f.jpg';
    memeIdHash['6531067'] = 'https://i.imgflip.com/3vzej.jpg';
    memeIdHash['79367954'] = 'https://i.imgflip.com/1b94pe.jpg';
    memeIdHash['124212'] = 'https://i.imgflip.com/2nuc.jpg';
    memeIdHash['460541'] = 'https://i.imgflip.com/9vct.jpg';
    memeIdHash['766986'] = 'https://i.imgflip.com/gft6.jpg';
    memeIdHash['29617627'] = 'https://i.imgflip.com/hmt3v.jpg';
    memeIdHash['163573'] = 'https://i.imgflip.com/3i7p.jpg';
    memeIdHash['1790995'] = 'https://i.imgflip.com/12dxv.jpg';
    memeIdHash['61584'] = 'https://i.imgflip.com/1bio.jpg';
    memeIdHash['12403754'] = 'https://i.imgflip.com/7dusq.jpg';
    memeIdHash['74191766'] = 'https://i.imgflip.com/1866qe.jpg';
    memeIdHash['99683372'] = 'https://i.imgflip.com/1nck6k.jpg';
    memeIdHash['1232104'] = 'https://i.imgflip.com/qep4.jpg';
    memeIdHash['228024'] = 'https://i.imgflip.com/4vy0.jpg';
    memeIdHash['47235368'] = 'https://i.imgflip.com/s4f1k.jpg';
    memeIdHash['371382'] = 'https://i.imgflip.com/7yk6.jpg';
    memeIdHash['19194965'] = 'https://i.imgflip.com/bfexh.jpg';
    memeIdHash['10628640'] = 'https://i.imgflip.com/6bt40.jpg';
    memeIdHash['61733537'] = 'https://i.imgflip.com/10r5wh.jpg';
    memeIdHash['156892'] = 'https://i.imgflip.com/3d24.jpg';
    memeIdHash['61522'] = 'https://i.imgflip.com/1bgy.jpg';
    memeIdHash['176908'] = 'https://i.imgflip.com/3si4.jpg';
    memeIdHash['442575'] = 'https://i.imgflip.com/9hhr.jpg';
    memeIdHash['1367068'] = 'https://i.imgflip.com/tau4.jpg';
    memeIdHash['17699'] = 'https://i.imgflip.com/dnn.jpg';
    memeIdHash['29562797'] = 'https://i.imgflip.com/hlmst.jpg';
    memeIdHash['107773'] = 'https://i.imgflip.com/2b5p.jpg';
    memeIdHash['412211'] = 'https://i.imgflip.com/8u2b.jpg';
    memeIdHash['27920'] = 'https://i.imgflip.com/ljk.jpg';
    memeIdHash['1202623'] = 'https://i.imgflip.com/pry7.jpg';
    memeIdHash['681831'] = 'https://i.imgflip.com/em3r.jpg';
    memeIdHash['19209570'] = 'https://i.imgflip.com/bfq76.jpg';
    memeIdHash['10364354'] = 'https://i.imgflip.com/6656q.jpg';

    function getCustomAPIValue(url) {
        var HttpResponse = Packages.com.gmt2001.HttpResponse,
            HttpRequest = Packages.com.gmt2001.HttpRequest,
            HashMap = Packages.java.util.HashMap,
            responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, '', new HashMap());

        return responseData.content;
    }

    /**
     * @event discordChannelCommand
     */
    $.bind('discordChannelCommand', function(event) {
        var channel = event.getChannel(),
            command = event.getCommand(),
            args = event.getArgs();

        /**
         * @discordcommandpath makememe - Create a meme in Discord via ImgFlip.
         */
        if (command.equalsIgnoreCase('makememe')) {
            if (args.length == 0) {
                $.discord.say(channel, '!makememe [meme] [message OR top message : bottom message] ' +
                                       '!makememe list provides the list of memes. More help: ' +
                                       'https://www.illusionaryone.tv/memehelp/');
                return;
            }

            if (args[0].equalsIgnoreCase('list')) {
                $.discord.say(channel, 'Memes: ' + Object.keys(memeHash).join(', '));
                return;
            }

            var templateId = memeHash[args[0]];

            if (templateId == null || templateId == undefined || templateId == '') {
                $.discord.say(channel, 'Invalid meme: ' + args[0] + '. !makememe list for list. ' +
                                       'More help: https://www.illusionaryone.tv/memehelp/');
                return;
            }

            if (args.length == 1) {
                $.discord.say(channel, 'Meme: ' + args[0] + ' Image: ' + memeIdHash[templateId]);
                return;
            }
                           
            var jsonData;
            var message = args.splice(1).join(' ');
            if (message.indexOf(':') > -1) {
                var topLine = message.split(':')[0];
                var bottomLine = message.split(':')[1];
                jsonData = JSON.parse(getCustomAPIValue('https://api.imgflip.com/caption_image' +
                                                        '?template_id=' + templateId + 
                                                        '&text0=' + topLine +
                                                        '&text1=' + bottomLine +
                                                        '&username=' + imgFlipUser + '&password=' + imgFlipPass));
            } else {
                jsonData = JSON.parse(getCustomAPIValue('https://api.imgflip.com/caption_image' +
                                                        '?template_id=' + templateId + 
                                                        '&text1=' + message +
                                                        '&username=' + imgFlipUser + '&password=' + imgFlipPass));
            }

            if (jsonData.success == false) {
                $.discord.say(channel, 'There was an error trying to create the meme. Sorry!');
            } else {
                $.discord.say(channel, jsonData.data.page_url);
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.discord.registerCommand('./custom/makememe.js', 'makememe', 0);
    });
})();
