(function($){
    "use strict";
    $.extend($, {
        bootbar: {
            info: function(message, options) {
                options = options === undefined ? {} : options;
                options.barType = "info";
                this.show(message, options);
            },
            warning: function(message, options) {
                options = options === undefined ? {} : options;
                options.barType = "warning";
                this.show(message, options);
            },
            danger: function(message, options) {
                options = options === undefined ? {} : options;
                options.barType = "danger";
                this.show(message, options);
            },
            success: function(message, options) {
                options = options === undefined ? {} : options;
                options.barType = "success";
                this.show(message, options);
            },
            show: function(message, options) {
                var alertTypes = ["info", "warning", "danger", "success"];

                var defaults = {
                        alertClass: "bootbar-alert",    // Default class of the alert is "bootbar-alert"
                        autoDismiss: false,             // Don't automatically dismiss the bar.
                        autoLinkClass: true,            // onDraw callback
                        barType: alertTypes[0],         // info
                        dismissTimeout: 3000,           // 3 Seconds
                        dismissEffect: "slide",         // Slide away: (slide, fade)
                        dismissSpeed: "fast",           // Dismiss speed: (slow, fast)
                        onDraw: null,                   // onDraw callback
                        onDismiss: null                 // onDismiss callback
                };

                var settings = $.extend({}, defaults, options || {});

                var template = $("<div>" +
                                    "<button type=\"button\" class=\"close\" aria-hidden=\"true\">&times;</button>" +
                                "</div>");

                var alertCss = {
                    position  : "fixed",
                    left: 0,
                    top: 0,
                    right: 0,
                    "z-index": 10000
                };

                template.css(alertCss);

                // Add the class from options (if provided)
                template.addClass("alert alert-dismissable");
                template.addClass("alert-" + settings.barType);
                template.addClass(settings.alertClass);
                template.append(message);

                if (settings.autoLinkClass) {
                    template.find("a").addClass("alert-link");
                }

                function triggerClick() {
                    $(template).find(".close").trigger("click");
                }

                $("body").prepend(template).each(function() {
                    if ($.isFunction(settings.onDraw)) {
                        settings.onDraw.call(this);
                    }
                });

                if (settings.autoDismiss) {
                    setTimeout(triggerClick, settings.dismissTimeout);
                }

                $(template).find(".close").unbind("click");

                $(template.find(".close")).on("click", function() {
                    if (settings.dismissEffect === "slide") {
                        $(template).slideUp(settings.dismissSpeed, function() {
                            $(template).remove();
                            if ($.isFunction(settings.onDismiss)) {
                                settings.onDismiss.call(this);
                            }
                        });
                    } else {
                        $(template).fadeOut(settings.dismissSpeed, function() {
                            $(template).remove();
                            if ($.isFunction(settings.onDismiss)) {
                                settings.onDismiss.call(this);
                            }
                        });
                    }
                });
            }
        }
    });
})(window.jQuery || window.Zepto || window.$);
