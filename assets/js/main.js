!function(){"use strict";function e(t,i){function r(e,t){return function(){return e.apply(t,arguments)}}var s;if(i=i||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=i.touchBoundary||10,this.layer=t,this.tapDelay=i.tapDelay||200,this.tapTimeout=i.tapTimeout||700,!e.notNeeded(t)){for(var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,c=0,u=o.length;u>c;c++)a[o[c]]=r(a[o[c]],a);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,i){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,n.hijacked||n,i):r.call(t,e,n,i)},t.addEventListener=function(e,n,i){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),i):r.call(t,e,n,i)}),"function"==typeof t.onclick&&(s=t.onclick,t.addEventListener("click",function(e){s(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,i=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,r=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=i&&/OS [6-7]_\d/.test(navigator.userAgent),o=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(i&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,i;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),i=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;i&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,s;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],i){if(s=window.getSelection(),s.rangeCount&&!s.isCollapsed)return!0;if(!r){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,o,a,c,u,l=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,o=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(u=e.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=l.tagName.toLowerCase(),"label"===a){if(t=this.findControl(l)){if(this.focus(l),n)return!1;l=t}}else if(this.needsFocus(l))return e.timeStamp-o>100||i&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,e),i&&"select"===a||(this.targetElement=null,e.preventDefault()),!1);return i&&!r&&(c=l.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(l)||(e.preventDefault(),this.sendClick(l,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,i,r,s;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(i>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(o&&(r=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),r[1]>=10&&r[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(s=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],s>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var t,n=document.createElement("source"),i=function(e){var t,i,r=e.parentNode;"PICTURE"===r.nodeName.toUpperCase()?(t=n.cloneNode(),r.insertBefore(t,r.firstElementChild),setTimeout(function(){r.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,i=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=i}))},r=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)i(t[e])},s=function(){clearTimeout(t),t=setTimeout(r,99)},o=e.matchMedia&&matchMedia("(orientation: landscape)"),a=function(){s(),o&&o.addListener&&o.addListener(s)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?a():document.addEventListener("DOMContentLoaded",a),s}())}(window),function(e,t,n){"use strict";function i(e){return" "===e||"	"===e||"\n"===e||"\f"===e||"\r"===e}function r(t,n){var i=new e.Image;return i.onerror=function(){T[t]=!1,te()},i.onload=function(){T[t]=1===i.width,te()},i.src=n,"pending"}function s(){O=!1,H=e.devicePixelRatio,W={},j={},A.DPR=H||1,U.width=Math.max(e.innerWidth||0,b.clientWidth),U.height=Math.max(e.innerHeight||0,b.clientHeight),U.vw=U.width/100,U.vh=U.height/100,v=[U.height,U.width,H].join("-"),U.em=A.getEmValue(),U.rem=U.em}function o(e,t,n,i){var r,s,o,a;return"saveData"===x.algorithm?e>2.7?a=n+1:(s=t-n,r=Math.pow(e-.6,1.5),o=s*r,i&&(o+=.1*r),a=e+o):a=n>1?Math.sqrt(e*t):e,a>n}function a(e){var t,n=A.getSet(e),i=!1;"pending"!==n&&(i=v,n&&(t=A.setRes(n),A.applySetCandidate(t,e))),e[A.ns].evaled=i}function c(e,t){return e.res-t.res}function u(e,t,n){var i;return!n&&t&&(n=e[A.ns].sets,n=n&&n[n.length-1]),i=l(t,n),i&&(t=A.makeUrl(t),e[A.ns].curSrc=t,e[A.ns].curCan=i,i.res||ee(i,i.set.sizes)),i}function l(e,t){var n,i,r;if(e&&t)for(r=A.parseSet(t),e=A.makeUrl(e),n=0;n<r.length;n++)if(e===A.makeUrl(r[n].url)){i=r[n];break}return i}function d(e,t){var n,i,r,s,o=e.getElementsByTagName("source");for(n=0,i=o.length;i>n;n++)r=o[n],r[A.ns]=!0,s=r.getAttribute("srcset"),s&&t.push({srcset:s,media:r.getAttribute("media"),type:r.getAttribute("type"),sizes:r.getAttribute("sizes")})}function h(e,t){function n(t){var n,i=t.exec(e.substring(h));return i?(n=i[0],h+=n.length,n):void 0}function r(){var e,n,i,r,s,c,u,l,d,h=!1,m={};for(r=0;r<a.length;r++)s=a[r],c=s[s.length-1],u=s.substring(0,s.length-1),l=parseInt(u,10),d=parseFloat(u),Y.test(u)&&"w"===c?((e||n)&&(h=!0),0===l?h=!0:e=l):V.test(u)&&"x"===c?((e||n||i)&&(h=!0),0>d?h=!0:n=d):Y.test(u)&&"h"===c?((i||n)&&(h=!0),0===l?h=!0:i=l):h=!0;h||(m.url=o,e&&(m.w=e),n&&(m.d=n),i&&(m.h=i),i||n||e||(m.d=1),1===m.d&&(t.has1x=!0),m.set=t,f.push(m))}function s(){for(n(_),c="",u="in descriptor";;){if(l=e.charAt(h),"in descriptor"===u)if(i(l))c&&(a.push(c),c="",u="after descriptor");else{if(","===l)return h+=1,c&&a.push(c),void r();if("("===l)c+=l,u="in parens";else{if(""===l)return c&&a.push(c),void r();c+=l}}else if("in parens"===u)if(")"===l)c+=l,u="in descriptor";else{if(""===l)return a.push(c),void r();c+=l}else if("after descriptor"===u)if(i(l));else{if(""===l)return void r();u="in descriptor",h-=1}h+=1}}for(var o,a,c,u,l,d=e.length,h=0,f=[];;){if(n(X),h>=d)return f;o=n(Q),a=[],","===o.slice(-1)?(o=o.replace(G,""),r()):s()}}function f(e){function t(e){function t(){s&&(o.push(s),s="")}function n(){o[0]&&(a.push(o),o=[])}for(var r,s="",o=[],a=[],c=0,u=0,l=!1;;){if(r=e.charAt(u),""===r)return t(),n(),a;if(l){if("*"===r&&"/"===e[u+1]){l=!1,u+=2,t();continue}u+=1}else{if(i(r)){if(e.charAt(u-1)&&i(e.charAt(u-1))||!s){u+=1;continue}if(0===c){t(),u+=1;continue}r=" "}else if("("===r)c+=1;else if(")"===r)c-=1;else{if(","===r){t(),n(),u+=1;continue}if("/"===r&&"*"===e.charAt(u+1)){l=!0,u+=2;continue}}s+=r,u+=1}}}function n(e){return l.test(e)&&parseFloat(e)>=0?!0:d.test(e)?!0:"0"===e||"-0"===e||"+0"===e}var r,s,o,a,c,u,l=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,d=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(s=t(e),o=s.length,r=0;o>r;r++)if(a=s[r],c=a[a.length-1],n(c)){if(u=c,a.pop(),0===a.length)return u;if(a=a.join(" "),A.matchesMedia(a))return u}return"100vw"}t.createElement("picture");var m,p,g,v,A={},w=!1,y=function(){},E=t.createElement("img"),C=E.getAttribute,k=E.setAttribute,S=E.removeAttribute,b=t.documentElement,T={},x={algorithm:""},L="data-pfsrc",M=L+"set",I=navigator.userAgent,z=/rident/.test(I)||/ecko/.test(I)&&I.match(/rv\:(\d+)/)&&RegExp.$1>35,P="currentSrc",D=/\s+\+?\d+(e\d+)?w/,R=/(\([^)]+\))?\s*(.+)/,F=e.picturefillCFG,B="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",N="font-size:100%!important;",O=!0,W={},j={},H=e.devicePixelRatio,U={px:1,"in":96},q=t.createElement("a"),$=!1,_=/^[ \t\n\r\u000c]+/,X=/^[, \t\n\r\u000c]+/,Q=/^[^ \t\n\r\u000c]+/,G=/[,]+$/,Y=/^\d+$/,V=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,K=function(e,t,n,i){e.addEventListener?e.addEventListener(t,n,i||!1):e.attachEvent&&e.attachEvent("on"+t,n)},J=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},Z=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=J(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,i){var r;if(!(t in W))if(W[t]=!1,i&&(r=t.match(e)))W[t]=r[1]*U[r[2]];else try{W[t]=new Function("e",n(t))(U)}catch(s){}return W[t]}}(),ee=function(e,t){return e.w?(e.cWidth=A.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},te=function(e){if(w){var n,i,r,s=e||{};if(s.elements&&1===s.elements.nodeType&&("IMG"===s.elements.nodeName.toUpperCase()?s.elements=[s.elements]:(s.context=s.elements,s.elements=null)),n=s.elements||A.qsa(s.context||t,s.reevaluate||s.reselect?A.sel:A.selShort),r=n.length){for(A.setupRun(s),$=!0,i=0;r>i;i++)A.fillImg(n[i],s);A.teardownRun(s)}}};m=e.console&&console.warn?function(e){console.warn(e)}:y,P in E||(P="src"),T["image/jpeg"]=!0,T["image/gif"]=!0,T["image/png"]=!0,T["image/svg+xml"]=t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A.ns=("pf"+(new Date).getTime()).substr(0,9),A.supSrcset="srcset"in E,A.supSizes="sizes"in E,A.supPicture=!!e.HTMLPictureElement,A.supSrcset&&A.supPicture&&!A.supSizes&&!function(e){E.srcset="data:,a",e.src="data:,a",A.supSrcset=E.complete===e.complete,A.supPicture=A.supSrcset&&A.supPicture}(t.createElement("img")),A.supSrcset&&!A.supSizes?!function(){var e="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",n="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",i=t.createElement("img"),r=function(){var e=i.width;2===e&&(A.supSizes=!0),g=A.supSrcset&&!A.supSizes,w=!0,setTimeout(te)};i.onload=r,i.onerror=r,i.setAttribute("sizes","9px"),i.srcset=n+" 1w,"+e+" 9w",i.src=n}():w=!0,A.selShort="picture>img,img[srcset]",A.sel=A.selShort,A.cfg=x,A.DPR=H||1,A.u=U,A.types=T,A.setSize=y,A.makeUrl=J(function(e){return q.href=e,q.href}),A.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},A.matchesMedia=function(){return e.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?A.matchesMedia=function(e){return!e||matchMedia(e).matches}:A.matchesMedia=A.mMQ,A.matchesMedia.apply(this,arguments)},A.mMQ=function(e){return e?Z(e):!0},A.calcLength=function(e){var t=Z(e,!0)||!1;return 0>t&&(t=!1),t},A.supportsType=function(e){return e?T[e]:!0},A.parseSize=J(function(e){var t=(e||"").match(R);return{media:t&&t[1],length:t&&t[2]}}),A.parseSet=function(e){return e.cands||(e.cands=h(e.srcset,e)),e.cands},A.getEmValue=function(){var e;if(!p&&(e=t.body)){var n=t.createElement("div"),i=b.style.cssText,r=e.style.cssText;n.style.cssText=B,b.style.cssText=N,e.style.cssText=N,e.appendChild(n),p=n.offsetWidth,e.removeChild(n),p=parseFloat(p,10),b.style.cssText=i,e.style.cssText=r}return p||16},A.calcListLength=function(e){if(!(e in j)||x.uT){var t=A.calcLength(f(e));j[e]=t?t:U.width}return j[e]},A.setRes=function(e){var t;if(e){t=A.parseSet(e);for(var n=0,i=t.length;i>n;n++)ee(t[n],e.sizes)}return t},A.setRes.res=ee,A.applySetCandidate=function(e,t){if(e.length){var n,i,r,s,a,l,d,h,f,m=t[A.ns],p=A.DPR;if(l=m.curSrc||t[P],d=m.curCan||u(t,l,e[0].set),d&&d.set===e[0].set&&(f=z&&!t.complete&&d.res-.1>p,f||(d.cached=!0,d.res>=p&&(a=d))),!a)for(e.sort(c),s=e.length,a=e[s-1],i=0;s>i;i++)if(n=e[i],n.res>=p){r=i-1,a=e[r]&&(f||l!==A.makeUrl(n.url))&&o(e[r].res,n.res,p,e[r].cached)?e[r]:n;break}a&&(h=A.makeUrl(a.url),m.curSrc=h,m.curCan=a,h!==l&&A.setSrc(t,a),A.setSize(t))}},A.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},A.getSet=function(e){var t,n,i,r=!1,s=e[A.ns].sets;for(t=0;t<s.length&&!r;t++)if(n=s[t],n.srcset&&A.matchesMedia(n.media)&&(i=A.supportsType(n.type))){"pending"===i&&(n=i),r=n;break}return r},A.parseSets=function(e,t,i){var r,s,o,a,c=t&&"PICTURE"===t.nodeName.toUpperCase(),u=e[A.ns];(u.src===n||i.src)&&(u.src=C.call(e,"src"),u.src?k.call(e,L,u.src):S.call(e,L)),(u.srcset===n||i.srcset||!A.supSrcset||e.srcset)&&(r=C.call(e,"srcset"),u.srcset=r,a=!0),u.sets=[],c&&(u.pic=!0,d(t,u.sets)),u.srcset?(s={srcset:u.srcset,sizes:C.call(e,"sizes")},u.sets.push(s),o=(g||u.src)&&D.test(u.srcset||""),o||!u.src||l(u.src,s)||s.has1x||(s.srcset+=", "+u.src,s.cands.push({url:u.src,d:1,set:s}))):u.src&&u.sets.push({srcset:u.src,sizes:null}),u.curCan=null,u.curSrc=n,u.supported=!(c||s&&!A.supSrcset||o&&!A.supSizes),a&&A.supSrcset&&!u.supported&&(r?(k.call(e,M,r),e.srcset=""):S.call(e,M)),u.supported&&!u.srcset&&(!u.src&&e.src||e.src!==A.makeUrl(u.src))&&(null===u.src?e.removeAttribute("src"):e.src=u.src),u.parsed=!0},A.fillImg=function(e,t){var n,i=t.reselect||t.reevaluate;e[A.ns]||(e[A.ns]={}),n=e[A.ns],(i||n.evaled!==v)&&(n.parsed&&!t.reevaluate||A.parseSets(e,e.parentNode,t),n.supported?n.evaled=v:a(e))},A.setupRun=function(){$&&!O&&H===e.devicePixelRatio||s()},A.supPicture?(te=y,A.fillImg=y):!function(){var n,i=e.attachEvent?/d$|^c/:/d$|^c|^i/,r=function(){var e=t.readyState||"";s=setTimeout(r,"loading"===e?200:999),t.body&&(A.fillImgs(),n=n||i.test(e),n&&clearTimeout(s))},s=setTimeout(r,t.body?9:99),o=function(e,t){var n,i,r=function(){var s=new Date-i;t>s?n=setTimeout(r,t-s):(n=null,e())};return function(){i=new Date,n||(n=setTimeout(r,t))}},a=b.clientHeight,c=function(){O=Math.max(e.innerWidth||0,b.clientWidth)!==U.width||b.clientHeight!==a,a=b.clientHeight,O&&A.fillImgs()};K(e,"resize",o(c,99)),K(t,"readystatechange",r)}(),A.picturefill=te,A.fillImgs=te,A.teardownRun=y,te._=A,e.picturefillCFG={pf:A,push:function(e){var t=e.shift();"function"==typeof A[t]?A[t].apply(A,e):(x[t]=e[0],$&&A.fillImgs({reselect:!0}))}};for(;F&&F.length;)e.picturefillCFG.push(F.shift());e.picturefill=te,"object"==typeof module&&"object"==typeof module.exports?module.exports=te:"function"==typeof define&&define.amd&&define("picturefill",function(){return te}),A.supPicture||(T["image/webp"]=r("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document),function(){"use strict";if(window&&window.addEventListener){var e,t,n=Object.create(null),i=function(){clearTimeout(t),t=setTimeout(e,100)},r=function(){},s=function(){var e;window.addEventListener("resize",i,!1),window.addEventListener("orientationchange",i,!1),window.MutationObserver?(e=new MutationObserver(i),e.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),r=function(){try{e.disconnect(),window.removeEventListener("resize",i,!1),window.removeEventListener("orientationchange",i,!1)}catch(t){}}):(document.documentElement.addEventListener("DOMSubtreeModified",i,!1),r=function(){document.documentElement.removeEventListener("DOMSubtreeModified",i,!1),window.removeEventListener("resize",i,!1),window.removeEventListener("orientationchange",i,!1)})},o="http://www.w3.org/1999/xlink";e=function(){function e(){A-=1,0===A&&s()}function t(e){return function(){n[e.base]!==!0&&e.useEl.setAttributeNS(o,"xlink:href","#"+e.hash)}}function i(t){return function(){var n,i=document.body,r=document.createElement("x");t.onload=null,r.innerHTML=t.responseText,n=r.getElementsByTagName("svg")[0],n&&(n.setAttribute("aria-hidden","true"),n.style.position="absolute",n.style.width=0,n.style.height=0,n.style.overflow="hidden",i.insertBefore(n,i.firstChild)),e()}}function a(t){return function(){t.onerror=null,t.ontimeout=null,e()}}var c,u,l,d,h,f,m,p,g,v="",A=0;if(window.XMLHttpRequest&&(h=new XMLHttpRequest,h=void 0!==h.withCredentials?XMLHttpRequest:XDomainRequest||void 0),void 0!==h){for(r(),p=document.getElementsByTagName("use"),d=0;d<p.length;d+=1){try{u=p[d].getBoundingClientRect()}catch(w){u=!1}m=p[d].getAttributeNS(o,"href").split("#"),c=m[0],l=m[1],f=u&&0===u.left&&0===u.right&&0===u.top&&0===u.bottom,u&&0===u.width&&0===u.height&&!f?(v&&!c.length&&l&&!document.getElementById(l)&&(c=v),c.length&&(g=n[c],g!==!0&&setTimeout(t({useEl:p[d],base:c,hash:l}),0),void 0===g&&(g=new h,n[c]=g,g.onload=i(g),g.onerror=a(g),g.ontimeout=a(g),g.open("GET",c),g.send(),A+=1))):f||(void 0===n[c]?n[c]=!0:n[c].onload&&(n[c].abort(),n[c].onload=void 0,n[c]=!0))}p="",A+=1,e()}},window.addEventListener("load",function a(){window.removeEventListener("load",a,!1),t=setTimeout(e,0)},!1)}}(),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){var t="waitForImages";e.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"],hasImageAttributes:["srcset"]},e.expr[":"]["has-src"]=function(t){return e(t).is('img[src][src!=""]')},e.expr[":"].uncached=function(t){return e(t).is(":has-src")?!t.complete:!1},e.fn.waitForImages=function(){var n,i,r,s=0,o=0,a=e.Deferred();if(e.isPlainObject(arguments[0])?(r=arguments[0].waitForAll,i=arguments[0].each,n=arguments[0].finished):1===arguments.length&&"boolean"===e.type(arguments[0])?r=arguments[0]:(n=arguments[0],i=arguments[1],r=arguments[2]),n=n||e.noop,i=i||e.noop,r=!!r,!e.isFunction(n)||!e.isFunction(i))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var c=e(this),u=[],l=e.waitForImages.hasImageProperties||[],d=e.waitForImages.hasImageAttributes||[],h=/url\(\s*(['"]?)(.*?)\1\s*\)/g;r?c.find("*").addBack().each(function(){var t=e(this);t.is("img:has-src")&&!t.is("[srcset]")&&u.push({src:t.attr("src"),element:t[0]}),e.each(l,function(e,n){var i,r=t.css(n);if(!r)return!0;for(;i=h.exec(r);)u.push({src:i[2],element:t[0]})}),e.each(d,function(e,n){var i=t.attr(n);return i?void u.push({src:t.attr("src"),srcset:t.attr("srcset"),element:t[0]}):!0})}):c.find("img:has-src").each(function(){u.push({src:this.src,element:this})}),s=u.length,o=0,0===s&&(n.call(c[0]),a.resolveWith(c[0])),e.each(u,function(r,u){var l=new Image,d="load."+t+" error."+t;e(l).one(d,function h(t){var r=[o,s,"load"==t.type];return o++,i.apply(u.element,r),a.notifyWith(u.element,r),e(this).off(d,h),o==s?(n.call(c[0]),a.resolveWith(c[0]),!1):void 0}),u.srcset&&(l.srcset=u.srcset),l.src=u.src})}),a.promise()}}),function(e){"use strict";function t(t){var n=e(this),i=n.find("svg"),r=i.find("use"),s=n.closest(".project").find(".project__details");e(this).blur(),"click"!=t.type&&13!=t.which||(s.hasClass("open")?s.removeClass("open").slideUp(300,function(){var e=r.attr("xlink:href").replace("icon-cancel","icon-info");r.attr("xlink:href",e),i.removeClass("small")}):s.slideDown(300,function(){var t=r.attr("xlink:href").replace("icon-info","icon-cancel");r.attr("xlink:href",t),i.addClass("small"),e(this).addClass("open")}))}e("html").addClass("js"),FastClick.attach(document.body),e(".logo, .project__heading span").on("touchend touchcancel",function(){e(this).addClass("no-hover")}).on("touchstart mouseover",function(){e(this).removeClass("no-hover")}),e(".layers").waitForImages({finished:function(){e(this).addClass("ready")},waitForAll:!0}),function(){function t(){e(this).toggleClass("open"),s.hasClass("open")?s.removeClass("open").slideUp(300,function(){s.css("display","")}):s.slideDown(300,function(){e(this).addClass("open")})}function n(){if(e(this).blur(),s.hasClass("open"))e("#menu-icon, #main-menu").removeClass("open"),s.css("display","");else{var t;t=e(this).hasClass("logo")?s.find('a[href="#home"]'):e(this);var n=t.outerWidth()+"px",i=t.offset().left-s.offset().left+"px";r(t,n,i)}e(document.body).addClass("scrolling");var a=Math.round(e(e.attr(this,"href")).offset().top),c=o.outerHeight();return e("html, body").animate({scrollTop:a-c},600,function(){e(document.body).removeClass("scrolling")}),!1}function i(){var t=e(window).scrollTop();e("section").each(function(){var n=e(this).offset().top-o.outerHeight(),i=n+e(this).outerHeight();if(t>=n&&i>t){var a=s.find('a[href="#'+this.id+'"]'),c=a.outerWidth()+"px",u=a.offset().left-s.offset().left+"px";if(!s.find("hr").length){var l=e("<hr>").css({width:c,left:u});s.find("ul").append(l)}a.hasClass("active")||r(a,c,u)}})}function r(e,t,n){s.find("hr").css({width:t,left:n}),s.find("a.active").removeClass("active"),e.addClass("active")}var s=e("#main-menu"),o=e(".page-header");e("#menu-icon").on("click",t),e("#main-menu a, .logo").on("click",n),e(window).load(i),e(window).on("scroll",function(){e(document.body).hasClass("scrolling")||i()})}(),function(){function t(t){var i=n.scrollTop();s.each(function(){var n=e(this);i+r>n.offset().top&&("init"===t&&n.addClass("no-anim"),n.hasClass("no-anim")||n.hasClass("revealed")||n.addClass("revealed"))})}var n=e(window),i=n.width()>n.height()?.85:.9,r=n.height()*i,s=e("section").not("#home").find("> *");t("init"),n.on("scroll",t)}(),e(".project__heading span").on("click keydown",t),e(".project__details").on("click",'a[href="#"]',function(){return!1})}(jQuery);