////////////////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2014, 2degrees Limited.
// All Rights Reserved.
//
// This file is part of jQuery.browser
// <https://github.com/2degrees/jquery.browser>, which is subject to the
// provisions of the BSD at
// http://dev.2degreesnetwork.com/p/2degrees-license.html>. A copy of the
// license should accompany this distribution. THIS SOFTWARE IS PROVIDED "AS IS"
// AND ANY AND ALL EXPRESS OR IMPLIED WARRANTIES ARE DISCLAIMED, INCLUDING, BUT
// NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY, AGAINST
// INFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE.
//
////////////////////////////////////////////////////////////////////////////////

define(['jquery'], function ($) {
    'use strict';

    var get_user_agent_data = function (ua) {
        ua = ua.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];
        return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    };

    if (!$.browser) {
        var matched = get_user_agent_data(navigator.userAgent);
        var browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        $.browser = browser;
    }
});
