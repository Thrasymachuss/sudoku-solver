parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"p7M3":[function(require,module,exports) {
"use strict";async function t(t){const e=t.boardInput?t.boardInput:[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],o=t.cellClassName?document.querySelectorAll(".".concat(t.cellClassName)):null,r=t.solution||null,s=await n(e,1,1,[1,2,3,4,5,6,7,8,9],0,t.getFirstSolution,o,r);return t.getFirstSolution?e:s}async function n(t,c,i,a,f,d,m,w){let p=f;if(c>9)return++p;const g=e(a),h=i>8?c+1:c,y=i>8?1:i+1;if(t[c-1][i-1]){if(p=await n(t,h,y,a,p,d,m,w),d&&p)return p}else{for(const e of g){t[c-1][i-1]=e,m&&await l(m,c-1,i-1,e,w);const f=u(t,c,i);if(o(t,c)||r(t,i)||s(f))t[c-1][i-1]=0;else if(p=await n(t,h,y,a,p,d,m,w),d&&p)return p}t[c-1][i-1]=0,m&&await l(m,c-1,i-1,"",w)}return p}function e(t){const n=t.slice();for(let e=n.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n}function o(t,n){const e={},o=t[n-1];for(const r of o){if(e[r])return!0;0!==r&&(e[r]=!0)}return!1}function r(t,n){const e={};for(const o of t){const t=o[n-1];if(e[t])return!0;0!==t&&(e[t]=!0)}return!1}function s(t){const n={};for(const e of t){if(n[e])return!0;0!==e&&(n[e]=!0)}return!1}function u(t,n,e){const o=[],[r,s]=c(n),[u,i]=c(e);for(let c=r;c<s;c++)o.push(...t[c].slice(u,i));return o}function c(t){let n,e;return t>6?(n=6,e=9):t>3?(n=3,e=6):(n=0,e=3),[n,e]}function i(t,n){return 9*t+n}function l(t,n,e,o,r){return new Promise(s=>{const u=t[i(n,e)];u.textContent=o,u.classList.add("user-added"),u.classList.remove("notes"),r[n][e]===o?u.classList.remove("wrong"):u.classList.add("wrong"),setTimeout(s,0)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"PgHr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=t(require("./solve"));function t(e){return e&&e.__esModule?e:{default:e}}async function n(e,t){const n={0:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},1:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},2:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},3:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},4:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},5:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},6:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},7:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0},8:{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0}},a=JSON.parse(JSON.stringify(e));for(;o(a)>t&&0!==Object.keys(n).length;)await r(a,n);return a}function o(e){let t=0;for(const n of e)for(const e of n)0!==e&&t++;return t}async function r(t,n){const o=Object.keys(n),r=o[Math.floor(Math.random()*o.length)],a=Object.keys(n[r]),s=a[Math.floor(Math.random()*a.length)],c=t[r][s];t[r][s]=0,1!==await(0,e.default)({boardInput:t})&&(t[r][s]=c),delete n[r][s],0===Object.keys(n[r]).length&&delete n[r]}
},{"./solve":"p7M3"}],"PpDM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=i(require("./solve")),e=i(require("./unsolve"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){s(t,e),e.add(t)}function s(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function n(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}var u=new WeakSet;class o{constructor(){r(this,u)}async initialize(i){this.solution=i.solution||await(0,t.default)({getFirstSolution:!0}),this.difficulty=i.difficulty||"easy",this.minDigits=n(this,u,a).call(this),this.puzzle=i.puzzle||await(0,e.default)(this.solution,this.minDigits),this.board=JSON.parse(JSON.stringify(this.puzzle))}enterInput(t,e,i){this.board[t][e]=Number(i)}canAcceptInput(t,e){return 0===this.puzzle[t][e]}erase(t,e){return 0===this.puzzle[t][e]&&(this.board[t][e]=0,!0)}isCorrect(t,e,i){return this.solution[t][e]===i}checkIfWin(){return JSON.stringify(this.board)===JSON.stringify(this.solution)}}function a(){switch(this.difficulty){case"expert":return 25;case"hard":return 30;case"medium":return 35;case"easy":return 40}}exports.default=o;
},{"./solve":"p7M3","./unsolve":"PgHr"}],"G9mt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=s(require("./game")),t=s(require("./solve"));function s(e){return e&&e.__esModule?e:{default:e}}const i=document.querySelector(".board"),l=document.querySelector(".select-difficulty"),n=document.querySelectorAll(".difficulty"),c=document.querySelector(".overlay"),a=document.querySelector(".msg"),o=document.querySelector(".solved-msg"),d=i.childNodes,r=document.querySelectorAll(".number-selection"),h=document.querySelector(".timer-display"),u=document.querySelector(".pause"),m=document.querySelector(".fa-solid"),f=document.querySelector(".new-game"),L=document.querySelector(".solve-for-me"),C=document.querySelector("#undo"),v=document.querySelector("#erase"),p=document.querySelector("#notes"),g=document.querySelector("#hint"),k=document.querySelector("#show-mistakes");class x{constructor(){this.firstGame=!0,this.notesOn=!1,p.addEventListener("click",this.toggleNotes.bind(this)),k.addEventListener("click",A);for(let e=0;e<81;e++)w(e);n.forEach(e=>{e.addEventListener("click",async e=>{await y("Please wait while we generate your puzzle..."),await this.gameInit(e),await b(),this.firstGame&&(this.setupEventListeners(),this.firstGame=!1),this.uiLocked=!1})})}async gameInit(t){this.difficulty=t.target.closest(".difficulty").id,this.game=new e.default,await this.game.initialize({difficulty:this.difficulty}),this.selectedCell=null,this.actionsStack=[],this.timeElapsed=0,this.paused=!1,this.uiLocked=!0,this.solved=!1,d.forEach(e=>{const[t,s]=M(e.id);e.classList.remove("user-added"),e.classList.remove("wrong"),e.classList.remove("selected"),e.classList.remove("same-value"),e.classList.remove("same-group"),0!==this.game.board[t][s]?e.textContent=this.game.board[t][s]:e.textContent=""}),this.clearIntervalId=setInterval(this.clockTick.bind(this),1e3),o.classList.remove("show"),this.solved=!1}resetUI(){this.uiLocked||(this.uiLocked=!0,clearInterval(this.clearIntervalId),m.classList.remove("fa-play"),m.classList.add("fa-pause"),l.classList.remove("hidden"),i.classList.add("hidden"),c.classList.add("hidden"))}setupEventListeners(){d.forEach(e=>{e.addEventListener("click",this.selectCell.bind(this))}),r.forEach(e=>{e.addEventListener("click",this.handleUserInput.bind(this))}),document.addEventListener("keydown",S),u.addEventListener("click",this.pauseGame.bind(this)),v.addEventListener("click",this.eraseCell.bind(this)),g.addEventListener("click",this.giveHint.bind(this)),C.addEventListener("click",this.undoLastAction.bind(this)),f.addEventListener("click",this.resetUI.bind(this)),L.addEventListener("click",this.solvePuzzle.bind(this))}async solvePuzzle(){if(this.uiLocked||this.paused)return;this.uiLocked=!0;const e=await(0,t.default)({boardInput:JSON.parse(JSON.stringify(this.game.puzzle)),getFirstSolution:!0,cellClassName:"cell",solution:this.game.solution});this.game.board=e,this.handleWinConditions(),this.uiLocked=!1}undoLastAction(){if(this.uiLocked||this.paused||this.actionsStack.length<1)return;const e=this.actionsStack.pop(),t=document.getElementById(e[0]);switch(this.selectedCell!==t&&this.handleCellSelection(t),e[1]){case"replaceValue":if(e[2]){const[t,s]=M(this.selectedCell.id);this.enterAsAnswer(t,s,e[2],!1)}else this.eraseCell();break;case"changeNotesToInput":this.eraseCell();for(const t of e[2])this.handleAsNote(t,!1);break;case"note":this.handleAsNote(e[2],!1);break;case"eraseNotes":for(const t of e[2])this.handleAsNote(t,!1);break;case"eraseNumber":const[s,i]=M(this.selectedCell.id);this.enterAsAnswer(s,i,e[2],!1);break;default:console.log("Error: invalid undo action")}}giveHint(){if(this.uiLocked||this.paused)return;const e=q();if(!e)return;const[t,s]=M(e.id),i=this.game.solution[t][s];this.selectedCell!==e&&this.handleCellSelection(e),this.enterAsAnswer(t,s,i,!0)}toggleNotes(){this.notesOn=!this.notesOn,p.classList.toggle("on")}eraseCell(e){if(this.uiLocked||this.paused||!this.selectedCell)return;const[t,s]=M(this.selectedCell.id);if(!this.game.puzzle[t][s]){if(e){const e=this.selectedCell.classList.contains("notes"),t=e?"eraseNotes":"eraseNumber",s=e?N(this.selectedCell):this.selectedCell.textContent;this.actionsStack.push([this.selectedCell.id,t,s])}this.game.erase(t,s),this.selectedCell.textContent="",this.selectedCell.classList.remove("wrong"),this.selectedCell.classList.remove("user-added"),this.selectedCell.classList.remove("notes"),o.classList.remove("show"),this.solved=!1}}handleUserInput(e){if(this.uiLocked||this.paused||!this.selectedCell)return;const t=e.target.textContent;if(this.notesOn)this.handleAsNote(t,!0);else{const[e,s]=M(this.selectedCell.id);this.enterAsAnswer(e,s,t,!0)}}async handleAsNote(e,t){if(this.selectedCell.textContent&&!this.selectedCell.classList.contains("notes"))return;this.selectedCell.classList.contains("notes")||await z(this.selectedCell);const s=this.selectedCell.querySelector(".note-".concat(e));s.textContent=s.textContent?"":e,t&&this.actionsStack.push([this.selectedCell.id,"note",e])}enterAsAnswer(e,t,s,i){if(this.game.canAcceptInput(e,t)){if(i){const e=this.selectedCell.classList.contains("notes"),t=e?"changeNotesToInput":"replaceValue",s=e?N(this.selectedCell):this.selectedCell.textContent;this.actionsStack.push([this.selectedCell.id,t,s])}this.game.enterInput(e,t,s),this.selectedCell.classList.remove("notes"),this.selectedCell.textContent=this.game.board[e][t],this.selectedCell.classList.add("user-added"),this.game.isCorrect(e,t,this.game.board[e][t])?(this.selectedCell.classList.remove("wrong"),this.handleWinConditions()):(this.selectedCell.classList.add("wrong"),o.classList.remove("show"),this.solved=!1)}}selectCell(e){const t=e.target.closest(".cell");this.handleCellSelection(t)}handleCellSelection(e){const t=this.selectedCell===e;this.selectedCell=e;const s=this.selectedCell.id,[i,l]=M(s),n=E(i,l),c=e.textContent;d.forEach(e=>{const[a,o]=M(e.id),d=E(a,o);e.classList.remove("selected"),e.classList.remove("same-value"),e.classList.remove("same-group"),t||(e.id===s?e.classList.add("selected"):!e.textContent||e.textContent!==c||e.classList.contains("notes")||this.selectedCell.classList.contains("notes")?a!==i&&o!==l&&d!==n||e.classList.add("same-group"):e.classList.add("same-value"))}),t&&(this.selectedCell=null)}clockTick(){this.timeElapsed+=1;const e=Math.floor(this.timeElapsed/3600),t=Math.floor(this.timeElapsed/60-60*e),s=Math.floor(this.timeElapsed-60*t-3600*e);h.textContent="".concat(e?e+":":"").concat(t,":")+"".concat(s<10?"0":"").concat(s)}pauseGame(){this.uiLocked||(this.paused?(this.solved||(this.clearIntervalId=setInterval(this.clockTick.bind(this),1e3)),m.classList.remove("fa-play"),m.classList.add("fa-pause"),b()):(clearInterval(this.clearIntervalId),m.classList.remove("fa-pause"),m.classList.add("fa-play"),y("Paused")),this.paused=!this.paused)}handleWinConditions(){this.game.checkIfWin()&&(o.classList.add("show"),this.solved=!0,clearInterval(this.clearIntervalId))}}function y(e){return new Promise(t=>{l.classList.add("hidden"),i.classList.add("hidden"),c.classList.remove("hidden"),a.textContent=e,setTimeout(t,0)})}function b(){return new Promise(e=>{i.classList.remove("hidden"),c.classList.add("hidden"),setTimeout(e,0)})}function w(e){const[t,s]=M(e),l=document.createElement("div");l.classList.add("cell"),l.setAttribute("id",e),I(l,t,["xx-top","x-top","x-bottom","xx-bottom"]),I(l,s,["xx-left","x-left","x-right","xx-right"]),i.appendChild(l)}function S(e){const t=String.fromCharCode(e.keyCode);t>=1&&t<=9&&r[t-1].click()}function E(e,t){let s=0;return s+=e>=6?2:e>=3&&e<6?1:0,s+=t>=6?6:t>=3&&t<6?3:0}function w(e){const[t,s]=M(e),l=document.createElement("div");l.classList.add("cell"),l.setAttribute("id",e),I(l,t,["xx-top","x-top","x-bottom","xx-bottom"]),I(l,s,["xx-left","x-left","x-right","xx-right"]),i.appendChild(l)}function I(e,t,s){switch(t){case 0:e.classList.add(s[0]);break;case 3:case 6:e.classList.add(s[1]);break;case 2:case 5:e.classList.add(s[2]);break;case 8:e.classList.add(s[3])}}function A(){i.classList.toggle("show-mistakes"),k.classList.toggle("on")}function q(){const e=[];return d.forEach(t=>{t.textContent&&!t.classList.contains("notes")||e.push(t)}),e.length>0?e[Math.floor(Math.random()*e.length)]:null}function N(e){const t=[],s=e.querySelectorAll(".note");for(const i of s)i.textContent&&t.push(i.textContent);return t}function z(e){return new Promise(t=>{e.classList.add("notes");for(let s=1;s<=9;s++){const t=document.createElement("span");t.classList.add("note"),t.classList.add("note-".concat(s)),e.appendChild(t)}setTimeout(t,0)})}function M(e){return[Math.floor(e/9),e%9]}async function P(t){return new e.default(t)}exports.default=x;
},{"./game":"PpDM","./solve":"p7M3"}],"d6sW":[function(require,module,exports) {
"use strict";var e=l(require("./modules/solve")),u=l(require("./modules/unsolve")),r=l(require("./modules/game")),s=l(require("./modules/ui"));function l(e){return e&&e.__esModule?e:{default:e}}const o=new s.default;
},{"./modules/solve":"p7M3","./modules/unsolve":"PgHr","./modules/game":"PpDM","./modules/ui":"G9mt"}]},{},["d6sW"], null)