describe("Bootbar", function() {

    it("is attached to the jQuery object", function() {
        expect(jQuery.bootbar).to.be.an("function");
    });

    it("calls the onDraw callback", function () {
        var callback = sinon.spy();
        $.bootbar("Test", {"onDraw": callback});
        assert(callback.called);
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

        $.bootbar("Test", {"autoDismiss": true, "dismissTimeout": 100, "onDismiss": callback});

        clock.tick(99);
        assert(callback.notCalled);

        clock.tick(1);
        assert(callback.calledOnce);

        // Also:
        assert(callback.called);
    });
});
