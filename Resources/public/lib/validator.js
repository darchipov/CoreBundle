!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.validator=b()}(this,function(){"use strict";function a(a){var b="string"==typeof a||a instanceof String;if(!b)throw new TypeError("This library (validator.js) validates strings only")}function b(b){return a(b),b=Date.parse(b),isNaN(b)?null:new Date(b)}function c(b){return a(b),parseFloat(b)}function d(b,c){return a(b),parseInt(b,c||10)}function e(b,c){return a(b),c?"1"===b||"true"===b:"0"!==b&&"false"!==b&&""!==b}function f(b,c){return a(b),b===c}function g(a){return"object"===("undefined"==typeof a?"undefined":ma(a))&&null!==a?a="function"==typeof a.toString?a.toString():"[object Object]":(null===a||"undefined"==typeof a||isNaN(a)&&!a.length)&&(a=""),String(a)}function h(b,c){return a(b),b.indexOf(g(c))>=0}function i(b,c,d){return a(b),"[object RegExp]"!==Object.prototype.toString.call(c)&&(c=new RegExp(c,d)),c.test(b)}function j(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=arguments[1];for(var c in b)"undefined"==typeof a[c]&&(a[c]=b[c]);return a}function k(b,c){a(b);var d=void 0,e=void 0;"object"===("undefined"==typeof c?"undefined":ma(c))?(d=c.min||0,e=c.max):(d=arguments[1],e=arguments[2]);var f=encodeURI(b).split(/%..|./).length-1;return f>=d&&("undefined"==typeof e||f<=e)}function l(b,c){a(b),c=j(c,na),c.allow_trailing_dot&&"."===b[b.length-1]&&(b=b.substring(0,b.length-1));var d=b.split(".");if(c.require_tld){var e=d.pop();if(!d.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(e))return!1;if(/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(e))return!1}for(var f,g=0;g<d.length;g++){if(f=d[g],c.allow_underscores&&(f=f.replace(/_/g,"")),!/^[a-z\u00a1-\uffff0-9-]+$/i.test(f))return!1;if(/[\uff01-\uff5e]/.test(f))return!1;if("-"===f[0]||"-"===f[f.length-1])return!1}return!0}function m(b,c){if(a(b),c=j(c,oa),c.require_display_name||c.allow_display_name){var d=b.match(pa);if(d)b=d[1];else if(c.require_display_name)return!1}var e=b.split("@"),f=e.pop(),g=e.join("@"),h=f.toLowerCase();if("gmail.com"!==h&&"googlemail.com"!==h||(g=g.replace(/\./g,"").toLowerCase()),!k(g,{max:64})||!k(f,{max:254}))return!1;if(!l(f,{require_tld:c.require_tld}))return!1;if('"'===g[0])return g=g.slice(1,g.length-1),c.allow_utf8_local_part?ta.test(g):ra.test(g);for(var i=c.allow_utf8_local_part?sa:qa,m=g.split("."),n=0;n<m.length;n++)if(!i.test(m[n]))return!1;return!0}function n(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(a(b),c=String(c),!c)return n(b,4)||n(b,6);if("4"===c){if(!ua.test(b))return!1;var d=b.split(".").sort(function(a,b){return a-b});return d[3]<=255}if("6"===c){var e=b.split(":"),f=!1,g=n(e[e.length-1],4),h=g?7:8;if(e.length>h)return!1;if("::"===b)return!0;"::"===b.substr(0,2)?(e.shift(),e.shift(),f=!0):"::"===b.substr(b.length-2)&&(e.pop(),e.pop(),f=!0);for(var i=0;i<e.length;++i)if(""===e[i]&&i>0&&i<e.length-1){if(f)return!1;f=!0}else if(g&&i===e.length-1);else if(!va.test(e[i]))return!1;return f?e.length>=1:e.length===h}return!1}function o(a){return"[object RegExp]"===Object.prototype.toString.call(a)}function p(a,b){for(var c=0;c<b.length;c++){var d=b[c];if(a===d||o(d)&&d.test(a))return!0}return!1}function q(b,c){if(a(b),!b||b.length>=2083||/[\s<>]/.test(b))return!1;if(0===b.indexOf("mailto:"))return!1;c=j(c,wa);var d=void 0,e=void 0,f=void 0,g=void 0,h=void 0,i=void 0,k=void 0,m=void 0;if(k=b.split("#"),b=k.shift(),k=b.split("?"),b=k.shift(),k=b.split("://"),k.length>1){if(d=k.shift(),c.require_valid_protocol&&c.protocols.indexOf(d)===-1)return!1}else{if(c.require_protocol)return!1;c.allow_protocol_relative_urls&&"//"===b.substr(0,2)&&(k[0]=b.substr(2))}if(b=k.join("://"),k=b.split("/"),b=k.shift(),""===b&&!c.require_host)return!0;if(k=b.split("@"),k.length>1&&(e=k.shift(),e.indexOf(":")>=0&&e.split(":").length>2))return!1;g=k.join("@"),i=null,m=null;var o=g.match(xa);return o?(f="",m=o[1],i=o[2]||null):(k=g.split(":"),f=k.shift(),k.length&&(i=k.join(":"))),!(null!==i&&(h=parseInt(i,10),!/^[0-9]+$/.test(i)||h<=0||h>65535))&&(!!(n(f)||l(f,c)||m&&n(m,6)||"localhost"===f)&&(f=f||m,!(c.host_whitelist&&!p(f,c.host_whitelist))&&(!c.host_blacklist||!p(f,c.host_blacklist))))}function r(b){return a(b),ya.test(b)}function s(b){return a(b),["true","false","1","0"].indexOf(b)>=0}function t(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en-US";if(a(b),c in za)return za[c].test(b);throw new Error("Invalid locale '"+c+"'")}function u(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en-US";if(a(b),c in Aa)return Aa[c].test(b);throw new Error("Invalid locale '"+c+"'")}function v(b){return a(b),Ga.test(b)}function w(b){return a(b),b===b.toLowerCase()}function x(b){return a(b),b===b.toUpperCase()}function y(b){return a(b),Ha.test(b)}function z(b){return a(b),Ia.test(b)}function A(b){return a(b),Ja.test(b)}function B(b){return a(b),Ia.test(b)&&Ja.test(b)}function C(b){return a(b),Ka.test(b)}function D(b){return a(b),La.test(b)}function E(b,c){a(b),c=c||{};var d=c.hasOwnProperty("allow_leading_zeroes")&&!c.allow_leading_zeroes?Ma:Na,e=!c.hasOwnProperty("min")||b>=c.min,f=!c.hasOwnProperty("max")||b<=c.max,g=!c.hasOwnProperty("lt")||b<c.lt,h=!c.hasOwnProperty("gt")||b>c.gt;return d.test(b)&&e&&f&&g&&h}function F(b,c){return a(b),c=c||{},""!==b&&"."!==b&&(Oa.test(b)&&(!c.hasOwnProperty("min")||b>=c.min)&&(!c.hasOwnProperty("max")||b<=c.max)&&(!c.hasOwnProperty("lt")||b<c.lt)&&(!c.hasOwnProperty("gt")||b>c.gt))}function G(b){return a(b),""!==b&&Pa.test(b)}function H(b){return a(b),Qa.test(b)}function I(b,d){return a(b),c(b)%parseInt(d,10)===0}function J(b){return a(b),Ra.test(b)}function K(b){return a(b),Sa.test(b)}function L(b){return a(b),Ta.test(b)}function M(b){a(b);try{var c=JSON.parse(b);return!!c&&"object"===("undefined"==typeof c?"undefined":ma(c))}catch(d){}return!1}function N(b){return a(b),0===b.length}function O(b,c){a(b);var d=void 0,e=void 0;"object"===("undefined"==typeof c?"undefined":ma(c))?(d=c.min||0,e=c.max):(d=arguments[1],e=arguments[2]);var f=b.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[],g=b.length-f.length;return g>=d&&("undefined"==typeof e||g<=e)}function P(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"all";a(b);var d=Ua[c];return d&&d.test(b)}function Q(b){return a(b),H(b)&&24===b.length}function R(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:String(new Date);a(c);var e=b(d),f=b(c);return!!(f&&e&&f>e)}function S(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:String(new Date);a(c);var e=b(d),f=b(c);return!!(f&&e&&f<e)}function T(b,c){a(b);var d=void 0;if("[object Array]"===Object.prototype.toString.call(c)){var e=[];for(d in c)({}).hasOwnProperty.call(c,d)&&(e[d]=g(c[d]));return e.indexOf(b)>=0}return"object"===("undefined"==typeof c?"undefined":ma(c))?c.hasOwnProperty(b):!(!c||"function"!=typeof c.indexOf)&&c.indexOf(b)>=0}function U(b){a(b);var c=b.replace(/[- ]+/g,"");if(!Va.test(c))return!1;for(var d=0,e=void 0,f=void 0,g=void 0,h=c.length-1;h>=0;h--)e=c.substring(h,h+1),f=parseInt(e,10),g?(f*=2,d+=f>=10?f%10+1:f):d+=f,g=!g;return!(d%10!==0||!c)}function V(b){if(a(b),!Wa.test(b))return!1;for(var c=b.replace(/[A-Z]/g,function(a){return parseInt(a,36)}),d=0,e=void 0,f=void 0,g=!0,h=c.length-2;h>=0;h--)e=c.substring(h,h+1),f=parseInt(e,10),g?(f*=2,d+=f>=10?f+1:f):d+=f,g=!g;return parseInt(b.substr(b.length-1),10)===(1e4-d)%10}function W(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(a(b),c=String(c),!c)return W(b,10)||W(b,13);var d=b.replace(/[\s-]+/g,""),e=0,f=void 0;if("10"===c){if(!Xa.test(d))return!1;for(f=0;f<9;f++)e+=(f+1)*d.charAt(f);if(e+="X"===d.charAt(9)?100:10*d.charAt(9),e%11===0)return!!d}else if("13"===c){if(!Ya.test(d))return!1;for(f=0;f<12;f++)e+=Za[f%2]*d.charAt(f);if(d.charAt(12)-(10-e%10)%10===0)return!!d}return!1}function X(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};a(b);var d=$a;if(d=c.require_hyphen?d.replace("?",""):d,d=c.case_sensitive?new RegExp(d):new RegExp(d,"i"),!d.test(b))return!1;var e=b.replace("-",""),f=8,g=0,h=!0,i=!1,j=void 0;try{for(var k,l=e[Symbol.iterator]();!(h=(k=l.next()).done);h=!0){var m=k.value,n="X"===m.toUpperCase()?10:+m;g+=n*f,--f}}catch(o){i=!0,j=o}finally{try{!h&&l["return"]&&l["return"]()}finally{if(i)throw j}}return g%11===0}function Y(b,c){return a(b),c in _a?_a[c].test(b):"any"===c&&!!Object.values(_a).find(function(a){return a.test(b)})}function Z(a){var b="(\\"+a.symbol.replace(/\./g,"\\.")+")"+(a.require_symbol?"":"?"),c="-?",d="[1-9]\\d*",e="[1-9]\\d{0,2}(\\"+a.thousands_separator+"\\d{3})*",f=["0",d,e],g="("+f.join("|")+")?",h="(\\"+a.decimal_separator+"\\d{2})?",i=g+h;return a.allow_negatives&&!a.parens_for_negatives&&(a.negative_sign_after_digits?i+=c:a.negative_sign_before_digits&&(i=c+i)),a.allow_negative_sign_placeholder?i="( (?!\\-))?"+i:a.allow_space_after_symbol?i=" ?"+i:a.allow_space_after_digits&&(i+="( (?!$))?"),a.symbol_after_digits?i+=b:i=b+i,a.allow_negatives&&(a.parens_for_negatives?i="(\\("+i+"\\)|"+i+")":a.negative_sign_before_digits||a.negative_sign_after_digits||(i=c+i)),new RegExp("^(?!-? )(?=.*\\d)"+i+"$")}function $(b,c){return a(b),c=j(c,ab),Z(c).test(b)}function _(b){a(b);var c=b.length;if(!c||c%4!==0||db.test(b))return!1;var d=b.indexOf("=");return d===-1||d===c-1||d===c-2&&"="===b[c-1]}function aa(b){return a(b),eb.test(b)}function ba(b,c){a(b);var d=c?new RegExp("^["+c+"]+","g"):/^\s+/g;return b.replace(d,"")}function ca(b,c){a(b);for(var d=c?new RegExp("["+c+"]"):/\s/,e=b.length-1;e>=0&&d.test(b[e]);)e--;return e<b.length?b.substr(0,e+1):b}function da(a,b){return ca(ba(a,b),b)}function ea(b){return a(b),b.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\//g,"&#x2F;").replace(/\\/g,"&#x5C;").replace(/`/g,"&#96;")}function fa(b){return a(b),b.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x2F;/g,"/").replace(/&#96;/g,"`")}function ga(b,c){return a(b),b.replace(new RegExp("["+c+"]+","g"),"")}function ha(b,c){a(b);var d=c?"\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F":"\\x00-\\x1F\\x7F";return ga(b,d)}function ia(b,c){return a(b),b.replace(new RegExp("[^"+c+"]+","g"),"")}function ja(b,c){a(b);for(var d=b.length-1;d>=0;d--)if(c.indexOf(b[d])===-1)return!1;return!0}function ka(a,b){if(b=j(b,fb),!m(a))return!1;var c=a.split("@"),d=c.pop(),e=c.join("@"),f=[e,d];if(f[1]=f[1].toLowerCase(),"gmail.com"===f[1]||"googlemail.com"===f[1]){if(b.gmail_remove_subaddress&&(f[0]=f[0].split("+")[0]),b.gmail_remove_dots&&(f[0]=f[0].replace(/\./g,"")),!f[0].length)return!1;(b.all_lowercase||b.gmail_lowercase)&&(f[0]=f[0].toLowerCase()),f[1]=b.gmail_convert_googlemaildotcom?"gmail.com":f[1]}else if(~gb.indexOf(f[1])){if(b.icloud_remove_subaddress&&(f[0]=f[0].split("+")[0]),!f[0].length)return!1;(b.all_lowercase||b.icloud_lowercase)&&(f[0]=f[0].toLowerCase())}else if(~hb.indexOf(f[1])){if(b.outlookdotcom_remove_subaddress&&(f[0]=f[0].split("+")[0]),!f[0].length)return!1;(b.all_lowercase||b.outlookdotcom_lowercase)&&(f[0]=f[0].toLowerCase())}else if(~ib.indexOf(f[1])){if(b.yahoo_remove_subaddress){var g=f[0].split("-");f[0]=g.length>1?g.slice(0,-1).join("-"):g[0]}if(!f[0].length)return!1;(b.all_lowercase||b.yahoo_lowercase)&&(f[0]=f[0].toLowerCase())}else b.all_lowercase&&(f[0]=f[0].toLowerCase());return f.join("@")}for(var la,ma="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},na={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1},oa={allow_display_name:!1,require_display_name:!1,allow_utf8_local_part:!0,require_tld:!0},pa=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i,qa=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,ra=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,sa=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,ta=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i,ua=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,va=/^[0-9A-F]{1,4}$/i,wa={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,require_host:!0,require_valid_protocol:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_protocol_relative_urls:!1},xa=/^\[([^\]]+)\](?::([0-9]+))?$/,ya=/^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/,za={"en-US":/^[A-Z]+$/i,"cs-CZ":/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[A-ZÆØÅ]+$/i,"de-DE":/^[A-ZÄÖÜß]+$/i,"es-ES":/^[A-ZÁÉÍÑÓÚÜ]+$/i,"fr-FR":/^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"nl-NL":/^[A-ZÉËÏÓÖÜ]+$/i,"hu-HU":/^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"pl-PL":/^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,"ru-RU":/^[А-ЯЁ]+$/i,"sr-RS@latin":/^[A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[А-ЯЂЈЉЊЋЏ]+$/i,"tr-TR":/^[A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[А-ЩЬЮЯЄIЇҐ]+$/i,ar:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/},Aa={"en-US":/^[0-9A-Z]+$/i,"cs-CZ":/^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[0-9A-ZÆØÅ]$/i,"de-DE":/^[0-9A-ZÄÖÜß]+$/i,"es-ES":/^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,"fr-FR":/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"hu-HU":/^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"nl-NL":/^[0-9A-ZÉËÏÓÖÜ]+$/i,"pl-PL":/^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,"ru-RU":/^[0-9А-ЯЁ]+$/i,"sr-RS@latin":/^[0-9A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[0-9А-ЯЂЈЉЊЋЏ]+$/i,"tr-TR":/^[0-9A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[0-9А-ЩЬЮЯЄIЇҐ]+$/i,ar:/^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/},Ba=["AU","GB","HK","IN","NZ","ZA","ZM"],Ca=0;Ca<Ba.length;Ca++)la="en-"+Ba[Ca],za[la]=za["en-US"],Aa[la]=Aa["en-US"];za["pt-BR"]=za["pt-PT"],Aa["pt-BR"]=Aa["pt-PT"];for(var Da,Ea=["AE","BH","DZ","EG","IQ","JO","KW","LB","LY","MA","QM","QA","SA","SD","SY","TN","YE"],Fa=0;Fa<Ea.length;Fa++)Da="ar-"+Ea[Fa],za[Da]=za.ar,Aa[Da]=Aa.ar;var Ga=/^[-+]?[0-9]+$/,Ha=/^[\x00-\x7F]+$/,Ia=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,Ja=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,Ka=/[^\x00-\x7F]/,La=/[\uD800-\uDBFF][\uDC00-\uDFFF]/,Ma=/^(?:[-+]?(?:0|[1-9][0-9]*))$/,Na=/^[-+]?[0-9]+$/,Oa=/^(?:[-+])?(?:[0-9]+)?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,Pa=/^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,Qa=/^[0-9A-F]+$/i,Ra=/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,Sa=/^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/,Ta=/^[a-f0-9]{32}$/,Ua={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i},Va=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/,Wa=/^[A-Z]{2}[0-9A-Z]{9}[0-9]$/,Xa=/^(?:[0-9]{9}X|[0-9]{10})$/,Ya=/^(?:[0-9]{13})$/,Za=[1,3],$a="^\\d{4}-?\\d{3}[\\dX]$",_a={"ar-DZ":/^(\+?213|0)(5|6|7)\d{8}$/,"ar-SY":/^(!?(\+?963)|0)?9\d{8}$/,"ar-SA":/^(!?(\+?966)|0)?5\d{8}$/,"en-US":/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,"cs-CZ":/^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,"de-DE":/^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,"da-DK":/^(\+?45)?(\d{8})$/,"el-GR":/^(\+?30)?(69\d{8})$/,"en-AU":/^(\+?61|0)4\d{8}$/,"en-GB":/^(\+?44|0)7\d{9}$/,"en-HK":/^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,"en-IN":/^(\+?91|0)?[789]\d{9}$/,"en-KE":/^(\+?254|0)?[7]\d{8}$/,"en-NG":/^(\+?234|0)?[789]\d{9}$/,"en-NZ":/^(\+?64|0)2\d{7,9}$/,"en-UG":/^(\+?256|0)?[7]\d{8}$/,"en-RW":/^(\+?250|0)?[7]\d{8}$/,"en-TZ":/^(\+?255|0)?[67]\d{8}$/,"en-ZA":/^(\+?27|0)\d{9}$/,"en-ZM":/^(\+?26)?09[567]\d{7}$/,"es-ES":/^(\+?34)?(6\d{1}|7[1234])\d{7}$/,"fi-FI":/^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,"fa-IR":/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,"fr-FR":/^(\+?33|0)[67]\d{8}$/,"he-IL":/^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,"hu-HU":/^(\+?36)(20|30|70)\d{7}$/,"lt-LT":/^(\+370|8)\d{8}$/,"id-ID":/^(\+?62|0[1-9])[\s|\d]+$/,"it-IT":/^(\+?39)?\s?3\d{2} ?\d{6,7}$/,"ko-KR":/^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,"ja-JP":/^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,"ms-MY":/^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,"nb-NO":/^(\+?47)?[49]\d{7}$/,"nl-BE":/^(\+?32|0)4?\d{8}$/,"nn-NO":/^(\+?47)?[49]\d{7}$/,"pl-PL":/^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,"pt-BR":/^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,"pt-PT":/^(\+?351)?9[1236]\d{7}$/,"ro-RO":/^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,"en-PK":/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,"ru-RU":/^(\+?7|8)?9\d{9}$/,"sr-RS":/^(\+3816|06)[- \d]{5,9}$/,"tr-TR":/^(\+?90|0)?5\d{9}$/,"vi-VN":/^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,"zh-CN":/^(\+?0?86\-?)?1[345789]\d{9}$/,"zh-TW":/^(\+?886\-?|0)?9\d{8}$/};_a["en-CA"]=_a["en-US"],_a["fr-BE"]=_a["nl-BE"],_a["zh-HK"]=_a["en-HK"];var ab={symbol:"$",require_symbol:!1,allow_space_after_symbol:!1,symbol_after_digits:!1,allow_negatives:!0,parens_for_negatives:!1,negative_sign_before_digits:!1,negative_sign_after_digits:!1,allow_negative_sign_placeholder:!1,thousands_separator:",",decimal_separator:".",allow_space_after_digits:!1},bb=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,cb=function(b){return a(b),bb.test(b)},db=/[^A-Z0-9+\/=]/i,eb=/^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9!\$&',\(\)\*\+,;=\-\._~:@\/\?%\s]*\s*$/i,fb={all_lowercase:!0,gmail_lowercase:!0,gmail_remove_dots:!0,gmail_remove_subaddress:!0,gmail_convert_googlemaildotcom:!0,outlookdotcom_lowercase:!0,outlookdotcom_remove_subaddress:!0,yahoo_lowercase:!0,yahoo_remove_subaddress:!0,icloud_lowercase:!0,icloud_remove_subaddress:!0},gb=["icloud.com","me.com"],hb=["hotmail.at","hotmail.be","hotmail.ca","hotmail.cl","hotmail.co.il","hotmail.co.nz","hotmail.co.th","hotmail.co.uk","hotmail.com","hotmail.com.ar","hotmail.com.au","hotmail.com.br","hotmail.com.gr","hotmail.com.mx","hotmail.com.pe","hotmail.com.tr","hotmail.com.vn","hotmail.cz","hotmail.de","hotmail.dk","hotmail.es","hotmail.fr","hotmail.hu","hotmail.id","hotmail.ie","hotmail.in","hotmail.it","hotmail.jp","hotmail.kr","hotmail.lv","hotmail.my","hotmail.ph","hotmail.pt","hotmail.sa","hotmail.sg","hotmail.sk","live.be","live.co.uk","live.com","live.com.ar","live.com.mx","live.de","live.es","live.eu","live.fr","live.it","live.nl","msn.com","outlook.at","outlook.be","outlook.cl","outlook.co.il","outlook.co.nz","outlook.co.th","outlook.com","outlook.com.ar","outlook.com.au","outlook.com.br","outlook.com.gr","outlook.com.pe","outlook.com.tr","outlook.com.vn","outlook.cz","outlook.de","outlook.dk","outlook.es","outlook.fr","outlook.hu","outlook.id","outlook.ie","outlook.in","outlook.it","outlook.jp","outlook.kr","outlook.lv","outlook.my","outlook.ph","outlook.pt","outlook.sa","outlook.sg","outlook.sk","passport.com"],ib=["rocketmail.com","yahoo.ca","yahoo.co.uk","yahoo.com","yahoo.de","yahoo.fr","yahoo.in","yahoo.it","ymail.com"],jb="7.2.0",kb={version:jb,toDate:b,toFloat:c,toInt:d,toBoolean:e,equals:f,contains:h,matches:i,isEmail:m,isURL:q,isMACAddress:r,isIP:n,isFQDN:l,isBoolean:s,isAlpha:t,isAlphanumeric:u,isNumeric:v,isLowercase:w,isUppercase:x,isAscii:y,isFullWidth:z,isHalfWidth:A,isVariableWidth:B,isMultibyte:C,isSurrogatePair:D,isInt:E,isFloat:F,isDecimal:G,isHexadecimal:H,isDivisibleBy:I,isHexColor:J,isISRC:K,isMD5:L,isJSON:M,isEmpty:N,isLength:O,isByteLength:k,isUUID:P,isMongoId:Q,isAfter:R,isBefore:S,isIn:T,isCreditCard:U,isISIN:V,isISBN:W,isISSN:X,isMobilePhone:Y,isCurrency:$,isISO8601:cb,isBase64:_,isDataURI:aa,ltrim:ba,rtrim:ca,trim:da,escape:ea,unescape:fa,stripLow:ha,whitelist:ia,blacklist:ga,isWhitelisted:ja,normalizeEmail:ka,toString:g};return kb});