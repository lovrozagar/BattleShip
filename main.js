"use strict";(self.webpackChunkBattleShip=self.webpackChunkBattleShip||[]).push([[179],{649:(e,t,n)=>{const s={create:function(e,t){e||console.log("missing type");const n=document.createElement(e);for(const[e,s]of Object.entries(t))n[e]=s;return n},appendAll:function(e,t){t.forEach((t=>e.appendChild(t)))},deleteAppContent:function(){document.getElementById("app").replaceChildren("")},getHeader:function(e){const t=document.createElement("header");t.classList.add("header",`${e}`);const n=document.createElement("h1");return n.textContent="BATTLESHIP",t.appendChild(n),t},createMap:function(e){const t=document.createElement("div");return t.id=`board-${e}`,t.classList.add("board",e),t.appendChild(function(){const e=document.createElement("div");return e.classList="letter-container",["A","B","C","D","E","F","G","H","I","J"].forEach((t=>{const n=document.createElement("div");n.className="letter",n.textContent=t,e.appendChild(n)})),e}()),t.appendChild(function(){const e=document.createElement("div");return e.id="number-container",e.classList="number-container",[1,2,3,4,5,6,7,8,9,10].forEach((t=>{const n=document.createElement("div");n.classList="number",n.textContent=t,e.appendChild(n)})),e}()),t.appendChild(function(e){const t=document.createElement("div");t.id=`field-container-${e}`,t.className="field-container";for(let e=0;e<10;e+=1)for(let e=0;e<10;e+=1){const e=document.createElement("div");e.className="field",t.appendChild(e)}return t}(e)),t},getCoordinatesFromIndex:function(e){return[parseInt(e/10,10),e%10]},getIndexFromCoordinates:function(e,t){return 10*e+t},roundNearestTenExceptZero:function(e){for(;e%10!=0;)e+=1;return e}},a=s,i=(()=>{function e(){const e=a.create("form",{className:"name-form"}),t=a.create("input",{type:"text",id:"name-input",className:"name-input",placeholder:"Captain name"}),n=a.create("span",{className:"input-border"});return a.appendAll(e,[t,n]),e}function t(){const e=a.create("button",{id:"play-now-button",className:"play-now-button"}),t=a.create("span",{className:"text-play-button",textContent:"ENTER COMBAT"});return e.appendChild(t),e}return{loadCard:function(){const n=document.getElementById("app");n.classList.add("pregame"),n.appendChild(function(){const n=a.create("section",{className:"pregame-card"});return a.appendAll(n,[a.create("h1",{textContent:"BATTLESHIP"}),e(),t()]),n}())}}})(),o=n.p+"img/carrierX008846a84b2a34dde315.svg",r=n.p+"img/battleshipXd56e5a89beb359219e25.svg",c=n.p+"img/cruiserX0504ee6feab7e47038d3.svg",u=n.p+"img/submarineX543bf6eb30d63dfd7a2f.svg",l=n.p+"img/destroyerX56e5c8a88ff718d93efc.svg";function d(){return this.length}function h(){this.timesHit+=1,this.timesHit===this.length&&this.sunk()}function p(){this.isSunk=!0}function m(){this.isFound=!0}function g(){this.found=!1}const f=(e,t)=>({name:e,length:t,timesHit:0,isSunk:!1,isFound:!1,getLength:d,hit:h,sunk:p,found:m,resetFound:g});function y(){return this.board}function b(){return this.fleet}function w(){return this.axis}function C(){return this.shipOnDrag}function v(e){return this.fleet.filter((t=>t.name===e))[0]}function k(){this.axis="X"}function E(){this.axis="Y"}function S(e){this.shipOnDrag.name=e.name,this.shipOnDrag.length=e.length}function N(){this.fleet.forEach((e=>e.isFound=!1))}function M(e){switch(e.name){case"carrier":this.fleet.push(f("carrier",5));break;case"battleship":this.fleet.push(f("battleship",4));break;case"cruiser":this.fleet.push(f("cruiser",3));break;case"submarine":this.fleet.push(f("submarine",3));break;default:this.fleet.push(f("destroyer",2))}}function x(){this.fleet=[]}function B(e,t){let n=e.length;const[s,a]=t,i=[];if(L(n,this.board.length,a))return!1;for(let e=a;e<this.board.length;e++){if("x"!==this.board[s][e])return!1;if(i.push([s,e]),n-=1,0===n)break}return i.forEach((t=>{const[n,s]=t;this.board[n][s]=`${e.name}X`})),this.addToFleet(e),!0}function T(e,t){let n=e.length;const[s,a]=t,i=[];if(L(n,this.board.length,s))return!1;for(let e=s;e<this.board.length;e++){if("x"!==this.board[e][a])return!1;if(i.push([e,a]),n-=1,0===n)break}return i.forEach((t=>{const[n,s]=t;this.board[n][s]=`${e.name}Y`})),this.addToFleet(e),!0}function L(e,t,n){return e>t-n}function I(e){const[t,n]=e;this.recordHit(t,n)}function P(e,t){switch(this.board[e][t]){case"carrierX":case"carrierY":this.getShip("carrier").hit();break;case"battleshipX":case"battleshipY":this.getShip("battleship").hit();break;case"cruiserX":case"cruiserY":this.getShip("cruiser").hit();break;case"submarineX":case"submarineY":this.getShip("submarine").hit();break;case"destroyerX":case"destroyerY":this.getShip("destroyer").hit();break;default:this.board[e][t]="miss"}}function A(){return 5===this.fleet.length}function O(){return 5===this.fleet.filter((e=>!0===e.isSunk)).length}const F=()=>({board:new Array(10).fill("x").map((()=>new Array(10).fill("x"))),fleet:[],axis:"X",shipOnDrag:{name:"",length:0},getBoard:y,getFleet:b,getShip:v,getAxis:w,getShipOnDrag:C,setAxisX:k,setAxisY:E,setFleetEmpty:x,setAllShipsNotFound:N,setShipOnDrag:S,addToFleet:M,placeX:B,placeY:T,receiveAttack:I,recordHit:P,areAllShipsFound:A,isEveryShipSunk:O});function D(){return this.board}function Y(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];(this.isEmptyField(e)||this.isCpu)&&(this.isCpu?this.cpuPlay():this.board.receiveAttack(e),this.turn+=1)}function H(e){const[t,n]=e;return"miss"!==this.board.board[t][n]&&"hit"!==this.board.board[t][n]}function W(){let e,t,n=!0;for(;n;)e=j(),t=j(),this.isEmptyField([e,t])&&(console.log("a"),n=!1,this.board.receiveAttack([e,t]));return[e,t]}function q(){const e=["carrier","battleship","cruiser","submarine","destroyer"],t=[5,4,3,3,2],n=this.getMap();for(;e.length;){const s=["x","y"][Math.round(Math.random())];let a=!1;const i=j(),o=j();a="x"===s?n.placeX(f(e[0],t[0]),[i,o]):n.placeY(f(e[0],t[0]),[i,o]),a&&(e.shift(),t.shift())}}function X(){return this.getMap().getFleet().every((e=>e.isSunk))}function j(){return Math.floor(10*Math.random())}const $=function(e){return{name:e,isCpu:arguments.length>1&&void 0!==arguments[1]&&arguments[1],board:F(),turn:0,getMap:D,playTurn:Y,cpuPlay:W,autoPlace:q,isEmptyField:H,isLoser:X}},R=(()=>{function e(){return this.combatant}function t(){return this.cpu}return{state:{combatant:$("Captain"),cpu:$("cpu",!0),getPlayer:e,getCPU:t}}})(),U=(()=>{let e=null;function t(t,n){const s=n.element.slice(0,-1),i=t.getMap().getShip(s);if(i.isFound)return;i.found();const d=i.getLength(),[h,p]=["10%",10*d+"%"],[m,g]=[10*n.row+"%",10*n.col+"%"];let f="rotate(0deg)";"Y"===n.element.at(-1)&&(f="rotate(90deg) translate(0,-100%)");const y=(null===e&&(e=(new Date).getTime()),((new Date).getTime()-e)/1e3),b=a.create("div",{className:"ship-image-container"});b.classList.add("bleep"),b.style.position="absolute",b.style.zIndex="-1",b.style.top=m,b.style.left=g,b.style.width=p,b.style.height=h,b.style.transform=f,b.style.transformOrigin="top left",b.style.maskImage=o,b.style.animationDelay=-y+"s";const w=a.create("img",{className:!0===t.isCpu?`${s}-cpu`:`${s}-player`});w.src=function(e){let t;switch(e){case"carrier":t=o;break;case"battleship":t=r;break;case"cruiser":t=c;break;case"submarine":t=u;break;case"destroyer":t=l;break;default:t=""}return t}(s),w.style.height="95%",w.style.aspectRatio=`${d}/1`,b.appendChild(w),n.board.appendChild(b)}return{loadFleet:function(e){const n=R.state.getPlayer(),s=n.getMap(),a=s.getBoard();for(let i=0;i<a.length;i+=1)for(let o=0;o<a[0].length;o+=1)"x"!==a[i][o]&&t(n,{map:s,board:e,element:a[i][o],row:i,col:o})},loadShipOnBoard:t}})();function z(){return z=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},z.apply(this,arguments)}var J={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:function(e){},onComplete:function(e){},preStringTyped:function(e,t){},onStringTyped:function(e,t){},onLastStringBackspaced:function(e){},onTypingPaused:function(e,t){},onTypingResumed:function(e,t){},onReset:function(e){},onStop:function(e,t){},onStart:function(e,t){},onDestroy:function(e){}},G=new(function(){function e(){}var t=e.prototype;return t.load=function(e,t,n){if(e.el="string"==typeof n?document.querySelector(n):n,e.options=z({},J,t),e.isInput="input"===e.el.tagName.toLowerCase(),e.attr=e.options.attr,e.bindInputFocusEvents=e.options.bindInputFocusEvents,e.showCursor=!e.isInput&&e.options.showCursor,e.cursorChar=e.options.cursorChar,e.cursorBlinking=!0,e.elContent=e.attr?e.el.getAttribute(e.attr):e.el.textContent,e.contentType=e.options.contentType,e.typeSpeed=e.options.typeSpeed,e.startDelay=e.options.startDelay,e.backSpeed=e.options.backSpeed,e.smartBackspace=e.options.smartBackspace,e.backDelay=e.options.backDelay,e.fadeOut=e.options.fadeOut,e.fadeOutClass=e.options.fadeOutClass,e.fadeOutDelay=e.options.fadeOutDelay,e.isPaused=!1,e.strings=e.options.strings.map((function(e){return e.trim()})),e.stringsElement="string"==typeof e.options.stringsElement?document.querySelector(e.options.stringsElement):e.options.stringsElement,e.stringsElement){e.strings=[],e.stringsElement.style.cssText="clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";var s=Array.prototype.slice.apply(e.stringsElement.children),a=s.length;if(a)for(var i=0;i<a;i+=1)e.strings.push(s[i].innerHTML.trim())}for(var o in e.strPos=0,e.arrayPos=0,e.stopNum=0,e.loop=e.options.loop,e.loopCount=e.options.loopCount,e.curLoop=0,e.shuffle=e.options.shuffle,e.sequence=[],e.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},e.typingComplete=!1,e.strings)e.sequence[o]=o;e.currentElContent=this.getCurrentElContent(e),e.autoInsertCss=e.options.autoInsertCss,this.appendAnimationCss(e)},t.getCurrentElContent=function(e){return e.attr?e.el.getAttribute(e.attr):e.isInput?e.el.value:"html"===e.contentType?e.el.innerHTML:e.el.textContent},t.appendAnimationCss=function(e){var t="data-typed-js-css";if(e.autoInsertCss&&(e.showCursor||e.fadeOut)&&!document.querySelector("["+t+"]")){var n=document.createElement("style");n.type="text/css",n.setAttribute(t,!0);var s="";e.showCursor&&(s+="\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),e.fadeOut&&(s+="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),0!==n.length&&(n.innerHTML=s,document.body.appendChild(n))}},e}()),K=new(function(){function e(){}var t=e.prototype;return t.typeHtmlChars=function(e,t,n){if("html"!==n.contentType)return t;var s=e.substr(t).charAt(0);if("<"===s||"&"===s){var a;for(a="<"===s?">":";";e.substr(t+1).charAt(0)!==a&&!(1+ ++t>e.length););t++}return t},t.backSpaceHtmlChars=function(e,t,n){if("html"!==n.contentType)return t;var s=e.substr(t).charAt(0);if(">"===s||";"===s){var a;for(a=">"===s?"<":"&";e.substr(t-1).charAt(0)!==a&&!(--t<0););t--}return t},e}()),Z=function(){function e(e,t){G.load(this,t,e),this.begin()}var t=e.prototype;return t.toggle=function(){this.pause.status?this.start():this.stop()},t.stop=function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))},t.start=function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))},t.destroy=function(){this.reset(!1),this.options.onDestroy(this)},t.reset=function(e){void 0===e&&(e=!0),clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,e&&(this.insertCursor(),this.options.onReset(this),this.begin())},t.begin=function(){var e=this;this.options.onBegin(this),this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout((function(){e.currentElContent&&0!==e.currentElContent.length?e.backspace(e.currentElContent,e.currentElContent.length):e.typewrite(e.strings[e.sequence[e.arrayPos]],e.strPos)}),this.startDelay)},t.typewrite=function(e,t){var n=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var s=this.humanizer(this.typeSpeed),a=1;!0!==this.pause.status?this.timeout=setTimeout((function(){t=K.typeHtmlChars(e,t,n);var s=0,i=e.substr(t);if("^"===i.charAt(0)&&/^\^\d+/.test(i)){var o=1;o+=(i=/\d+/.exec(i)[0]).length,s=parseInt(i),n.temporaryPause=!0,n.options.onTypingPaused(n.arrayPos,n),e=e.substring(0,t)+e.substring(t+o),n.toggleBlinking(!0)}if("`"===i.charAt(0)){for(;"`"!==e.substr(t+a).charAt(0)&&(a++,!(t+a>e.length)););var r=e.substring(0,t),c=e.substring(r.length+1,t+a),u=e.substring(t+a+1);e=r+c+u,a--}n.timeout=setTimeout((function(){n.toggleBlinking(!1),t>=e.length?n.doneTyping(e,t):n.keepTyping(e,t,a),n.temporaryPause&&(n.temporaryPause=!1,n.options.onTypingResumed(n.arrayPos,n))}),s)}),s):this.setPauseStatus(e,t,!0)},t.keepTyping=function(e,t,n){0===t&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this));var s=e.substr(0,t+=n);this.replaceText(s),this.typewrite(e,t)},t.doneTyping=function(e,t){var n=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),!1===this.loop||this.curLoop===this.loopCount)||(this.timeout=setTimeout((function(){n.backspace(e,t)}),this.backDelay))},t.backspace=function(e,t){var n=this;if(!0!==this.pause.status){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var s=this.humanizer(this.backSpeed);this.timeout=setTimeout((function(){t=K.backSpaceHtmlChars(e,t,n);var s=e.substr(0,t);if(n.replaceText(s),n.smartBackspace){var a=n.strings[n.arrayPos+1];n.stopNum=a&&s===a.substr(0,t)?t:0}t>n.stopNum?(t--,n.backspace(e,t)):t<=n.stopNum&&(n.arrayPos++,n.arrayPos===n.strings.length?(n.arrayPos=0,n.options.onLastStringBackspaced(),n.shuffleStringsIfNeeded(),n.begin()):n.typewrite(n.strings[n.sequence[n.arrayPos]],t))}),s)}else this.setPauseStatus(e,t,!1)},t.complete=function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0},t.setPauseStatus=function(e,t,n){this.pause.typewrite=n,this.pause.curString=e,this.pause.curStrPos=t},t.toggleBlinking=function(e){this.cursor&&(this.pause.status||this.cursorBlinking!==e&&(this.cursorBlinking=e,e?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))},t.humanizer=function(e){return Math.round(Math.random()*e/2)+e},t.shuffleStringsIfNeeded=function(){this.shuffle&&(this.sequence=this.sequence.sort((function(){return Math.random()-.5})))},t.initFadeOut=function(){var e=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout((function(){e.arrayPos++,e.replaceText(""),e.strings.length>e.arrayPos?e.typewrite(e.strings[e.sequence[e.arrayPos]],0):(e.typewrite(e.strings[0],0),e.arrayPos=0)}),this.fadeOutDelay)},t.replaceText=function(e){this.attr?this.el.setAttribute(this.attr,e):this.isInput?this.el.value=e:"html"===this.contentType?this.el.innerHTML=e:this.el.textContent=e},t.bindFocusEvents=function(){var e=this;this.isInput&&(this.el.addEventListener("focus",(function(t){e.stop()})),this.el.addEventListener("blur",(function(t){e.el.value&&0!==e.el.value.length||e.start()})))},t.insertCursor=function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.setAttribute("aria-hidden",!0),this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))},e}();const Q=n.p+"img/agent2d80167d315204e60bc4.png",V=n.p+"img/evilCaptain9aae6a9e96b92014ac6c.png",_=(()=>{const e={agent:Q,enemy:V};return{createMessageSection:function(t){const n=a.create("section",{className:"message"});t.forEach((e=>n.classList.add(e)));const s=t[1],i=a.create("img",{className:"message-image"}),o="agent"===t[1]||"agent-win"===t[1]?"agent":"enemy";return i.src=e[o],n.appendChild(i),n.appendChild(function(e){const t=a.create("div",{id:"message-container",className:"message-container"}),n=a.create("div",{id:`message-${e}`,className:`message-${e}`});return t.appendChild(n),t}(s)),n},addTypeWriterMessage:function(e,t){new Z(e,{strings:t,typeSpeed:10})}}})(),ee=(()=>{const e={welcome:["Welcome aboard Captain!","Plan our formation by selecting the axis and dragging and dropping ships on the map."],battleStartPlayer:["Captain, all systems are online and ready for action. Let's give 'em hell!"],battleStartEnemy:["I'll show you no mercy, just like your father showed none to mine."],enemyHit:["They're getting schooner-ed, sir.","This battle is a tidal wave of victory!","The enemy ship is feeling the pressure, sir.","We've got them on the ropes sir, I mean rigging!","That was textbook, Captain. They're going down in no time.","Target hit. Enemy vessel has sustained significant damage.","Captain, we have successfully landed a blow on the enemy vessel.","That hit was right on the money, Captain. We've got them reeling.","BOOM! Enemy ship gets hit hard! That's what I call a depth charge!","Direct hit achieved. Enemy ship's combat effectiveness is significantly reduced."],enemySunk:["Captain, the enemy vessel is going down. That was one hell of a shot.","Sir, that was a hit for the history books. The enemy ship has been sunk.","We've just sunk the enemy ship, Captain. They won't be troubling us anymore.","Captain, we've just delivered a knockout blow. The enemy ship has been sunk.","We've just sent the enemy ship to Davy Jones' locker, Captain. Job well done.","Captain, the enemy ship has been vanquished. They won't be bothering us again.","That hit was a decisive blow, Captain. The enemy ship has met its watery grave.","That was a direct hit, Captain. The enemy ship is now resting on the ocean floor.","The enemy ship has been put out of commission. They won't be troubling us anymore.","We've just given the enemy ship a one-way ticket to the bottom of the ocean, Captain."],playerMiss:["Close, but no cigar.","Our aim needs work, captain.","Negative on that shot, captain.","No hit, captain. Keep fighting.","That was a swing and a miss, sir.","No dice on that one. Keep trying!","The enemy is proving to be elusive, sir.","Looks like we need to adjust our aim, sir.","Looks like we need to recalibrate our aim, sir.","We're not making much headway, captain. What's the plan?"],playerHit:["Your time is up!","Hehehe, your luck is running out,","Brace yourself for the real pain!","That was just a taste of what's to come.","You'll be swimming with the fishes soon enough.","My torpedoes have your number, it's over for you!","So predictable, you're not even worth the ammunition","How does it feel to be on the receiving end of my wrath?","Your luck has run out, and there's nowhere left to hide!","Looks like I hit a nerve. How about a little retaliation?"],playerSunk:["Looks like you'll be swimming home. Hehehe.","You fought like a coward and died like a dog.","Looks like your ship was no match for our firepower.","Another one bites the dust. It's too easy to crush your kind.","Your demise was inevitable. The sea always takes what it wants.","Did you really think you stood a chance against us? How foolish.","It's a shame your ship couldn't withstand the might of our fleet.","The ocean belongs to the strong. Your ship didn't stand a chance.","You made a grave mistake challenging me. Your defeat was certain.","You should have surrendered while you had the chance. Now look at you."],enemyMiss:["I'll get you next time.","My turn to strike again.","Missed, but not for long.","You can run, but you can't hide.","You can't escape my sight forever.","Your luck is just prolonging the inevitable.","My torpedoes will find you, no matter where you hide.","You may have dodged one, but you can't dodge them all.","That was just a warning shot, the real attack is coming.","You're playing with fire, and I have a lot of ammunition."],noComment:["..."],playerWin:["Mission accomplished, Captain! You truly are the master of the seas."],enemyWin:["You were no match for me scum. Consider it payback for what your father did to mine."]};function t(){return Math.floor(10*Math.random())}return{getWelcomeMessage:function(){return e.welcome},getBattleStartMessage:function(){return e.battleStartPlayer},getNewEnemyBattleStartMessage:function(){return e.battleStartEnemy},getNewEnemyHitMessage:function(n){let s=n;for(;s===n;)s=e.enemyHit[t()];return s},getNewEnemySunkMessage:function(n){let s=n;for(;s===n;)s=e.enemySunk[t()];return s},getNewPlayerMissMessage:function(n){let s=n;for(;s===n;)s=e.playerMiss[t()];return s},getNewPlayerHitMessage:function(n){let s=n;for(;s===n;)s=e.playerHit[t()];return s},getNewPlayerSunkMessage:function(n){let s=n;for(;s===n;)s=e.playerSunk[t()];return s},getNewEnemyMissMessage:function(n){let s=n;for(;s===n;)s=e.enemyMiss[t()];return s},getNoCommentMessage:function(){return e.noComment},getPlayerWinMessage:function(){return e.playerWin},getEnemyWinMessage:function(){return e.enemyWin}}})(),te=n.p+"img/shote38f594694469ba3b826.mp3",ne=n.p+"img/hit96a50b265841ced7c235.mp3",se=n.p+"img/miss058afc203bb520b90d96.mp3",ae=(()=>{function e(e){const t=new(window.AudioContext||window.webkitAudioContext),n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=()=>{t.decodeAudioData(n.response,(e=>{const n=t.createBufferSource();n.buffer=e,n.connect(t.destination),n.start(0)}))},n.send()}return{shot:function(){e(te)},hit:function(){e(ne)},miss:function(){e(se)}}})(),ie=(()=>{function e(){const e=a.createMap("friendly");return e.appendChild(n("FRIENDLY WATERS")),e}function t(){const e=a.createMap("enemy");return e.appendChild(n("ENEMY WATERS")),e}function n(e){const t=a.create("div",{className:"map-title-container"}),n=a.create("h3",{className:"map-title",textContent:e});return t.appendChild(n),t}function s(e){const t=a.create("section",{id:"win-modal-container",className:"win-modal-container"});t.classList.add(e.className);const n=a.create("h4",{id:`title-${e.id}`,className:`title-${e.id}`,textContent:e.title}),s=_.createMessageSection(["battle",e.id]),i=a.create("button",{id:"new-game-button",className:"new-game-button",textContent:"New Battle"});return a.appendAll(t,[n,s,i]),t}function i(){return a.create("div",{className:"win-overlay"})}function o(){document.getElementById("new-game-button").addEventListener("click",(()=>window.location.reload()))}async function r(e){const{target:t}=e;m(t),await async function(e){d();const t=document.querySelector(".message.battle.enemy"),n=document.querySelector(".message.battle.agent");ae.shot(),await v();const r=R.state.getCPU(),c=[...e.parentNode.children].indexOf(e),[l,m]=a.getCoordinatesFromIndex(c),E=r.getMap().getBoard()[l][m],S=p(E),N=r.getMap().getShip(S);"x"===(console.log(r.getMap().getBoard()),E)?(f(e),await k(),ae.miss()):(g(e),function(e){const t=document.getElementById("field-container-enemy"),n=e.cpu.getMap(),s=n.getBoard();if(n.receiveAttack([e.row,e.col]),e.battleship.isSunk){const a=s[e.row][e.col],[i,o]=function(e,t){for(let n=0;n<e.length;n+=1)for(let s=0;s<e[0].length;s+=1)if(e[n][s]===t)return[n,s];return[0,0]}(s,s[e.row][e.col]);U.loadShipOnBoard(e.cpu,{map:n,board:t,element:a,row:i,col:o})}}({cpu:r,battleship:N,row:l,col:m}),await k(),ae.hit()),console.log("is player winner: ",r.isLoser()),console.log(r.getMap()),function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=document.getElementById("message-agent"),s=document.getElementById("message-enemy");"x"!==e?t&&!t.isSunk?h(n,ee.getNewEnemyHitMessage(n.textContent)):t.isSunk&&h(n,ee.getNewEnemySunkMessage(n.textContent)):h(n,ee.getNewPlayerMissMessage(n.textContent)),"..."!==s.textContent&&h(s,ee.getNoCommentMessage()[0])}(E,N),await C(),r.isLoser()?function(){const e=document.getElementById("app");e.classList.add("of-focus"),a.appendAll(e,[s({title:"YOU WIN!",id:"agent-win",className:"player"}),i()]),u("agent-win"),o(),d()}():(await w(),b(n),y(t),b(document.getElementById("board-friendly")),y(document.getElementById("board-enemy")))}(t),await async function(){const e=document.querySelector(".message.battle.enemy"),t=document.querySelector(".message.battle.agent");h(document.getElementById("message-agent"),ee.getNoCommentMessage()[0]),await C(),ae.shot(),await v();const n=document.getElementById("field-container-friendly"),r=R.state.getPlayer(),[c,d]=r.cpuPlay(),m=r.getMap().getBoard()[c][d],E=p(m),S=r.getMap().getShip(E),N=a.getIndexFromCoordinates(c,d);"miss"===m?(f(n.children[N]),r.getMap().getBoard()[c][d]="miss",await k(),ae.miss()):(g(n.children[N]),r.getMap().getBoard()[c][d]="hit",await k(),ae.hit()),console.log("is cpu winner: ",r.isLoser()),function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=document.getElementById("message-enemy");"x"!==e&&"miss"!==e?t&&!t.isSunk?h(n,ee.getNewPlayerHitMessage(n.textContent)):t.isSunk&&h(n,ee.getNewPlayerSunkMessage(n.textContent)):h(n,ee.getNewEnemyMissMessage(n.textContent))}(m,S),await C(),r.isLoser()?function(){const e=document.getElementById("app");e.classList.add("of-focus"),a.appendAll(e,[s({title:"YOU LOSE!",id:"enemy-win",className:"enemy"}),i()]),u("enemy-win"),o()}():(await w(),b(e),y(t),b(document.getElementById("board-enemy")),y(document.getElementById("board-friendly")),l())}()}function c(e){const t=document.getElementById(`message-${e}`);"agent"===e?_.addTypeWriterMessage(t,ee.getBattleStartMessage()):_.addTypeWriterMessage(t,ee.getNewEnemyBattleStartMessage())}function u(e){const t=document.getElementById(`message-${e}`);"agent-win"===e&&_.addTypeWriterMessage(t,ee.getPlayerWinMessage()),"enemy-win"===e&&_.addTypeWriterMessage(t,ee.getEnemyWinMessage())}function l(){document.getElementById("board-enemy").querySelector(".field-container").childNodes.forEach((e=>{e.addEventListener("click",r)})),document.getElementById("field-container-enemy").classList.remove("disabled")}function d(){document.querySelectorAll(".field").forEach((e=>e.removeEventListener("click",r))),m(document.getElementById("field-container-enemy"))}function h(e,t){!function(e){e.nextElementSibling&&(e.textContent="",e.nextElementSibling.remove())}(e),_.addTypeWriterMessage(e,[t])}function p(e){return e.slice(0,e.length-1)}function m(e){e.classList.add("disabled")}function g(e){e.classList.add("hit")}function f(e){e.classList.add("miss")}function y(e){e.classList.remove("off-turn"),e.classList.add("on-turn")}function b(e){e.classList.remove("on-turn"),e.classList.add("off-turn")}function w(){return new Promise((e=>setTimeout(e,1500)))}function C(){return new Promise((e=>setTimeout(e,1e3)))}function v(){return new Promise((e=>setTimeout(e,500)))}function k(){return new Promise((e=>setTimeout(e,300)))}return{loadBattleContent:function(){a.deleteAppContent();const n=document.getElementById("app");n.classList.replace("setup","battle"),n.appendChild(function(){const n=a.create("div",{className:"battle-wrapper"});return a.appendAll(n,[e(),t(),_.createMessageSection(["battle","agent"]),_.createMessageSection(["battle","enemy"])]),n}()),function(){const e=document.getElementById("field-container-friendly");R.state.getPlayer().getMap().setAllShipsNotFound(),U.loadFleet(e)}(),R.state.getCPU().autoPlace(),c("agent"),c("enemy"),l(),y(document.querySelector(".message.battle.agent"))}}})(),oe=ie,re=(()=>{function e(){const e=a.create("section",{id:"setup-container",className:"setup-container"});return e.appendChild(function(){const e=a.create("div",{className:"board-fleet-container"});return a.appendAll(e,[a.createMap("setup"),t()]),e.querySelector("#board-setup").appendChild(function(){const e=a.create("div",{id:"axis-button-container",className:"axis-button-container"}),t=a.create("button",{id:"x-button",className:"axis-button",textContent:"X axis"}),n=a.create("button",{id:"y-button",className:"axis-button",textContent:"Y axis"});return t.classList.add("selected"),a.appendAll(e,[t,n]),e}()),e}()),e}function t(){const e=a.create("section",{id:"fleet-setup",className:"fleet-setup"});return["carrier","battleship","cruiser","submarine","destroyer"].forEach((t=>{const n=function(e){const t=a.create("button",{className:"ship-card"}),n=a.create("div",{className:"ship-content"}),s=a.create("img",{className:"ship-image"}),i=a.create("p",{className:"ship-name"});switch(e){case"carrier":t.dataset.shipName="carrier",t.dataset.shipLength=5,s.src=o,i.textContent="Carrier (5f)";break;case"battleship":t.dataset.shipName="battleship",t.dataset.shipLength=4,s.src=r,i.textContent="Battleship (4f)";break;case"cruiser":t.dataset.shipName="cruiser",t.dataset.shipLength=3,s.src=c,i.textContent="Cruiser (3f)";break;case"submarine":t.dataset.shipName="submarine",t.dataset.shipLength=3,s.src=u,i.textContent="Submarine (3f)";break;case"destroyer":t.dataset.shipName="destroyer",t.dataset.shipLength=2,s.src=l,i.textContent="Destroyer (2f)"}return a.appendAll(n,[s,i]),t.appendChild(n),t}(t);n.draggable="true",e.appendChild(n)})),e}function n(){const e=a.create("section",{id:"reset-continue-section",className:"reset-continue-section"}),t=a.create("button",{id:"reset-button",className:"reset-button",textContent:"Reset"}),n=a.create("button",{id:"continue-button",className:"continue-button",textContent:"Confirm"});return a.appendAll(e,[t,n]),e}function s(e,t){const n=R.state.getPlayer().getMap();"x-button"===e.id?n.setAxisX():n.setAxisY(),e.classList.add("selected"),t.classList.remove("selected")}function i(){oe.loadBattleContent()}return{loadSetupContent:function(){const t=document.getElementById("app");t.classList.replace("pregame","setup"),t.appendChild(function(){const t=a.create("div",{className:"setup-wrapper"});return a.appendAll(t,[_.createMessageSection(["setup","agent"]),e(),n()]),t}()),function(){const e=document.getElementById("message-agent");_.addTypeWriterMessage(e,ee.getWelcomeMessage())}(),function(){const e=document.getElementById("x-button"),t=document.getElementById("y-button");e.addEventListener("click",(()=>s(e,t))),t.addEventListener("click",(()=>s(t,e)))}(),function(){const e=document.getElementById("reset-button"),t=document.getElementById("continue-button"),n=R.state.getPlayer().getMap().getBoard();e.addEventListener("click",(()=>function(e){const t=document.getElementById("field-container-setup");(function(){const e=R.state.getPlayer().getMap();(function(){const e=document.getElementById("fleet-setup"),t=document.getElementById("message-agent");e.childNodes.forEach((e=>{e.classList.contains("hidden")&&(e.classList.remove("hidden"),t.classList.add("reset"))}))})(),e.getFleet().forEach((e=>e.resetFound())),e.setFleetEmpty()})(),function(e){for(let t=0;t<e.length;t+=1)for(let n=0;n<e[0].length;n+=1)e[t][n]="x"}(e),t.querySelectorAll(".ship-image-container").forEach((e=>e.remove()))}(n))),t.addEventListener("click",i)}()}}})(),ce=re,ue=(()=>{let e=[];function t(){const t=document.getElementById("field-container-setup");for(let n=0;n<e.length;n+=1)t.children[e[n]].className="field";n()}function n(){e=[]}return{initDraggableFields:function(){document.getElementById("fleet-setup").childNodes.forEach((e=>{e.addEventListener("dragstart",(()=>{R.state.getPlayer().getMap().setShipOnDrag({name:e.dataset.shipName,length:e.dataset.shipLength})}))})),document.getElementById("field-container-setup").childNodes.forEach((e=>{e.addEventListener("dragenter",(e=>{e.preventDefault()}))})),function(){const t=document.getElementById("field-container-setup");t.childNodes.forEach(((s,i)=>{s.addEventListener("dragover",(s=>{s.preventDefault(),function(t,s){const i=R.state.getPlayer().getMap(),o=i.getBoard(),r=i.getAxis(),c=i.getShipOnDrag();let{length:u}=c;n();let l=!1;if("X"===r)for(let n=s;n<a.roundNearestTenExceptZero(s+1);n+=1){const[s,i]=a.getCoordinatesFromIndex(n);if(0===u)break;t.children[n].classList.add("hovering"),e.push(n),u-=1,"x"!==o[s][i]&&(l=!0)}if("Y"===r)for(let n=s;n<100;n+=10){const[s,i]=a.getCoordinatesFromIndex(n);if(0===u)break;t.children[n].classList.add("hovering"),e.push(n),u-=1,"x"!==o[s][i]&&(l=!0)}(l||0!==u)&&e.forEach((e=>{t.children[e].classList.add("red")}))}(t,i)}))}))}(),document.getElementById("field-container-setup").childNodes.forEach((e=>{e.addEventListener("dragleave",(()=>{t()}))})),function(){const e=document.getElementById("field-container-setup");e.childNodes.forEach(((n,s)=>{n.addEventListener("drop",(()=>{const[n,i]=a.getCoordinatesFromIndex(s),[o,r]=function(e,t){const n=R.state.getPlayer().getMap(),s=R.state.getPlayer().getMap().getShipOnDrag();return"X"===n.getAxis()?[n.placeX(f(s.name,s.length),[e,t]),s.name]:[n.placeY(f(s.name,s.length),[e,t]),s.name]}(n,i);t(),U.loadFleet(e),function(e,t){if(!e)return;document.querySelector(`[data-ship-name=${t}]`).classList.add("hidden")}(o,r)}))}))}()}}})(),le=ue;(()=>{function e(){a.deleteAppContent(),ce.loadSetupContent(),le.initDraggableFields()}return{loadContent:function(){a.deleteAppContent(),i.loadCard(),document.getElementById("play-now-button").addEventListener("click",e)}}})().loadContent()}},e=>{e(e.s=649)}]);