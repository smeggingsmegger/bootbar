describe("Bootbar", function() {

    it("is attached to the jQuery object", function() {
        expect(jQuery.bootbar).to.be.an("object");
        expect(jQuery.bootbar.show).to.be.an("function");
        expect(jQuery.bootbar.info).to.be.an("function");
        expect(jQuery.bootbar.warning).to.be.an("function");
        expect(jQuery.bootbar.danger).to.be.an("function");
        expect(jQuery.bootbar.success).to.be.an("function");
    });

    it("calls the onDraw callback", function () {
        var callback = sinon.spy();
        $.bootbar.show("Test", {"onDraw": callback});
        $(".alert-info").remove();
        assert(callback.called);
    });

    it("adds the alert-link class to links in message", function () {
        $.bootbar.show("Test <a href=\"#\">this<\/a>");
        assert($(".alert-info").find("a").hasClass("alert-link"));
        $(".alert-info").remove();
    });

    it("does not add the alert-link class to links in message", function () {
        $.bootbar.warning("Test <a href=\"#\">this<\/a>", {"autoLinkClass": false});
        assert(!$(".alert-warning").find("a").hasClass("alert-link"));
        $(".alert-warning").remove();
    });

    var clock;

    before(function () { clock = sinon.useFakeTimers(); });
    after(function () { clock.restore(); });
    function throttle(callback) {
        var timer;
        return function () {
            clearTimeout(timer);
            var args = [].slice.call(arguments);
            timer = setTimeout(function () {
                callback.apply(this, args);
            }, 100);
        };
    }

    it("calls onDismiss callback after 100ms", function () {
        var callback = sinon.spy();
        var throttled = throttle(callback);

        throttled();

        $.bootbar.show("Test", {"autoDismiss": true, "dismissTimeout": 100, "onDismiss": callback});

        clock.tick(99);
        assert(callback.notCalled);

        clock.tick(1);
        assert(callback.calledOnce);

        // Also:
        assert(callback.called);
    });
});
