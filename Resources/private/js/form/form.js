define(
    ['require', 'jquery', 'json!ekyna-form/plugins', 'autosize', 'select2', 'jquery/form'],
    function(require, $, plugins, autosize) {
    "use strict";

    $.fn.select2.defaults.set('theme', 'bootstrap');
    $.fn.select2.defaults.set('width', null);


    var EkynaForm = function ($elem, options) {
        this.$elem = $($elem);
        this.options = options;
    };

    EkynaForm.prototype = {
        constructor: EkynaForm,
        getElement: function() {
            return this.$elem;
        },
        init: function($parent) {
            //console.log('Form.init()', this.$elem, $parent);
            var that = this;

            /* Textarea autosize */
            autosize(that.$elem.find('textarea').not('.tinymce'));

            /* Select2 */
            var select2options = {
                //selectOnClose: true // For tests
            };
            if ($parent && $parent.size()) {
                select2options.dropdownParent = $parent;
            }
            that.$elem.find('.select2').select2(select2options);

            /* Submit buttons */
            /*that.$elem.find('button[type="submit"]').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // TODO spin icon
                that.save();
            });*/

            /* Plugins */
            $(plugins).each(function (i, config) {
                var $target = that.$elem;
                if (!$target.is(config.selector)) {
                    $target = that.$elem.find(config.selector);
                }
                if ($target.length > 0) {
                    require([config.path], function (plugin) {
                        plugin.init($target);
                    });
                }
            });
        },
        destroy: function() {
            var that = this;
            $(plugins).each(function (i, config) {
                var $target = that.$elem.find(config.selector);
                if ($target.length > 0) {
                    require([config.path], function (plugin) {
                        if (plugin.hasOwnProperty('destroy')) {
                            plugin.destroy($target);
                        }
                    });
                }
            });
        },
        save: function() {
            var that = this;
            $(plugins).each(function (i, config) {
                var $target = that.$elem.find(config.selector);
                if ($target.length > 0) {
                    require([config.path], function (plugin) {
                        if (plugin.hasOwnProperty('save')) {
                            plugin.save($target);
                        }
                    });
                }
            });
        }
    };

    /**
     * Form with tabs error handler
     * @see http://jsfiddle.net/GJeez/8/
     * @see http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/?redirect_from_locale=fr#toc-checkValidity
     */
    $(".form-with-tabs input, .form-with-tabs textarea, .form-with-tabs select").on('invalid', function(event) {
        var $tabs = $(event.target).eq(0).parents('.tab-pane');
        if ($tabs.size()) {
            showTabs($tabs);
            return;
        }
        event.preventDefault();
    });

    var $errorFields = $('form .has-error');
    if ($errorFields.size()) {
        showTabs($errorFields.eq(0).parents('.tab-pane'));
    }

    function showTabs($tabs) {
        $tabs.each(function() {
            var $a = $('a[href="#' + $(this).attr('id') + '"]');
            if ($a.size() == 1) {
                $a.tab('show');
            }
        });
    }

    return {
        create: function($element, options) {
            return new EkynaForm($element, options);
        }
    };
});
