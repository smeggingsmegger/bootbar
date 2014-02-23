(function($){
    $.extend($, {
        bootbar: function(message, options){
            var alertTypes = ["info", "warning", "error", "success"];
            var defaults = {
                    barType: alertTypes[0],  // info
                    autoDismiss: false,      // Don't automatically dismiss the bar.
                    dismissTimeout: 3000,    // 3 Seconds
                    dismissEffect: "slide",  // Slide away: (slide, fade)
                    dismissSpeed: "slow",    // Dismiss speed: (slow, fast)
                    onShow: null,            // onShow callback
                    onDismiss: null          // onDismiss callback
            };
            var settings = $.extend({}, defaults, options || {});
            var template = $("<div class=\"alert alert-dismissable alert-messages\">" +
                                "<button type=\"button\" class=\"close\" aria-hidden=\"true\">&times;</button>" +
                             "</div>");

            template.addClass("alert-" + settings.barType);
            template.append(message);

            function triggerClick() {
                $(template).find(".close").trigger("click");
            }

            $("body").prepend(template).each(function() {
                $.isFunction(settings.onShow) && settings.onShow.call(this);
            });

            if (settings.autoDismiss) {
                var timer = setTimeout(triggerClick, settings.dismissTimeout);
            }

            $(template).find(".close").unbind("click");

            $(template.find(".close")).on("click", function() {
                if (settings.dismissEffect == "slide") {
                    $(template).slideUp(settings.dismissSpeed, function() {
                        $.isFunction(settings.onDismiss) && settings.onDismiss.call(this);
                    });
                } else {
                    $(template).fadeOut(settings.dismissSpeed, function() {
                        $.isFunction(settings.onDismiss) && settings.onDismiss.call(this);
                    });
                }
            });
            return this;
        }
    });
})(window.jQuery || window.Zepto || window.$);
