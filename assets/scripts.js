!function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var t,n=document.createElement("source"),i=function(e){var t,i,s=e.parentNode;"PICTURE"===s.nodeName.toUpperCase()?(t=n.cloneNode(),s.insertBefore(t,s.firstElementChild),setTimeout(function(){s.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,i=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=i}))},s=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)i(t[e])},r=function(){clearTimeout(t),t=setTimeout(s,99)},o=e.matchMedia&&matchMedia("(orientation: landscape)"),a=function(){r(),o&&o.addListener&&o.addListener(r)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?a():document.addEventListener("DOMContentLoaded",a),r}())}(window),function(e,t,n){"use strict";function i(e){return" "===e||"  "===e||"\n"===e||"\f"===e||"\r"===e}function s(t,n){var i=new e.Image;return i.onerror=function(){T[t]=!1,te()},i.onload=function(){T[t]=1===i.width,te()},i.src=n,"pending"}function r(){I=!1,O=e.devicePixelRatio,W={},Q={},g.DPR=O||1,G.width=Math.max(e.innerWidth||0,C.clientWidth),G.height=Math.max(e.innerHeight||0,C.clientHeight),G.vw=G.width/100,G.vh=G.height/100,A=[G.height,G.width,O].join("-"),G.em=g.getEmValue(),G.rem=G.em}function o(e,t,n,i){var s,r,o,a;return"saveData"===L.algorithm?e>2.7?a=n+1:(r=t-n,s=Math.pow(e-.6,1.5),o=r*s,i&&(o+=.1*s),a=e+o):a=n>1?Math.sqrt(e*t):e,a>n}function a(e){var t,n=g.getSet(e),i=!1;"pending"!==n&&(i=A,n&&(t=g.setRes(n),g.applySetCandidate(t,e))),e[g.ns].evaled=i}function c(e,t){return e.res-t.res}function u(e,t,n){var i;return!n&&t&&(n=e[g.ns].sets,n=n&&n[n.length-1]),i=l(t,n),i&&(t=g.makeUrl(t),e[g.ns].curSrc=t,e[g.ns].curCan=i,i.res||ee(i,i.set.sizes)),i}function l(e,t){var n,i,s;if(e&&t)for(s=g.parseSet(t),e=g.makeUrl(e),n=0;n<s.length;n++)if(e===g.makeUrl(s[n].url)){i=s[n];break}return i}function d(e,t){var n,i,s,r,o=e.getElementsByTagName("source");for(n=0,i=o.length;i>n;n++)s=o[n],s[g.ns]=!0,r=s.getAttribute("srcset"),r&&t.push({srcset:r,media:s.getAttribute("media"),type:s.getAttribute("type"),sizes:s.getAttribute("sizes")})}function f(e,t){function n(t){var n,i=t.exec(e.substring(f));return i?(n=i[0],f+=n.length,n):void 0}function s(){var e,n,i,s,r,c,u,l,d,f=!1,h={};for(s=0;s<a.length;s++)r=a[s],c=r[r.length-1],u=r.substring(0,r.length-1),l=parseInt(u,10),d=parseFloat(u),_.test(u)&&"w"===c?((e||n)&&(f=!0),0===l?f=!0:e=l):K.test(u)&&"x"===c?((e||n||i)&&(f=!0),0>d?f=!0:n=d):_.test(u)&&"h"===c?((i||n)&&(f=!0),0===l?f=!0:i=l):f=!0;f||(h.url=o,e&&(h.w=e),n&&(h.d=n),i&&(h.h=i),i||n||e||(h.d=1),1===h.d&&(t.has1x=!0),h.set=t,m.push(h))}function r(){for(n(q),c="",u="in descriptor";;){if(l=e.charAt(f),"in descriptor"===u)if(i(l))c&&(a.push(c),c="",u="after descriptor");else{if(","===l)return f+=1,c&&a.push(c),void s();if("("===l)c+=l,u="in parens";else{if(""===l)return c&&a.push(c),void s();c+=l}}else if("in parens"===u)if(")"===l)c+=l,u="in descriptor";else{if(""===l)return a.push(c),void s();c+=l}else if("after descriptor"===u)if(i(l));else{if(""===l)return void s();u="in descriptor",f-=1}f+=1}}for(var o,a,c,u,l,d=e.length,f=0,m=[];;){if(n(F),f>=d)return m;o=n(X),a=[],","===o.slice(-1)?(o=o.replace(V,""),s()):r()}}function m(e){function t(e){function t(){r&&(o.push(r),r="")}function n(){o[0]&&(a.push(o),o=[])}for(var s,r="",o=[],a=[],c=0,u=0,l=!1;;){if(s=e.charAt(u),""===s)return t(),n(),a;if(l){if("*"===s&&"/"===e[u+1]){l=!1,u+=2,t();continue}u+=1}else{if(i(s)){if(e.charAt(u-1)&&i(e.charAt(u-1))||!r){u+=1;continue}if(0===c){t(),u+=1;continue}s=" "}else if("("===s)c+=1;else if(")"===s)c-=1;else{if(","===s){t(),n(),u+=1;continue}if("/"===s&&"*"===e.charAt(u+1)){l=!0,u+=2;continue}}r+=s,u+=1}}}function n(e){return l.test(e)&&parseFloat(e)>=0?!0:d.test(e)?!0:"0"===e||"-0"===e||"+0"===e}var s,r,o,a,c,u,l=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,d=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(r=t(e),o=r.length,s=0;o>s;s++)if(a=r[s],c=a[a.length-1],n(c)){if(u=c,a.pop(),0===a.length)return u;if(a=a.join(" "),g.matchesMedia(a))return u}return"100vw"}t.createElement("picture");var h,p,v,A,g={},w=!1,E=function(){},y=t.createElement("img"),b=y.getAttribute,x=y.setAttribute,S=y.removeAttribute,C=t.documentElement,T={},L={algorithm:""},z="data-pfsrc",M=z+"set",R=navigator.userAgent,k=/rident/.test(R)||/ecko/.test(R)&&R.match(/rv\:(\d+)/)&&RegExp.$1>35,D="currentSrc",B=/\s+\+?\d+(e\d+)?w/,$=/(\([^)]+\))?\s*(.+)/,P=e.picturefillCFG,U="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",H="font-size:100%!important;",I=!0,W={},Q={},O=e.devicePixelRatio,G={px:1,"in":96},N=t.createElement("a"),j=!1,q=/^[ \t\n\r\u000c]+/,F=/^[, \t\n\r\u000c]+/,X=/^[^ \t\n\r\u000c]+/,V=/[,]+$/,_=/^\d+$/,K=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,J=function(e,t,n,i){e.addEventListener?e.addEventListener(t,n,i||!1):e.attachEvent&&e.attachEvent("on"+t,n)},Y=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},Z=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=Y(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,i){var s;if(!(t in W))if(W[t]=!1,i&&(s=t.match(e)))W[t]=s[1]*G[s[2]];else try{W[t]=new Function("e",n(t))(G)}catch(r){}return W[t]}}(),ee=function(e,t){return e.w?(e.cWidth=g.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},te=function(e){if(w){var n,i,s,r=e||{};if(r.elements&&1===r.elements.nodeType&&("IMG"===r.elements.nodeName.toUpperCase()?r.elements=[r.elements]:(r.context=r.elements,r.elements=null)),n=r.elements||g.qsa(r.context||t,r.reevaluate||r.reselect?g.sel:g.selShort),s=n.length){for(g.setupRun(r),j=!0,i=0;s>i;i++)g.fillImg(n[i],r);g.teardownRun(r)}}};h=e.console&&console.warn?function(e){console.warn(e)}:E,D in y||(D="src"),T["image/jpeg"]=!0,T["image/gif"]=!0,T["image/png"]=!0,T["image/svg+xml"]=t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),g.ns=("pf"+(new Date).getTime()).substr(0,9),g.supSrcset="srcset"in y,g.supSizes="sizes"in y,g.supPicture=!!e.HTMLPictureElement,g.supSrcset&&g.supPicture&&!g.supSizes&&!function(e){y.srcset="data:,a",e.src="data:,a",g.supSrcset=y.complete===e.complete,g.supPicture=g.supSrcset&&g.supPicture}(t.createElement("img")),g.supSrcset&&!g.supSizes?!function(){var e="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",n="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",i=t.createElement("img"),s=function(){var e=i.width;2===e&&(g.supSizes=!0),v=g.supSrcset&&!g.supSizes,w=!0,setTimeout(te)};i.onload=s,i.onerror=s,i.setAttribute("sizes","9px"),i.srcset=n+" 1w,"+e+" 9w",i.src=n}():w=!0,g.selShort="picture>img,img[srcset]",g.sel=g.selShort,g.cfg=L,g.DPR=O||1,g.u=G,g.types=T,g.setSize=E,g.makeUrl=Y(function(e){return N.href=e,N.href}),g.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},g.matchesMedia=function(){return e.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?g.matchesMedia=function(e){return!e||matchMedia(e).matches}:g.matchesMedia=g.mMQ,g.matchesMedia.apply(this,arguments)},g.mMQ=function(e){return e?Z(e):!0},g.calcLength=function(e){var t=Z(e,!0)||!1;return 0>t&&(t=!1),t},g.supportsType=function(e){return e?T[e]:!0},g.parseSize=Y(function(e){var t=(e||"").match($);return{media:t&&t[1],length:t&&t[2]}}),g.parseSet=function(e){return e.cands||(e.cands=f(e.srcset,e)),e.cands},g.getEmValue=function(){var e;if(!p&&(e=t.body)){var n=t.createElement("div"),i=C.style.cssText,s=e.style.cssText;n.style.cssText=U,C.style.cssText=H,e.style.cssText=H,e.appendChild(n),p=n.offsetWidth,e.removeChild(n),p=parseFloat(p,10),C.style.cssText=i,e.style.cssText=s}return p||16},g.calcListLength=function(e){if(!(e in Q)||L.uT){var t=g.calcLength(m(e));Q[e]=t?t:G.width}return Q[e]},g.setRes=function(e){var t;if(e){t=g.parseSet(e);for(var n=0,i=t.length;i>n;n++)ee(t[n],e.sizes)}return t},g.setRes.res=ee,g.applySetCandidate=function(e,t){if(e.length){var n,i,s,r,a,l,d,f,m,h=t[g.ns],p=g.DPR;if(l=h.curSrc||t[D],d=h.curCan||u(t,l,e[0].set),d&&d.set===e[0].set&&(m=k&&!t.complete&&d.res-.1>p,m||(d.cached=!0,d.res>=p&&(a=d))),!a)for(e.sort(c),r=e.length,a=e[r-1],i=0;r>i;i++)if(n=e[i],n.res>=p){s=i-1,a=e[s]&&(m||l!==g.makeUrl(n.url))&&o(e[s].res,n.res,p,e[s].cached)?e[s]:n;break}a&&(f=g.makeUrl(a.url),h.curSrc=f,h.curCan=a,f!==l&&g.setSrc(t,a),g.setSize(t))}},g.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},g.getSet=function(e){var t,n,i,s=!1,r=e[g.ns].sets;for(t=0;t<r.length&&!s;t++)if(n=r[t],n.srcset&&g.matchesMedia(n.media)&&(i=g.supportsType(n.type))){"pending"===i&&(n=i),s=n;break}return s},g.parseSets=function(e,t,i){var s,r,o,a,c=t&&"PICTURE"===t.nodeName.toUpperCase(),u=e[g.ns];(u.src===n||i.src)&&(u.src=b.call(e,"src"),u.src?x.call(e,z,u.src):S.call(e,z)),(u.srcset===n||i.srcset||!g.supSrcset||e.srcset)&&(s=b.call(e,"srcset"),u.srcset=s,a=!0),u.sets=[],c&&(u.pic=!0,d(t,u.sets)),u.srcset?(r={srcset:u.srcset,sizes:b.call(e,"sizes")},u.sets.push(r),o=(v||u.src)&&B.test(u.srcset||""),o||!u.src||l(u.src,r)||r.has1x||(r.srcset+=", "+u.src,r.cands.push({url:u.src,d:1,set:r}))):u.src&&u.sets.push({srcset:u.src,sizes:null}),u.curCan=null,u.curSrc=n,u.supported=!(c||r&&!g.supSrcset||o&&!g.supSizes),a&&g.supSrcset&&!u.supported&&(s?(x.call(e,M,s),e.srcset=""):S.call(e,M)),u.supported&&!u.srcset&&(!u.src&&e.src||e.src!==g.makeUrl(u.src))&&(null===u.src?e.removeAttribute("src"):e.src=u.src),u.parsed=!0},g.fillImg=function(e,t){var n,i=t.reselect||t.reevaluate;e[g.ns]||(e[g.ns]={}),n=e[g.ns],(i||n.evaled!==A)&&((!n.parsed||t.reevaluate)&&g.parseSets(e,e.parentNode,t),n.supported?n.evaled=A:a(e))},g.setupRun=function(){(!j||I||O!==e.devicePixelRatio)&&r()},g.supPicture?(te=E,g.fillImg=E):!function(){var n,i=e.attachEvent?/d$|^c/:/d$|^c|^i/,s=function(){var e=t.readyState||"";r=setTimeout(s,"loading"===e?200:999),t.body&&(g.fillImgs(),n=n||i.test(e),n&&clearTimeout(r))},r=setTimeout(s,t.body?9:99),o=function(e,t){var n,i,s=function(){var r=new Date-i;t>r?n=setTimeout(s,t-r):(n=null,e())};return function(){i=new Date,n||(n=setTimeout(s,t))}},a=C.clientHeight,c=function(){I=Math.max(e.innerWidth||0,C.clientWidth)!==G.width||C.clientHeight!==a,a=C.clientHeight,I&&g.fillImgs()};J(e,"resize",o(c,99)),J(t,"readystatechange",s)}(),g.picturefill=te,g.fillImgs=te,g.teardownRun=E,te._=g,e.picturefillCFG={pf:g,push:function(e){var t=e.shift();"function"==typeof g[t]?g[t].apply(g,e):(L[t]=e[0],j&&g.fillImgs({reselect:!0}))}};for(;P&&P.length;)e.picturefillCFG.push(P.shift());e.picturefill=te,"object"==typeof module&&"object"==typeof module.exports?module.exports=te:"function"==typeof define&&define.amd&&define("picturefill",function(){return te}),g.supPicture||(T["image/webp"]=s("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document),function(){"use strict";if(window&&window.addEventListener){var e,t,n=Object.create(null),i=function(){clearTimeout(t),t=setTimeout(e,100)},s=function(){},r=function(){var e;window.addEventListener("resize",i,!1),window.addEventListener("orientationchange",i,!1),window.MutationObserver?(e=new MutationObserver(i),e.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),s=function(){try{e.disconnect(),window.removeEventListener("resize",i,!1),window.removeEventListener("orientationchange",i,!1)}catch(t){}}):(document.documentElement.addEventListener("DOMSubtreeModified",i,!1),s=function(){document.documentElement.removeEventListener("DOMSubtreeModified",i,!1),window.removeEventListener("resize",i,!1),window.removeEventListener("orientationchange",i,!1)})},o="http://www.w3.org/1999/xlink";e=function(){function e(){g-=1,0===g&&r()}function t(e){return function(){n[e.base]!==!0&&e.useEl.setAttributeNS(o,"xlink:href","#"+e.hash)}}function i(t){return function(){var n,i=document.body,s=document.createElement("x");t.onload=null,s.innerHTML=t.responseText,n=s.getElementsByTagName("svg")[0],n&&(n.setAttribute("aria-hidden","true"),n.style.position="absolute",n.style.width=0,n.style.height=0,n.style.overflow="hidden",i.insertBefore(n,i.firstChild)),e()}}function a(t){return function(){t.onerror=null,t.ontimeout=null,e()}}var c,u,l,d,f,m,h,p,v,A="",g=0;if(window.XMLHttpRequest&&(f=new XMLHttpRequest,f=void 0!==f.withCredentials?XMLHttpRequest:XDomainRequest||void 0),void 0!==f){for(s(),p=document.getElementsByTagName("use"),d=0;d<p.length;d+=1){try{u=p[d].getBoundingClientRect()}catch(w){u=!1}h=p[d].getAttributeNS(o,"href").split("#"),c=h[0],l=h[1],m=u&&0===u.left&&0===u.right&&0===u.top&&0===u.bottom,u&&0===u.width&&0===u.height&&!m?(A&&!c.length&&l&&!document.getElementById(l)&&(c=A),c.length&&(v=n[c],v!==!0&&setTimeout(t({useEl:p[d],base:c,hash:l}),0),void 0===v&&(v=new f,n[c]=v,v.onload=i(v),v.onerror=a(v),v.ontimeout=a(v),v.open("GET",c),v.send(),g+=1))):m||(void 0===n[c]?n[c]=!0:n[c].onload&&(n[c].abort(),n[c].onload=void 0,n[c]=!0))}p="",g+=1,e()}},window.addEventListener("load",function a(){window.removeEventListener("load",a,!1),t=setTimeout(e,0)},!1)}}(),jQuery("document").ready(function(e){function t(){e(".animated:not(.revealed), section header:not(.revealed)").each(function(){if(i.matches)var t=.9;else var t=.85;var n=e(window).scrollTop(),s=e(window).height()*t;n+s>e(this).offset().top&&e(this).addClass("revealed")})}e(document.body).addClass("js");var n=window.matchMedia("(min-width: 48rem)"),i=window.matchMedia("(orientation: portrait)");t(),e(window).on("scroll",t);var s=e("#main-menu"),r=s.find("a:first").outerWidth(),o=e("<hr>").css("width",r+"px");s.find("ul").append(o),e("#menu-icon").on("click",function(){e(this).toggleClass("open"),s.hasClass("open")?s.removeClass("open").slideUp(300,function(){s.css("display","")}):s.slideDown(300,function(){e(this).addClass("open")})}),e("#main-menu, #logo").on("click","a",function(t){n.matches?(e(document.body).addClass("scrolling"),"logo"==e(this).parent().attr("id")?$clicked=e('#main-menu a[href="#home"]'):$clicked=e(this),e("#main-menu hr").css({width:$clicked.outerWidth()+"px",left:$clicked.offset().left-s.offset().left+"px"}),e("#main-menu a").removeClass("active"),$clicked.addClass("active")):(e("#menu-icon, #main-menu").removeClass("open"),s.css("display",""));var i=e(e.attr(this,"href")).offset().top,r=e("#page-header").outerHeight();e("html, body").animate({scrollTop:i-r},600,function(){e(document.body).removeClass("scrolling")}),t.preventDefault()}),e(window).on("scroll",function(){e(document.body).hasClass("scrolling")||e("section").each(function(){var t=e(this).offset().top-e("#page-header").outerHeight(),n=t+e(this).outerHeight();if(e(window).scrollTop()>t&&e(window).scrollTop()<n){var i=e(this).attr("id"),r=e('#main-menu a[href="#'+i+'"]');r.hasClass("active")||(e("#main-menu hr").css({width:r.outerWidth()+"px",left:r.offset().left-s.offset().left+"px"}),e("#main-menu a").removeClass("active"),e('#main-menu a[href="#'+i+'"]').addClass("active"))}})}),e(".project h3").on("click","span",function(){var t=e(this).find("svg"),n=t.find("use"),i=e(this).closest(".project").find(".details");i.hasClass("open")?i.removeClass("open").slideUp(300,function(){var e=n.attr("xlink:href").replace("icon-cancel","icon-info");n.attr("xlink:href",e),t.removeClass("small")}):i.slideDown(300,function(){var i=n.attr("xlink:href").replace("icon-info","icon-cancel");n.attr("xlink:href",i),t.addClass("small"),e(this).addClass("open")})})});