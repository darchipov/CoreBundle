define(["jquery","ekyna-form"],function(a,b){"use strict";function c(b){var c='[data-collection="'+b.attr("id")+'"]',d=b.find("> ul > li"),e=d.size()-1;d.each(function(b,d){var h=a(d);h.find('[data-collection-role="position"]').first().val(b),0==b?h.find(c+f).prop("disabled",!0):h.find(c+f).prop("disabled",!1),b==e?h.find(c+g).prop("disabled",!0):h.find(c+g).prop("disabled",!1)})}var d='[data-collection-role="add"]',e='[data-collection-role="remove"]',f='[data-collection-role="move-up"]',g='[data-collection-role="move-down"]',h=function(b){a(b).on("click",d,this.addField)},i=function(b){a(b).on("click",e,this.removeField)},j=function(b){a(b).on("click",f,this.moveUpField)},k=function(b){a(b).on("click",g,this.moveDownField)};h.prototype.addField=function(d){var e=a(this),f=e.attr("data-collection"),g=e.attr("data-prototype-name");d&&d.preventDefault();for(var h=a("#"+f),i=h.find("> ul"),j=i.find("> li").size(),k=h.attr("data-prototype"),l=k.match(/id="(.*?)"/),m=new RegExp(g,"g");a("#"+l[1].replace(m,j)).size()>0;)j++;k=k.replace(m,j),k=k.replace(/__id__/g,l[1].replace(m,j));var n=a("<li></li>").html(k);i.append(n);var o=b.create(n);o.init(),c(h);var p=a.Event("ekyna-collection-field-added");p.target=n,h.trigger(p)},i.prototype.removeField=function(d){var e=a(this),f=e.attr("data-collection");if(d&&d.preventDefault(),!e.data("confirm")||confirm(e.data("confirm"))){var g=e.closest("li"),h=b.create(g);h.save(),h.destroy(),g.remove();var i=a("#"+f);c(i);var j=a.Event("ekyna-collection-field-removed");j.target=g,i.trigger(j)}},j.prototype.moveUpField=function(d){var e=a(this),f=e.attr("data-collection");d&&d.preventDefault();var g=e.closest("li");if(!g.is(":first-child")){var h=g.prev(),i=b.create(g);i.save(),i.destroy();var j=b.create(h);j.save(),j.destroy(),h.before(g.detach()),i.init(),j.init();var k=a("#"+f);c(k);var l=a.Event("ekyna-collection-field-moved-up");l.target=g,k.trigger(l)}},k.prototype.moveDownField=function(d){var e=a(this),f=e.attr("data-collection");d&&d.preventDefault(),e.trigger("ekyna-collection-field-moved-down");var g=e.closest("li");if(!g.is(":last-child")){var h=g.next(),i=b.create(g);i.save(),i.destroy();var j=b.create(h);j.save(),j.destroy(),h.after(g.detach()),i.init(),j.init();var k=a("#"+f);c(k);var l=a.Event("ekyna-collection-field-moved-down");l.target=g,k.trigger(l)}};var l=a.fn.addField,m=a.fn.removeField,n=a.fn.moveUpField,o=a.fn.moveDownField;return a.fn.addField=function(b){return this.each(function(){var c=a(this),d=c.data("addfield");d||c.data("addfield",d=new h(this)),"string"==typeof b&&d[b].call(c)})},a.fn.removeField=function(b){return this.each(function(){var c=a(this),d=c.data("removefield");d||c.data("removefield",d=new i(this)),"string"==typeof b&&d[b].call(c)})},a.fn.moveUpField=function(b){return this.each(function(){var c=a(this),d=c.data("moveupfield");d||c.data("moveupfield",d=new j(this)),"string"==typeof b&&d[b].call(c)})},a.fn.moveDownField=function(b){return this.each(function(){var c=a(this),d=c.data("movedownfield");d||c.data("movedownfield",d=new k(this)),"string"==typeof b&&d[b].call(c)})},a.fn.addField.Constructor=h,a.fn.removeField.Constructor=i,a.fn.moveUpField.Constructor=j,a.fn.moveDownField.Constructor=k,a.fn.addField.noConflict=function(){return a.fn.addField=l,this},a.fn.removeField.noConflict=function(){return a.fn.removeField=m,this},a.fn.moveUpField.noConflict=function(){return a.fn.moveUpField=n,this},a.fn.moveDownField.noConflict=function(){return a.fn.moveDownField=o,this},a(document).on("click.addfield.data-api",d,h.prototype.addField),a(document).on("click.removefield.data-api",e,i.prototype.removeField),a(document).on("click.moveupfield.data-api",f,j.prototype.moveUpField),a(document).on("click.movedownfield.data-api",g,k.prototype.moveDownField),{init:function(b){b.each(function(b,d){c(a(d))})}}});