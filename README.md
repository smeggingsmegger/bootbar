bootbar
=======

[![Build Status](https://secure.travis-ci.org/smeggingsmegger/bootbar.png)](https://travis-ci.org/smeggingsmegger/bootbar)

Notifcation bar plugin for Bootstrap + jQuery / Zepto

Installation:

```html
<!-- We need jquery 1.8+ -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.css">

<!-- Bootstrap JavaScript -->
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

<!-- Finally the bootbar CSS and JS -->
<script src="bootbar.js"></script>
<link rel="stylesheet" href="bootbar.css">
```

Usage:

```javascript
// Raise a simple info bar:
$.bootbar.info("This is a simple info bar. Click the &times; to close.");

// See also:
// $.bootbar.show // generic call
// $.bootbar.warning
// $.bootbar.danger
// $.bootbar.success
```

Advanced Usage:

```javascript
// Here are the defaults and the options available for configuration:

var options = {
        autoDismiss: false,      // Don't automatically dismiss the bar.
        autoLinkClass: true,     // onDraw callback
        barType: "info",         // info box
        dismissTimeout: 3000,    // 3 Seconds
        dismissEffect: "slide",  // Slide away: (slide, fade)
        dismissSpeed: "fast",    // Dismiss speed: (slow, fast)
        onDraw: null,            // onDraw callback
        onDismiss: null          // onDismiss callback
};

// Feel free to change any of them to suit your needs.
$.bootbar.show("This is a simple info bar. Click the &times; to close.", options);

// onDraw is a function that fires as soon as the bar is drawn:
$.bootbar.info("", { onDraw: function() {
    alert("This alert fires as soon as the bar is drawn.");
}});

// onDismiss is a function that fires as soon as the bar is drawn:
$.bootbar.info("", { onDismiss: function() {
    alert("This alert fires as soon as the bar is closed.");
}});

// dismissEffect supports a fade effect as well:
$.bootbar.info("", { dismissEffect: "fade" });

// You can make your bars dismiss themselves on a timer:
$.bootbar.info("", { autoDismiss: true });

```

