define(["require","jquery","json!ekyna-form/plugins","autosize","select2","jquery/form"],function(a,b,c,d){"use strict";function e(a){a.each(function(){var a=b('a[href="#'+b(this).attr("id")+'"]');1==a.size()&&a.tab("show")})}b.fn.select2.defaults.set("theme","bootstrap"),b.fn.select2.defaults.set("width",null);var f=function(a,c){this.$elem=b(a),this.options=c};f.prototype={constructor:f,getElement:function(){return this.$elem},init:function(e){var f=this;d(f.$elem.find("textarea").not(".tinymce"));var g={};e&&e.size()&&(g.dropdownParent=e),f.$elem.find(".select2").select2(g),b.each(c,function(c,d){var e=f.$elem;e.is(c)||(e=f.$elem.find(c)),e.length>0&&b.each(d,function(b,c){a([c],function(a){a.init(e)})})})},destroy:function(){var d=this;b.each(c,function(c,e){var f=d.$elem;f.is(c)||(f=d.$elem.find(c)),f.length>0&&b.each(e,function(b,c){a([c],function(a){a.hasOwnProperty("destroy")&&a.destroy(f)})})})},save:function(){var d=this;b.each(c,function(c,e){var f=d.$elem;f.is(c)||(f=d.$elem.find(c)),f.length>0&&b.each(e,function(b,c){a([c],function(a){a.hasOwnProperty("save")&&a.save(f)})})})}},b(".form-with-tabs input, .form-with-tabs textarea, .form-with-tabs select").on("invalid",function(a){var c=b(a.target).eq(0).parents(".tab-pane");return c.size()?void e(c):void a.preventDefault()});var g=b("form .has-error");return g.size()&&e(g.eq(0).parents(".tab-pane")),{create:function(a,b){return new f(a,b)}}});