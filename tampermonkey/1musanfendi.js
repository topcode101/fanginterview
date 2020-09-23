// ==UserScript==
// @name         1mu3fendi
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.1point3acres.com/*
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest

// ==/UserScript==

(function() {
    'use strict';
    window.data$ = {};
    $ = jQuery;
    window.$ = jQuery;
    const WEBSITE='1mu3fendi';
    const USER='admin';
    const PASS='pass';
    const fanginterview_ip_addr = `192.168.0.19:10010`;

    function _getDateFromTr(tr) {
        return {date: $(tr).find('td em a span')[0].title}
    }

    function _parseSearchStr(search) {
        const paramList = search && search.substring(1).split('&');
        const res = {};
        paramList && paramList.forEach(param=>{
            const [k, v] = param.split('=');
            res[k] = v;
        });
        return res;
    }

    function _getHrefAndTitle(tr) {
        let n = $(tr).find('th a')[0];
         if (n.href && n.href.indexOf('https://') !== -1) {
              return {
                  href: n.href,
                  title: n.text
              }
         }
    }

    function findCurrentList() {
        let allTrs = jQuery(jQuery('table')[4]).find('tr');
        if (allTrs.length === 0) {
            allTrs = jQuery(jQuery('table')[2]).find('tr');
        }

        const list = [];
        for(let i = allTrs.length - 1; i >= 0; i--) {
            let tr = allTrs[i];
            try {
                let item = {};
                item = {
                    ..._getDateFromTr(tr),
                    ..._getHrefAndTitle(tr)
                }
                list.push(item);
            } catch(e) {
                console.error(e);
            }
        }
        //jQuery(jQuery(jQuery('table')[4]).find('tr')[6]).find('th a')[0].text
        return list;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const targetUrl = 'https://www.1point3acres.com/bbs/forum.php?mod=viewthread&tid=655854&extra=page%3D1%26filter%3Dsortid%26sortid%3D311%26searchoption%5B3046%5D%5Bvalue%5D%3D5%26searchoption%5B3046%5D%5Btype%5D%3Dradio%26sortid%3D311%26orderby%3Ddateline';
    const test1 = 'https://www.1point3acres.com/bbs/forum.php?mod=viewthread&tid=655872&extra=page%3D1%26filter%3Dsortid%26sortid%3D311%26searchoption%5B3046%5D%5Bvalue%5D%3D5%26searchoption%5B3046%5D%5Btype%5D%3Dradio%26sortid%3D311%26orderby%3Ddateline';

    const header = { 'origin': 'https://www.1point3acres.com', 'referer': 'https://www.1point3acres.com/bbs/', 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'};
    function fetchContent(url) {
        return new Promise(resCb=>{
            $.get(url, header).done((data)=>{
                process(data, resCb);
            });
        });

    }

    function process(data, resCb) {
        data$ = $(data);
        const authorPostTable = data$.find('div[id^="post_"] table')[0]; //data$.find('table[cellspacing=0]')[6];
        window.authorPostTable = authorPostTable;
        let postString = '';
        //const eleList = $(authorPostTable).find('td').contents();
        const eleList = $($(authorPostTable).find('td.plc')[0]).find('div.pcb').contents();
        postString = findtext(eleList);
        // .filter(function(){
        //     // or it is a div with border : div[style^="border"]
        //     return this.nodeType !== 1;
        // }).each(function(n, b){
        //     postString += b.textContent;
        // });
        let postStringAllLine = postString.split('\n');
        let ret = '';
        let start = false;
        postStringAllLine.forEach(line=>{
            line = line.trim();
            if (line.length == 0) {
                return;
            }
            if (start) {
                if (line.startsWith('post_newreply')) {
                    start = false;
                    return;
                }
                ret += line + '\n';
            } else {
                if (line.startsWith('googleon: snippet')) {
                    start = true;
                }
            }

        });
        resCb(encodeURIComponent(ret));
    }

    function findtext(doms) {
        let postString = '';
        for (let i =0; i < doms.length; i++) {
            let dom = doms[i];
            if(dom.nodeName === 'SCRIPT' || dom.nodeName === 'STYLE') {
                continue;
            }
            if (dom.nodeType !== 1) {
                postString += dom.textContent;
            } else{
                postString += findtext(dom.childNodes);
            }
        }
        return postString;
    }

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


    // main
    const button$ = $('<button> Gen list </button>');
    button$.click(()=>{
        $('#gmPopupContainer').show();

    });
    // main
    const button2$ = $('<button> test </button>');
    button2$.click(()=>{
        GM_xmlhttpRequest ( {
            method:     'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "user=johndoe&pass=xyz123",
            url: `http://${fanginterview_ip_addr}/api/interview`,
            onload: function (responseDetails) {
                // DO ALL RESPONSE PROCESSING HERE...
                console.log (
                    "GM_xmlhttpRequest() response is:\n",
                    responseDetails.responseText.substring (0, 80) + '...'
                );
            }
        } );
    });
    //jQuery(jQuery(jQuery(jQuery('table')[3]).find('tr')[0]).find('th')[0]).find('div').append(button$);
    $('body').prepend(button$);
    $('body').prepend(button2$);


    if (window.location.pathname === '/bbs/forum-145-1.html') {
        processForumPageWithId(145);
    } else if (window.location.search) {
        const params = _parseSearchStr(window.location.search);
        if (params.fid == '145') {
            processForumPageWithId(145);
        }
    }

    $("body").append ( '                                                          \
    <div id="gmPopupContainer">                                               \
    <form style="height:100%;"> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" --> \
        <textarea id="gmOutput"> </textarea> \
        <button id="gmAddNumsBtn" type="button">Start to fetch content</button>         \
<button id="gmCloseDlgBtn" type="button">Close popup</button>         \
    </form>                                                                   \
    </div>                                                                    \
' );


    //--- Use jQuery to activate the dialog buttons.
    $("#gmAddNumsBtn").click ( function () {
        const allList = findCurrentList();

        (async function loop() {
            for (let i = 0; i < 3; i++) {
                await fetchContent(allList[i].href)
                    .then(content=>{

                     var textareaText = $('#gmOutput').val();
                    var insertText = allList[i].title + '\n' + allList[i].href + '\n' + content;
                    $('#gmOutput').val(textareaText + insertText);
                }).then(()=>{
                    return sleep(200);
                });
            }
        })();
    } );

    $("#gmCloseDlgBtn").click ( function () {
        $("#gmPopupContainer").hide ();
    } );

    $("#gmPopupContainer").hide();
    //--- CSS styles make it work...
    GM_addStyle ( "                                                 \
#gmPopupContainer {                                         \
width:                  70%;                           \
height:                  70%;                           \
position:               fixed;                          \
top:                    20%;                            \
left:                   10%;                            \
padding:                2em;                            \
background:             powderblue;                     \
border:                 3px double black;               \
border-radius:          1ex;                            \
z-index:                777;                            \
}                                                           \
#gmPopupContainer button{                                   \
cursor:                 pointer;                        \
margin:                 1em 1em 0;                      \
border:                 1px outset buttonface;          \
}                                                           \
#gmOutput { \
width: 100%;\
height: 80%; \
} \
" );


/* -- */
function processForumPageWithId(id) {
    const table$ = $(`table[summary=forum_${id}]`);
    const allTr$ = table$.find('tr');
    for (let i = 1; i < allTr$.length; i++) {
        const tr = allTr$[i];
        const hrefTitle =_getHrefAndTitle(tr);
        const postDate = _getDateFromTr(tr);
        if (hrefTitle === undefined) {
            console.log(`error: ${i}`, tr);
            continue;
        }
        const hrefSearchStr = hrefTitle.href.substring(hrefTitle.href.indexOf('?') + 1);
        const params = _parseSearchStr(hrefSearchStr);
        const tid = params.tid;
        const newTd1$ = $(`
            <td class="newForum">
                <p> Recorded ${tid}</p>
            </td>
        `)
        const newTd2$ = $(`
            <td class="newForum">
            </td>
        `);
        const btn$ = $('<div style="cursor: pointer;background: sandybrown;"> Record </div>');
        btn$.appendTo(newTd2$);
        const updateBtn = async ()=>{
            GM_xmlhttpRequest ( {
                    method:     'GET',
                    url: `http://${fanginterview_ip_addr}/api/interview?user=${USER}&pass=${PASS}&website=${WEBSITE}&id=${tid}`,
                    onload:     function (responseDetails) {
                        // DO ALL RESPONSE PROCESSING HERE...
                        const resJson = JSON.parse(responseDetails.responseText);
                        if (resJson.found) {
                            btn$.css('background', '#36800066');
                        }
                        console.log (
                            "GM_xmlhttpRequest() response is:\n",
                            responseDetails.responseText.substring (0, 80) + '...'
                        );
                    }
            });
        }
        btn$.click(async ()=>{
            (async function loop() {
            await fetchContent(hrefTitle.href).then((content)=>{
                const message = "Do you want to update with following: \n" + decodeURIComponent(content);
                if (!confirm(message)) {
                   return;
                }
                GM_xmlhttpRequest ( {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: `user=${USER}&pass=${PASS}&content=${content}&title=${hrefTitle.title}&id=${tid}&website=${WEBSITE}&origHref=${hrefTitle.href}&publishDate=${postDate.date}`,
                    url: `http://${fanginterview_ip_addr}/api/interview`,
                    onload: function (responseDetails) {
                        // DO ALL RESPONSE PROCESSING HERE...
                        console.log (
                            "GM_xmlhttpRequest() response is:\n",
                            responseDetails.responseText.substring (0, 80) + '...'
                        );
                        updateBtn();
                    }
                } );
            });
            })();
        });
        $(tr).append(newTd1$);        $(tr).append(newTd2$);
        updateBtn();
    }
}

})();