define(["require","exports","jquery"],function(a,b,c){"use strict";!function(a){var b='\n<div class="ui-loading-container">\n    <div class="ui-loading-spinner">\n        <div class="circle circle-1"></div>\n        <div class="circle circle-2"></div>\n        <div class="circle circle-3"></div>\n        <div class="circle circle-4"></div>\n        <div class="circle circle-5"></div>\n        <div class="circle circle-6"></div>\n        <div class="circle circle-7"></div>\n        <div class="circle circle-8"></div>\n        <div class="circle circle-9"></div>\n        <div class="circle circle-10"></div>\n        <div class="circle circle-11"></div>\n        <div class="circle circle-12"></div>\n    </div>\n</div>';a.fn.loadingSpinner=function(c){var d;return"off"==c?d=function(a){a.removeClass("ui-loading").find(".ui-loading-container").remove()}:"on"!=c&&void 0!=c||(d=function(c){"static"==c.css("position")&&c.css("position","relative"),c.addClass("ui-loading");var d=c.find(".ui-loading-container");0==d.length&&c.append(a(b))}),this.each(function(){d(a(this))})}}(c)});