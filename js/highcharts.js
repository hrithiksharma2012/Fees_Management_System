/*
 Highcharts JS v6.2.0 (2018-10-17)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (S, K) {
    "object" === typeof module && module.exports ? module.exports = S.document ? K(S) : K : "function" === typeof define && define.amd ? define(function () {
        return K(S)
    }) : S.Highcharts = K(S)
})("undefined" !== typeof window ? window : this, function (S) {
    var K = function () {
        var a = "undefined" === typeof S ? window : S,
            C = a.document,
            F = a.navigator && a.navigator.userAgent || "",
            I = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            n = /(edge|msie|trident)/i.test(F) && !a.opera,
            f = -1 !== F.indexOf("Firefox"),
            e = -1 !== F.indexOf("Chrome"),
            u = f && 4 > parseInt(F.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "6.2.0",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: u,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: n,
            isWebKit: -1 !== F.indexOf("AppleWebKit"),
            isFirefox: f,
            isChrome: e,
            isSafari: !e && -1 !== F.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: I,
            win: a,
            marginNames: ["plotTop",
                "marginRight", "marginBottom", "plotLeft"
            ],
            noop: function () {},
            charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var C = a.charts,
            F = a.doc,
            I = a.win;
        a.error = function (n, f) {
            n = a.isNumber(n) ? "Highcharts error #" + n + "" + n : n;
            if (f) throw Error(n);
            I.console && console.log(n)
        };
        a.Fx = function (a, f, e) {
            this.options = f;
            this.elem = a;
            this.prop = e
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    f = this.paths[1],
                    e = [],
                    u = this.now,
                    x = a.length,
                    t;
                if (1 === u) e = this.toD;
                else if (x === f.length && 1 > u)
                    for (; x--;) t = parseFloat(a[x]),
                        e[x] = isNaN(t) ? f[x] : u * parseFloat(f[x] - t) + t;
                else e = f;
                this.elem.attr("d", e, null, !0)
            },
            update: function () {
                var a = this.elem,
                    f = this.prop,
                    e = this.now,
                    u = this.options.step;
                if (this[f + "Setter"]) this[f + "Setter"]();
                else a.attr ? a.element && a.attr(f, e, null, !0) : a.style[f] = e + this.unit;
                u && u.call(a, e, this)
            },
            run: function (n, f, e) {
                var u = this,
                    x = u.options,
                    t = function (a) {
                        return t.stopped ? !1 : u.step(a)
                    },
                    w = I.requestAnimationFrame || function (a) {
                        setTimeout(a, 13)
                    },
                    y = function () {
                        for (var c = 0; c < a.timers.length; c++) a.timers[c]() || a.timers.splice(c--,
                            1);
                        a.timers.length && w(y)
                    };
                n !== f || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = n, this.end = f, this.unit = e, this.now = this.start, this.pos = 0, t.elem = this.elem, t.prop = this.prop, t() && 1 === a.timers.push(t) && w(y)) : (delete x.curAnim[this.prop], x.complete && 0 === a.keys(x.curAnim).length && x.complete.call(this.elem))
            },
            step: function (n) {
                var f = +new Date,
                    e, u = this.options,
                    x = this.elem,
                    t = u.complete,
                    w = u.duration,
                    y = u.curAnim;
                x.attr && !x.element ? n = !1 : n || f >= w + this.startTime ? (this.now = this.end, this.pos =
                    1, this.update(), e = y[this.prop] = !0, a.objectEach(y, function (a) {
                        !0 !== a && (e = !1)
                    }), e && t && t.call(x), n = !1) : (this.pos = u.easing((f - this.startTime) / w), this.now = this.start + (this.end - this.start) * this.pos, this.update(), n = !0);
                return n
            },
            initPath: function (n, f, e) {
                function u(a) {
                    var b, k;
                    for (d = a.length; d--;) b = "M" === a[d] || "L" === a[d], k = /[a-zA-Z]/.test(a[d + 3]), b && k && a.splice(d + 1, 0, a[d + 1], a[d + 2], a[d + 1], a[d + 2])
                }

                function x(a, h) {
                    for (; a.length < k;) {
                        a[0] = h[k - a.length];
                        var c = a.slice(0, p);
                        [].splice.apply(a, [0, 0].concat(c));
                        b && (c =
                            a.slice(a.length - p), [].splice.apply(a, [a.length, 0].concat(c)), d--)
                    }
                    a[0] = "M"
                }

                function t(a, d) {
                    for (var c = (k - a.length) / p; 0 < c && c--;) q = a.slice().splice(a.length / v - p, p * v), q[0] = d[k - p - c * p], h && (q[p - 6] = q[p - 2], q[p - 5] = q[p - 1]), [].splice.apply(a, [a.length / v, 0].concat(q)), b && c--
                }
                f = f || "";
                var w, y = n.startX,
                    c = n.endX,
                    h = -1 < f.indexOf("C"),
                    p = h ? 7 : 3,
                    k, q, d;
                f = f.split(" ");
                e = e.slice();
                var b = n.isArea,
                    v = b ? 2 : 1,
                    J;
                h && (u(f), u(e));
                if (y && c) {
                    for (d = 0; d < y.length; d++)
                        if (y[d] === c[0]) {
                            w = d;
                            break
                        } else if (y[0] === c[c.length - y.length + d]) {
                        w = d;
                        J = !0;
                        break
                    }
                    void 0 === w && (f = [])
                }
                f.length && a.isNumber(w) && (k = e.length + w * v * p, J ? (x(f, e), t(e, f)) : (x(e, f), t(f, e)));
                return [f, e]
            },
            fillSetter: function () {
                a.Fx.prototype.strokeSetter.apply(this, arguments)
            },
            strokeSetter: function () {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            }
        };
        a.merge = function () {
            var n, f = arguments,
                e, u = {},
                x = function (e, n) {
                    "object" !== typeof e && (e = {});
                    a.objectEach(n, function (y, c) {
                        !a.isObject(y, !0) || a.isClass(y) || a.isDOMElement(y) ? e[c] = n[c] : e[c] = x(e[c] || {},
                            y)
                    });
                    return e
                };
            !0 === f[0] && (u = f[1], f = Array.prototype.slice.call(f, 2));
            e = f.length;
            for (n = 0; n < e; n++) u = x(u, f[n]);
            return u
        };
        a.pInt = function (a, f) {
            return parseInt(a, f || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (n, f) {
            return !!n && "object" === typeof n && (!f || !a.isArray(n))
        };
        a.isDOMElement = function (n) {
            return a.isObject(n) && "number" === typeof n.nodeType
        };
        a.isClass = function (n) {
            var f =
                n && n.constructor;
            return !(!a.isObject(n, !0) || a.isDOMElement(n) || !f || !f.name || "Object" === f.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function (a, f) {
            for (var e = a.length; e--;)
                if (a[e] === f) {
                    a.splice(e, 1);
                    break
                }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (n, f, e) {
            var u;
            a.isString(f) ? a.defined(e) ? n.setAttribute(f, e) : n && n.getAttribute && ((u = n.getAttribute(f)) || "class" !== f || (u = n.getAttribute(f + "Name"))) : a.defined(f) && a.isObject(f) &&
                a.objectEach(f, function (a, e) {
                    n.setAttribute(e, a)
                });
            return u
        };
        a.splat = function (n) {
            return a.isArray(n) ? n : [n]
        };
        a.syncTimeout = function (a, f, e) {
            if (f) return setTimeout(a, f, e);
            a.call(0, e)
        };
        a.clearTimeout = function (n) {
            a.defined(n) && clearTimeout(n)
        };
        a.extend = function (a, f) {
            var e;
            a || (a = {});
            for (e in f) a[e] = f[e];
            return a
        };
        a.pick = function () {
            var a = arguments,
                f, e, u = a.length;
            for (f = 0; f < u; f++)
                if (e = a[f], void 0 !== e && null !== e) return e
        };
        a.css = function (n, f) {
            a.isMS && !a.svg && f && void 0 !== f.opacity && (f.filter = "alpha(opacity\x3d" +
                100 * f.opacity + ")");
            a.extend(n.style, f)
        };
        a.createElement = function (n, f, e, u, x) {
            n = F.createElement(n);
            var t = a.css;
            f && a.extend(n, f);
            x && t(n, {
                padding: 0,
                border: "none",
                margin: 0
            });
            e && t(n, e);
            u && u.appendChild(n);
            return n
        };
        a.extendClass = function (n, f) {
            var e = function () {};
            e.prototype = new n;
            a.extend(e.prototype, f);
            return e
        };
        a.pad = function (a, f, e) {
            return Array((f || 2) + 1 - String(a).replace("-", "").length).join(e || 0) + a
        };
        a.relativeLength = function (a, f, e) {
            return /%$/.test(a) ? f * parseFloat(a) / 100 + (e || 0) : parseFloat(a)
        };
        a.wrap =
            function (a, f, e) {
                var n = a[f];
                a[f] = function () {
                    var a = Array.prototype.slice.call(arguments),
                        t = arguments,
                        w = this;
                    w.proceed = function () {
                        n.apply(w, arguments.length ? arguments : t)
                    };
                    a.unshift(n);
                    a = e.apply(this, a);
                    w.proceed = null;
                    return a
                }
            };
        a.datePropsToTimestamps = function (n) {
            a.objectEach(n, function (f, e) {
                a.isObject(f) && "function" === typeof f.getTime ? n[e] = f.getTime() : (a.isObject(f) || a.isArray(f)) && a.datePropsToTimestamps(f)
            })
        };
        a.formatSingle = function (n, f, e) {
            var u = /\.([0-9])/,
                x = a.defaultOptions.lang;
            /f$/.test(n) ? (e =
                (e = n.match(u)) ? e[1] : -1, null !== f && (f = a.numberFormat(f, e, x.decimalPoint, -1 < n.indexOf(",") ? x.thousandsSep : ""))) : f = (e || a.time).dateFormat(n, f);
            return f
        };
        a.format = function (n, f, e) {
            for (var u = "{", x = !1, t, w, y, c, h = [], p; n;) {
                u = n.indexOf(u);
                if (-1 === u) break;
                t = n.slice(0, u);
                if (x) {
                    t = t.split(":");
                    w = t.shift().split(".");
                    c = w.length;
                    p = f;
                    for (y = 0; y < c; y++) p && (p = p[w[y]]);
                    t.length && (p = a.formatSingle(t.join(":"), p, e));
                    h.push(p)
                } else h.push(t);
                n = n.slice(u + 1);
                u = (x = !x) ? "}" : "{"
            }
            h.push(n);
            return h.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10,
                Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (n, f, e, u, x) {
            var t, w = n;
            e = a.pick(e, 1);
            t = n / e;
            f || (f = x ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === u && (1 === e ? f = a.grep(f, function (a) {
                return 0 === a % 1
            }) : .1 >= e && (f = [1 / e])));
            for (u = 0; u < f.length && !(w = f[u], x && w * e >= n || !x && t <= (f[u] + (f[u + 1] || f[u])) / 2); u++);
            return w = a.correctFloat(w * e, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, f) {
            var e = a.length,
                n, x;
            for (x = 0; x < e; x++) a[x].safeI = x;
            a.sort(function (a, e) {
                n = f(a, e);
                return 0 === n ?
                    a.safeI - e.safeI : n
            });
            for (x = 0; x < e; x++) delete a[x].safeI
        };
        a.arrayMin = function (a) {
            for (var f = a.length, e = a[0]; f--;) a[f] < e && (e = a[f]);
            return e
        };
        a.arrayMax = function (a) {
            for (var f = a.length, e = a[0]; f--;) a[f] > e && (e = a[f]);
            return e
        };
        a.destroyObjectProperties = function (n, f) {
            a.objectEach(n, function (a, u) {
                a && a !== f && a.destroy && a.destroy();
                delete n[u]
            })
        };
        a.discardElement = function (n) {
            var f = a.garbageBin;
            f || (f = a.createElement("div"));
            n && f.appendChild(n);
            f.innerHTML = ""
        };
        a.correctFloat = function (a, f) {
            return parseFloat(a.toPrecision(f ||
                14))
        };
        a.setAnimation = function (n, f) {
            f.renderer.globalAnimation = a.pick(n, f.options.chart.animation, !0)
        };
        a.animObject = function (n) {
            return a.isObject(n) ? a.merge(n) : {
                duration: n ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (n, f, e, u) {
            n = +n || 0;
            f = +f;
            var x = a.defaultOptions.lang,
                t = (n.toString().split(".")[1] || "").split("e")[0].length,
                w, y, c = n.toString().split("e"); - 1 === f ? f = Math.min(t, 20) : a.isNumber(f) ? f && c[1] && 0 > c[1] &&
                (w = f + +c[1], 0 <= w ? (c[0] = (+c[0]).toExponential(w).split("e")[0], f = w) : (c[0] = c[0].split(".")[0] || 0, n = 20 > f ? (c[0] * Math.pow(10, c[1])).toFixed(f) : 0, c[1] = 0)) : f = 2;
            y = (Math.abs(c[1] ? c[0] : n) + Math.pow(10, -Math.max(f, t) - 1)).toFixed(f);
            t = String(a.pInt(y));
            w = 3 < t.length ? t.length % 3 : 0;
            e = a.pick(e, x.decimalPoint);
            u = a.pick(u, x.thousandsSep);
            n = (0 > n ? "-" : "") + (w ? t.substr(0, w) + u : "");
            n += t.substr(w).replace(/(\d{3})(?=\d)/g, "$1" + u);
            f && (n += e + y.slice(-f));
            c[1] && 0 !== +n && (n += "e" + c[1]);
            return n
        };
        Math.easeInOutSine = function (a) {
            return -.5 *
                (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (n, f, e) {
            if ("width" === f) return Math.max(0, Math.min(n.offsetWidth, n.scrollWidth) - a.getStyle(n, "padding-left") - a.getStyle(n, "padding-right"));
            if ("height" === f) return Math.max(0, Math.min(n.offsetHeight, n.scrollHeight) - a.getStyle(n, "padding-top") - a.getStyle(n, "padding-bottom"));
            I.getComputedStyle || a.error(27, !0);
            if (n = I.getComputedStyle(n, void 0)) n = n.getPropertyValue(f), a.pick(e, "opacity" !== f) && (n = a.pInt(n));
            return n
        };
        a.inArray = function (n, f, e) {
            return (a.indexOfPolyfill ||
                Array.prototype.indexOf).call(f, n, e)
        };
        a.grep = function (n, f) {
            return (a.filterPolyfill || Array.prototype.filter).call(n, f)
        };
        a.find = Array.prototype.find ? function (a, f) {
            return a.find(f)
        } : function (a, f) {
            var e, u = a.length;
            for (e = 0; e < u; e++)
                if (f(a[e], e)) return a[e]
        };
        a.some = function (n, f, e) {
            return (a.somePolyfill || Array.prototype.some).call(n, f, e)
        };
        a.map = function (a, f) {
            for (var e = [], u = 0, x = a.length; u < x; u++) e[u] = f.call(a[u], a[u], u, a);
            return e
        };
        a.keys = function (n) {
            return (a.keysPolyfill || Object.keys).call(void 0, n)
        };
        a.reduce =
            function (n, f, e) {
                return (a.reducePolyfill || Array.prototype.reduce).apply(n, 2 < arguments.length ? [f, e] : [f])
            };
        a.offset = function (a) {
            var f = F.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (I.pageYOffset || f.scrollTop) - (f.clientTop || 0),
                left: a.left + (I.pageXOffset || f.scrollLeft) - (f.clientLeft || 0)
            }
        };
        a.stop = function (n, f) {
            for (var e = a.timers.length; e--;) a.timers[e].elem !== n || f && f !== a.timers[e].prop || (a.timers[e].stopped = !0)
        };
        a.each = function (n, f, e) {
            return (a.forEachPolyfill ||
                Array.prototype.forEach).call(n, f, e)
        };
        a.objectEach = function (a, f, e) {
            for (var u in a) a.hasOwnProperty(u) && f.call(e || a[u], a[u], u, a)
        };
        a.addEvent = function (n, f, e, u) {
            var x, t = n.addEventListener || a.addEventListenerPolyfill;
            x = "function" === typeof n && n.prototype ? n.prototype.protoEvents = n.prototype.protoEvents || {} : n.hcEvents = n.hcEvents || {};
            a.Point && n instanceof a.Point && n.series && n.series.chart && (n.series.chart.runTrackerClick = !0);
            t && t.call(n, f, e, !1);
            x[f] || (x[f] = []);
            x[f].push(e);
            u && a.isNumber(u.order) && (e.order =
                u.order, x[f].sort(function (a, e) {
                    return a.order - e.order
                }));
            return function () {
                a.removeEvent(n, f, e)
            }
        };
        a.removeEvent = function (n, f, e) {
            function u(e, c) {
                var h = n.removeEventListener || a.removeEventListenerPolyfill;
                h && h.call(n, e, c, !1)
            }

            function x(e) {
                var c, h;
                n.nodeName && (f ? (c = {}, c[f] = !0) : c = e, a.objectEach(c, function (a, k) {
                    if (e[k])
                        for (h = e[k].length; h--;) u(k, e[k][h])
                }))
            }
            var t, w;
            a.each(["protoEvents", "hcEvents"], function (y) {
                var c = n[y];
                c && (f ? (t = c[f] || [], e ? (w = a.inArray(e, t), -1 < w && (t.splice(w, 1), c[f] = t), u(f, e)) : (x(c),
                    c[f] = [])) : (x(c), n[y] = {}))
            })
        };
        a.fireEvent = function (n, f, e, u) {
            var x, t, w, y, c;
            e = e || {};
            F.createEvent && (n.dispatchEvent || n.fireEvent) ? (x = F.createEvent("Events"), x.initEvent(f, !0, !0), a.extend(x, e), n.dispatchEvent ? n.dispatchEvent(x) : n.fireEvent(f, x)) : a.each(["protoEvents", "hcEvents"], function (h) {
                if (n[h])
                    for (t = n[h][f] || [], w = t.length, e.target || a.extend(e, {
                            preventDefault: function () {
                                e.defaultPrevented = !0
                            },
                            target: n,
                            type: f
                        }), y = 0; y < w; y++)(c = t[y]) && !1 === c.call(n, e) && e.preventDefault()
            });
            u && !e.defaultPrevented && u.call(n,
                e)
        };
        a.animate = function (n, f, e) {
            var u, x = "",
                t, w, y;
            a.isObject(e) || (y = arguments, e = {
                duration: y[2],
                easing: y[3],
                complete: y[4]
            });
            a.isNumber(e.duration) || (e.duration = 400);
            e.easing = "function" === typeof e.easing ? e.easing : Math[e.easing] || Math.easeInOutSine;
            e.curAnim = a.merge(f);
            a.objectEach(f, function (c, h) {
                a.stop(n, h);
                w = new a.Fx(n, e, h);
                t = null;
                "d" === h ? (w.paths = w.initPath(n, n.d, f.d), w.toD = f.d, u = 0, t = 1) : n.attr ? u = n.attr(h) : (u = parseFloat(a.getStyle(n, h)) || 0, "opacity" !== h && (x = "px"));
                t || (t = c);
                t && t.match && t.match("px") &&
                    (t = t.replace(/px/g, ""));
                w.run(u, t, x)
            })
        };
        a.seriesType = function (n, f, e, u, x) {
            var t = a.getOptions(),
                w = a.seriesTypes;
            t.plotOptions[n] = a.merge(t.plotOptions[f], e);
            w[n] = a.extendClass(w[f] || function () {}, u);
            w[n].prototype.type = n;
            x && (w[n].prototype.pointClass = a.extendClass(a.Point, x));
            return w[n]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9),
                f = 0;
            return function () {
                return "highcharts-" + a + "-" + f++
            }
        }();
        I.jQuery && (I.jQuery.fn.highcharts = function () {
            var n = [].slice.call(arguments);
            if (this[0]) return n[0] ?
                (new(a[a.isString(n[0]) ? n.shift() : "Chart"])(this[0], n[0], n[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        })
    })(K);
    (function (a) {
        var C = a.each,
            F = a.isNumber,
            I = a.map,
            n = a.merge,
            f = a.pInt;
        a.Color = function (e) {
            if (!(this instanceof a.Color)) return new a.Color(e);
            this.init(e)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [f(a[1]), f(a[2]), f(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [f(a[1]), f(a[2]), f(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function (e) {
                var f, x, t, w;
                if ((this.input = e = this.names[e && e.toLowerCase ? e.toLowerCase() : ""] || e) && e.stops) this.stops = I(e.stops, function (e) {
                    return new a.Color(e[1])
                });
                else if (e && e.charAt && "#" === e.charAt() && (f = e.length, e = parseInt(e.substr(1), 16), 7 === f ? x = [(e & 16711680) >> 16, (e & 65280) >> 8, e & 255, 1] : 4 === f && (x = [(e & 3840) >> 4 | (e & 3840) >> 8, (e & 240) >> 4 | e & 240, (e & 15) << 4 | e & 15, 1])), !x)
                    for (t = this.parsers.length; t-- && !x;) w = this.parsers[t],
                        (f = w.regex.exec(e)) && (x = w.parse(f));
                this.rgba = x || []
            },
            get: function (a) {
                var e = this.input,
                    f = this.rgba,
                    t;
                this.stops ? (t = n(e), t.stops = [].concat(t.stops), C(this.stops, function (e, y) {
                    t.stops[y] = [t.stops[y][0], e.get(a)]
                })) : t = f && F(f[0]) ? "rgb" === a || !a && 1 === f[3] ? "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")" : "a" === a ? f[3] : "rgba(" + f.join(",") + ")" : e;
                return t
            },
            brighten: function (a) {
                var e, x = this.rgba;
                if (this.stops) C(this.stops, function (e) {
                    e.brighten(a)
                });
                else if (F(a) && 0 !== a)
                    for (e = 0; 3 > e; e++) x[e] += f(255 * a), 0 > x[e] && (x[e] = 0), 255 < x[e] &&
                        (x[e] = 255);
                return this
            },
            setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function (a, f) {
                var e = this.rgba,
                    t = a.rgba;
                t.length && e && e.length ? (a = 1 !== t[3] || 1 !== e[3], f = (a ? "rgba(" : "rgb(") + Math.round(t[0] + (e[0] - t[0]) * (1 - f)) + "," + Math.round(t[1] + (e[1] - t[1]) * (1 - f)) + "," + Math.round(t[2] + (e[2] - t[2]) * (1 - f)) + (a ? "," + (t[3] + (e[3] - t[3]) * (1 - f)) : "") + ")") : f = a.input || "none";
                return f
            }
        };
        a.color = function (e) {
            return new a.Color(e)
        }
    })(K);
    (function (a) {
        var C, F, I = a.addEvent,
            n = a.animate,
            f = a.attr,
            e = a.charts,
            u = a.color,
            x = a.css,
            t = a.createElement,
            w = a.defined,
            y = a.deg2rad,
            c = a.destroyObjectProperties,
            h = a.doc,
            p = a.each,
            k = a.extend,
            q = a.erase,
            d = a.grep,
            b = a.hasTouch,
            v = a.inArray,
            J = a.isArray,
            l = a.isFirefox,
            L = a.isMS,
            B = a.isObject,
            D = a.isString,
            m = a.isWebKit,
            G = a.merge,
            A = a.noop,
            N = a.objectEach,
            E = a.pick,
            g = a.pInt,
            r = a.removeEvent,
            M = a.stop,
            O = a.svg,
            H = a.SVG_NS,
            R = a.symbolSizes,
            Q = a.win;
        C = a.SVGElement = function () {
            return this
        };
        k(C.prototype, {
            opacity: 1,
            SVG_NS: H,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function (a, g) {
                this.element = "span" === g ? t(g) : h.createElementNS(this.SVG_NS, g);
                this.renderer = a
            },
            animate: function (z, g, r) {
                g = a.animObject(E(g, this.renderer.globalAnimation, !0));
                0 !== g.duration ? (r && (g.complete = r), n(this, z, g)) : (this.attr(z, null, r), g.step && g.step.call(this));
                return this
            },
            complexColor: function (z, g, r) {
                var b = this.renderer,
                    k, m, d, H, c, h, q, A, v, P, l, O = [],
                    M;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    z.radialGradient ? m = "radialGradient" : z.linearGradient && (m = "linearGradient");
                    m && (d = z[m], c = b.gradients, q = z.stops, P = r.radialReference, J(d) && (z[m] = d = {
                        x1: d[0],
                        y1: d[1],
                        x2: d[2],
                        y2: d[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === m && P && !w(d.gradientUnits) && (H = d, d = G(d, b.getRadialAttr(P, H), {
                        gradientUnits: "userSpaceOnUse"
                    })), N(d, function (a, z) {
                        "id" !== z && O.push(z, a)
                    }), N(q, function (a) {
                        O.push(a)
                    }), O = O.join(","), c[O] ? l = c[O].attr("id") : (d.id = l = a.uniqueKey(), c[O] = h = b.createElement(m).attr(d).add(b.defs), h.radAttr = H, h.stops = [], p(q, function (z) {
                        0 === z[1].indexOf("rgba") ? (k = a.color(z[1]),
                            A = k.get("rgb"), v = k.get("a")) : (A = z[1], v = 1);
                        z = b.createElement("stop").attr({
                            offset: z[0],
                            "stop-color": A,
                            "stop-opacity": v
                        }).add(h);
                        h.stops.push(z)
                    })), M = "url(" + b.url + "#" + l + ")", r.setAttribute(g, M), r.gradient = O, z.toString = function () {
                        return M
                    })
                })
            },
            applyTextOutline: function (z) {
                var g = this.element,
                    r, b, d, m, k; - 1 !== z.indexOf("contrast") && (z = z.replace(/contrast/g, this.renderer.getContrast(g.style.fill)));
                z = z.split(" ");
                b = z[z.length - 1];
                if ((d = z[0]) && "none" !== d && a.svg) {
                    this.fakeTS = !0;
                    z = [].slice.call(g.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    d = d.replace(/(^[\d\.]+)(.*?)$/g, function (a, z, g) {
                        return 2 * z + g
                    });
                    for (k = z.length; k--;) r = z[k], "highcharts-text-outline" === r.getAttribute("class") && q(z, g.removeChild(r));
                    m = g.firstChild;
                    p(z, function (a, z) {
                        0 === z && (a.setAttribute("x", g.getAttribute("x")), z = g.getAttribute("y"), a.setAttribute("y", z || 0), null === z && g.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        f(a, {
                            "class": "highcharts-text-outline",
                            fill: b,
                            stroke: b,
                            "stroke-width": d,
                            "stroke-linejoin": "round"
                        });
                        g.insertBefore(a, m)
                    })
                }
            },
            attr: function (a,
                g, r, b) {
                var z, d = this.element,
                    m, k = this,
                    c, H;
                "string" === typeof a && void 0 !== g && (z = a, a = {}, a[z] = g);
                "string" === typeof a ? k = (this[a + "Getter"] || this._defaultGetter).call(this, a, d) : (N(a, function (z, g) {
                    c = !1;
                    b || M(this, g);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(g) && (m || (this.symbolAttr(a), m = !0), c = !0);
                    !this.rotation || "x" !== g && "y" !== g || (this.doTransform = !0);
                    c || (H = this[g + "Setter"] || this._defaultSetter, H.call(this, z, g, d), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(g) &&
                        this.updateShadows(g, z, H))
                }, this), this.afterSetters());
                r && r.call(this);
                return k
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (a, g, r) {
                for (var z = this.shadows, d = z.length; d--;) r.call(z[d], "height" === a ? Math.max(g - (z[d].cutHeight || 0), 0) : "d" === a ? this.d : g, a, z[d])
            },
            addClass: function (a, g) {
                var z = this.attr("class") || ""; - 1 === z.indexOf(a) && (g || (a = (z + (z ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !==
                    v(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var z = this;
                p("x y r start end width height innerR anchorX anchorY".split(" "), function (g) {
                    z[g] = E(a[g], z[g])
                });
                z.attr({
                    d: z.renderer.symbols[z.symbolName](z.x, z.y, z.width, z.height, z)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, g) {
                var z;
                g = g || a.strokeWidth || 0;
                z = Math.round(g) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + z;
                a.y = Math.floor(a.y || this.y || 0) + z;
                a.width = Math.floor((a.width || this.width || 0) - 2 * z);
                a.height = Math.floor((a.height || this.height || 0) - 2 * z);
                w(a.strokeWidth) && (a.strokeWidth = g);
                return a
            },
            css: function (a) {
                var z = this.styles,
                    r = {},
                    d = this.element,
                    b, m = "",
                    c, H = !z,
                    h = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                z && N(a, function (a, g) {
                    a !== z[g] && (r[g] = a, H = !0)
                });
                H && (z && (a = k(z, r)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === d.nodeName.toLowerCase() &&
                    a.width && (b = this.textWidth = g(a.width))), this.styles = a, b && !O && this.renderer.forExport && delete a.width, d.namespaceURI === this.SVG_NS ? (c = function (a, z) {
                    return "-" + z.toLowerCase()
                }, N(a, function (a, z) {
                    -1 === v(z, h) && (m += z.replace(/([A-Z])/g, c) + ":" + a + ";")
                }), m && f(d, "style", m)) : x(d, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, g) {
                var z = this,
                    r =
                    z.element;
                b && "click" === a ? (r.ontouchstart = function (a) {
                    z.touchEventFired = Date.now();
                    a.preventDefault();
                    g.call(r, a)
                }, r.onclick = function (a) {
                    (-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (z.touchEventFired || 0)) && g.call(r, a)
                }) : r["on" + a] = g;
                return this
            },
            setRadialReference: function (a) {
                var z = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                z && z.radAttr && z.animate(this.renderer.getRadialAttr(a, z.radAttr));
                return this
            },
            translate: function (a, g) {
                return this.attr({
                    translateX: a,
                    translateY: g
                })
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0,
                    g = this.translateY || 0,
                    r = this.scaleX,
                    d = this.scaleY,
                    b = this.inverted,
                    m = this.rotation,
                    k = this.matrix,
                    c = this.element;
                b && (a += this.width, g += this.height);
                a = ["translate(" + a + "," + g + ")"];
                w(k) && a.push("matrix(" + k.join(",") + ")");
                b ? a.push("rotate(90) scale(-1,1)") : m && a.push("rotate(" + m + " " + E(this.rotationOriginX, c.getAttribute("x"), 0) + " " + E(this.rotationOriginY, c.getAttribute("y") ||
                    0) + ")");
                (w(r) || w(d)) && a.push("scale(" + E(r, 1) + " " + E(d, 1) + ")");
                a.length && c.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, g, r) {
                var z, d, b, m, k = {};
                d = this.renderer;
                b = d.alignedObjects;
                var c, H;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = g, !r || D(r)) this.alignTo = z = r || "renderer", q(b, this), b.push(this), r = null
                } else a = this.alignOptions, g = this.alignByTranslate, z = this.alignTo;
                r = E(r, d[z], d);
                z = a.align;
                d = a.verticalAlign;
                b =
                    (r.x || 0) + (a.x || 0);
                m = (r.y || 0) + (a.y || 0);
                "right" === z ? c = 1 : "center" === z && (c = 2);
                c && (b += (r.width - (a.width || 0)) / c);
                k[g ? "translateX" : "x"] = Math.round(b);
                "bottom" === d ? H = 1 : "middle" === d && (H = 2);
                H && (m += (r.height - (a.height || 0)) / H);
                k[g ? "translateY" : "y"] = Math.round(m);
                this[this.placed ? "animate" : "attr"](k);
                this.placed = !0;
                this.alignAttr = k;
                return this
            },
            getBBox: function (a, g) {
                var z, r = this.renderer,
                    d, b = this.element,
                    m = this.styles,
                    c, H = this.textStr,
                    h, q = r.cache,
                    A = r.cacheKeys,
                    v = b.namespaceURI === this.SVG_NS,
                    l;
                g = E(g, this.rotation);
                d = g * y;
                c = m && m.fontSize;
                w(H) && (l = H.toString(), -1 === l.indexOf("\x3c") && (l = l.replace(/[0-9]/g, "0")), l += ["", g || 0, c, this.textWidth, m && m.textOverflow].join());
                l && !a && (z = q[l]);
                if (!z) {
                    if (v || r.forExport) {
                        try {
                            (h = this.fakeTS && function (a) {
                                p(b.querySelectorAll(".highcharts-text-outline"), function (g) {
                                    g.style.display = a
                                })
                            }) && h("none"), z = b.getBBox ? k({}, b.getBBox()) : {
                                width: b.offsetWidth,
                                height: b.offsetHeight
                            }, h && h("")
                        } catch (X) {}
                        if (!z || 0 > z.width) z = {
                            width: 0,
                            height: 0
                        }
                    } else z = this.htmlGetBBox();
                    r.isSVG && (a = z.width, r = z.height,
                        v && (z.height = r = {
                            "11px,17": 14,
                            "13px,20": 16
                        } [m && m.fontSize + "," + Math.round(r)] || r), g && (z.width = Math.abs(r * Math.sin(d)) + Math.abs(a * Math.cos(d)), z.height = Math.abs(r * Math.cos(d)) + Math.abs(a * Math.sin(d))));
                    if (l && 0 < z.height) {
                        for (; 250 < A.length;) delete q[A.shift()];
                        q[l] || A.push(l);
                        q[l] = z
                    }
                }
                return z
            },
            show: function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (a) {
                var g = this;
                g.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function () {
                        g.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (a) {
                var g = this.renderer,
                    z = this.element,
                    r;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && g.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) r = this.zIndexSetter();
                r || (a ? a.element : g.box).appendChild(z);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var g = a.parentNode;
                g && g.removeChild(a)
            },
            destroy: function () {
                var a = this,
                    g = a.element || {},
                    r = a.renderer.isSVG && "SPAN" === g.nodeName && a.parentGroup,
                    d = g.ownerSVGElement,
                    b = a.clipPath;
                g.onclick =
                    g.onmouseout = g.onmouseover = g.onmousemove = g.point = null;
                M(a);
                b && d && (p(d.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                    var g = a.getAttribute("clip-path"),
                        z = b.element.id;
                    (-1 < g.indexOf("(#" + z + ")") || -1 < g.indexOf('("#' + z + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = b.destroy());
                if (a.stops) {
                    for (d = 0; d < a.stops.length; d++) a.stops[d] = a.stops[d].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(g);
                for (a.destroyShadows(); r && r.div && 0 === r.div.childNodes.length;) g = r.parentGroup, a.safeRemoveChild(r.div), delete r.div,
                    r = g;
                a.alignTo && q(a.renderer.alignedObjects, a);
                N(a, function (g, z) {
                    delete a[z]
                });
                return null
            },
            shadow: function (a, g, r) {
                var z = [],
                    d, b, m = this.element,
                    k, c, H, h;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    c = E(a.width, 3);
                    H = (a.opacity || .15) / c;
                    h = this.parentInverted ? "(-1,-1)" : "(" + E(a.offsetX, 1) + ", " + E(a.offsetY, 1) + ")";
                    for (d = 1; d <= c; d++) b = m.cloneNode(0), k = 2 * c + 1 - 2 * d, f(b, {
                        stroke: a.color || "#000000",
                        "stroke-opacity": H * d,
                        "stroke-width": k,
                        transform: "translate" + h,
                        fill: "none"
                    }), b.setAttribute("class", (b.getAttribute("class") ||
                        "") + " highcharts-shadow"), r && (f(b, "height", Math.max(f(b, "height") - k, 0)), b.cutHeight = k), g ? g.element.appendChild(b) : m.parentNode && m.parentNode.insertBefore(b, m), z.push(b);
                    this.shadows = z
                }
                return this
            },
            destroyShadows: function () {
                p(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = E(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) :
                    null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, g, r) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[g] !== a && (r.setAttribute(g, a), this[g] = a)
            },
            dashstyleSetter: function (a) {
                var r, z = this["stroke-width"];
                "inherit" === z && (z = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/,
                        "").split(",");
                    for (r = a.length; r--;) a[r] = g(a[r]) * z;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                } [a])
            },
            opacitySetter: function (a, g, r) {
                this[g] = a;
                r.setAttribute(g, a)
            },
            titleSetter: function (a) {
                var g = this.element.getElementsByTagName("title")[0];
                g || (g = h.createElementNS(this.SVG_NS, "title"), this.element.appendChild(g));
                g.firstChild && g.removeChild(g.firstChild);
                g.appendChild(h.createTextNode(String(E(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, g, r) {
                "string" === typeof a ? r.setAttribute(g, a) : a && this.complexColor(a, g, r)
            },
            visibilitySetter: function (a, g, r) {
                "inherit" === a ? r.removeAttribute(g) : this[g] !== a && r.setAttribute(g, a);
                this[g] = a
            },
            zIndexSetter: function (a, r) {
                var z = this.renderer,
                    d = this.parentGroup,
                    b = (d || z).element || z.box,
                    m, k = this.element,
                    c, H, z = b === z.box;
                m = this.added;
                var h;
                w(a) ? (k.setAttribute("data-z-index", a), a = +a, this[r] === a && (m = !1)) : w(this[r]) && k.removeAttribute("data-z-index");
                this[r] = a;
                if (m) {
                    (a = this.zIndex) && d && (d.handleZ = !0);
                    r = b.childNodes;
                    for (h = r.length - 1; 0 <= h && !c; h--)
                        if (d = r[h], m = d.getAttribute("data-z-index"), H = !w(m), d !== k)
                            if (0 > a && H && !z && !h) b.insertBefore(k, r[h]), c = !0;
                            else if (g(m) <= a || H && (!w(a) || 0 <= a)) b.insertBefore(k, r[h + 1] || null), c = !0;
                    c || (b.insertBefore(k, r[z ? 3 : 0] || null), c = !0)
                }
                return c
            },
            _defaultSetter: function (a, g, r) {
                r.setAttribute(g, a)
            }
        });
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter = function (a, g) {
            this[g] = a;
            this.doTransform = !0
        };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, g, r) {
            this[g] = a;
            this.stroke && this["stroke-width"] ?
                (C.prototype.fillSetter.call(this, this.stroke, "stroke", r), r.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === g && 0 === a && this.hasStroke && (r.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        k(F.prototype, {
            Element: C,
            SVG_NS: H,
            init: function (a, g, r, d, b, k) {
                var z;
                d = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(d));
                z = d.element;
                a.appendChild(z);
                f(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") &&
                    f(z, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = z;
                this.boxWrapper = d;
                this.alignedObjects = [];
                this.url = (l || m) && h.getElementsByTagName("base").length ? Q.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(h.createTextNode("Created with Highcharts 6.2.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = k;
                this.forExport = b;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(g,
                    r, !1);
                var c;
                l && a.getBoundingClientRect && (g = function () {
                    x(a, {
                        left: 0,
                        top: 0
                    });
                    c = a.getBoundingClientRect();
                    x(a, {
                        left: Math.ceil(c.left) - c.left + "px",
                        top: Math.ceil(c.top) - c.top + "px"
                    })
                }, g(), this.unSubPixelFix = I(Q, "resize", g))
            },
            getStyle: function (a) {
                return this.style = k({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a =
                    this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                c(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var g = new this.Element;
                g.init(this, a);
                return g
            },
            draw: A,
            getRadialAttr: function (a, g) {
                return {
                    cx: a[0] - a[2] / 2 + g.cx * a[2],
                    cy: a[1] - a[2] / 2 + g.cy * a[2],
                    r: g.r * a[2]
                }
            },
            truncate: function (a, g, r, d, b, m, k) {
                var z = this,
                    c = a.rotation,
                    H, q = d ? 1 : 0,
                    A = (r || d).length,
                    v = A,
                    p = [],
                    l = function (a) {
                        g.firstChild &&
                            g.removeChild(g.firstChild);
                        a && g.appendChild(h.createTextNode(a))
                    },
                    O = function (m, c) {
                        c = c || m;
                        if (void 0 === p[c])
                            if (g.getSubStringLength) try {
                                p[c] = b + g.getSubStringLength(0, d ? c + 1 : c)
                            } catch (Y) {} else z.getSpanWidth && (l(k(r || d, m)), p[c] = b + z.getSpanWidth(a, g));
                        return p[c]
                    },
                    G, M;
                a.rotation = 0;
                G = O(g.textContent.length);
                if (M = b + G > m) {
                    for (; q <= A;) v = Math.ceil((q + A) / 2), d && (H = k(d, v)), G = O(v, H && H.length - 1), q === A ? q = A + 1 : G > m ? A = v - 1 : q = v;
                    0 === A ? l("") : r && A === r.length - 1 || l(H || k(r || d, v))
                }
                d && d.splice(0, v);
                a.actualWidth = G;
                a.rotation = c;
                return M
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function (a) {
                var r = a.element,
                    b = this,
                    m = b.forExport,
                    c = E(a.textStr, "").toString(),
                    z = -1 !== c.indexOf("\x3c"),
                    k = r.childNodes,
                    q, A = f(r, "x"),
                    l = a.styles,
                    G = a.textWidth,
                    M = l && l.lineHeight,
                    e = l && l.textOutline,
                    B = l && "ellipsis" === l.textOverflow,
                    R = l && "nowrap" === l.whiteSpace,
                    y = l && l.fontSize,
                    t, D, J = k.length,
                    l = G && !a.added && this.box,
                    w = function (a) {
                        var d;
                        d = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : y ||
                            b.style.fontSize || 12;
                        return M ? g(M) : b.fontMetrics(d, a.getAttribute("style") ? a : r).h
                    },
                    Q = function (a, g) {
                        N(b.escapes, function (r, d) {
                            g && -1 !== v(r, g) || (a = a.toString().replace(new RegExp(r, "g"), d))
                        });
                        return a
                    },
                    u = function (a, g) {
                        var r;
                        r = a.indexOf("\x3c");
                        a = a.substring(r, a.indexOf("\x3e") - r);
                        r = a.indexOf(g + "\x3d");
                        if (-1 !== r && (r = r + g.length + 1, g = a.charAt(r), '"' === g || "'" === g)) return a = a.substring(r + 1), a.substring(0, a.indexOf(g))
                    };
                t = [c, B, R, M, e, y, G].join();
                if (t !== a.textCache) {
                    for (a.textCache = t; J--;) r.removeChild(k[J]);
                    z || e || B || G || -1 !== c.indexOf(" ") ? (l && l.appendChild(r), c = z ? c.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [c], c = d(c, function (a) {
                        return "" !== a
                    }), p(c, function (g, d) {
                        var c, z = 0,
                            k = 0;
                        g = g.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        c = g.split("|||");
                        p(c, function (g) {
                            if ("" !== g || 1 ===
                                c.length) {
                                var v = {},
                                    l = h.createElementNS(b.SVG_NS, "tspan"),
                                    p, M;
                                (p = u(g, "class")) && f(l, "class", p);
                                if (p = u(g, "style")) p = p.replace(/(;| |^)color([ :])/, "$1fill$2"), f(l, "style", p);
                                (M = u(g, "href")) && !m && (f(l, "onclick", 'location.href\x3d"' + M + '"'), f(l, "class", "highcharts-anchor"), x(l, {
                                    cursor: "pointer"
                                }));
                                g = Q(g.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== g) {
                                    l.appendChild(h.createTextNode(g));
                                    z ? v.dx = 0 : d && null !== A && (v.x = A);
                                    f(l, v);
                                    r.appendChild(l);
                                    !z && D && (!O && m && x(l, {
                                        display: "block"
                                    }), f(l, "dy", w(l)));
                                    if (G) {
                                        var e =
                                            g.replace(/([^\^])-/g, "$1- ").split(" "),
                                            v = !R && (1 < c.length || d || 1 < e.length);
                                        M = 0;
                                        var t = w(l);
                                        if (B) q = b.truncate(a, l, g, void 0, 0, Math.max(0, G - parseInt(y || 12, 10)), function (a, g) {
                                            return a.substring(0, g) + "\u2026"
                                        });
                                        else if (v)
                                            for (; e.length;) e.length && !R && 0 < M && (l = h.createElementNS(H, "tspan"), f(l, {
                                                    dy: t,
                                                    x: A
                                                }), p && f(l, "style", p), l.appendChild(h.createTextNode(e.join(" ").replace(/- /g, "-"))), r.appendChild(l)), b.truncate(a, l, null, e, 0 === M ? k : 0, G, function (a, g) {
                                                    return e.slice(0, g).join(" ").replace(/- /g, "-")
                                                }), k = a.actualWidth,
                                                M++
                                    }
                                    z++
                                }
                            }
                        });
                        D = D || r.childNodes.length
                    }), B && q && a.attr("title", Q(a.textStr, ["\x26lt;", "\x26gt;"])), l && l.removeChild(r), e && a.applyTextOutline && a.applyTextOutline(e)) : r.appendChild(h.createTextNode(Q(c)))
                }
            },
            getContrast: function (a) {
                a = u(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, g, r, d, b, c, m, H, h) {
                var z = this.label(a, g, r, h, null, null, null, null, "button"),
                    q = 0;
                z.attr(G({
                    padding: 8,
                    r: 2
                }, b));
                var A, v, l, p;
                b = G({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, b);
                A = b.style;
                delete b.style;
                c = G(b, {
                    fill: "#e6e6e6"
                }, c);
                v = c.style;
                delete c.style;
                m = G(b, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, m);
                l = m.style;
                delete m.style;
                H = G(b, {
                    style: {
                        color: "#cccccc"
                    }
                }, H);
                p = H.style;
                delete H.style;
                I(z.element, L ? "mouseover" : "mouseenter", function () {
                    3 !== q && z.setState(1)
                });
                I(z.element, L ? "mouseout" : "mouseleave", function () {
                    3 !== q && z.setState(q)
                });
                z.setState = function (a) {
                    1 !== a && (z.state = q = a);
                    z.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    z.attr([b, c, m, H][a || 0]).css([A, v, l, p][a || 0])
                };
                z.attr(b).css(k({
                    cursor: "default"
                }, A));
                return z.on("click", function (a) {
                    3 !== q && d.call(z, a)
                })
            },
            crispLine: function (a, g) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - g % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + g % 2 / 2);
                return a
            },
            path: function (a) {
                var g = {
                    fill: "none"
                };
                J(a) ? g.d = a : B(a) && k(g, a);
                return this.createElement("path").attr(g)
            },
            circle: function (a, g, r) {
                a = B(a) ? a : {
                    x: a,
                    y: g,
                    r: r
                };
                g = this.createElement("circle");
                g.xSetter =
                    g.ySetter = function (a, g, r) {
                        r.setAttribute("c" + g, a)
                    };
                return g.attr(a)
            },
            arc: function (a, g, r, d, b, c) {
                B(a) ? (d = a, g = d.y, r = d.r, a = d.x) : d = {
                    innerR: d,
                    start: b,
                    end: c
                };
                a = this.symbol("arc", a, g, r, r, d);
                a.r = r;
                return a
            },
            rect: function (a, g, r, d, b, c) {
                b = B(a) ? a.r : b;
                var m = this.createElement("rect");
                a = B(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: g,
                    width: Math.max(r, 0),
                    height: Math.max(d, 0)
                };
                void 0 !== c && (a.strokeWidth = c, a = m.crisp(a));
                a.fill = "none";
                b && (a.r = b);
                m.rSetter = function (a, g, r) {
                    f(r, {
                        rx: a,
                        ry: a
                    })
                };
                return m.attr(a)
            },
            setSize: function (a, g, r) {
                var d =
                    this.alignedObjects,
                    b = d.length;
                this.width = a;
                this.height = g;
                for (this.boxWrapper.animate({
                        width: a,
                        height: g
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: E(r, !0) ? void 0 : 0
                    }); b--;) d[b].align()
            },
            g: function (a) {
                var g = this.createElement("g");
                return a ? g.attr({
                    "class": "highcharts-" + a
                }) : g
            },
            image: function (a, g, r, d, b, c) {
                var m = {
                        preserveAspectRatio: "none"
                    },
                    H, h = function (a, g) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", g) : a.setAttribute("hc-svg-href",
                            g)
                    },
                    q = function (g) {
                        h(H.element, a);
                        c.call(H, g)
                    };
                1 < arguments.length && k(m, {
                    x: g,
                    y: r,
                    width: d,
                    height: b
                });
                H = this.createElement("image").attr(m);
                c ? (h(H.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), m = new Q.Image, I(m, "load", q), m.src = a, m.complete && q({})) : h(H.element, a);
                return H
            },
            symbol: function (a, g, r, d, b, c) {
                var m = this,
                    H, q = /^url\((.*?)\)$/,
                    A = q.test(a),
                    v = !A && (this.symbols[a] ? a : "circle"),
                    z = v && this.symbols[v],
                    l = w(g) && z && z.call(this.symbols, Math.round(g), Math.round(r),
                        d, b, c),
                    G, M;
                z ? (H = this.path(l), H.attr("fill", "none"), k(H, {
                    symbolName: v,
                    x: g,
                    y: r,
                    width: d,
                    height: b
                }), c && k(H, c)) : A && (G = a.match(q)[1], H = this.image(G), H.imgwidth = E(R[G] && R[G].width, c && c.width), H.imgheight = E(R[G] && R[G].height, c && c.height), M = function () {
                    H.attr({
                        width: H.width,
                        height: H.height
                    })
                }, p(["width", "height"], function (a) {
                    H[a + "Setter"] = function (a, g) {
                        var r = {},
                            d = this["img" + g],
                            b = "width" === g ? "translateX" : "translateY";
                        this[g] = a;
                        w(d) && (this.element && this.element.setAttribute(g, d), this.alignByTranslate || (r[b] =
                            ((this[g] || 0) - d) / 2, this.attr(r)))
                    }
                }), w(g) && H.attr({
                    x: g,
                    y: r
                }), H.isImg = !0, w(H.imgwidth) && w(H.imgheight) ? M() : (H.attr({
                    width: 0,
                    height: 0
                }), t("img", {
                    onload: function () {
                        var a = e[m.chartIndex];
                        0 === this.width && (x(this, {
                            position: "absolute",
                            top: "-999em"
                        }), h.body.appendChild(this));
                        R[G] = {
                            width: this.width,
                            height: this.height
                        };
                        H.imgwidth = this.width;
                        H.imgheight = this.height;
                        H.element && M();
                        this.parentNode && this.parentNode.removeChild(this);
                        m.imgCount--;
                        if (!m.imgCount && a && a.onload) a.onload()
                    },
                    src: G
                }), this.imgCount++));
                return H
            },
            symbols: {
                circle: function (a, g, r, d) {
                    return this.arc(a + r / 2, g + d / 2, r / 2, d / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function (a, g, r, d) {
                    return ["M", a, g, "L", a + r, g, a + r, g + d, a, g + d, "Z"]
                },
                triangle: function (a, g, r, d) {
                    return ["M", a + r / 2, g, "L", a + r, g + d, a, g + d, "Z"]
                },
                "triangle-down": function (a, g, r, d) {
                    return ["M", a, g, "L", a + r, g, a + r / 2, g + d, "Z"]
                },
                diamond: function (a, g, r, d) {
                    return ["M", a + r / 2, g, "L", a + r, g + d / 2, a + r / 2, g + d, a, g + d / 2, "Z"]
                },
                arc: function (a, g, r, d, b) {
                    var c = b.start,
                        m = b.r || r,
                        H = b.r || d || r,
                        k = b.end - .001;
                    r = b.innerR;
                    d = E(b.open,
                        .001 > Math.abs(b.end - b.start - 2 * Math.PI));
                    var h = Math.cos(c),
                        q = Math.sin(c),
                        A = Math.cos(k),
                        k = Math.sin(k);
                    b = .001 > b.end - c - Math.PI ? 0 : 1;
                    m = ["M", a + m * h, g + H * q, "A", m, H, 0, b, 1, a + m * A, g + H * k];
                    w(r) && m.push(d ? "M" : "L", a + r * A, g + r * k, "A", r, r, 0, b, 0, a + r * h, g + r * q);
                    m.push(d ? "" : "Z");
                    return m
                },
                callout: function (a, g, r, d, b) {
                    var c = Math.min(b && b.r || 0, r, d),
                        m = c + 6,
                        H = b && b.anchorX;
                    b = b && b.anchorY;
                    var k;
                    k = ["M", a + c, g, "L", a + r - c, g, "C", a + r, g, a + r, g, a + r, g + c, "L", a + r, g + d - c, "C", a + r, g + d, a + r, g + d, a + r - c, g + d, "L", a + c, g + d, "C", a, g + d, a, g + d, a, g + d - c, "L", a, g + c,
                        "C", a, g, a, g, a + c, g
                    ];
                    H && H > r ? b > g + m && b < g + d - m ? k.splice(13, 3, "L", a + r, b - 6, a + r + 6, b, a + r, b + 6, a + r, g + d - c) : k.splice(13, 3, "L", a + r, d / 2, H, b, a + r, d / 2, a + r, g + d - c) : H && 0 > H ? b > g + m && b < g + d - m ? k.splice(33, 3, "L", a, b + 6, a - 6, b, a, b - 6, a, g + c) : k.splice(33, 3, "L", a, d / 2, H, b, a, d / 2, a, g + c) : b && b > d && H > a + m && H < a + r - m ? k.splice(23, 3, "L", H + 6, g + d, H, g + d + 6, H - 6, g + d, a + c, g + d) : b && 0 > b && H > a + m && H < a + r - m && k.splice(3, 3, "L", H - 6, g, H, g - 6, H + 6, g, r - c, g);
                    return k
                }
            },
            clipRect: function (g, r, d, b) {
                var c = a.uniqueKey(),
                    m = this.createElement("clipPath").attr({
                        id: c
                    }).add(this.defs);
                g = this.rect(g, r, d, b, 0).add(m);
                g.id = c;
                g.clipPath = m;
                g.count = 0;
                return g
            },
            text: function (a, g, r, d) {
                var b = {};
                if (d && (this.allowHTML || !this.forExport)) return this.html(a, g, r);
                b.x = Math.round(g || 0);
                r && (b.y = Math.round(r));
                w(a) && (b.text = a);
                a = this.createElement("text").attr(b);
                d || (a.xSetter = function (a, g, r) {
                    var d = r.getElementsByTagName("tspan"),
                        b, c = r.getAttribute(g),
                        m;
                    for (m = 0; m < d.length; m++) b = d[m], b.getAttribute(g) === c && b.setAttribute(g, a);
                    r.setAttribute(g, a)
                });
                return a
            },
            fontMetrics: function (a, r) {
                a = a || r && r.style &&
                    r.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? g(a) : /em/.test(a) ? parseFloat(a) * (r ? this.fontMetrics(null, r.parentNode).f : 16) : 12;
                r = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: r,
                    b: Math.round(.8 * r),
                    f: a
                }
            },
            rotCorr: function (a, g, r) {
                var d = a;
                g && r && (d = Math.max(d * Math.cos(g * y), 4));
                return {
                    x: -a / 3 * Math.sin(g * y),
                    y: d
                }
            },
            label: function (g, d, b, c, m, H, h, q, A) {
                var v = this,
                    l = v.g("button" !== A && "label"),
                    M = l.text = v.text("", 0, 0, h).attr({
                        zIndex: 1
                    }),
                    O, z, e = 0,
                    B = 3,
                    R = 0,
                    f, y, t, D, J, E = {},
                    N, x, Q = /^url\((.*?)\)$/.test(c),
                    u = Q,
                    L, n,
                    P, T;
                A && l.addClass("highcharts-" + A);
                u = Q;
                L = function () {
                    return (N || 0) % 2 / 2
                };
                n = function () {
                    var a = M.element.style,
                        g = {};
                    z = (void 0 === f || void 0 === y || J) && w(M.textStr) && M.getBBox();
                    l.width = (f || z.width || 0) + 2 * B + R;
                    l.height = (y || z.height || 0) + 2 * B;
                    x = B + v.fontMetrics(a && a.fontSize, M).b;
                    u && (O || (l.box = O = v.symbols[c] || Q ? v.symbol(c) : v.rect(), O.addClass(("button" === A ? "" : "highcharts-label-box") + (A ? " highcharts-" + A + "-box" : "")), O.add(l), a = L(), g.x = a, g.y = (q ? -x : 0) + a), g.width = Math.round(l.width), g.height = Math.round(l.height), O.attr(k(g,
                        E)), E = {})
                };
                P = function () {
                    var a = R + B,
                        g;
                    g = q ? 0 : x;
                    w(f) && z && ("center" === J || "right" === J) && (a += {
                        center: .5,
                        right: 1
                    } [J] * (f - z.width));
                    if (a !== M.x || g !== M.y) M.attr("x", a), M.hasBoxWidthChanged && (z = M.getBBox(!0), n()), void 0 !== g && M.attr("y", g);
                    M.x = a;
                    M.y = g
                };
                T = function (a, g) {
                    O ? O.attr(a, g) : E[a] = g
                };
                l.onAdd = function () {
                    M.add(l);
                    l.attr({
                        text: g || 0 === g ? g : "",
                        x: d,
                        y: b
                    });
                    O && w(m) && l.attr({
                        anchorX: m,
                        anchorY: H
                    })
                };
                l.widthSetter = function (g) {
                    f = a.isNumber(g) ? g : null
                };
                l.heightSetter = function (a) {
                    y = a
                };
                l["text-alignSetter"] = function (a) {
                    J = a
                };
                l.paddingSetter = function (a) {
                    w(a) && a !== B && (B = l.padding = a, P())
                };
                l.paddingLeftSetter = function (a) {
                    w(a) && a !== R && (R = a, P())
                };
                l.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [a];
                    a !== e && (e = a, z && l.attr({
                        x: t
                    }))
                };
                l.textSetter = function (a) {
                    void 0 !== a && M.textSetter(a);
                    n();
                    P()
                };
                l["stroke-widthSetter"] = function (a, g) {
                    a && (u = !0);
                    N = this["stroke-width"] = a;
                    T(g, a)
                };
                l.strokeSetter = l.fillSetter = l.rSetter = function (a, g) {
                    "r" !== g && ("fill" === g && a && (u = !0), l[g] = a);
                    T(g, a)
                };
                l.anchorXSetter = function (a, g) {
                    m = l.anchorX = a;
                    T(g, Math.round(a) -
                        L() - t)
                };
                l.anchorYSetter = function (a, g) {
                    H = l.anchorY = a;
                    T(g, a - D)
                };
                l.xSetter = function (a) {
                    l.x = a;
                    e && (a -= e * ((f || z.width) + 2 * B), l["forceAnimate:x"] = !0);
                    t = Math.round(a);
                    l.attr("translateX", t)
                };
                l.ySetter = function (a) {
                    D = l.y = Math.round(a);
                    l.attr("translateY", D)
                };
                var V = l.css;
                return k(l, {
                    css: function (a) {
                        if (a) {
                            var g = {};
                            a = G(a);
                            p(l.textProps, function (r) {
                                void 0 !== a[r] && (g[r] = a[r], delete a[r])
                            });
                            M.css(g);
                            "width" in g && n()
                        }
                        return V.call(l, a)
                    },
                    getBBox: function () {
                        return {
                            width: z.width + 2 * B,
                            height: z.height + 2 * B,
                            x: z.x - B,
                            y: z.y -
                                B
                        }
                    },
                    shadow: function (a) {
                        a && (n(), O && O.shadow(a));
                        return l
                    },
                    destroy: function () {
                        r(l.element, "mouseenter");
                        r(l.element, "mouseleave");
                        M && (M = M.destroy());
                        O && (O = O.destroy());
                        C.prototype.destroy.call(l);
                        l = v = n = P = T = null
                    }
                })
            }
        });
        a.Renderer = F
    })(K);
    (function (a) {
        var C = a.attr,
            F = a.createElement,
            I = a.css,
            n = a.defined,
            f = a.each,
            e = a.extend,
            u = a.isFirefox,
            x = a.isMS,
            t = a.isWebKit,
            w = a.pick,
            y = a.pInt,
            c = a.SVGRenderer,
            h = a.win,
            p = a.wrap;
        e(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var c = "SPAN" === this.element.tagName && a && "width" in a,
                    d = w(c && a.width, void 0);
                c && (delete a.width, this.textWidth = d, this.htmlUpdateTransform());
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = e(this.styles, a);
                I(this.element, a);
                return this
            },
            htmlGetBBox: function () {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        c = this.element,
                        d = this.translateX || 0,
                        b = this.translateY || 0,
                        h = this.x || 0,
                        p = this.y || 0,
                        l = this.textAlign ||
                        "left",
                        e = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [l],
                        B = this.styles,
                        t = B && B.whiteSpace;
                    I(c, {
                        marginLeft: d,
                        marginTop: b
                    });
                    this.shadows && f(this.shadows, function (a) {
                        I(a, {
                            marginLeft: d + 1,
                            marginTop: b + 1
                        })
                    });
                    this.inverted && f(c.childNodes, function (d) {
                        a.invertChild(d, c)
                    });
                    if ("SPAN" === c.tagName) {
                        var B = this.rotation,
                            m = this.textWidth && y(this.textWidth),
                            G = [B, l, c.innerHTML, this.textWidth, this.textAlign].join(),
                            A;
                        (A = m !== this.oldTextWidth) && !(A = m > this.oldTextWidth) && ((A = this.textPxLength) || (I(c, {
                                width: "",
                                whiteSpace: t || "nowrap"
                            }), A =
                            c.offsetWidth), A = A > m);
                        A && /[ \-]/.test(c.textContent || c.innerText) ? (I(c, {
                            width: m + "px",
                            display: "block",
                            whiteSpace: t || "normal"
                        }), this.oldTextWidth = m, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        G !== this.cTT && (t = a.fontMetrics(c.style.fontSize).b, !n(B) || B === (this.oldRotation || 0) && l === this.oldAlign || this.setSpanRotation(B, e, t), this.getSpanCorrection(!n(B) && this.textPxLength || c.offsetWidth, t, e, B, l));
                        I(c, {
                            left: h + (this.xCorr || 0) + "px",
                            top: p + (this.yCorr || 0) + "px"
                        });
                        this.cTT = G;
                        this.oldRotation = B;
                        this.oldAlign =
                            l
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (a, c, d) {
                var b = {},
                    k = this.renderer.getTransformKey();
                b[k] = b.transform = "rotate(" + a + "deg)";
                b[k + (u ? "Origin" : "-origin")] = b.transformOrigin = 100 * c + "% " + d + "px";
                I(this.element, b)
            },
            getSpanCorrection: function (a, c, d) {
                this.xCorr = -a * d;
                this.yCorr = -c
            }
        });
        e(c.prototype, {
            getTransformKey: function () {
                return x && !/Edge/.test(h.navigator.userAgent) ? "-ms-transform" : t ? "-webkit-transform" : u ? "MozTransform" : h.opera ? "-o-transform" : ""
            },
            html: function (a, c, d) {
                var b = this.createElement("span"),
                    k = b.element,
                    h = b.renderer,
                    l = h.isSVG,
                    q = function (a, d) {
                        f(["opacity", "visibility"], function (b) {
                            p(a, b + "Setter", function (a, b, c, m) {
                                a.call(this, b, c, m);
                                d[c] = b
                            })
                        });
                        a.addedSetters = !0
                    };
                b.textSetter = function (a) {
                    a !== k.innerHTML && delete this.bBox;
                    this.textStr = a;
                    k.innerHTML = w(a, "");
                    b.doTransform = !0
                };
                l && q(b, b.element.style);
                b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function (a, d) {
                    "align" === d && (d = "textAlign");
                    b[d] = a;
                    b.doTransform = !0
                };
                b.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                b.attr({
                    text: a,
                    x: Math.round(c),
                    y: Math.round(d)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                k.style.whiteSpace = "nowrap";
                b.css = b.htmlCss;
                l && (b.add = function (a) {
                    var d, c = h.box.parentNode,
                        l = [];
                    if (this.parentGroup = a) {
                        if (d = a.div, !d) {
                            for (; a;) l.push(a), a = a.parentGroup;
                            f(l.reverse(), function (a) {
                                function m(g, d) {
                                    a[d] = g;
                                    "translateX" === d ? k.left = g + "px" : k.top = g + "px";
                                    a.doTransform = !0
                                }
                                var k, g = C(a.element, "class");
                                g && (g = {
                                    className: g
                                });
                                d = a.div = a.div || F("div", g, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, d || c);
                                k = d.style;
                                e(a, {
                                    classSetter: function (a) {
                                        return function (g) {
                                            this.element.setAttribute("class", g);
                                            a.className = g
                                        }
                                    }(d),
                                    on: function () {
                                        l[0].div && b.on.apply({
                                            element: l[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: m,
                                    translateYSetter: m
                                });
                                a.addedSetters || q(a, k)
                            })
                        }
                    } else d = c;
                    d.appendChild(k);
                    b.added = !0;
                    b.alignOnAdd && b.htmlUpdateTransform();
                    return b
                });
                return b
            }
        })
    })(K);
    (function (a) {
        var C = a.defined,
            F = a.each,
            I = a.extend,
            n = a.merge,
            f = a.pick,
            e = a.timeUnits,
            u = a.win;
        a.Time = function (a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function (a) {
                var e = f(a && a.useUTC, !0),
                    w = this;
                this.options = a = n(!0, this.options || {}, a);
                this.Date = a.Date || u.Date;
                this.timezoneOffset = (this.useUTC = e) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(e && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function (a, c) {
                    var h =
                        c.getTime(),
                        p = h - w.getTimezoneOffset(c);
                    c.setTime(p);
                    a = c["getUTC" + a]();
                    c.setTime(h);
                    return a
                }, this.set = function (a, c, h) {
                    var p;
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === c.getTimezoneOffset() % 60) c["set" + a](h);
                    else p = w.getTimezoneOffset(c), p = c.getTime() - p, c.setTime(p), c["setUTC" + a](h), a = w.getTimezoneOffset(c), p = c.getTime() + a, c.setTime(p)
                }) : e ? (this.get = function (a, c) {
                    return c["getUTC" + a]()
                }, this.set = function (a, c, h) {
                    return c["setUTC" + a](h)
                }) : (this.get = function (a, c) {
                        return c["get" + a]()
                    }, this.set =
                    function (a, c, h) {
                        return c["set" + a](h)
                    })
            },
            makeTime: function (e, t, w, y, c, h) {
                var p, k, q;
                this.useUTC ? (p = this.Date.UTC.apply(0, arguments), k = this.getTimezoneOffset(p), p += k, q = this.getTimezoneOffset(p), k !== q ? p += q - k : k - 36E5 !== this.getTimezoneOffset(p - 36E5) || a.isSafari || (p -= 36E5)) : p = (new this.Date(e, t, f(w, 1), f(y, 0), f(c, 0), f(h, 0))).getTime();
                return p
            },
            timezoneOffsetFunction: function () {
                var e = this,
                    f = this.options,
                    w = u.moment;
                if (!this.useUTC) return function (a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (f.timezone) {
                    if (w) return function (a) {
                        return 6E4 *
                            -w.tz(a, f.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && f.getTimezoneOffset ? function (a) {
                    return 6E4 * f.getTimezoneOffset(a)
                } : function () {
                    return 6E4 * (e.timezoneOffset || 0)
                }
            },
            dateFormat: function (e, f, w) {
                if (!a.defined(f) || isNaN(f)) return a.defaultOptions.lang.invalidDate || "";
                e = a.pick(e, "%Y-%m-%d %H:%M:%S");
                var t = this,
                    c = new this.Date(f),
                    h = this.get("Hours", c),
                    p = this.get("Day", c),
                    k = this.get("Date", c),
                    q = this.get("Month", c),
                    d = this.get("FullYear", c),
                    b = a.defaultOptions.lang,
                    v = b.weekdays,
                    J = b.shortWeekdays,
                    l = a.pad,
                    c = a.extend({
                        a: J ? J[p] : v[p].substr(0, 3),
                        A: v[p],
                        d: l(k),
                        e: l(k, 2, " "),
                        w: p,
                        b: b.shortMonths[q],
                        B: b.months[q],
                        m: l(q + 1),
                        o: q + 1,
                        y: d.toString().substr(2, 2),
                        Y: d,
                        H: l(h),
                        k: h,
                        I: l(h % 12 || 12),
                        l: h % 12 || 12,
                        M: l(t.get("Minutes", c)),
                        p: 12 > h ? "AM" : "PM",
                        P: 12 > h ? "am" : "pm",
                        S: l(c.getSeconds()),
                        L: l(Math.floor(f % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(c, function (a, d) {
                    for (; - 1 !== e.indexOf("%" + d);) e = e.replace("%" + d, "function" === typeof a ? a.call(t, f) : a)
                });
                return w ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            },
            resolveDTLFormat: function (e) {
                return a.isObject(e,
                    !0) ? e : (e = a.splat(e), {
                    main: e[0],
                    from: e[1],
                    to: e[2]
                })
            },
            getTimeTicks: function (a, t, w, y) {
                var c = this,
                    h = [],
                    p, k = {},
                    q;
                p = new c.Date(t);
                var d = a.unitRange,
                    b = a.count || 1,
                    v;
                y = f(y, 1);
                if (C(t)) {
                    c.set("Milliseconds", p, d >= e.second ? 0 : b * Math.floor(c.get("Milliseconds", p) / b));
                    d >= e.second && c.set("Seconds", p, d >= e.minute ? 0 : b * Math.floor(c.get("Seconds", p) / b));
                    d >= e.minute && c.set("Minutes", p, d >= e.hour ? 0 : b * Math.floor(c.get("Minutes", p) / b));
                    d >= e.hour && c.set("Hours", p, d >= e.day ? 0 : b * Math.floor(c.get("Hours", p) / b));
                    d >= e.day && c.set("Date",
                        p, d >= e.month ? 1 : b * Math.floor(c.get("Date", p) / b));
                    d >= e.month && (c.set("Month", p, d >= e.year ? 0 : b * Math.floor(c.get("Month", p) / b)), q = c.get("FullYear", p));
                    d >= e.year && c.set("FullYear", p, q - q % b);
                    d === e.week && (q = c.get("Day", p), c.set("Date", p, c.get("Date", p) - q + y + (q < y ? -7 : 0)));
                    q = c.get("FullYear", p);
                    y = c.get("Month", p);
                    var J = c.get("Date", p),
                        l = c.get("Hours", p);
                    t = p.getTime();
                    c.variableTimezone && (v = w - t > 4 * e.month || c.getTimezoneOffset(t) !== c.getTimezoneOffset(w));
                    t = p.getTime();
                    for (p = 1; t < w;) h.push(t), t = d === e.year ? c.makeTime(q +
                        p * b, 0) : d === e.month ? c.makeTime(q, y + p * b) : !v || d !== e.day && d !== e.week ? v && d === e.hour && 1 < b ? c.makeTime(q, y, J, l + p * b) : t + d * b : c.makeTime(q, y, J + p * b * (d === e.day ? 1 : 7)), p++;
                    h.push(t);
                    d <= e.hour && 1E4 > h.length && F(h, function (a) {
                        0 === a % 18E5 && "000000000" === c.dateFormat("%H%M%S%L", a) && (k[a] = "day")
                    })
                }
                h.info = I(a, {
                    higherRanks: k,
                    totalRange: d * b
                });
                return h
            }
        }
    })(K);
    (function (a) {
        var C = a.color,
            F = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle",
                "diamond", "square", "triangle", "triangle-down"
            ],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: C("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                
            }
        };
        a.setOptions = function (C) {
            a.defaultOptions = F(!0, a.defaultOptions, C);
            a.time.update(F(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(F(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function (C, n, f) {
            return a.time.dateFormat(C, n, f)
        }
    })(K);
    (function (a) {
        var C = a.correctFloat,
            F = a.defined,
            I = a.destroyObjectProperties,
            n = a.fireEvent,
            f = a.isNumber,
            e = a.merge,
            u = a.pick,
            x = a.deg2rad;
        a.Tick = function (a, e, f, c, h) {
            this.axis = a;
            this.pos =
                e;
            this.type = f || "";
            this.isNewLabel = this.isNew = !0;
            this.parameters = h || {};
            this.tickmarkOffset = this.parameters.tickmarkOffset;
            this.options = this.parameters.options;
            f || c || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var f = this,
                    w = f.axis,
                    y = w.options,
                    c = w.chart,
                    h = w.categories,
                    p = w.names,
                    k = f.pos,
                    q = u(f.options && f.options.labels, y.labels),
                    d = w.tickPositions,
                    b = k === d[0],
                    v = k === d[d.length - 1],
                    h = this.parameters.category || (h ? u(h[k], p[k], k) : k),
                    J = f.label,
                    d = d.info,
                    l, n, B, D;
                w.isDatetimeAxis && d && (n = c.time.resolveDTLFormat(y.dateTimeLabelFormats[!y.grid &&
                    d.higherRanks[k] || d.unitName]), l = n.main);
                f.isFirst = b;
                f.isLast = v;
                f.formatCtx = {
                    axis: w,
                    chart: c,
                    isFirst: b,
                    isLast: v,
                    dateTimeLabelFormat: l,
                    tickPositionInfo: d,
                    value: w.isLog ? C(w.lin2log(h)) : h,
                    pos: k
                };
                y = w.labelFormatter.call(f.formatCtx, this.formatCtx);
                if (D = n && n.list) f.shortenLabel = function () {
                    for (B = 0; B < D.length; B++)
                        if (J.attr({
                                text: w.labelFormatter.call(a.extend(f.formatCtx, {
                                    dateTimeLabelFormat: D[B]
                                }))
                            }), J.getBBox().width < w.getSlotWidth(f) - 2 * u(q.padding, 5)) return;
                    J.attr({
                        text: ""
                    })
                };
                if (F(J)) J && J.textStr !== y &&
                    (!J.textWidth || q.style && q.style.width || J.styles.width || J.css({
                        width: null
                    }), J.attr({
                        text: y
                    }));
                else {
                    if (f.label = J = F(y) && q.enabled ? c.renderer.text(y, 0, 0, q.useHTML).css(e(q.style)).add(w.labelGroup) : null) J.textPxLength = J.getBBox().width;
                    f.rotation = 0
                }
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function (a) {
                var e = this.axis,
                    f = e.options.labels,
                    c = a.x,
                    h = e.chart.chartWidth,
                    p = e.chart.spacing,
                    k = u(e.labelLeft, Math.min(e.pos, p[3])),
                    p = u(e.labelRight,
                        Math.max(e.isRadial ? 0 : e.pos + e.len, h - p[1])),
                    q = this.label,
                    d = this.rotation,
                    b = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [e.labelAlign || q.attr("align")],
                    v = q.getBBox().width,
                    J = e.getSlotWidth(this),
                    l = J,
                    t = 1,
                    B, D = {};
                if (d || "justify" !== u(f.overflow, "justify")) 0 > d && c - b * v < k ? B = Math.round(c / Math.cos(d * x) - k) : 0 < d && c + b * v > p && (B = Math.round((h - c) / Math.cos(d * x)));
                else if (h = c + (1 - b) * v, c - b * v < k ? l = a.x + l * (1 - b) - k : h > p && (l = p - a.x + l * b, t = -1), l = Math.min(J, l), l < J && "center" === e.labelAlign && (a.x += t * (J - l - b * (J - Math.min(v, l)))), v > l || e.autoRotation && (q.styles || {}).width) B = l;
                B && (this.shortenLabel ? this.shortenLabel() : (D.width = B, (f.style || {}).textOverflow || (D.textOverflow = "ellipsis"), q.css(D)))
            },
            getPosition: function (e, f, y, c) {
                var h = this.axis,
                    p = h.chart,
                    k = c && p.oldChartHeight || p.chartHeight;
                e = {
                    x: e ? a.correctFloat(h.translate(f + y, null, null, c) + h.transB) : h.left + h.offset + (h.opposite ? (c && p.oldChartWidth || p.chartWidth) - h.right - h.left : 0),
                    y: e ? k - h.bottom + h.offset - (h.opposite ? h.height : 0) : a.correctFloat(k - h.translate(f + y, null, null, c) - h.transB)
                };
                n(this, "afterGetPosition", {
                    pos: e
                });
                return e
            },
            getLabelPosition: function (a, e, f, c, h, p, k, q) {
                var d = this.axis,
                    b = d.transA,
                    v = d.reversed,
                    J = d.staggerLines,
                    l = d.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    t = h.y,
                    B = c || d.reserveSpaceDefault ? 0 : -d.labelOffset * ("center" === d.labelAlign ? .5 : 1),
                    D = {};
                F(t) || (t = 0 === d.side ? f.rotation ? -8 : -f.getBBox().height : 2 === d.side ? l.y + 8 : Math.cos(f.rotation * x) * (l.y - f.getBBox(!1, 0).height / 2));
                a = a + h.x + B + l.x - (p && c ? p * b * (v ? -1 : 1) : 0);
                e = e + t - (p && !c ? p * b * (v ? 1 : -1) : 0);
                J && (f = k / (q || 1) % J, d.opposite && (f = J - f - 1), e += d.labelOffset / J * f);
                D.x = a;
                D.y = Math.round(e);
                n(this, "afterGetLabelPosition", {
                    pos: D
                });
                return D
            },
            getMarkPath: function (a, e, f, c, h, p) {
                return p.crispLine(["M", a, e, "L", a + (h ? 0 : -f), e + (h ? f : 0)], c)
            },
            renderGridLine: function (a, e, f) {
                var c = this.axis,
                    h = c.options,
                    p = this.gridLine,
                    k = {},
                    q = this.pos,
                    d = this.type,
                    b = u(this.tickmarkOffset, c.tickmarkOffset),
                    v = c.chart.renderer,
                    J = d ? d + "Grid" : "grid",
                    l = h[J + "LineWidth"],
                    t = h[J + "LineColor"],
                    h = h[J + "LineDashStyle"];
                p || (k.stroke = t, k["stroke-width"] = l, h && (k.dashstyle = h), d || (k.zIndex = 1), a && (e = 0), this.gridLine = p = v.path().attr(k).addClass("highcharts-" +
                    (d ? d + "-" : "") + "grid-line").add(c.gridGroup));
                if (p && (f = c.getPlotLinePath(q + b, p.strokeWidth() * f, a, "pass"))) p[a || this.isNew ? "attr" : "animate"]({
                    d: f,
                    opacity: e
                })
            },
            renderMark: function (a, e, f) {
                var c = this.axis,
                    h = c.options,
                    p = c.chart.renderer,
                    k = this.type,
                    q = k ? k + "Tick" : "tick",
                    d = c.tickSize(q),
                    b = this.mark,
                    v = !b,
                    J = a.x;
                a = a.y;
                var l = u(h[q + "Width"], !k && c.isXAxis ? 1 : 0),
                    h = h[q + "Color"];
                d && (c.opposite && (d[0] = -d[0]), v && (this.mark = b = p.path().addClass("highcharts-" + (k ? k + "-" : "") + "tick").add(c.axisGroup), b.attr({
                        stroke: h,
                        "stroke-width": l
                    })),
                    b[v ? "attr" : "animate"]({
                        d: this.getMarkPath(J, a, d[0], b.strokeWidth() * f, c.horiz, p),
                        opacity: e
                    }))
            },
            renderLabel: function (a, e, y, c) {
                var h = this.axis,
                    p = h.horiz,
                    k = h.options,
                    q = this.label,
                    d = k.labels,
                    b = d.step,
                    h = u(this.tickmarkOffset, h.tickmarkOffset),
                    v = !0,
                    J = a.x;
                a = a.y;
                q && f(J) && (q.xy = a = this.getLabelPosition(J, a, q, p, d, h, c, b), this.isFirst && !this.isLast && !u(k.showFirstLabel, 1) || this.isLast && !this.isFirst && !u(k.showLastLabel, 1) ? v = !1 : !p || d.step || d.rotation || e || 0 === y || this.handleOverflow(a), b && c % b && (v = !1), v && f(a.y) ? (a.opacity =
                    y, q[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (q.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function (e, f, y) {
                var c = this.axis,
                    h = c.horiz,
                    p = this.pos,
                    k = u(this.tickmarkOffset, c.tickmarkOffset),
                    p = this.getPosition(h, p, k, f),
                    k = p.x,
                    q = p.y,
                    c = h && k === c.pos + c.len || !h && q === c.pos ? -1 : 1;
                y = u(y, 1);
                this.isActive = !0;
                this.renderGridLine(f, y, c);
                this.renderMark(p, y, c);
                this.renderLabel(p, f, y, e);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function () {
                I(this, this.axis)
            }
        }
    })(K);
    var W = function (a) {
        var C =
            a.addEvent,
            F = a.animObject,
            I = a.arrayMax,
            n = a.arrayMin,
            f = a.color,
            e = a.correctFloat,
            u = a.defaultOptions,
            x = a.defined,
            t = a.deg2rad,
            w = a.destroyObjectProperties,
            y = a.each,
            c = a.extend,
            h = a.fireEvent,
            p = a.format,
            k = a.getMagnitude,
            q = a.grep,
            d = a.inArray,
            b = a.isArray,
            v = a.isNumber,
            J = a.isString,
            l = a.merge,
            L = a.normalizeTickInterval,
            B = a.objectEach,
            D = a.pick,
            m = a.removeEvent,
            G = a.splat,
            A = a.syncTimeout,
            N = a.Tick,
            E = function () {
                this.init.apply(this, arguments)
            };
        a.extend(E.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function (a, r) {
                var g = r.isX,
                    b = this;
                b.chart = a;
                b.horiz = a.inverted && !b.isZAxis ? !g : g;
                b.isXAxis = g;
                b.coll = b.coll || (g ? "xAxis" : "yAxis");
                h(this, "init", {
                    userOptions: r
                });
                b.opposite =
                    r.opposite;
                b.side = r.side || (b.horiz ? b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
                b.setOptions(r);
                var c = this.options,
                    m = c.type;
                b.labelFormatter = c.labels.formatter || b.defaultLabelFormatter;
                b.userOptions = r;
                b.minPixelPadding = 0;
                b.reversed = c.reversed;
                b.visible = !1 !== c.visible;
                b.zoomEnabled = !1 !== c.zoomEnabled;
                b.hasNames = "category" === m || !0 === c.categories;
                b.categories = c.categories || b.hasNames;
                b.names || (b.names = [], b.names.keys = {});
                b.plotLinesAndBandsGroups = {};
                b.isLog = "logarithmic" === m;
                b.isDatetimeAxis = "datetime" === m;
                b.positiveValuesOnly =
                    b.isLog && !b.allowNegativeLog;
                b.isLinked = x(c.linkedTo);
                b.ticks = {};
                b.labelEdge = [];
                b.minorTicks = {};
                b.plotLinesAndBands = [];
                b.alternateBands = {};
                b.len = 0;
                b.minRange = b.userMinRange = c.minRange || c.maxZoom;
                b.range = c.range;
                b.offset = c.offset || 0;
                b.stacks = {};
                b.oldStacks = {};
                b.stacksTouched = 0;
                b.max = null;
                b.min = null;
                b.crosshair = D(c.crosshair, G(a.options.tooltip.crosshairs)[g ? 0 : 1], !1);
                r = b.options.events; - 1 === d(b, a.axes) && (g ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));
                b.series = b.series || [];
                a.inverted &&
                    !b.isZAxis && g && void 0 === b.reversed && (b.reversed = !0);
                B(r, function (a, g) {
                    C(b, g, a)
                });
                b.lin2log = c.linearToLogConverter || b.lin2log;
                b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log);
                h(this, "afterInit")
            },
            setOptions: function (a) {
                this.options = l(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], l(u[this.coll], a));
                h(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function () {
                var g =
                    this.axis,
                    r = this.value,
                    b = g.chart.time,
                    d = g.categories,
                    c = this.dateTimeLabelFormat,
                    m = u.lang,
                    k = m.numericSymbols,
                    m = m.numericSymbolMagnitude || 1E3,
                    h = k && k.length,
                    l, q = g.options.labels.format,
                    g = g.isLog ? Math.abs(r) : g.tickInterval;
                if (q) l = p(q, this, b);
                else if (d) l = r;
                else if (c) l = b.dateFormat(c, r);
                else if (h && 1E3 <= g)
                    for (; h-- && void 0 === l;) b = Math.pow(m, h + 1), g >= b && 0 === 10 * r % b && null !== k[h] && 0 !== r && (l = a.numberFormat(r / b, -1) + k[h]);
                void 0 === l && (l = 1E4 <= Math.abs(r) ? a.numberFormat(r, -1) : a.numberFormat(r, -1, void 0, ""));
                return l
            },
            getSeriesExtremes: function () {
                var a = this,
                    r = a.chart;
                h(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    y(a.series, function (g) {
                        if (g.visible || !r.options.chart.ignoreHiddenSeries) {
                            var b = g.options,
                                d = b.threshold,
                                c;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= d && (d = null);
                            if (a.isXAxis) b = g.xData, b.length && (g = n(b), c = I(b), v(g) || g instanceof Date || (b = q(b, v), g = n(b), c = I(b)), b.length && (a.dataMin = Math.min(D(a.dataMin,
                                b[0], g), g), a.dataMax = Math.max(D(a.dataMax, b[0], c), c)));
                            else if (g.getExtremes(), c = g.dataMax, g = g.dataMin, x(g) && x(c) && (a.dataMin = Math.min(D(a.dataMin, g), g), a.dataMax = Math.max(D(a.dataMax, c), c)), x(d) && (a.threshold = d), !b.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                h(this, "afterGetSeriesExtremes")
            },
            translate: function (a, r, b, d, c, m) {
                var g = this.linkedParent || this,
                    k = 1,
                    H = 0,
                    l = d ? g.oldTransA : g.transA;
                d = d ? g.oldMin : g.min;
                var h = g.minPixelPadding;
                c = (g.isOrdinal || g.isBroken || g.isLog && c) && g.lin2val;
                l ||
                    (l = g.transA);
                b && (k *= -1, H = g.len);
                g.reversed && (k *= -1, H -= k * (g.sector || g.len));
                r ? (a = (a * k + H - h) / l + d, c && (a = g.lin2val(a))) : (c && (a = g.val2lin(a)), a = v(d) ? k * (a - d) * l + H + k * h + (v(m) ? l * m : 0) : void 0);
                return a
            },
            toPixels: function (a, r) {
                return this.translate(a, !1, !this.horiz, null, !0) + (r ? 0 : this.pos)
            },
            toValue: function (a, r) {
                return this.translate(a - (r ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, r, b, d, c) {
                var g = this.chart,
                    m = this.left,
                    k = this.top,
                    H, l, h = b && g.oldChartHeight || g.chartHeight,
                    q = b && g.oldChartWidth ||
                    g.chartWidth,
                    A;
                H = this.transB;
                var e = function (a, g, r) {
                    if ("pass" !== d && a < g || a > r) d ? a = Math.min(Math.max(g, a), r) : A = !0;
                    return a
                };
                c = D(c, this.translate(a, null, null, b));
                c = Math.min(Math.max(-1E5, c), 1E5);
                a = b = Math.round(c + H);
                H = l = Math.round(h - c - H);
                v(c) ? this.horiz ? (H = k, l = h - this.bottom, a = b = e(a, m, m + this.width)) : (a = m, b = q - this.right, H = l = e(H, k, k + this.height)) : (A = !0, d = !1);
                return A && !d ? null : g.renderer.crispLine(["M", a, H, "L", b, l], r || 1)
            },
            getLinearTickPositions: function (a, r, b) {
                var g, d = e(Math.floor(r / a) * a);
                b = e(Math.ceil(b / a) *
                    a);
                var c = [],
                    m;
                e(d + a) === d && (m = 20);
                if (this.single) return [r];
                for (r = d; r <= b;) {
                    c.push(r);
                    r = e(r + a, m);
                    if (r === g) break;
                    g = r
                }
                return c
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? D(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this,
                    r = a.options,
                    b = a.tickPositions,
                    d = a.minorTickInterval,
                    c = [],
                    m = a.pointRangePadding || 0,
                    k = a.min - m,
                    m = a.max + m,
                    l = m - k;
                if (l && l / d < a.len / 3)
                    if (a.isLog) y(this.paddedTicks, function (g, r, b) {
                        r && c.push.apply(c,
                            a.getLogTickPositions(d, b[r - 1], b[r], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) c = c.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), k, m, r.startOfWeek));
                else
                    for (r = k + (b[0] - k) % d; r <= m && r !== c[0]; r += d) c.push(r);
                0 !== c.length && a.trimTicks(c);
                return c
            },
            adjustForMinRange: function () {
                var a = this.options,
                    r = this.min,
                    b = this.max,
                    d, c, m, k, l, h, q, v;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (x(a.min) || x(a.max) ? this.minRange = null : (y(this.series, function (a) {
                    h = a.xData;
                    for (k = q = a.xIncrement ?
                        1 : h.length - 1; 0 < k; k--)
                        if (l = h[k] - h[k - 1], void 0 === m || l < m) m = l
                }), this.minRange = Math.min(5 * m, this.dataMax - this.dataMin)));
                b - r < this.minRange && (c = this.dataMax - this.dataMin >= this.minRange, v = this.minRange, d = (v - b + r) / 2, d = [r - d, D(a.min, r - d)], c && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), r = I(d), b = [r + v, D(a.max, r + v)], c && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = n(b), b - r < v && (d[0] = b - v, d[1] = D(a.min, b - v), r = I(d)));
                this.min = r;
                this.max = b
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : y(this.series,
                    function (g) {
                        var r = g.closestPointRange,
                            b = g.visible || !g.chart.options.chart.ignoreHiddenSeries;
                        !g.noSharedTooltip && x(r) && b && (a = x(a) ? Math.min(a, r) : r)
                    });
                return a
            },
            nameToX: function (a) {
                var g = b(this.categories),
                    c = g ? this.categories : this.names,
                    m = a.options.x,
                    k;
                a.series.requireSorting = !1;
                x(m) || (m = !1 === this.options.uniqueNames ? a.series.autoIncrement() : g ? d(a.name, c) : D(c.keys[a.name], -1)); - 1 === m ? g || (k = c.length) : k = m;
                void 0 !== k && (this.names[k] = a.name, this.names.keys[a.name] = k);
                return k
            },
            updateNames: function () {
                var g =
                    this,
                    r = this.names;
                0 < r.length && (y(a.keys(r.keys), function (a) {
                    delete r.keys[a]
                }), r.length = 0, this.minRange = this.userMinRange, y(this.series || [], function (a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    y(a.points, function (r, b) {
                        var d;
                        r.options && (d = g.nameToX(r), void 0 !== d && d !== r.x && (r.x = d, a.xData[b] = d))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var g = this,
                    b = g.max - g.min,
                    d = g.axisPointRange || 0,
                    c, m = 0,
                    k = 0,
                    l = g.linkedParent,
                    q = !!g.categories,
                    v = g.transA,
                    A = g.isXAxis;
                if (A || q || d) c = g.getClosest(),
                    l ? (m = l.minPointOffset, k = l.pointRangePadding) : y(g.series, function (a) {
                        var b = q ? 1 : A ? D(a.options.pointRange, c, 0) : g.axisPointRange || 0;
                        a = a.options.pointPlacement;
                        d = Math.max(d, b);
                        g.single || (m = Math.max(m, J(a) ? 0 : b / 2), k = Math.max(k, "on" === a ? 0 : b))
                    }), l = g.ordinalSlope && c ? g.ordinalSlope / c : 1, g.minPointOffset = m *= l, g.pointRangePadding = k *= l, g.pointRange = Math.min(d, b), A && (g.closestPointRange = c);
                a && (g.oldTransA = v);
                g.translationSlope = g.transA = v = g.staticScale || g.len / (b + k || 1);
                g.transB = g.horiz ? g.left : g.bottom;
                g.minPixelPadding =
                    v * m;
                h(this, "afterSetAxisTranslation")
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (g) {
                var b = this,
                    d = b.chart,
                    c = b.options,
                    m = b.isLog,
                    l = b.isDatetimeAxis,
                    q = b.isXAxis,
                    A = b.isLinked,
                    p = c.maxPadding,
                    f = c.minPadding,
                    G = c.tickInterval,
                    B = c.tickPixelInterval,
                    J = b.categories,
                    E = v(b.threshold) ? b.threshold : null,
                    N = b.softThreshold,
                    w, t, u, n;
                l || J || A || this.getTickAmount();
                u = D(b.userMin, c.min);
                n = D(b.userMax, c.max);
                A ? (b.linkedParent = d[b.coll][c.linkedTo], d = b.linkedParent.getExtremes(), b.min = D(d.min,
                    d.dataMin), b.max = D(d.max, d.dataMax), c.type !== b.linkedParent.options.type && a.error(11, 1)) : (!N && x(E) && (b.dataMin >= E ? (w = E, f = 0) : b.dataMax <= E && (t = E, p = 0)), b.min = D(u, w, b.dataMin), b.max = D(n, t, b.dataMax));
                m && (b.positiveValuesOnly && !g && 0 >= Math.min(b.min, D(b.dataMin, b.min)) && a.error(10, 1), b.min = e(b.log2lin(b.min), 15), b.max = e(b.log2lin(b.max), 15));
                b.range && x(b.max) && (b.userMin = b.min = u = Math.max(b.dataMin, b.minFromRange()), b.userMax = n = b.max, b.range = null);
                h(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(J || b.axisPointRange || b.usePercentage || A) && x(b.min) && x(b.max) && (d = b.max - b.min) && (!x(u) && f && (b.min -= d * f), !x(n) && p && (b.max += d * p));
                v(c.softMin) && !v(b.userMin) && (b.min = Math.min(b.min, c.softMin));
                v(c.softMax) && !v(b.userMax) && (b.max = Math.max(b.max, c.softMax));
                v(c.floor) && (b.min = Math.max(b.min, c.floor));
                v(c.ceiling) && (b.max = Math.min(b.max, c.ceiling));
                N && x(b.dataMin) && (E = E || 0, !x(u) && b.min < E && b.dataMin >= E ? b.min = E : !x(n) && b.max > E && b.dataMax <= E && (b.max = E));
                b.tickInterval = b.min === b.max ||
                    void 0 === b.min || void 0 === b.max ? 1 : A && !G && B === b.linkedParent.options.tickPixelInterval ? G = b.linkedParent.tickInterval : D(G, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, J ? 1 : (b.max - b.min) * B / Math.max(b.len, B));
                q && !g && y(b.series, function (a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !G && (b.tickInterval =
                    Math.max(b.pointRange, b.tickInterval));
                g = D(c.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !G && b.tickInterval < g && (b.tickInterval = g);
                l || m || G || (b.tickInterval = L(b.tickInterval, null, k(b.tickInterval), D(c.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var g = this.options,
                    b, d = g.tickPositions;
                b = this.getMinorTickInterval();
                var c = g.tickPositioner,
                    m =
                    g.startOnTick,
                    k = g.endOnTick;
                this.tickmarkOffset = this.categories && "between" === g.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && x(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== g.allowDecimals);
                this.tickPositions = b = d && d.slice();
                !b && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (b = [this.min, this.max], a.error(19)) : b = this.isDatetimeAxis ?
                    this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, g.units), this.min, this.max, g.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, c && (c = c.apply(this, [this.min, this.max]))) && (this.tickPositions = b = c);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, m, k);
                this.isLinked ||
                    (this.single && 2 > b.length && (this.min -= .5, this.max += .5), d || c || this.adjustTickAmount());
                h(this, "afterSetTickPositions")
            },
            trimTicks: function (a, b, d) {
                var g = a[0],
                    c = a[a.length - 1],
                    m = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== g) this.min = g;
                    else
                        for (; this.min - m > a[0];) a.shift();
                    if (d) this.max = c;
                    else
                        for (; this.max + m < a[a.length - 1];) a.pop();
                    0 === a.length && x(g) && !this.options.tickPositions && a.push((c + g) / 2)
                }
            },
            alignToOthers: function () {
                var a = {},
                    b, d = this.options;
                !1 === this.chart.options.chart.alignTicks ||
                    !1 === d.alignTicks || !1 === d.startOnTick || !1 === d.endOnTick || this.isLog || y(this.chart[this.coll], function (g) {
                        var d = g.options,
                            d = [g.horiz ? d.left : d.top, d.width, d.height, d.pane].join();
                        g.series.length && (a[d] ? b = !0 : a[d] = 1)
                    });
                return b
            },
            getTickAmount: function () {
                var a = this.options,
                    b = a.tickAmount,
                    d = a.tickPixelInterval;
                !x(a.tickInterval) && this.len < d && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / d) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount =
                    b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    d = this.tickAmount,
                    c = this.finalTickAmt,
                    m = b && b.length,
                    k = D(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (m < d) {
                        for (; b.length < d;) b.length % 2 || this.min === k ? b.push(e(b[b.length - 1] + a)) : b.unshift(e(b[0] - a));
                        this.transA *= (m - 1) / (d - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else m > d && (this.tickInterval *= 2, this.setTickPositions());
                    if (x(c)) {
                        for (a = d = b.length; a--;)(3 === c && 1 === a % 2 || 2 >= c && 0 < a && a < d - 1) && b.splice(a, 1);
                        this.finalTickAmt =
                            void 0
                    }
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                y(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax =
                    this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                h(this, "afterSetScale")
            },
            setExtremes: function (a, b, d, m, k) {
                var g = this,
                    r = g.chart;
                d = D(d, !0);
                y(g.series, function (a) {
                    delete a.kdTree
                });
                k = c(k, {
                    min: a,
                    max: b
                });
                h(g, "setExtremes", k, function () {
                    g.userMin = a;
                    g.userMax = b;
                    g.eventArgs = k;
                    d && r.redraw(m)
                })
            },
            zoom: function (a, b) {
                var g = this.dataMin,
                    d = this.dataMax,
                    c = this.options,
                    m = Math.min(g, D(c.min, g)),
                    c = Math.max(d, D(c.max, d));
                if (a !== this.min ||
                    b !== this.max) this.allowZoomOutside || (x(g) && (a < m && (a = m), a > c && (a = c)), x(d) && (b < m && (b = m), b > c && (b = c))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function () {
                var b = this.chart,
                    d = this.options,
                    c = d.offsets || [0, 0, 0, 0],
                    m = this.horiz,
                    k = this.width = Math.round(a.relativeLength(D(d.width, b.plotWidth - c[3] + c[1]), b.plotWidth)),
                    l = this.height = Math.round(a.relativeLength(D(d.height, b.plotHeight - c[0] + c[2]), b.plotHeight)),
                    h = this.top = Math.round(a.relativeLength(D(d.top,
                        b.plotTop + c[0]), b.plotHeight, b.plotTop)),
                    d = this.left = Math.round(a.relativeLength(D(d.left, b.plotLeft + c[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - l - h;
                this.right = b.chartWidth - k - d;
                this.len = Math.max(m ? k : l, 0);
                this.pos = m ? d : h
            },
            getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? e(this.lin2log(this.min)) : this.min,
                    max: a ? e(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    g = b ? this.lin2log(this.min) :
                    this.min,
                    b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = g : Infinity === a ? a = b : g > a ? a = g : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (D(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options,
                    g = b[a + "Length"],
                    d = D(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (d && g) return "inside" === b[a + "Position"] && (g = -g), [g, d]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels,
                    b = this.horiz,
                    d = this.tickInterval,
                    c = d,
                    m = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d),
                    k, l = a.rotation,
                    h = this.labelMetrics(),
                    q, v = Number.MAX_VALUE,
                    A, p = function (a) {
                        a /= m || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return e(a * d)
                    };
                b ? (A = !a.staggerLines && !a.step && (x(l) ? [l] : m < D(a.autoRotationLimit, 80) && a.autoRotation)) && y(A, function (a) {
                    var b;
                    if (a === l || a && -90 <= a && 90 >= a) q = p(Math.abs(h.h / Math.sin(t * a))), b =
                        q + Math.abs(a / 360), b < v && (v = b, k = a, c = q)
                }) : a.step || (c = p(h.h));
                this.autoRotation = A;
                this.labelRotation = D(k, l);
                return c
            },
            getSlotWidth: function (a) {
                var b = this.chart,
                    g = this.horiz,
                    d = this.options.labels,
                    c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    m = b.margin[3];
                return a && a.slotWidth || g && 2 > (d.step || 0) && !d.rotation && (this.staggerLines || 1) * this.len / c || !g && (d.style && parseInt(d.style.width, 10) || m && m - b.spacing[3] || .33 * b.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart,
                    b = a.renderer,
                    d = this.tickPositions,
                    c = this.ticks,
                    m = this.options.labels,
                    k = m && m.style || {},
                    l = this.horiz,
                    h = this.getSlotWidth(),
                    q = Math.max(1, Math.round(h - 2 * (m.padding || 5))),
                    v = {},
                    A = this.labelMetrics(),
                    e = m.style && m.style.textOverflow,
                    p, f, G = 0,
                    B;
                J(m.rotation) || (v.rotation = m.rotation || 0);
                y(d, function (a) {
                    (a = c[a]) && a.label && a.label.textPxLength > G && (G = a.label.textPxLength)
                });
                this.maxLabelLength = G;
                if (this.autoRotation) G > q && G > A.h ? v.rotation = this.labelRotation : this.labelRotation = 0;
                else if (h && (p = q, !e))
                    for (f = "clip", q = d.length; !l && q--;)
                        if (B = d[q], B = c[B].label) B.styles &&
                            "ellipsis" === B.styles.textOverflow ? B.css({
                                textOverflow: "clip"
                            }) : B.textPxLength > h && B.css({
                                width: h + "px"
                            }), B.getBBox().height > this.len / d.length - (A.h - A.f) && (B.specificTextOverflow = "ellipsis");
                v.rotation && (p = G > .5 * a.chartHeight ? .33 * a.chartHeight : G, e || (f = "ellipsis"));
                if (this.labelAlign = m.align || this.autoLabelAlign(this.labelRotation)) v.align = this.labelAlign;
                y(d, function (a) {
                    var b = (a = c[a]) && a.label,
                        g = k.width,
                        d = {};
                    b && (b.attr(v), a.shortenLabel ? a.shortenLabel() : p && !g && "nowrap" !== k.whiteSpace && (p < b.textPxLength ||
                        "SPAN" === b.element.tagName) ? (d.width = p, e || (d.textOverflow = b.specificTextOverflow || f), b.css(d)) : b.styles && b.styles.width && !d.width && !g && b.css({
                        width: null
                    }), delete b.specificTextOverflow, a.rotation = v.rotation)
                }, this);
                this.tickRotCorr = b.rotCorr(A.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || x(this.min) && x(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function (a) {
                var b = this.chart.renderer,
                    g = this.horiz,
                    d = this.opposite,
                    c = this.options.title,
                    m;
                this.axisTitle || ((m = c.textAlign) || (m = (g ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: d ? "right" : "left",
                    middle: "center",
                    high: d ? "left" : "right"
                })[c.align]), this.axisTitle = b.text(c.text, 0, 0, c.useHTML).attr({
                    zIndex: 7,
                    rotation: c.rotation || 0,
                    align: m
                }).addClass("highcharts-axis-title").css(l(c.style)).add(this.axisGroup), this.axisTitle.isNew = !0);
                c.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() :
                    b[a] = new N(this, a)
            },
            getOffset: function () {
                var a = this,
                    b = a.chart,
                    d = b.renderer,
                    c = a.options,
                    m = a.tickPositions,
                    k = a.ticks,
                    l = a.horiz,
                    q = a.side,
                    v = b.inverted && !a.isZAxis ? [1, 0, 3, 2][q] : q,
                    A, e, p = 0,
                    G, f = 0,
                    J = c.title,
                    E = c.labels,
                    N = 0,
                    w = b.axisOffset,
                    b = b.clipOffset,
                    t = [-1, 1, 1, -1][q],
                    u = c.className,
                    n = a.axisParent;
                A = a.hasData();
                a.showAxis = e = A || D(c.showEmpty, !0);
                a.staggerLines = a.horiz && E.staggerLines;
                a.axisGroup || (a.gridGroup = d.g("grid").attr({
                    zIndex: c.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " +
                    (u || "")).add(n), a.axisGroup = d.g("axis").attr({
                    zIndex: c.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (u || "")).add(n), a.labelGroup = d.g("axis-labels").attr({
                    zIndex: E.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (u || "")).add(n));
                A || a.isLinked ? (y(m, function (b, g) {
                    a.generateTick(b, g)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === q || 2 === q || {
                    1: "left",
                    3: "right"
                } [q] === a.labelAlign, D(E.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && y(m, function (a) {
                    N =
                        Math.max(k[a].getLabelSize(), N)
                }), a.staggerLines && (N *= a.staggerLines), a.labelOffset = N * (a.opposite ? -1 : 1)) : B(k, function (a, b) {
                    a.destroy();
                    delete k[b]
                });
                J && J.text && !1 !== J.enabled && (a.addTitle(e), e && !1 !== J.reserveSpace && (a.titleOffset = p = a.axisTitle.getBBox()[l ? "height" : "width"], G = J.offset, f = x(G) ? 0 : D(J.margin, l ? 5 : 10)));
                a.renderLine();
                a.offset = t * D(c.offset, w[q]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                d = 0 === q ? -a.labelMetrics().h : 2 === q ? a.tickRotCorr.y : 0;
                f = Math.abs(N) + f;
                N && (f = f - d + t * (l ? D(E.y, a.tickRotCorr.y +
                    8 * t) : E.x));
                a.axisTitleMargin = D(G, f);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(k, m));
                l = this.tickSize("tick");
                w[q] = Math.max(w[q], a.axisTitleMargin + p + t * a.offset, f, A && m.length && l ? l[0] + t * a.offset : 0);
                c = c.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[v] = Math.max(b[v], c);
                h(this, "afterGetOffset")
            },
            getLinePath: function (a) {
                var b = this.chart,
                    g = this.opposite,
                    d = this.offset,
                    c = this.horiz,
                    m = this.left + (g ? this.width : 0) + d,
                    d = b.chartHeight - this.bottom - (g ? this.height : 0) + d;
                g && (a *= -1);
                return b.renderer.crispLine(["M",
                    c ? this.left : m, c ? d : this.top, "L", c ? b.chartWidth - this.right : m, c ? d : b.chartHeight - this.bottom
                ], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    d = this.top,
                    c = this.len,
                    m = this.options.title,
                    k = a ? b : d,
                    l = this.opposite,
                    h = this.offset,
                    q = m.x || 0,
                    v = m.y || 0,
                    A = this.axisTitle,
                    e =
                    this.chart.renderer.fontMetrics(m.style && m.style.fontSize, A),
                    A = Math.max(A.getBBox(null, 0).height - e.h - 1, 0),
                    c = {
                        low: k + (a ? 0 : c),
                        middle: k + c / 2,
                        high: k + (a ? c : 0)
                    } [m.align],
                    b = (a ? d + this.height : b) + (a ? 1 : -1) * (l ? -1 : 1) * this.axisTitleMargin + [-A, A, e.f, -A][this.side];
                return {
                    x: a ? c + q : b + (l ? this.width : 0) + h + q,
                    y: a ? b + v - (l ? this.height : 0) + h : c + v
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && v(this.oldMin),
                    d = this.minorTicks;
                d[a] || (d[a] = new N(this, a, "minor"));
                b && d[a].isNew && d[a].render(null, !0);
                d[a].render(null, !1,
                    1)
            },
            renderTick: function (a, b) {
                var d = this.isLinked,
                    g = this.ticks,
                    c = this.chart.hasRendered && v(this.oldMin);
                if (!d || a >= this.min && a <= this.max) g[a] || (g[a] = new N(this, a)), c && g[a].isNew && g[a].render(b, !0, -1), g[a].render(b)
            },
            render: function () {
                var b = this,
                    d = b.chart,
                    c = b.options,
                    m = b.isLog,
                    k = b.isLinked,
                    l = b.tickPositions,
                    q = b.axisTitle,
                    e = b.ticks,
                    p = b.minorTicks,
                    f = b.alternateBands,
                    G = c.stackLabels,
                    J = c.alternateGridColor,
                    E = b.tickmarkOffset,
                    D = b.axisLine,
                    t = b.showAxis,
                    w = F(d.renderer.globalAnimation),
                    u, n;
                b.labelEdge.length =
                    0;
                b.overlap = !1;
                y([e, p, f], function (a) {
                    B(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || k) b.minorTickInterval && !b.categories && y(b.getMinorTickPositions(), function (a) {
                    b.renderMinorTick(a)
                }), l.length && (y(l, function (a, d) {
                    b.renderTick(a, d)
                }), E && (0 === b.min || b.single) && (e[-1] || (e[-1] = new N(b, -1, null, !0)), e[-1].render(-1))), J && y(l, function (c, g) {
                    n = void 0 !== l[g + 1] ? l[g + 1] + E : b.max - E;
                    0 === g % 2 && c < b.max && n <= b.max + (d.polar ? -E : E) && (f[c] || (f[c] = new a.PlotLineOrBand(b)), u = c + E, f[c].options = {
                        from: m ? b.lin2log(u) : u,
                        to: m ?
                            b.lin2log(n) : n,
                        color: J
                    }, f[c].render(), f[c].isActive = !0)
                }), b._addedPlotLB || (y((c.plotLines || []).concat(c.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                y([e, p, f], function (a) {
                    var b, c = [],
                        g = w.duration;
                    B(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, c.push(b))
                    });
                    A(function () {
                        for (b = c.length; b--;) a[c[b]] && !a[c[b]].isActive && (a[c[b]].destroy(), delete a[c[b]])
                    }, a !== f && d.hasRendered && g ? g : 0)
                });
                D && (D[D.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(D.strokeWidth())
                }), D.isPlaced = !0, D[t ? "show" : "hide"](!0));
                q && t && (c = b.getTitlePosition(), v(c.y) ? (q[q.isNew ? "attr" : "animate"](c), q.isNew = !1) : (q.attr("y", -9999), q.isNew = !0));
                G && G.enabled && b.renderStackTotals();
                b.isDirty = !1;
                h(this, "afterRender")
            },
            redraw: function () {
                this.visible && (this.render(), y(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                y(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this,
                    c = b.stacks,
                    g = b.plotLinesAndBands,
                    k;
                h(this, "destroy", {
                    keepEvents: a
                });
                a || m(b);
                B(c, function (a, b) {
                    w(a);
                    c[b] = null
                });
                y([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    w(a)
                });
                if (g)
                    for (a = g.length; a--;) g[a].destroy();
                y("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" "), function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (k in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[k] = b.plotLinesAndBandsGroups[k].destroy();
                B(b, function (a, c) {
                    -1 === d(c, b.keepProps) && delete b[c]
                })
            },
            drawCrosshair: function (a, b) {
                var d, c = this.crosshair,
                    g = D(c.snap, !0),
                    m, k = this.cross;
                h(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (x(b) || !g)) {
                    g ? x(b) && (m = D(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : m = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    x(m) && (d = this.getPlotLinePath(b && (this.isXAxis ? b.x : D(b.stackY, b.y)), null, null, null, m) || null);
                    if (!x(d)) {
                        this.hideCrosshair();
                        return
                    }
                    g = this.categories && !this.isRadial;
                    k || (this.cross = k = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" +
                        (g ? "category " : "thin ") + c.className).attr({
                        zIndex: D(c.zIndex, 2)
                    }).add(), k.attr({
                        stroke: c.color || (g ? f("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": D(c.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), c.dashStyle && k.attr({
                        dashstyle: c.dashStyle
                    }));
                    k.show().attr({
                        d: d
                    });
                    g && !c.width && k.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                h(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = E
    }(K);
    (function (a) {
        var C =
            a.Axis,
            F = a.getMagnitude,
            I = a.normalizeTickInterval,
            n = a.timeUnits;
        C.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        C.prototype.normalizeTimeTickInterval = function (a, e) {
            var f = e || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            e = f[f.length - 1];
            var x = n[e[0]],
                t = e[1],
                w;
            for (w = 0; w < f.length && !(e = f[w], x = n[e[0]],
                    t = e[1], f[w + 1] && a <= (x * t[t.length - 1] + n[f[w + 1][0]]) / 2); w++);
            x === n.year && a < 5 * x && (t = [1, 2, 5]);
            a = I(a / x, t, "year" === e[0] ? Math.max(F(a / x), 1) : 1);
            return {
                unitRange: x,
                count: a,
                unitName: e[0]
            }
        }
    })(K);
    (function (a) {
        var C = a.Axis,
            F = a.getMagnitude,
            I = a.map,
            n = a.normalizeTickInterval,
            f = a.pick;
        C.prototype.getLogTickPositions = function (a, u, x, t) {
            var e = this.options,
                y = this.len,
                c = [];
            t || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), c = this.getLinearTickPositions(a, u, x);
            else if (.08 <= a)
                for (var y = Math.floor(u), h, p, k, q, d, e = .3 <
                        a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; y < x + 1 && !d; y++)
                    for (p = e.length, h = 0; h < p && !d; h++) k = this.log2lin(this.lin2log(y) * e[h]), k > u && (!t || q <= x) && void 0 !== q && c.push(q), q > x && (d = !0), q = k;
            else u = this.lin2log(u), x = this.lin2log(x), a = t ? this.getMinorTickInterval() : e.tickInterval, a = f("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (t ? 5 : 1) * (x - u) / ((t ? y / this.tickPositions.length : y) || 1)), a = n(a, null, F(a)), c = I(this.getLinearTickPositions(a, u, x), this.log2lin), t || (this._minorAutoInterval = a / 5);
            t || (this.tickInterval =
                a);
            return c
        };
        C.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(K);
    (function (a, C) {
        var F = a.arrayMax,
            I = a.arrayMin,
            n = a.defined,
            f = a.destroyObjectProperties,
            e = a.each,
            u = a.erase,
            x = a.merge,
            t = a.pick;
        a.PlotLineOrBand = function (a, e) {
            this.axis = a;
            e && (this.options = e, this.id = e.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                a.fireEvent(this, "render");
                var e = this,
                    f = e.axis,
                    c = f.horiz,
                    h = e.options,
                    p = h.label,
                    k = e.label,
                    q = h.to,
                    d = h.from,
                    b = h.value,
                    v = n(d) &&
                    n(q),
                    J = n(b),
                    l = e.svgElem,
                    u = !l,
                    B = [],
                    D = h.color,
                    m = t(h.zIndex, 0),
                    G = h.events,
                    B = {
                        "class": "highcharts-plot-" + (v ? "band " : "line ") + (h.className || "")
                    },
                    A = {},
                    N = f.chart.renderer,
                    E = v ? "bands" : "lines";
                f.isLog && (d = f.log2lin(d), q = f.log2lin(q), b = f.log2lin(b));
                J ? (B.stroke = D, B["stroke-width"] = h.width, h.dashStyle && (B.dashstyle = h.dashStyle)) : v && (D && (B.fill = D), h.borderWidth && (B.stroke = h.borderColor, B["stroke-width"] = h.borderWidth));
                A.zIndex = m;
                E += "-" + m;
                (D = f.plotLinesAndBandsGroups[E]) || (f.plotLinesAndBandsGroups[E] = D = N.g("plot-" +
                    E).attr(A).add());
                u && (e.svgElem = l = N.path().attr(B).add(D));
                if (J) B = f.getPlotLinePath(b, l.strokeWidth());
                else if (v) B = f.getPlotBandPath(d, q, h);
                else return;
                u && B && B.length ? (l.attr({
                    d: B
                }), G && a.objectEach(G, function (a, b) {
                    l.on(b, function (a) {
                        G[b].apply(e, [a])
                    })
                })) : l && (B ? (l.show(), l.animate({
                    d: B
                })) : (l.hide(), k && (e.label = k = k.destroy())));
                p && n(p.text) && B && B.length && 0 < f.width && 0 < f.height && !B.isFlat ? (p = x({
                        align: c && v && "center",
                        x: c ? !v && 4 : 10,
                        verticalAlign: !c && v && "middle",
                        y: c ? v ? 16 : 10 : v ? 6 : -4,
                        rotation: c && !v && 90
                    }, p),
                    this.renderLabel(p, B, v, m)) : k && k.hide();
                return e
            },
            renderLabel: function (a, e, c, h) {
                var p = this.label,
                    k = this.axis.chart.renderer;
                p || (p = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, p.zIndex = h, this.label = p = k.text(a.text, 0, 0, a.useHTML).attr(p).add(), p.css(a.style));
                h = e.xBounds || [e[1], e[4], c ? e[6] : e[1]];
                e = e.yBounds || [e[2], e[5], c ? e[7] : e[2]];
                c = I(h);
                k = I(e);
                p.align(a, !1, {
                    x: c,
                    y: k,
                    width: F(h) - c,
                    height: F(e) - k
                });
                p.show()
            },
            destroy: function () {
                u(this.axis.plotLinesAndBands,
                    this);
                delete this.axis;
                f(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function (a, e) {
                var c = this.getPlotLinePath(e, null, null, !0),
                    h = this.getPlotLinePath(a, null, null, !0),
                    p = [],
                    k = this.horiz,
                    q = 1,
                    d;
                a = a < this.min && e < this.min || a > this.max && e > this.max;
                if (h && c)
                    for (a && (d = h.toString() === c.toString(), q = 0), a = 0; a < h.length; a += 6) k && c[a + 1] === h[a + 1] ? (c[a + 1] += q, c[a + 4] += q) : k || c[a + 2] !== h[a + 2] || (c[a + 2] += q, c[a + 5] += q), p.push("M", h[a + 1], h[a + 2], "L", h[a + 4], h[a + 5], c[a + 4], c[a + 5], c[a + 1], c[a + 2], "z"), p.isFlat = d;
                return p
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a,
                    "plotBands")
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function (e, f) {
                var c = (new a.PlotLineOrBand(this, e)).render(),
                    h = this.userOptions;
                c && (f && (h[f] = h[f] || [], h[f].push(e)), this.plotLinesAndBands.push(c));
                return c
            },
            removePlotBandOrLine: function (a) {
                for (var f = this.plotLinesAndBands, c = this.options, h = this.userOptions, p = f.length; p--;) f[p].id === a && f[p].destroy();
                e([c.plotLines || [], h.plotLines || [], c.plotBands || [], h.plotBands || []], function (c) {
                    for (p = c.length; p--;) c[p].id ===
                        a && u(c, c[p])
                })
            },
            removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(K, W);
    (function (a) {
        var C = a.doc,
            F = a.each,
            I = a.extend,
            n = a.format,
            f = a.isNumber,
            e = a.map,
            u = a.merge,
            x = a.pick,
            t = a.splat,
            w = a.syncTimeout,
            y = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, h) {
                this.chart = a;
                this.options = h;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = h.split && !a.inverted;
                this.shared = h.shared ||
                    this.split;
                this.outside = h.outside && !this.split
            },
            cleanSplit: function (a) {
                F(this.chart.series, function (c) {
                    var h = c && c.tt;
                    h && (!h.isActive || a ? c.tt = h.destroy() : h.isActive = !1)
                })
            },
            getLabel: function () {
                var c = this.chart.renderer,
                    h = this.options,
                    e;
                this.label || (this.outside && (this.container = e = a.doc.createElement("div"), e.className = "highcharts-tooltip-container", a.css(e, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: h.style && h.style.pointerEvents
                    }), a.doc.body.appendChild(e), this.renderer = c = new a.Renderer(e, 0, 0)), this.split ?
                    this.label = c.g("tooltip") : (this.label = c.label("", 0, 0, h.shape || "callout", null, null, h.useHTML, null, "tooltip").attr({
                        padding: h.padding,
                        r: h.borderRadius
                    }), this.label.attr({
                        fill: h.backgroundColor,
                        "stroke-width": h.borderWidth
                    }).css(h.style).shadow(h.shadow)), this.outside && (this.label.attr({
                        x: this.distance,
                        y: this.distance
                    }), this.label.xSetter = function (a) {
                        e.style.left = a + "px"
                    }, this.label.ySetter = function (a) {
                        e.style.top = a + "px"
                    }), this.label.attr({
                        zIndex: 8
                    }).add());
                return this.label
            },
            update: function (a) {
                this.destroy();
                u(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, u(!0, this.options, a))
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function (c, h, e, k) {
                var q = this,
                    d = q.now,
                    b = !1 !== q.options.animation && !q.isHidden && (1 < Math.abs(c - d.x) || 1 < Math.abs(h -
                        d.y)),
                    v = q.followPointer || 1 < q.len;
                I(d, {
                    x: b ? (2 * d.x + c) / 3 : c,
                    y: b ? (d.y + h) / 2 : h,
                    anchorX: v ? void 0 : b ? (2 * d.anchorX + e) / 3 : e,
                    anchorY: v ? void 0 : b ? (d.anchorY + k) / 2 : k
                });
                q.getLabel().attr(d);
                b && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    q && q.move(c, h, e, k)
                }, 32))
            },
            hide: function (c) {
                var h = this;
                a.clearTimeout(this.hideTimer);
                c = x(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = w(function () {
                    h.getLabel()[c ? "fadeOut" : "hide"]();
                    h.isHidden = !0
                }, c))
            },
            getAnchor: function (a, h) {
                var c =
                    this.chart,
                    k = c.pointer,
                    q = c.inverted,
                    d = c.plotTop,
                    b = c.plotLeft,
                    v = 0,
                    f = 0,
                    l, n;
                a = t(a);
                this.followPointer && h ? (void 0 === h.chartX && (h = k.normalize(h)), a = [h.chartX - c.plotLeft, h.chartY - d]) : a[0].tooltipPos ? a = a[0].tooltipPos : (F(a, function (a) {
                    l = a.series.yAxis;
                    n = a.series.xAxis;
                    v += a.plotX + (!q && n ? n.left - b : 0);
                    f += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!q && l ? l.top - d : 0)
                }), v /= a.length, f /= a.length, a = [q ? c.plotWidth - f : v, this.shared && !q && 1 < a.length && h ? h.chartY - d : q ? c.plotHeight - v : f]);
                return e(a, Math.round)
            },
            getPosition: function (a,
                h, e) {
                var c = this.chart,
                    q = this.distance,
                    d = {},
                    b = c.inverted && e.h || 0,
                    v, f = this.outside,
                    l = f ? C.documentElement.clientWidth - 2 * q : c.chartWidth,
                    p = f ? Math.max(C.body.scrollHeight, C.documentElement.scrollHeight, C.body.offsetHeight, C.documentElement.offsetHeight, C.documentElement.clientHeight) : c.chartHeight,
                    B = c.pointer.chartPosition,
                    D = ["y", p, h, (f ? B.top - q : 0) + e.plotY + c.plotTop, f ? 0 : c.plotTop, f ? p : c.plotTop + c.plotHeight],
                    m = ["x", l, a, (f ? B.left - q : 0) + e.plotX + c.plotLeft, f ? 0 : c.plotLeft, f ? l : c.plotLeft + c.plotWidth],
                    G = !this.followPointer &&
                    x(e.ttBelow, !c.inverted === !!e.negative),
                    A = function (a, c, g, m, k, l) {
                        var h = g < m - q,
                            v = m + q + g < c,
                            A = m - q - g;
                        m += q;
                        if (G && v) d[a] = m;
                        else if (!G && h) d[a] = A;
                        else if (h) d[a] = Math.min(l - g, 0 > A - b ? A : A - b);
                        else if (v) d[a] = Math.max(k, m + b + g > c ? m : m + b);
                        else return !1
                    },
                    N = function (a, b, c, g) {
                        var m;
                        g < q || g > b - q ? m = !1 : d[a] = g < c / 2 ? 1 : g > b - c / 2 ? b - c - 2 : g - c / 2;
                        return m
                    },
                    E = function (a) {
                        var b = D;
                        D = m;
                        m = b;
                        v = a
                    },
                    g = function () {
                        !1 !== A.apply(0, D) ? !1 !== N.apply(0, m) || v || (E(!0), g()) : v ? d.x = d.y = 0 : (E(!0), g())
                    };
                (c.inverted || 1 < this.len) && E();
                g();
                return d
            },
            defaultFormatter: function (a) {
                var c =
                    this.points || t(this),
                    e;
                e = [a.tooltipFooterHeaderFormatter(c[0])];
                e = e.concat(a.bodyFormatter(c));
                e.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return e
            },
            refresh: function (c, h) {
                var e, k = this.options,
                    q, d = c,
                    b, v = {},
                    f = [];
                e = k.formatter || this.defaultFormatter;
                var v = this.shared,
                    l;
                k.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = t(d)[0].series.tooltipOptions.followPointer, b = this.getAnchor(d, h), h = b[0], q = b[1], !v || d.series && d.series.noSharedTooltip ? v = d.getLabelConfig() : (F(d, function (a) {
                    a.setState("hover");
                    f.push(a.getLabelConfig())
                }), v = {
                    x: d[0].category,
                    y: d[0].y
                }, v.points = f, d = d[0]), this.len = f.length, v = e.call(v, this), l = d.series, this.distance = x(l.tooltipOptions.distance, 16), !1 === v ? this.hide() : (e = this.getLabel(), this.isHidden && e.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(v, t(c)) : (k.style.width || e.css({
                    width: this.chart.spacingBox.width
                }), e.attr({
                    text: v && v.join ? v.join("") : v
                }), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + x(d.colorIndex, l.colorIndex)), e.attr({
                    stroke: k.borderColor ||
                        d.color || l.color || "#666666"
                }), this.updatePosition({
                    plotX: h,
                    plotY: q,
                    negative: d.negative,
                    ttBelow: d.ttBelow,
                    h: b[2] || 0
                })), this.isHidden = !1))
            },
            renderSplit: function (c, h) {
                var e = this,
                    k = [],
                    q = this.chart,
                    d = q.renderer,
                    b = !0,
                    v = this.options,
                    f = 0,
                    l, t = this.getLabel(),
                    B = q.plotTop;
                a.isString(c) && (c = [!1, c]);
                F(c.slice(0, h.length + 1), function (a, c) {
                    if (!1 !== a) {
                        c = h[c - 1] || {
                            isHeader: !0,
                            plotX: h[0].plotX
                        };
                        var m = c.series || e,
                            A = m.tt,
                            p = c.series || {},
                            E = "highcharts-color-" + x(c.colorIndex, p.colorIndex, "none");
                        A || (m.tt = A = d.label(null, null,
                            null, "callout", null, null, v.useHTML).addClass("highcharts-tooltip-box " + E + (c.isHeader ? " highcharts-tooltip-header" : "")).attr({
                            padding: v.padding,
                            r: v.borderRadius,
                            fill: v.backgroundColor,
                            stroke: v.borderColor || c.color || p.color || "#333333",
                            "stroke-width": v.borderWidth
                        }).add(t));
                        A.isActive = !0;
                        A.attr({
                            text: a
                        });
                        A.css(v.style).shadow(v.shadow);
                        a = A.getBBox();
                        p = a.width + A.strokeWidth();
                        c.isHeader ? (f = a.height, q.xAxis[0].opposite && (l = !0, B -= f), p = Math.max(0, Math.min(c.plotX + q.plotLeft - p / 2, q.chartWidth + (q.scrollablePixels ?
                            q.scrollablePixels - q.marginRight : 0) - p))) : p = c.plotX + q.plotLeft - x(v.distance, 16) - p;
                        0 > p && (b = !1);
                        a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                        a -= B;
                        c.isHeader && (a = l ? -f : q.plotHeight + f);
                        k.push({
                            target: a,
                            rank: c.isHeader ? 1 : 0,
                            size: m.tt.getBBox().height + 1,
                            point: c,
                            x: p,
                            tt: A
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(k, q.plotHeight + f);
                F(k, function (a) {
                    var c = a.point,
                        d = c.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: b || c.isHeader ? a.x : c.plotX + q.plotLeft + x(v.distance, 16),
                        y: a.pos + B,
                        anchorX: c.isHeader ?
                            c.plotX + q.plotLeft : c.plotX + d.xAxis.pos,
                        anchorY: c.isHeader ? q.plotTop + q.plotHeight / 2 : c.plotY + d.yAxis.pos
                    })
                })
            },
            updatePosition: function (a) {
                var c = this.chart,
                    e = this.getLabel(),
                    k = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a),
                    q = a.plotX + c.plotLeft;
                a = a.plotY + c.plotTop;
                var d;
                this.outside && (d = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(e.width + d, e.height + d, !1), q += c.pointer.chartPosition.left - k.x, a += c.pointer.chartPosition.top - k.y);
                this.move(Math.round(k.x),
                    Math.round(k.y || 0), q, a)
            },
            getDateFormat: function (a, h, e, k) {
                var c = this.chart.time,
                    d = c.dateFormat("%m-%d %H:%M:%S.%L", h),
                    b, v, f = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    l = "millisecond";
                for (v in y) {
                    if (a === y.week && +c.dateFormat("%w", h) === e && "00:00:00.000" === d.substr(6)) {
                        v = "week";
                        break
                    }
                    if (y[v] > a) {
                        v = l;
                        break
                    }
                    if (f[v] && d.substr(f[v]) !== "01-01 00:00:00.000".substr(f[v])) break;
                    "week" !== v && (l = v)
                }
                v && (b = c.resolveDTLFormat(k[v]).main);
                return b
            },
            getXDateFormat: function (a, h, e) {
                h = h.dateTimeLabelFormats;
                var c =
                    e && e.closestPointRange;
                return (c ? this.getDateFormat(c, a.x, e.options.startOfWeek, h) : h.day) || h.year
            },
            tooltipFooterHeaderFormatter: function (a, h) {
                h = h ? "footer" : "header";
                var c = a.series,
                    k = c.tooltipOptions,
                    e = k.xDateFormat,
                    d = c.xAxis,
                    b = d && "datetime" === d.options.type && f(a.key),
                    v = k[h + "Format"];
                b && !e && (e = this.getXDateFormat(a, k, d));
                b && e && F(a.point && a.point.tooltipDateKeys || ["key"], function (a) {
                    v = v.replace("{point." + a + "}", "{point." + a + ":" + e + "}")
                });
                return n(v, {
                    point: a,
                    series: c
                }, this.chart.time)
            },
            bodyFormatter: function (a) {
                return e(a,
                    function (a) {
                        var c = a.series.tooltipOptions;
                        return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                    })
            }
        }
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.attr,
            I = a.charts,
            n = a.color,
            f = a.css,
            e = a.defined,
            u = a.each,
            x = a.extend,
            t = a.find,
            w = a.fireEvent,
            y = a.isNumber,
            c = a.isObject,
            h = a.offset,
            p = a.pick,
            k = a.splat,
            q = a.Tooltip;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick =
                    b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                q && (a.tooltip = new q(a, b.tooltip), this.followTouchMove = p(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function (a) {
                var b = this.chart,
                    c = b.options.chart,
                    d = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (d = p(c.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY = d = /y/.test(d);
                this.zoomHor = a && !b || d && b;
                this.zoomVert = d && !b || a && b;
                this.hasZoom = a || d
            },
            normalize: function (a, b) {
                var c;
                c = a.touches ? a.touches.length ? a.touches.item(0) :
                    a.changedTouches[0] : a;
                b || (this.chartPosition = b = h(this.chart.container));
                return x(a, {
                    chartX: Math.round(c.pageX - b.left),
                    chartY: Math.round(c.pageY - b.top)
                })
            },
            getCoordinates: function (a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                u(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function (a, b, k) {
                var d;
                u(a, function (a) {
                    var l = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(k, l);
                    if ((l = c(a,
                            !0)) && !(l = !c(d, !0))) var l = d.distX - a.distX,
                        e = d.dist - a.dist,
                        h = (a.series.group && a.series.group.zIndex) - (d.series.group && d.series.group.zIndex),
                        l = 0 < (0 !== l && b ? l : 0 !== e ? e : 0 !== h ? h : d.series.index > a.series.index ? -1 : 1);
                    l && (d = a)
                });
                return d
            },
            getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function (a, b) {
                var c = a.series,
                    d = c.xAxis,
                    c = c.yAxis,
                    k = p(a.clientX, a.plotX),
                    e = a.shapeArgs;
                if (d && c) return b ? {
                    chartX: d.len + d.pos - k,
                    chartY: c.len + c.pos - a.plotY
                } : {
                    chartX: k + d.pos,
                    chartY: a.plotY + c.pos
                };
                if (e && e.x && e.y) return {
                    chartX: e.x,
                    chartY: e.y
                }
            },
            getHoverData: function (d, b, k, e, l, h, q) {
                var v, m = [],
                    f = q && q.isBoosting;
                e = !(!e || !d);
                q = b && !b.stickyTracking ? [b] : a.grep(k, function (a) {
                    return a.visible && !(!l && a.directTouch) && p(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                b = (v = e ? d : this.findNearestKDPoint(q, l, h)) && v.series;
                v && (l && !b.noSharedTooltip ? (q = a.grep(k, function (a) {
                        return a.visible && !(!l && a.directTouch) && p(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                    }),
                    u(q, function (a) {
                        var b = t(a.points, function (a) {
                            return a.x === v.x && !a.isNull
                        });
                        c(b) && (f && (b = a.getPoint(b)), m.push(b))
                    })) : m.push(v));
                return {
                    hoverPoint: v,
                    hoverSeries: b,
                    hoverPoints: m
                }
            },
            runPointActions: function (c, b) {
                var d = this.chart,
                    k = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
                    l = k ? k.shared : !1,
                    e = b || d.hoverPoint,
                    h = e && e.series || d.hoverSeries,
                    h = this.getHoverData(e, h, d.series, "touchmove" !== c.type && (!!b || h && h.directTouch && this.isDirectTouch), l, c, {
                        isBoosting: d.isBoosting
                    }),
                    q, e = h.hoverPoint;
                q = h.hoverPoints;
                b = (h = h.hoverSeries) && h.tooltipOptions.followPointer;
                l = l && h && !h.noSharedTooltip;
                if (e && (e !== d.hoverPoint || k && k.isHidden)) {
                    u(d.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, q) && b.setState()
                    });
                    u(q || [], function (a) {
                        a.setState("hover")
                    });
                    if (d.hoverSeries !== h) h.onMouseOver();
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    if (!e.series) return;
                    e.firePointEvent("mouseOver");
                    d.hoverPoints = q;
                    d.hoverPoint = e;
                    k && k.refresh(l ? q : e, c)
                } else b && k && !k.isHidden && (e = k.getAnchor([{}], c), k.updatePosition({
                    plotX: e[0],
                    plotY: e[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = C(d.container.ownerDocument, "mousemove", function (b) {
                    var c = I[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                u(d.axes, function (b) {
                    var d = p(b.crosshair.snap, !0),
                        m = d ? a.find(q, function (a) {
                            return a.series[b.coll] === b
                        }) : void 0;
                    m || !d ? b.drawCrosshair(c, m) : b.hideCrosshair()
                })
            },
            reset: function (a, b) {
                var c = this.chart,
                    d = c.hoverSeries,
                    l = c.hoverPoint,
                    e = c.hoverPoints,
                    h = c.tooltip,
                    q = h && h.shared ? e : l;
                a && q && u(k(q), function (b) {
                    b.series.isCartesian && void 0 === b.plotX &&
                        (a = !1)
                });
                if (a) h && q && (h.refresh(q), h.shared && e ? u(e, function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                }) : l && (l.setState(l.state, !0), u(c.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, l)
                })));
                else {
                    if (l) l.onMouseOut();
                    e && u(e, function (a) {
                        a.setState()
                    });
                    if (d) d.onMouseOut();
                    h && h.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    u(c.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null
                }
            },
            scaleGroups: function (a, b) {
                var c = this.chart,
                    d;
                u(c.series, function (k) {
                    d = a || k.getPlotBox();
                    k.xAxis && k.xAxis.zoomEnabled && k.group && (k.group.attr(d), k.markerGroup && (k.markerGroup.attr(d), k.markerGroup.clip(b ? c.clipRect : null)), k.dataLabelsGroup && k.dataLabelsGroup.attr(d))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function (a) {
                var b =
                    this.chart,
                    c = b.options.chart,
                    d = a.chartX,
                    k = a.chartY,
                    e = this.zoomHor,
                    h = this.zoomVert,
                    q = b.plotLeft,
                    m = b.plotTop,
                    f = b.plotWidth,
                    A = b.plotHeight,
                    p, E = this.selectionMarker,
                    g = this.mouseDownX,
                    r = this.mouseDownY,
                    t = c.panKey && a[c.panKey + "Key"];
                E && E.touch || (d < q ? d = q : d > q + f && (d = q + f), k < m ? k = m : k > m + A && (k = m + A), this.hasDragged = Math.sqrt(Math.pow(g - d, 2) + Math.pow(r - k, 2)), 10 < this.hasDragged && (p = b.isInsidePlot(g - q, r - m), b.hasCartesianSeries && (this.zoomX || this.zoomY) && p && !t && !E && (this.selectionMarker = E = b.renderer.rect(q, m, e ? 1 : f,
                    h ? 1 : A, 0).attr({
                    fill: c.selectionMarkerFill || n("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), E && e && (d -= g, E.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + g
                })), E && h && (d = k - r, E.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + r
                })), p && !E && c.panning && b.pan(a, c.panning)))
            },
            drop: function (a) {
                var b = this,
                    c = this.chart,
                    d = this.hasPinched;
                if (this.selectionMarker) {
                    var k = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        h = this.selectionMarker,
                        q = h.attr ? h.attr("x") : h.x,
                        p = h.attr ? h.attr("y") : h.y,
                        m = h.attr ? h.attr("width") :
                        h.width,
                        G = h.attr ? h.attr("height") : h.height,
                        A;
                    if (this.hasDragged || d) u(c.axes, function (c) {
                        if (c.zoomEnabled && e(c.min) && (d || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [c.coll]])) {
                            var h = c.horiz,
                                g = "touchend" === a.type ? c.minPixelPadding : 0,
                                l = c.toValue((h ? q : p) + g),
                                h = c.toValue((h ? q + m : p + G) - g);
                            k[c.coll].push({
                                axis: c,
                                min: Math.min(l, h),
                                max: Math.max(l, h)
                            });
                            A = !0
                        }
                    }), A && w(c, "selection", k, function (a) {
                        c.zoom(x(a, d ? {
                            animation: !1
                        } : null))
                    });
                    y(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    d && this.scaleGroups()
                }
                c && y(c.index) &&
                    (f(c.container, {
                        cursor: c._cursor
                    }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function (c) {
                I[a.hoverChartIndex] && I[a.hoverChartIndex].pointer.drop(c)
            },
            onDocumentMouseMove: function (a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") ||
                    b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (c) {
                var b = I[a.hoverChartIndex];
                b && (c.relatedTarget || c.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (c) {
                var b = this.chart;
                e(a.hoverChartIndex) && I[a.hoverChartIndex] && I[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                c = this.normalize(c);
                c.returnValue = !1;
                "mousedown" === b.mouseIsDown && this.drag(c);
                !this.inClass(c.target, "highcharts-tracker") && !b.isInsidePlot(c.chartX -
                    b.plotLeft, c.chartY - b.plotTop) || b.openMenu || this.runPointActions(c)
            },
            inClass: function (a, b) {
                for (var c; a;) {
                    if (c = F(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function (a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    d = b.plotLeft,
                    k = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (w(c.series, "click", x(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (x(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - k) && w(b, "click", a)))
            },
            setDOMEvents: function () {
                var c = this,
                    b = c.chart.container,
                    k = b.ownerDocument;
                b.onmousedown = function (a) {
                    c.onContainerMouseDown(a)
                };
                b.onmousemove = function (a) {
                    c.onContainerMouseMove(a)
                };
                b.onclick = function (a) {
                    c.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = C(b, "mouseleave", c.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(k, "mouseup", c.onDocumentMouseUp));
                a.hasTouch && (b.ontouchstart = function (a) {
                    c.onContainerTouchStart(a)
                }, b.ontouchmove = function (a) {
                    c.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(k, "touchend", c.onDocumentTouchEnd)))
            },
            destroy: function () {
                var c = this;
                c.unDocMouseMove && c.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(c.tooltipTimeout);
                a.objectEach(c, function (a, d) {
                    c[d] = null
                })
            }
        }
    })(K);
    (function (a) {
        var C = a.charts,
            F = a.each,
            I = a.extend,
            n = a.map,
            f = a.noop,
            e = a.pick;
        I(a.Pointer.prototype, {
            pinchTranslate: function (a, e, f, n, y, c) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, e, f, n, y, c);
                this.zoomVert && this.pinchTranslateDirection(!1, a, e, f, n,
                    y, c)
            },
            pinchTranslateDirection: function (a, e, f, n, y, c, h, p) {
                var k = this.chart,
                    q = a ? "x" : "y",
                    d = a ? "X" : "Y",
                    b = "chart" + d,
                    v = a ? "width" : "height",
                    t = k["plot" + (a ? "Left" : "Top")],
                    l, u, B = p || 1,
                    D = k.inverted,
                    m = k.bounds[a ? "h" : "v"],
                    G = 1 === e.length,
                    A = e[0][b],
                    N = f[0][b],
                    E = !G && e[1][b],
                    g = !G && f[1][b],
                    r;
                f = function () {
                    !G && 20 < Math.abs(A - E) && (B = p || Math.abs(N - g) / Math.abs(A - E));
                    u = (t - N) / B + A;
                    l = k["plot" + (a ? "Width" : "Height")] / B
                };
                f();
                e = u;
                e < m.min ? (e = m.min, r = !0) : e + l > m.max && (e = m.max - l, r = !0);
                r ? (N -= .8 * (N - h[q][0]), G || (g -= .8 * (g - h[q][1])), f()) : h[q] = [N, g];
                D || (c[q] = u - t, c[v] = l);
                c = D ? 1 / B : B;
                y[v] = l;
                y[q] = e;
                n[D ? a ? "scaleY" : "scaleX" : "scale" + d] = B;
                n["translate" + d] = c * t + (N - c * A)
            },
            pinch: function (a) {
                var u = this,
                    t = u.chart,
                    w = u.pinchDown,
                    y = a.touches,
                    c = y.length,
                    h = u.lastValidTouch,
                    p = u.hasZoom,
                    k = u.selectionMarker,
                    q = {},
                    d = 1 === c && (u.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || u.runChartClick),
                    b = {};
                1 < c && (u.initiated = !0);
                p && u.initiated && !d && a.preventDefault();
                n(y, function (a) {
                    return u.normalize(a)
                });
                "touchstart" === a.type ? (F(y, function (a, b) {
                    w[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), h.x = [w[0].chartX, w[1] && w[1].chartX], h.y = [w[0].chartY, w[1] && w[1].chartY], F(t.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = t.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            d = a.toPixels(e(a.options.min, a.dataMin)),
                            k = a.toPixels(e(a.options.max, a.dataMax)),
                            h = Math.max(d, k);
                        b.min = Math.min(a.pos, Math.min(d, k) - c);
                        b.max = Math.max(a.pos + a.len, h + c)
                    }
                }), u.res = !0) : u.followTouchMove && 1 === c ? this.runPointActions(u.normalize(a)) : w.length && (k || (u.selectionMarker = k = I({
                    destroy: f,
                    touch: !0
                }, t.plotBox)), u.pinchTranslate(w,
                    y, q, k, b, h), u.hasPinched = p, u.scaleGroups(q, b), u.res && (u.res = !1, this.reset(!1, 0)))
            },
            touch: function (f, n) {
                var t = this.chart,
                    u, y;
                if (t.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = t.index;
                1 === f.touches.length ? (f = this.normalize(f), (y = t.isInsidePlot(f.chartX - t.plotLeft, f.chartY - t.plotTop)) && !t.openMenu ? (n && this.runPointActions(f), "touchmove" === f.type && (n = this.pinchDown, u = n[0] ? 4 <= Math.sqrt(Math.pow(n[0].chartX - f.chartX, 2) + Math.pow(n[0].chartY - f.chartY, 2)) : !1), e(u,
                    !0) && this.pinch(f)) : n && this.reset()) : 2 === f.touches.length && this.pinch(f)
            },
            onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function (a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function (e) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(e)
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.charts,
            I = a.css,
            n = a.doc,
            f = a.extend,
            e = a.noop,
            u = a.Pointer,
            x = a.removeEvent,
            t = a.win,
            w = a.wrap;
        if (!a.hasTouch && (t.PointerEvent || t.MSPointerEvent)) {
            var y = {},
                c = !!t.PointerEvent,
                h = function () {
                    var c = [];
                    c.item = function (a) {
                        return this[a]
                    };
                    a.objectEach(y, function (a) {
                        c.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return c
                },
                p = function (c, q, d, b) {
                    "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (b(c), b = F[a.hoverChartIndex].pointer, b[q]({
                        type: d,
                        target: c.currentTarget,
                        preventDefault: e,
                        touches: h()
                    }))
                };
            f(u.prototype, {
                onContainerPointerDown: function (a) {
                    p(a, "onContainerTouchStart", "touchstart", function (a) {
                        y[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function (a) {
                    p(a, "onContainerTouchMove", "touchmove", function (a) {
                        y[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        y[a.pointerId].target || (y[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function (a) {
                    p(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete y[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container, c ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, c ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(n, c ?
                        "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            w(u.prototype, "init", function (a, c, d) {
                a.call(this, c, d);
                this.hasZoom && I(c.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            w(u.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            w(u.prototype, "destroy", function (a) {
                this.batchMSEvents(x);
                a.call(this)
            })
        }
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.css,
            I = a.discardElement,
            n = a.defined,
            f = a.each,
            e = a.fireEvent,
            u = a.isFirefox,
            x = a.marginNames,
            t = a.merge,
            w = a.pick,
            y = a.setAnimation,
            c = a.stableSort,
            h = a.win,
            p = a.wrap;
        a.Legend = function (a, c) {
            this.init(a, c)
        };
        a.Legend.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), C(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = C(this.chart, "render", function () {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            },
            setOptions: function (a) {
                var c = w(a.padding, 8);
                this.options =
                    a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = t(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.symbolWidth = w(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function (a, c) {
                var d = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                w(c, !0) && d.redraw();
                e(this, "afterUpdate")
            },
            colorizeItem: function (a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var d = this.options,
                    b = a.legendItem,
                    k = a.legendLine,
                    h = a.legendSymbol,
                    l = this.itemHiddenStyle.color,
                    d = c ? d.itemStyle.color : l,
                    q = c ? a.color || l : l,
                    f = a.options && a.options.marker,
                    p = {
                        fill: q
                    };
                b && b.css({
                    fill: d,
                    color: d
                });
                k && k.attr({
                    stroke: q
                });
                h && (f && h.isMarker && (p = a.pointAttribs(), c || (p.stroke = p.fill = l)), h.attr(p));
                e(this, "afterColorizeItem", {
                    item: a,
                    visible: c
                })
            },
            positionItems: function () {
                f(this.allItems, this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function (a) {
                var c = this.options,
                    d = c.symbolPadding,
                    c = !c.rtl,
                    b = a._legendItemPos,
                    e = b[0],
                    b = b[1],
                    h = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[n(a.translateY) ? "animate" : "attr"]({
                    translateX: c ? e : this.legendWidth - e - 2 * d - 4,
                    translateY: b
                });
                h && (h.x = e, h.y = b)
            },
            destroyItem: function (a) {
                var c = a.checkbox;
                f(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (c) {
                    a[c] && (a[c] = a[c].destroy())
                });
                c && I(a.checkbox)
            },
            destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                f(this.getAllItems(), function (c) {
                    f(["legendItem", "legendGroup"],
                        a, c)
                });
                f("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr,
                    c, d = this.clipHeight || this.legendHeight,
                    b = this.titleHeight;
                a && (c = a.translateY, f(this.allItems, function (e) {
                    var h = e.checkbox,
                        k;
                    h && (k = c + b + h.y + (this.scrollOffset || 0) + 3, F(h, {
                        left: a.translateX + e.checkboxOffset + h.x - 20 + "px",
                        top: k + "px",
                        display: this.proximate || k > c - 6 && k < c + d - 6 ? "" : "none"
                    }))
                }, this))
            },
            renderTitle: function () {
                var a = this.options,
                    c = this.padding,
                    d = a.title,
                    b = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(d.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: b
                }));
                this.titleHeight = b
            },
            setText: function (c) {
                var h = this.options;
                c.legendItem.attr({
                    text: h.labelFormat ? a.format(h.labelFormat, c, this.chart.time) : h.labelFormatter.call(c)
                })
            },
            renderItem: function (a) {
                var c = this.chart,
                    d = c.renderer,
                    b =
                    this.options,
                    h = this.symbolWidth,
                    e = b.symbolPadding,
                    l = this.itemStyle,
                    k = this.itemHiddenStyle,
                    f = "horizontal" === b.layout ? w(b.itemDistance, 20) : 0,
                    p = !b.rtl,
                    m = a.legendItem,
                    G = !a.series,
                    A = !G && a.series.drawLegendSymbol ? a.series : a,
                    n = A.options,
                    n = this.createCheckboxForItem && n && n.showCheckbox,
                    f = h + e + f + (n ? 20 : 0),
                    E = b.useHTML,
                    g = a.options.className;
                m || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + A.type + "-series highcharts-color-" + a.colorIndex + (g ? " " + g : "") + (G ? " highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup),
                    a.legendItem = m = d.text("", p ? h + e : -e, this.baseline || 0, E).css(t(a.visible ? l : k)).attr({
                        align: p ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (h = l.fontSize, this.fontMetrics = d.fontMetrics(h, m), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, m.attr("y", this.baseline)), this.symbolHeight = b.symbolHeight || this.fontMetrics.f, A.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, m, E), n && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                l.width || m.css({
                    width: (b.itemWidth ||
                        b.width || c.spacingBox.width) - f
                });
                this.setText(a);
                c = m.getBBox();
                a.itemWidth = a.checkboxOffset = b.itemWidth || a.legendItemWidth || c.width + f;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || c.height || this.symbolHeight)
            },
            layoutItem: function (a) {
                var c = this.options,
                    d = this.padding,
                    b = "horizontal" === c.layout,
                    h = a.itemHeight,
                    e = c.itemMarginBottom || 0,
                    l = this.itemMarginTop,
                    k = b ? w(c.itemDistance, 20) : 0,
                    f = c.width,
                    p = f || this.chart.spacingBox.width -
                    2 * d - c.x,
                    c = c.alignColumns && this.totalItemWidth > p ? this.maxItemWidth : a.itemWidth;
                b && this.itemX - d + c > p && (this.itemX = d, this.itemY += l + this.lastLineHeight + e, this.lastLineHeight = 0);
                this.lastItemY = l + this.itemY + e;
                this.lastLineHeight = Math.max(h, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                b ? this.itemX += c : (this.itemY += l + h + e, this.lastLineHeight = h);
                this.offsetWidth = f || Math.max((b ? this.itemX - d - (a.checkbox ? 0 : k) : c) + d, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                f(this.chart.series, function (c) {
                    var d =
                        c && c.options;
                    c && w(d.showInLegend, n(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === d.legendType ? c.data : c)))
                });
                e(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function () {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function (a, c) {
                var d = this.chart,
                    b = this.options,
                    h = this.getAlignment();
                h && f([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e,
                    l) {
                    e.test(h) && !n(a[l]) && (d[x[l]] = Math.max(d[x[l]], d.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * b[l % 2 ? "x" : "y"] + w(b.margin, 12) + c[l] + (0 === l && void 0 !== d.options.title.margin ? d.titleOffset + d.options.title.margin : 0)))
                })
            },
            proximatePositions: function () {
                var c = this.chart,
                    h = [],
                    d = "left" === this.options.align;
                f(this.allItems, function (b) {
                    var e, k;
                    e = d;
                    b.xAxis && b.points && (b.xAxis.options.reversed && (e = !e), e = a.find(e ? b.points : b.points.slice(0).reverse(), function (b) {
                            return a.isNumber(b.plotY)
                        }), k = b.legendGroup.getBBox().height,
                        h.push({
                            target: b.visible ? (e ? e.plotY : b.xAxis.height) - .3 * k : c.plotHeight,
                            size: k,
                            item: b
                        }))
                }, this);
                a.distribute(h, c.plotHeight);
                f(h, function (a) {
                    a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos
                })
            },
            render: function () {
                var a = this.chart,
                    h = a.renderer,
                    d = this.group,
                    b, e, p, l = this.box,
                    n = this.options,
                    B = this.padding;
                this.itemX = B;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                d || (this.group = d = h.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = h.g().attr({
                    zIndex: 1
                }).add(d), this.scrollGroup = h.g().add(this.contentGroup));
                this.renderTitle();
                b = this.getAllItems();
                c(b, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                n.reversed && b.reverse();
                this.allItems = b;
                this.display = e = !!b.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                f(b, this.renderItem, this);
                f(b, this.layoutItem, this);
                b = (n.width || this.offsetWidth) + B;
                p = this.lastItemY + this.lastLineHeight + this.titleHeight;
                p = this.handleOverflow(p);
                p += B;
                l || (this.box = l = h.rect().addClass("highcharts-legend-box").attr({
                        r: n.borderRadius
                    }).add(d),
                    l.isNew = !0);
                l.attr({
                    stroke: n.borderColor,
                    "stroke-width": n.borderWidth || 0,
                    fill: n.backgroundColor || "none"
                }).shadow(n.shadow);
                0 < b && 0 < p && (l[l.isNew ? "attr" : "animate"](l.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: b,
                    height: p
                }, l.strokeWidth())), l.isNew = !1);
                l[e ? "show" : "hide"]();
                this.legendWidth = b;
                this.legendHeight = p;
                e && (h = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (h = t(h, {
                    y: h.y + a.titleOffset + a.options.title.margin
                })), d.align(t(n, {
                    width: b,
                    height: p,
                    verticalAlign: this.proximate ? "top" : n.verticalAlign
                }), !0, h));
                this.proximate ||
                    this.positionItems()
            },
            handleOverflow: function (a) {
                var c = this,
                    d = this.chart,
                    b = d.renderer,
                    h = this.options,
                    e = h.y,
                    l = this.padding,
                    d = d.spacingBox.height + ("top" === h.verticalAlign ? -e : e) - l,
                    e = h.maxHeight,
                    k, p = this.clipRect,
                    n = h.navigation,
                    m = w(n.animation, !0),
                    G = n.arrowSize || 12,
                    A = this.nav,
                    t = this.pages,
                    E, g = this.allItems,
                    r = function (a) {
                        "number" === typeof a ? p.attr({
                            height: a
                        }) : p && (c.clipRect = p.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + l + "px,9999px," + (l + a) + "px,0)" : "auto")
                    };
                "horizontal" !== h.layout || "middle" === h.verticalAlign || h.floating || (d /= 2);
                e && (d = Math.min(d, e));
                t.length = 0;
                a > d && !1 !== n.enabled ? (this.clipHeight = k = Math.max(d - 20 - this.titleHeight - l, 0), this.currentPage = w(this.currentPage, 1), this.fullHeight = a, f(g, function (a, b) {
                    var c = a._legendItemPos[1],
                        d = Math.round(a.legendItem.getBBox().height),
                        m = t.length;
                    if (!m || c - t[m - 1] > k && (E || c) !== t[m - 1]) t.push(E || c), m++;
                    a.pageIx = m - 1;
                    E && (g[b - 1].pageIx = m - 1);
                    b === g.length - 1 && c + d - t[m - 1] > k && (t.push(c), a.pageIx = m);
                    c !== E && (E = c)
                }), p || (p = c.clipRect =
                    b.clipRect(0, l, 9999, 0), c.contentGroup.clip(p)), r(k), A || (this.nav = A = b.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = b.symbol("triangle", 0, 0, G, G).on("click", function () {
                    c.scroll(-1, m)
                }).add(A), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation").css(n.style).add(A), this.down = b.symbol("triangle-down", 0, 0, G, G).on("click", function () {
                    c.scroll(1, m)
                }).add(A)), c.scroll(0), a = d) : A && (r(), this.nav = A.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function (a, c) {
                var d =
                    this.pages,
                    b = d.length;
                a = this.currentPage + a;
                var h = this.clipHeight,
                    e = this.options.navigation,
                    l = this.pager,
                    f = this.padding;
                a > b && (a = b);
                0 < a && (void 0 !== c && y(c, this.chart), this.nav.attr({
                        translateX: f,
                        translateY: h + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), l.attr({
                        text: a + "/" + b
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }),
                    this.up.attr({
                        fill: 1 === a ? e.inactiveColor : e.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === b ? e.inactiveColor : e.activeColor
                    }).css({
                        cursor: a === b ? "default" : "pointer"
                    }), this.scrollOffset = -d[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, c) {
                var d = a.symbolHeight,
                    b = a.options.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - d) / 2 :
                    0, a.baseline - d + 1, b ? d : a.symbolWidth, d, w(a.options.symbolRadius, d / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(c.legendGroup)
            },
            drawLineMarker: function (a) {
                var c = this.options,
                    d = c.marker,
                    b = a.symbolWidth,
                    h = a.symbolHeight,
                    e = h / 2,
                    l = this.chart.renderer,
                    f = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var k;
                k = {
                    "stroke-width": c.lineWidth || 0
                };
                c.dashStyle && (k.dashstyle = c.dashStyle);
                this.legendLine = l.path(["M", 0, a, "L", b, a]).addClass("highcharts-graph").attr(k).add(f);
                d && !1 !== d.enabled && b &&
                    (c = Math.min(w(d.radius, e), e), 0 === this.symbol.indexOf("url") && (d = t(d, {
                        width: h,
                        height: h
                    }), c = 0), this.legendSymbol = d = l.symbol(this.symbol, b / 2 - c, a - c, 2 * c, 2 * c, d).addClass("highcharts-point").add(f), d.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(h.navigator.userAgent) || u) && p(a.Legend.prototype, "positionItem", function (a, c) {
            var d = this,
                b = function () {
                    c._legendItemPos && a.call(d, c)
                };
            b();
            setTimeout(b)
        })
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.animate,
            I = a.animObject,
            n = a.attr,
            f = a.doc,
            e = a.Axis,
            u = a.createElement,
            x = a.defaultOptions,
            t = a.discardElement,
            w = a.charts,
            y = a.css,
            c = a.defined,
            h = a.each,
            p = a.extend,
            k = a.find,
            q = a.fireEvent,
            d = a.grep,
            b = a.isNumber,
            v = a.isObject,
            J = a.isString,
            l = a.Legend,
            L = a.marginNames,
            B = a.merge,
            D = a.objectEach,
            m = a.Pointer,
            G = a.pick,
            A = a.pInt,
            N = a.removeEvent,
            E = a.seriesTypes,
            g = a.splat,
            r = a.syncTimeout,
            M = a.win,
            O = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new O(a, b, c)
        };
        p(O.prototype, {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (J(a[0]) || a[0].nodeName) this.renderTo =
                    a.shift();
                this.init(a[0], a[1])
            },
            init: function (b, c) {
                var d, g, m = b.series,
                    h = b.plotOptions || {};
                q(this, "init", {
                    args: arguments
                }, function () {
                    b.series = null;
                    d = B(x, b);
                    for (g in d.plotOptions) d.plotOptions[g].tooltip = h[g] && B(h[g].tooltip) || void 0;
                    d.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    d.series = b.series = m;
                    this.userOptions = b;
                    var e = d.chart,
                        l = e.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = c;
                    this.isResizing = 0;
                    this.options =
                        d;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && a.keys(b.time).length ? new a.Time(b.time) : a.time;
                    this.hasCartesianSeries = e.showAxes;
                    var f = this;
                    f.index = w.length;
                    w.push(f);
                    a.chartCount++;
                    l && D(l, function (a, b) {
                        C(f, b, a)
                    });
                    f.xAxis = [];
                    f.yAxis = [];
                    f.pointCount = f.colorCounter = f.symbolCounter = 0;
                    q(f, "afterInit");
                    f.firstRender()
                })
            },
            initSeries: function (b) {
                var c = this.options.chart;
                (c = E[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function (a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function (b) {
                q(this, "beforeRedraw");
                var c = this.axes,
                    d = this.series,
                    g = this.pointer,
                    m = this.legend,
                    e = this.userOptions.legend,
                    l = this.isDirtyLegend,
                    f, A, k = this.hasCartesianSeries,
                    r = this.isDirtyBox,
                    G, v = this.renderer,
                    H = v.isHidden(),
                    E = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                H && this.temporaryDisplay();
                this.layOutTitles();
                for (b = d.length; b--;)
                    if (G = d[b], G.options.stacking && (f = !0, G.isDirty)) {
                        A = !0;
                        break
                    } if (A)
                    for (b = d.length; b--;) G = d[b], G.options.stacking && (G.isDirty = !0);
                h(d, function (a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), l = !0) : e && (e.labelFormatter || e.labelFormat) && (l = !0));
                    a.isDirtyData && q(a, "updatedData")
                });
                l && m && m.options.enabled && (m.render(), this.isDirtyLegend = !1);
                f && this.getStacks();
                k && h(c, function (a) {
                    a.updateNames();
                    a.updateYNames && a.updateYNames();
                    a.setScale()
                });
                this.getMargins();
                k && (h(c, function (a) {
                    a.isDirty && (r = !0)
                }), h(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, E.push(function () {
                        q(a, "afterSetExtremes", p(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (r || f) && a.redraw()
                }));
                r && this.drawChartBox();
                q(this, "predraw");
                h(d, function (a) {
                    (r || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                g && g.reset(!0);
                v.draw();
                q(this, "redraw");
                q(this, "render");
                H && this.temporaryDisplay(!0);
                h(E, function (a) {
                    a.call()
                })
            },
            get: function (a) {
                function b(b) {
                    return b.id ===
                        a || b.options && b.options.id === a
                }
                var c, d = this.series,
                    g;
                c = k(this.axes, b) || k(this.series, b);
                for (g = 0; !c && g < d.length; g++) c = k(d[g].points || [], b);
                return c
            },
            getAxes: function () {
                var a = this,
                    b = this.options,
                    c = b.xAxis = g(b.xAxis || {}),
                    b = b.yAxis = g(b.yAxis || {});
                q(this, "getAxes");
                h(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                h(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                h(c, function (b) {
                    new e(a, b)
                });
                q(this, "afterGetAxes")
            },
            getSelectedPoints: function () {
                var a = [];
                h(this.series, function (b) {
                    a = a.concat(d(b.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function () {
                return d(this.series, function (a) {
                    return a.selected
                })
            },
            setTitle: function (a, b, c) {
                var d = this,
                    g = d.options,
                    m;
                m = g.title = B({
                    style: {
                        color: "#333333",
                        fontSize: g.isStock ? "16px" : "18px"
                    }
                }, g.title, a);
                g = g.subtitle = B({
                    style: {
                        color: "#666666"
                    }
                }, g.subtitle, b);
                h([
                    ["title", a, m],
                    ["subtitle", b, g]
                ], function (a, b) {
                    var c = a[0],
                        g = d[c],
                        m = a[1];
                    a = a[2];
                    g && m && (d[c] = g = g.destroy());
                    a && !g && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                            align: a.align,
                            "class": "highcharts-" + c,
                            zIndex: a.zIndex || 4
                        }).add(),
                        d[c].update = function (a) {
                            d.setTitle(!b && a, b && a)
                        }, d[c].css(a.style))
                });
                d.layOutTitles(c)
            },
            layOutTitles: function (a) {
                var b = 0,
                    c, d = this.renderer,
                    g = this.spacingBox;
                h(["title", "subtitle"], function (a) {
                    var c = this[a],
                        m = this.options[a];
                    a = "title" === a ? -3 : m.verticalAlign ? 0 : b + 2;
                    var h;
                    c && (h = m.style.fontSize, h = d.fontMetrics(h, c).b, c.css({
                        width: (m.width || g.width + m.widthAdjust) + "px"
                    }).align(p({
                        y: a + h
                    }, m), !1, "spacingBox"), m.floating || m.verticalAlign || (b = Math.ceil(b + c.getBBox(m.useHTML).height)))
                }, this);
                c = this.titleOffset !==
                    b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var b = this.options.chart,
                    d = b.width,
                    b = b.height,
                    g = this.renderTo;
                c(d) || (this.containerWidth = a.getStyle(g, "width"));
                c(b) || (this.containerHeight = a.getStyle(g, "height"));
                this.chartWidth = Math.max(0, d || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (f.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        f.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, f.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                                display: c.style.display,
                                height: c.style.height,
                                overflow: c.style.overflow
                            }, b = {
                                display: "block",
                                overflow: "hidden"
                            }, c !== this.renderTo &&
                            (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === f.body) break
                    }
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function () {
                var c, d = this.options,
                    g = d.chart,
                    m, h;
                c = this.renderTo;
                var e = a.uniqueKey(),
                    l;
                c || (this.renderTo = c = g.renderTo);
                J(c) && (this.renderTo = c = f.getElementById(c));
                c || a.error(13, !0);
                m = A(n(c, "data-highcharts-chart"));
                b(m) && w[m] && w[m].hasRendered && w[m].destroy();
                n(c, "data-highcharts-chart",
                    this.index);
                c.innerHTML = "";
                g.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                m = this.chartWidth;
                h = this.chartHeight;
                l = p({
                    position: "relative",
                    overflow: "hidden",
                    width: m + "px",
                    height: h + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, g.style);
                this.container = c = u("div", {
                    id: e
                }, l, c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[g.renderer] || a.Renderer)(c, m, h, null, g.forExport, d.exporting && d.exporting.allowHTML);
                this.setClassName(g.className);
                this.renderer.setStyle(g.style);
                this.renderer.chartIndex = this.index;
                q(this, "afterGetContainer")
            },
            getMargins: function (a) {
                var b = this.spacing,
                    d = this.margin,
                    g = this.titleOffset;
                this.resetMargins();
                g && !c(d[0]) && (this.plotTop = Math.max(this.plotTop, g + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(d, b);
                q(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    d = a.margin;
                a.hasCartesianSeries && h(a.axes, function (a) {
                    a.visible &&
                        a.getOffset()
                });
                h(L, function (g, m) {
                    c(d[m]) || (a[g] += b[m])
                });
                a.setChartSize()
            },
            reflow: function (b) {
                var d = this,
                    g = d.options.chart,
                    m = d.renderTo,
                    h = c(g.width) && c(g.height),
                    e = g.width || a.getStyle(m, "width"),
                    g = g.height || a.getStyle(m, "height"),
                    m = b ? b.target : M;
                if (!h && !d.isPrinting && e && g && (m === M || m === f)) {
                    if (e !== d.containerWidth || g !== d.containerHeight) a.clearTimeout(d.reflowTimeout), d.reflowTimeout = r(function () {
                        d.container && d.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    d.containerWidth = e;
                    d.containerHeight = g
                }
            },
            setReflow: function (a) {
                var b =
                    this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = C(M, "resize", function (a) {
                    b.reflow(a)
                }), C(this, "destroy", this.unbindReflow))
            },
            setSize: function (b, c, d) {
                var g = this,
                    m = g.renderer;
                g.isResizing += 1;
                a.setAnimation(d, g);
                g.oldChartHeight = g.chartHeight;
                g.oldChartWidth = g.chartWidth;
                void 0 !== b && (g.options.chart.width = b);
                void 0 !== c && (g.options.chart.height = c);
                g.getChartSize();
                b = m.globalAnimation;
                (b ? F : y)(g.container, {
                    width: g.chartWidth + "px",
                    height: g.chartHeight +
                        "px"
                }, b);
                g.setChartSize(!0);
                m.setSize(g.chartWidth, g.chartHeight, d);
                h(g.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                g.isDirtyLegend = !0;
                g.isDirtyBox = !0;
                g.layOutTitles();
                g.getMargins();
                g.redraw(d);
                g.oldChartHeight = null;
                q(g, "resize");
                r(function () {
                    g && q(g, "endResize", null, function () {
                        --g.isResizing
                    })
                }, I(b).duration)
            },
            setChartSize: function (a) {
                var b = this.inverted,
                    c = this.renderer,
                    g = this.chartWidth,
                    d = this.chartHeight,
                    m = this.options.chart,
                    e = this.spacing,
                    l = this.clipOffset,
                    f, A, k, r;
                this.plotLeft = f = Math.round(this.plotLeft);
                this.plotTop = A = Math.round(this.plotTop);
                this.plotWidth = k = Math.max(0, Math.round(g - f - this.marginRight));
                this.plotHeight = r = Math.max(0, Math.round(d - A - this.marginBottom));
                this.plotSizeX = b ? r : k;
                this.plotSizeY = b ? k : r;
                this.plotBorderWidth = m.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: e[3],
                    y: e[0],
                    width: g - e[3] - e[1],
                    height: d - e[0] - e[2]
                };
                this.plotBox = c.plotBox = {
                    x: f,
                    y: A,
                    width: k,
                    height: r
                };
                g = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(g, l[3]) / 2);
                c = Math.ceil(Math.max(g, l[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(g, l[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(g, l[2]) / 2 - c))
                };
                a || h(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                q(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function () {
                var a = this,
                    b = a.options.chart;
                h(["margin", "spacing"], function (c) {
                    var g = b[c],
                        d = v(g) ? g : [g, g, g, g];
                    h(["Top", "Right", "Bottom", "Left"], function (g, m) {
                        a[c][m] = G(b[c + g], d[m])
                    })
                });
                h(L, function (b, c) {
                    a[b] = G(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0,
                    0
                ];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    g = this.chartHeight,
                    d = this.chartBackground,
                    m = this.plotBackground,
                    h = this.plotBorder,
                    e, l = this.plotBGImage,
                    f = a.backgroundColor,
                    A = a.plotBackgroundColor,
                    k = a.plotBackgroundImage,
                    r, p = this.plotLeft,
                    G = this.plotTop,
                    v = this.plotWidth,
                    E = this.plotHeight,
                    n = this.plotBox,
                    B = this.clipRect,
                    t = this.clipBox,
                    u = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), u = "attr");
                e = a.borderWidth ||
                    0;
                r = e + (a.shadow ? 8 : 0);
                f = {
                    fill: f || "none"
                };
                if (e || d["stroke-width"]) f.stroke = a.borderColor, f["stroke-width"] = e;
                d.attr(f).shadow(a.shadow);
                d[u]({
                    x: r / 2,
                    y: r / 2,
                    width: c - r - e % 2,
                    height: g - r - e % 2,
                    r: a.borderRadius
                });
                u = "animate";
                m || (u = "attr", this.plotBackground = m = b.rect().addClass("highcharts-plot-background").add());
                m[u](n);
                m.attr({
                    fill: A || "none"
                }).shadow(a.plotShadow);
                k && (l ? l.animate(n) : this.plotBGImage = b.image(k, p, G, v, E).add());
                B ? B.animate({
                    width: t.width,
                    height: t.height
                }) : this.clipRect = b.clipRect(t);
                u = "animate";
                h || (u = "attr", this.plotBorder = h = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                h.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                h[u](h.crisp({
                    x: p,
                    y: G,
                    width: v,
                    height: E
                }, -h.strokeWidth()));
                this.isDirtyBox = !1;
                q(this, "afterDrawChartBox")
            },
            propFromSeries: function () {
                var a = this,
                    b = a.options.chart,
                    c, g = a.options.series,
                    d, m;
                h(["inverted", "angular", "polar"], function (h) {
                    c = E[b.type || b.defaultSeriesType];
                    m = b[h] || c && c.prototype[h];
                    for (d = g && g.length; !m && d--;)(c =
                        E[g[d].type]) && c.prototype[h] && (m = !0);
                    a[h] = m
                })
            },
            linkSeries: function () {
                var a = this,
                    b = a.series;
                h(b, function (a) {
                    a.linkedSeries.length = 0
                });
                h(b, function (b) {
                    var c = b.options.linkedTo;
                    J(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = G(b.options.visible, c.options.visible, b.visible))
                });
                q(this, "afterLinkSeries")
            },
            renderSeries: function () {
                h(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function () {
                var a = this,
                    b = a.options.labels;
                b.items && h(b.items, function (c) {
                    var g = p(b.style, c.style),
                        d = A(g.left) + a.plotLeft,
                        m = A(g.top) + a.plotTop + 12;
                    delete g.left;
                    delete g.top;
                    a.renderer.text(c.html, d, m).attr({
                        zIndex: 2
                    }).css(g).add()
                })
            },
            render: function () {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    g, d, m;
                this.setTitle();
                this.legend = new l(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                g = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                h(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                d = 1.1 < c / this.plotWidth;
                m = 1.05 < g / this.plotHeight;
                if (d || m) h(a, function (a) {
                    (a.horiz && d || !a.horiz && m) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && h(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function (a) {
                var b = this;
                a = B(!0, this.options.credits, a);
                a.enabled &&
                    !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        a.href && (M.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                        b.credits = b.credits.destroy();
                        b.addCredits(a)
                    })
            },
            destroy: function () {
                var b = this,
                    c = b.axes,
                    g = b.series,
                    d = b.container,
                    m, e = d && d.parentNode;
                q(b, "destroy");
                b.renderer.forExport ? a.erase(w, b) : w[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                N(b);
                for (m = c.length; m--;) c[m] = c[m].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (m = g.length; m--;) g[m] = g[m].destroy();
                h("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                d && (d.innerHTML = "", N(d), e && t(d));
                D(b, function (a, c) {
                    delete b[c]
                })
            },
            firstRender: function () {
                var a = this,
                    b = a.options;
                if (!a.isReadyToRender ||
                    a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    h(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    q(a, "beforeRender");
                    m && (a.pointer = new m(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function () {
                h([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                q(this, "load");
                q(this, "render");
                c(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.Chart,
            I = a.each;
        C(F, "afterSetChartSize", function (n) {
            var f = this.options.chart.scrollablePlotArea;
            (f = f && f.minWidth) && !this.renderer.forExport && (this.scrollablePixels = f = Math.max(0, f - this.chartWidth)) && (this.plotWidth += f, this.clipBox.width += f, n.skipAxes || I(this.axes, function (e) {
                1 === e.side ? e.getPlotLinePath = function () {
                        var f = this.right,
                            n;
                        this.right = f - e.chart.scrollablePixels;
                        n = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this.right = f;
                        return n
                    } :
                    (e.setAxisSize(), e.setAxisTranslation())
            }))
        });
        C(F, "render", function () {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        F.prototype.setUpScrolling = function () {
            this.scrollingContainer = a.createElement("div", {
                className: "highcharts-scrolling"
            }, {
                overflowX: "auto",
                WebkitOverflowScrolling: "touch"
            }, this.renderTo);
            this.innerContainer = a.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        F.prototype.applyFixed = function () {
            var n = this.container,
                f, e, u = !this.fixedDiv;
            u && (this.fixedDiv = a.createElement("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.fixedRenderer = f = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = f.path().attr({
                    fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(),
                a.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"], function (e) {
                    a.each(n.querySelectorAll(e), function (a) {
                        (a.namespaceURI === f.SVG_NS ? f.box : f.box.parentNode).appendChild(a);
                        a.style.pointerEvents = "auto"
                    })
                }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            e = this.chartWidth +
                this.scrollablePixels;
            a.stop(this.container);
            this.container.style.width = e + "px";
            this.renderer.boxWrapper.attr({
                width: e,
                height: this.chartHeight,
                viewBox: [0, 0, e, this.chartHeight].join(" ")
            });
            this.chartBackground.attr({
                width: e
            });
            u && (e = this.options.chart.scrollablePlotArea, e.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * e.scrollPositionX));
            u = this.axisOffset;
            e = this.plotTop - u[0] - 1;
            var u = this.plotTop + this.plotHeight + u[2],
                x = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({
                d: this.scrollablePixels ? ["M", 0, e, "L", this.plotLeft - 1, e, "L", this.plotLeft - 1, u, "L", 0, u, "Z", "M", x, e, "L", this.chartWidth, e, "L", this.chartWidth, u, "L", x, u, "Z"] : ["M", 0, 0]
            })
        }
    })(K);
    (function (a) {
        var C, F = a.each,
            I = a.extend,
            n = a.erase,
            f = a.fireEvent,
            e = a.format,
            u = a.isArray,
            x = a.isNumber,
            t = a.pick,
            w = a.uniqueKey,
            y = a.defined,
            c = a.removeEvent;
        a.Point = C = function () {};
        a.Point.prototype = {
            init: function (a, c, e) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(c, e);
                this.id = y(this.id) ? this.id : w();
                a.options.colorByPoint ? (c = a.options.colors || a.chart.options.colors,
                    this.color = this.color || c[a.colorCounter], c = c.length, e = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : e = a.colorIndex;
                this.colorIndex = t(this.colorIndex, e);
                a.chart.pointCount++;
                f(this, "afterInit");
                return this
            },
            applyOptions: function (a, c) {
                var e = this.series,
                    h = e.options.pointValKey || e.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                I(this, a);
                this.options = this.options ? I(this.options, a) : a;
                a.group && delete this.group;
                a.dataLabels && delete this.dataLabels;
                h && (this.y = this[h]);
                this.isNull =
                    t(this.isValid && !this.isValid(), null === this.x || !x(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
                void 0 === this.x && e && (this.x = void 0 === c ? e.autoIncrement(this) : c);
                return this
            },
            setNestedProperty: function (c, e, f) {
                f = f.split(".");
                a.reduce(f, function (c, d, b, h) {
                    c[d] = h.length - 1 === b ? e : a.isObject(c[d], !0) ? c[d] : {};
                    return c[d]
                }, c);
                return c
            },
            optionsToObject: function (c) {
                var e = {},
                    h = this.series,
                    f = h.options.keys,
                    d = f || h.pointArrayMap || ["y"],
                    b = d.length,
                    v = 0,
                    n = 0;
                if (x(c) || null === c) e[d[0]] = c;
                else if (u(c))
                    for (!f && c.length > b && (h = typeof c[0], "string" === h ? e.name = c[0] : "number" === h && (e.x = c[0]), v++); n < b;) f && void 0 === c[v] || (0 < d[n].indexOf(".") ? a.Point.prototype.setNestedProperty(e, c[v], d[n]) : e[d[n]] = c[v]), v++, n++;
                else "object" === typeof c && (e = c, c.dataLabels && (h._hasPointLabels = !0), c.marker && (h._hasPointMarkers = !0));
                return e
            },
            getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" :
                    "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function () {
                var a = this.series,
                    c = a.zones,
                    a = a.zoneAxis || "y",
                    e = 0,
                    f;
                for (f = c[e]; this[a] >= f.value;) f = c[++e];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = f && f.color && !this.options.color ? f.color : this.nonZonedColor;
                return f
            },
            destroy: function () {
                var a = this.series.chart,
                    e = a.hoverPoints,
                    f;
                a.pointCount--;
                e && (this.setState(), n(e, this), e.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel || this.dataLabels) c(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (f in this) this[f] = null
            },
            destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], c, e = 6; e--;) c = a[e], this[c] && (this[c] = this[c].destroy());
                this.dataLabels &&
                    (F(this.dataLabels, function (a) {
                        a.element && a.destroy()
                    }), delete this.dataLabels);
                this.connectors && (F(this.connectors, function (a) {
                    a.element && a.destroy()
                }), delete this.connectors)
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (a) {
                var c = this.series,
                    h = c.tooltipOptions,
                    f = t(h.valueDecimals, ""),
                    d = h.valuePrefix ||
                    "",
                    b = h.valueSuffix || "";
                F(c.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (d || b) a = a.replace(RegExp(c + "}", "g"), d + c + "}" + b);
                    a = a.replace(RegExp(c + "}", "g"), c + ":,." + f + "f}")
                });
                return e(a, {
                    point: this,
                    series: this.series
                }, c.chart.time)
            },
            firePointEvent: function (a, c, e) {
                var h = this,
                    d = this.series.options;
                (d.point.events[a] || h.options && h.options.events && h.options.events[a]) && this.importEvents();
                "click" === a && d.allowPointSelect && (e = function (a) {
                    h.select && h.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                f(this, a,
                    c, e)
            },
            visible: !0
        }
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.animObject,
            I = a.arrayMax,
            n = a.arrayMin,
            f = a.correctFloat,
            e = a.defaultOptions,
            u = a.defaultPlotOptions,
            x = a.defined,
            t = a.each,
            w = a.erase,
            y = a.extend,
            c = a.fireEvent,
            h = a.grep,
            p = a.isArray,
            k = a.isNumber,
            q = a.isString,
            d = a.merge,
            b = a.objectEach,
            v = a.pick,
            J = a.removeEvent,
            l = a.splat,
            L = a.SVGElement,
            B = a.syncTimeout,
            D = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {}
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, d) {
                var m = this,
                    e, h = a.series,
                    g;
                m.chart = a;
                m.options = d = m.setOptions(d);
                m.linkedSeries = [];
                m.bindAxes();
                y(m, {
                    name: d.name,
                    state: "",
                    visible: !1 !== d.visible,
                    selected: !0 === d.selected
                });
                e = d.events;
                b(e, function (a, b) {
                    C(m, b, a)
                });
                if (e && e.click || d.point && d.point.events && d.point.events.click || d.allowPointSelect) a.runTrackerClick = !0;
                m.getColor();
                m.getSymbol();
                t(m.parallelArrays, function (a) {
                    m[a + "Data"] = []
                });
                m.setData(d.data, !1);
                m.isCartesian && (a.hasCartesianSeries = !0);
                h.length && (g = h[h.length - 1]);
                m._i = v(g && g._i, -1) + 1;
                a.orderSeries(this.insert(h));
                c(this, "afterInit")
            },
            insert: function (a) {
                var b = this.options.index,
                    c;
                if (k(b)) {
                    for (c = a.length; c--;)
                        if (b >= v(a[c].options.index, a[c]._i)) {
                            a.splice(c +
                                1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return v(c, a.length - 1)
            },
            bindAxes: function () {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                t(b.axisTypes || [], function (m) {
                    t(d[m], function (a) {
                        e = a.options;
                        if (c[m] === e.index || void 0 !== c[m] && c[m] === e.id || void 0 === c[m] && 0 === e.index) b.insert(a.series), b[m] = a, a.isDirty = !0
                    });
                    b[m] || b.optionalAxis === m || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var c = a.series,
                    d = arguments,
                    m = k(b) ? function (g) {
                        var d = "y" === g && c.toYData ? c.toYData(a) : a[g];
                        c[g + "Data"][b] =
                            d
                    } : function (a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                t(c.parallelArrays, m)
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    e = this.chart.time,
                    b = v(b, a.pointStart, 0);
                this.pointInterval = c = v(this.pointInterval, a.pointInterval, 1);
                d && (a = new e.Date(b), "day" === d ? e.set("Date", a, e.get("Date", a) + c) : "month" === d ? e.set("Month", a, e.get("Month", a) + c) : "year" === d && e.set("FullYear", a, e.get("FullYear", a) + c), c = a.getTime() - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart,
                    m = b.options,
                    h = m.plotOptions,
                    f = (b.userOptions || {}).plotOptions || {},
                    g = h[this.type];
                this.userOptions = a;
                b = d(g, h.series, a);
                this.tooltipOptions = d(e.tooltip, e.plotOptions.series && e.plotOptions.series.tooltip, e.plotOptions[this.type].tooltip, m.tooltip.userOptions, h.series && h.series.tooltip, h[this.type].tooltip, a.tooltip);
                this.stickyTracking = v(a.stickyTracking, f[this.type] && f[this.type].stickyTracking, f.series && f.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ?
                    !0 : b.stickyTracking);
                null === g.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative",
                    color: b.negativeColor,
                    fillColor: b.negativeFillColor
                });
                a.length && x(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                c(this, "afterSetOptions", {
                    options: b
                });
                return b
            },
            getName: function () {
                return this.name || "Series " + (this.index +
                    1)
            },
            getCyclic: function (a, b, c) {
                var d, e = this.chart,
                    g = this.userOptions,
                    m = a + "Index",
                    h = a + "Counter",
                    f = c ? c.length : v(e.options.chart[a + "Count"], e[a + "Count"]);
                b || (d = v(g[m], g["_" + m]), x(d) || (e.series.length || (e[h] = 0), g["_" + m] = d = e[h] % f, e[h] += 1), c && (b = c[d]));
                void 0 !== d && (this[m] = d);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || u[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol,
                    this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function (b) {
                var c = this.options,
                    d = this.points,
                    e = [],
                    m, g, h, f = this.requireSorting;
                t(b, function (b) {
                    var g;
                    g = a.defined(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b).x;
                    k(g) && (g = a.inArray(g, this.xData, h), -1 === g || d[g].touched ? e.push(b) : b !== c.data[g] ? (d[g].update(b, !1, null, !1), d[g].touched = !0, f && (h = g + 1)) : d[g] && (d[g].touched = !0), m = !0)
                }, this);
                if (m)
                    for (b = d.length; b--;) g = d[b], g.touched || g.remove(!1),
                        g.touched = !1;
                else if (b.length === d.length) t(b, function (a, b) {
                    d[b].update && a !== c.data[b] && d[b].update(a, !1, null, !1)
                });
                else return !1;
                t(e, function (a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            },
            setData: function (b, c, d, e) {
                var m = this,
                    g = m.points,
                    h = g && g.length || 0,
                    f, l = m.options,
                    A = m.chart,
                    G = null,
                    n = m.xAxis,
                    B = l.turboThreshold,
                    u = this.xData,
                    D = this.yData,
                    y = (f = m.pointArrayMap) && f.length,
                    N;
                b = b || [];
                f = b.length;
                c = v(c, !0);
                !1 !== e && f && h && !m.cropped && !m.hasGroupedData && m.visible && !m.isSeriesBoosting && (N = this.updateData(b));
                if (!N) {
                    m.xIncrement =
                        null;
                    m.colorCounter = 0;
                    t(this.parallelArrays, function (a) {
                        m[a + "Data"].length = 0
                    });
                    if (B && f > B) {
                        for (d = 0; null === G && d < f;) G = b[d], d++;
                        if (k(G))
                            for (d = 0; d < f; d++) u[d] = this.autoIncrement(), D[d] = b[d];
                        else if (p(G))
                            if (y)
                                for (d = 0; d < f; d++) G = b[d], u[d] = G[0], D[d] = G.slice(1, y + 1);
                            else
                                for (d = 0; d < f; d++) G = b[d], u[d] = G[0], D[d] = G[1];
                        else a.error(12)
                    } else
                        for (d = 0; d < f; d++) void 0 !== b[d] && (G = {
                            series: m
                        }, m.pointClass.prototype.applyOptions.apply(G, [b[d]]), m.updateParallelArrays(G, d));
                    D && q(D[0]) && a.error(14, !0);
                    m.data = [];
                    m.options.data =
                        m.userOptions.data = b;
                    for (d = h; d--;) g[d] && g[d].destroy && g[d].destroy();
                    n && (n.minRange = n.userMinRange);
                    m.isDirty = A.isDirtyBox = !0;
                    m.isDirtyData = !!g;
                    d = !1
                }
                "point" === l.legendType && (this.processData(), this.generatePoints());
                c && A.redraw(d)
            },
            processData: function (b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    m;
                m = 0;
                var g, h, f = this.xAxis,
                    l, k = this.options;
                l = k.cropThreshold;
                var p = this.getExtremesFromAll || k.getExtremesFromAll,
                    q = this.isCartesian,
                    k = f && f.val2lin,
                    v = f && f.isLog,
                    n = this.requireSorting,
                    B, t;
                if (q && !this.isDirty &&
                    !f.isDirty && !this.yAxis.isDirty && !b) return !1;
                f && (b = f.getExtremes(), B = b.min, t = b.max);
                q && this.sorted && !p && (!l || e > l || this.forceCrop) && (c[e - 1] < B || c[0] > t ? (c = [], d = []) : this.yData && (c[0] < B || c[e - 1] > t) && (m = this.cropData(this.xData, this.yData, B, t), c = m.xData, d = m.yData, m = m.start, g = !0));
                for (l = c.length || 1; --l;) e = v ? k(c[l]) - k(c[l - 1]) : c[l] - c[l - 1], 0 < e && (void 0 === h || e < h) ? h = e : 0 > e && n && (a.error(15), n = !1);
                this.cropped = g;
                this.cropStart = m;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = h
            },
            cropData: function (a,
                b, c, d, e) {
                var g = a.length,
                    m = 0,
                    h = g,
                    f;
                e = v(e, this.cropShoulder, 1);
                for (f = 0; f < g; f++)
                    if (a[f] >= c) {
                        m = Math.max(0, f - e);
                        break
                    } for (c = f; c < g; c++)
                    if (a[c] > d) {
                        h = c + e;
                        break
                    } return {
                    xData: a.slice(m, h),
                    yData: b.slice(m, h),
                    start: m,
                    end: h
                }
            },
            generatePoints: function () {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    d, e = this.processedXData,
                    g = this.processedYData,
                    h = this.pointClass,
                    f = e.length,
                    k = this.cropStart || 0,
                    p, q = this.hasGroupedData,
                    a = a.keys,
                    v, n = [],
                    B;
                c || q || (c = [], c.length = b.length, c = this.data = c);
                a && q && (this.options.keys = !1);
                for (B = 0; B < f; B++) p =
                    k + B, q ? (v = (new h).init(this, [e[B]].concat(l(g[B]))), v.dataGroup = this.groupMap[B], v.dataGroup.options && (v.options = v.dataGroup.options, y(v, v.dataGroup.options))) : (v = c[p]) || void 0 === b[p] || (c[p] = v = (new h).init(this, b[p], e[B])), v && (v.index = p, n[B] = v);
                this.options.keys = a;
                if (c && (f !== (d = c.length) || q))
                    for (B = 0; B < d; B++) B !== k || q || (B += f), c[B] && (c[B].destroyElements(), c[B].plotX = void 0);
                this.data = c;
                this.points = n
            },
            getExtremes: function (a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    d, e = [],
                    g = 0;
                d = this.xAxis.getExtremes();
                var m = d.min,
                    h = d.max,
                    f, l, q = this.requireSorting ? 1 : 0,
                    v, B;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (B = 0; B < d; B++)
                    if (l = c[B], v = a[B], f = (k(v, !0) || p(v)) && (!b.positiveValuesOnly || v.length || 0 < v), l = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[B + q] || l) >= m && (c[B - q] || l) <= h, f && l)
                        if (f = v.length)
                            for (; f--;) "number" === typeof v[f] && (e[g++] = v[f]);
                        else e[g++] = v;
                this.dataMin = n(e);
                this.dataMax = I(e)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    d = this.xAxis,
                    e = d.categories,
                    h = this.yAxis,
                    g = this.points,
                    l = g.length,
                    p = !!this.modifyValue,
                    q = a.pointPlacement,
                    B = "between" === q || k(q),
                    n = a.threshold,
                    t = a.startFromThreshold ? n : 0,
                    u, D, y, w, J = Number.MAX_VALUE;
                "between" === q && (q = .5);
                k(q) && (q *= v(a.pointRange || d.pointRange));
                for (a = 0; a < l; a++) {
                    var L = g[a],
                        C = L.x,
                        F = L.y;
                    D = L.low;
                    var I = b && h.stacks[(this.negStacks && F < (t ? 0 : n) ? "-" : "") + this.stackKey],
                        K;
                    h.positiveValuesOnly && null !== F && 0 >= F && (L.isNull = !0);
                    L.plotX = u = f(Math.min(Math.max(-1E5, d.translate(C,
                        0, 0, 0, 1, q, "flags" === this.type)), 1E5));
                    b && this.visible && !L.isNull && I && I[C] && (w = this.getStackIndicator(w, C, this.index), K = I[C], F = K.points[w.key], D = F[0], F = F[1], D === t && w.key === I[C].base && (D = v(k(n) && n, h.min)), h.positiveValuesOnly && 0 >= D && (D = null), L.total = L.stackTotal = K.total, L.percentage = K.total && L.y / K.total * 100, L.stackY = F, K.setOffset(this.pointXOffset || 0, this.barW || 0));
                    L.yBottom = x(D) ? Math.min(Math.max(-1E5, h.translate(D, 0, 1, 0, 1)), 1E5) : null;
                    p && (F = this.modifyValue(F, L));
                    L.plotY = D = "number" === typeof F && Infinity !==
                        F ? Math.min(Math.max(-1E5, h.translate(F, 0, 1, 0, 1)), 1E5) : void 0;
                    L.isInside = void 0 !== D && 0 <= D && D <= h.len && 0 <= u && u <= d.len;
                    L.clientX = B ? f(d.translate(C, 0, 0, 0, 1, q)) : u;
                    L.negative = L.y < (n || 0);
                    L.category = e && void 0 !== e[L.x] ? e[L.x] : L.x;
                    L.isNull || (void 0 !== y && (J = Math.min(J, Math.abs(u - y))), y = u);
                    L.zone = this.zones.length && L.getZone()
                }
                this.closestPointRangePx = J;
                c(this, "afterTranslate")
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return h(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ?
                        !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    e = b.inverted,
                    g = this.clipBox,
                    m = g || b.clipBox,
                    h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, m.height, c.xAxis, c.yAxis].join(),
                    f = b[h],
                    l = b[h + "m"];
                f || (a && (m.width = 0, e && (m.x = b.plotSizeX), b[h + "m"] = l = d.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = f = d.clipRect(m), f.count = {
                    length: 0
                });
                a && !f.count[this.index] && (f.count[this.index] = !0, f.count.length += 1);
                !1 !== c.clip &&
                    (this.group.clip(a || g ? f : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = h);
                a || (f.count[this.index] && (delete f.count[this.index], --f.count.length), 0 === f.count.length && h && b[h] && (g || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = F(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX,
                    x: 0
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99,
                    x: 0
                }, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                c(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    c, d, e, g, h = this.options.marker,
                    f, l, k, p = this[this.specialGroup] || this.markerGroup,
                    q, n = v(h.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= h.enabledThreshold * h.radius);
                if (!1 !== h.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) d = a[c], g = d.graphic, f = d.marker || {}, l = !!d.marker, e = n && void 0 === f.enabled || f.enabled, k = d.isInside, e && !d.isNull ? (e = v(f.symbol, this.symbol), q = this.markerAttribs(d,
                        d.selected && "select"), g ? g[k ? "show" : "hide"](!0).animate(q) : k && (0 < q.width || d.hasImage) && (d.graphic = g = b.renderer.symbol(e, q.x, q.y, q.width, q.height, l ? f : h).add(p)), g && g.attr(this.pointAttribs(d, d.selected && "select")), g && g.addClass(d.getClassName(), !0)) : g && (d.graphic = g.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a.marker || {},
                    e = d.symbol || c.symbol,
                    g = v(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], g = v(b && b.radius, c && c.radius, g + (c && c.radiusPlus || 0)));
                a.hasImage = e && 0 ===
                    e.indexOf("url");
                a.hasImage && (g = 0);
                a = {
                    x: Math.floor(a.plotX) - g,
                    y: a.plotY - g
                };
                g && (a.width = a.height = 2 * g);
                return a
            },
            pointAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    e = d && d.marker || {},
                    g = this.color,
                    h = d && d.color,
                    m = a && a.color,
                    d = v(e.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                g = h || a || m || g;
                a = e.fillColor || c.fillColor || g;
                g = e.lineColor || c.lineColor || g;
                b && (c = c.states[b], b = e.states && e.states[b] || {}, d = v(b.lineWidth, c.lineWidth, d + v(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor ||
                    a, g = b.lineColor || c.lineColor || g);
                return {
                    stroke: g,
                    "stroke-width": d,
                    fill: a
                }
            },
            destroy: function () {
                var d = this,
                    e = d.chart,
                    h = /AppleWebKit\/533/.test(D.navigator.userAgent),
                    f, l, g = d.data || [],
                    k, p;
                c(d, "destroy");
                J(d);
                t(d.axisTypes || [], function (a) {
                    (p = d[a]) && p.series && (w(p.series, d), p.isDirty = p.forceRedraw = !0)
                });
                d.legendItem && d.chart.legend.destroyItem(d);
                for (l = g.length; l--;)(k = g[l]) && k.destroy && k.destroy();
                d.points = null;
                a.clearTimeout(d.animationTimeout);
                b(d, function (a, b) {
                    a instanceof L && !a.survive && (f = h && "group" ===
                        b ? "hide" : "destroy", a[f]())
                });
                e.hoverSeries === d && (e.hoverSeries = null);
                w(e.series, d);
                e.orderSeries();
                b(d, function (a, b) {
                    delete d[b]
                })
            },
            getGraphPath: function (a, b, c) {
                var d = this,
                    e = d.options,
                    g = e.step,
                    h, m = [],
                    f = [],
                    l;
                a = a || d.points;
                (h = a.reversed) && a.reverse();
                (g = {
                    right: 1,
                    center: 2
                } [g] || g && 3) && h && (g = 4 - g);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                t(a, function (h, k) {
                    var r = h.plotX,
                        p = h.plotY,
                        q = a[k - 1];
                    (h.leftCliff || q && q.rightCliff) && !c && (l = !0);
                    h.isNull && !x(b) && 0 < k ? l = !e.connectNulls : h.isNull && !b ? l = !0 : (0 === k ||
                        l ? k = ["M", h.plotX, h.plotY] : d.getPointSpline ? k = d.getPointSpline(a, h, k) : g ? (k = 1 === g ? ["L", q.plotX, p] : 2 === g ? ["L", (q.plotX + r) / 2, q.plotY, "L", (q.plotX + r) / 2, p] : ["L", r, q.plotY], k.push("L", r, p)) : k = ["L", r, p], f.push(h.x), g && (f.push(h.x), 2 === g && f.push(h.x)), m.push.apply(m, k), l = !1)
                });
                m.xMap = f;
                return d.graphPath = m
            },
            drawGraph: function () {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ],
                    d = a.getZonesGraphs(d);
                t(d, function (d,
                    g) {
                    var e = d[0],
                        h = a[e];
                    h ? (h.endX = a.preventGraphAnimation ? null : c.xMap, h.animate({
                        d: c
                    })) : c.length && (a[e] = a.chart.renderer.path(c).addClass(d[1]).attr({
                        zIndex: 1
                    }).add(a.group), h = {
                        stroke: d[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, d[3] ? h.dashstyle = d[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[e].attr(h).shadow(2 > g && b.shadow));
                    h && (h.startX = c.xMap, h.isArea = c.isArea)
                })
            },
            getZonesGraphs: function (a) {
                t(this.zones, function (b, c) {
                    a.push(["zone-graph-" + c,
                        "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color || this.color, b.dashStyle || this.options.dashStyle
                    ])
                }, this);
                return a
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    e, g, h = this.clips || [],
                    f, l = this.graph,
                    k = this.area,
                    p = Math.max(b.chartWidth, b.chartHeight),
                    q = this[(this.zoneAxis || "y") + "Axis"],
                    n, B, u = b.inverted,
                    D, y, w, x, J = !1;
                d.length && (l || k) && q && void 0 !== q.min && (B = q.reversed, D = q.horiz, l && !this.showLine && l.hide(), k && k.hide(), n = q.getExtremes(), t(d, function (d, m) {
                    e =
                        B ? D ? b.plotWidth : 0 : D ? 0 : q.toPixels(n.min);
                    e = Math.min(Math.max(v(g, e), 0), p);
                    g = Math.min(Math.max(Math.round(q.toPixels(v(d.value, n.max), !0)), 0), p);
                    J && (e = g = q.toPixels(n.max));
                    y = Math.abs(e - g);
                    w = Math.min(e, g);
                    x = Math.max(e, g);
                    q.isXAxis ? (f = {
                        x: u ? x : w,
                        y: 0,
                        width: y,
                        height: p
                    }, D || (f.x = b.plotHeight - f.x)) : (f = {
                        x: 0,
                        y: u ? x : w,
                        width: p,
                        height: y
                    }, D && (f.y = b.plotWidth - f.y));
                    u && c.isVML && (f = q.isXAxis ? {
                        x: 0,
                        y: B ? w : x,
                        height: f.width,
                        width: b.chartWidth
                    } : {
                        x: f.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: f.height,
                        height: b.chartHeight
                    });
                    h[m] ?
                        h[m].animate(f) : (h[m] = c.clipRect(f), l && a["zone-graph-" + m].clip(h[m]), k && a["zone-area-" + m].clip(h[m]));
                    J = d.value > n.max;
                    a.resetZones && 0 === g && (g = void 0)
                }), this.clips = h)
            },
            invertGroups: function (a) {
                function b() {
                    t(["group", "markerGroup"], function (b) {
                        c[b] && (d.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    d = c.chart,
                    e;
                c.xAxis && (e = C(d, "resize", b), C(c, "destroy", e), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, d,
                e) {
                var g = this[a],
                    h = !g;
                h && (this[a] = g = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(e));
                g.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (x(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                g.attr({
                    visibility: c
                })[h ? "attr" : "animate"](this.getPlotBox());
                return g
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    d, e = a.options,
                    h = !!a.animate && b.renderer.isSVG && F(e.animation).duration,
                    g = a.visible ? "inherit" : "hidden",
                    f = e.zIndex,
                    l = a.hasRendered,
                    k = b.seriesGroup,
                    p = b.inverted;
                d = a.plotGroup("group", "series", g, f, k);
                a.markerGroup = a.plotGroup("markerGroup", "markers", g, f, k);
                h && a.animate(!0);
                d.inverted = a.isCartesian ? p : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(p);
                !1 === e.clip || a.sharedClipKey || l || d.clip(b.clipRect);
                h && a.animate();
                l || (a.animationTimeout = B(function () {
                    a.afterAnimate()
                }, h));
                a.isDirty = !1;
                a.hasRendered = !0;
                c(a, "afterRender")
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: v(d && d.left, a.plotLeft),
                    translateY: v(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, g) {
                    var e, h;
                    if (h = c && c.length) return e = b.kdAxisArray[d % g], c.sort(function (a, b) {
                        return a[e] - b[e]
                    }), h = Math.floor(h / 2), {
                        point: c[h],
                        left: a(c.slice(0,
                            h), d + 1, g),
                        right: a(c.slice(h + 1), d + 1, g)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                B(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, f, l) {
                    var m = b.point,
                        k = d.kdAxisArray[f % l],
                        p, q, r = m;
                    q = x(a[e]) && x(m[e]) ? Math.pow(a[e] - m[e], 2) : null;
                    p = x(a[g]) && x(m[g]) ? Math.pow(a[g] - m[g], 2) : null;
                    p = (q || 0) + (p || 0);
                    m.dist = x(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    m.distX = x(q) ?
                        Math.sqrt(q) : Number.MAX_VALUE;
                    k = a[k] - m[k];
                    p = 0 > k ? "left" : "right";
                    q = 0 > k ? "right" : "left";
                    b[p] && (p = c(a, b[p], f + 1, l), r = p[h] < r[h] ? p : m);
                    b[q] && Math.sqrt(k * k) < r[h] && (a = c(a, b[q], f + 1, l), r = a[h] < r[h] ? a : r);
                    return r
                }
                var d = this,
                    e = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    h = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(K);
    (function (a) {
        var C = a.Axis,
            F = a.Chart,
            I = a.correctFloat,
            n = a.defined,
            f = a.destroyObjectProperties,
            e = a.each,
            u = a.format,
            x = a.objectEach,
            t = a.pick,
            w = a.Series;
        a.StackItem = function (a, c, e, f, k) {
            var h = a.chart.inverted;
            this.axis = a;
            this.isNegative = e;
            this.options = c;
            this.x = f;
            this.total = null;
            this.points = {};
            this.stack = k;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: c.align || (h ? e ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (h ? "middle" : e ? "bottom" : "top"),
                y: t(c.y, h ? 4 : e ? 14 : -6),
                x: t(c.x, h ? e ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (h ? e ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function () {
                f(this,
                    this.axis)
            },
            render: function (a) {
                var c = this.axis.chart,
                    e = this.options,
                    f = e.format,
                    f = f ? u(f, this, c.time) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: f,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(f, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation,
                    visibility: "hidden"
                }).add(a);
                this.label.labelrank = c.plotHeight
            },
            setOffset: function (a, c) {
                var e = this.axis,
                    f = e.chart,
                    k = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    q = e.translate(0),
                    q = n(k) && Math.abs(k - q);
                a = f.xAxis[0].translate(this.x) +
                    a;
                e = n(k) && this.getStackBox(f, this, a, k, c, q, e);
                (c = this.label) && e && (c.align(this.alignOptions, null, e), e = c.alignAttr, c[!1 === this.options.crop || f.isInsidePlot(e.x, e.y) ? "show" : "hide"](!0))
            },
            getStackBox: function (a, c, e, f, k, q, d) {
                var b = c.axis.reversed,
                    h = a.inverted;
                a = d.height + d.pos - (h ? a.plotLeft : a.plotTop);
                c = c.isNegative && !b || !c.isNegative && b;
                return {
                    x: h ? c ? f : f - q : e,
                    y: h ? a - e - k : c ? a - f - q : a - f,
                    width: h ? q : k,
                    height: h ? k : q
                }
            }
        };
        F.prototype.getStacks = function () {
            var a = this;
            e(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries &&
                    (a.oldStacks = a.stacks)
            });
            e(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + t(c.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function () {
            var a = this.series,
                c = t(this.options.reversedStacks, !0),
                e = a.length,
                f;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (f = e; f--;) a[c ? f : e - f - 1].setStackedPoints();
                for (f = 0; f < e; f++) a[f].modifyStacks()
            }
        };
        C.prototype.renderStackTotals = function () {
            var a = this.chart,
                c = a.renderer,
                e = this.stacks,
                f = this.stackTotalGroup;
            f || (this.stackTotalGroup = f = c.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            f.translate(a.plotLeft, a.plotTop);
            x(e, function (a) {
                x(a, function (a) {
                    a.render(f)
                })
            })
        };
        C.prototype.resetStacks = function () {
            var a = this,
                c = a.stacks;
            a.isXAxis || x(c, function (c) {
                x(c, function (e, h) {
                    e.touched < a.stacksTouched ? (e.destroy(), delete c[h]) : (e.total = null, e.cumulative = null)
                })
            })
        };
        C.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), x(a, function (a) {
                x(a, function (a) {
                    a.cumulative =
                        a.total
                })
            }))
        };
        w.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var e = this.processedXData,
                    c = this.processedYData,
                    h = [],
                    f = c.length,
                    k = this.options,
                    q = k.threshold,
                    d = t(k.startFromThreshold && q, 0),
                    b = k.stack,
                    k = k.stacking,
                    v = this.stackKey,
                    u = "-" + v,
                    l = this.negStacks,
                    w = this.yAxis,
                    B = w.stacks,
                    D = w.oldStacks,
                    m, G, A, x, E, g, r;
                w.stacksTouched += 1;
                for (E = 0; E < f; E++) g = e[E], r = c[E], m = this.getStackIndicator(m, g, this.index), x = m.key, A = (G = l && r < (d ?
                    0 : q)) ? u : v, B[A] || (B[A] = {}), B[A][g] || (D[A] && D[A][g] ? (B[A][g] = D[A][g], B[A][g].total = null) : B[A][g] = new a.StackItem(w, w.options.stackLabels, G, g, b)), A = B[A][g], null !== r ? (A.points[x] = A.points[this.index] = [t(A.cumulative, d)], n(A.cumulative) || (A.base = x), A.touched = w.stacksTouched, 0 < m.index && !1 === this.singleStacks && (A.points[x][0] = A.points[this.index + "," + g + ",0"][0])) : A.points[x] = A.points[this.index] = null, "percent" === k ? (G = G ? v : u, l && B[G] && B[G][g] ? (G = B[G][g], A.total = G.total = Math.max(G.total, A.total) + Math.abs(r) ||
                    0) : A.total = I(A.total + (Math.abs(r) || 0))) : A.total = I(A.total + (r || 0)), A.cumulative = t(A.cumulative, d) + (r || 0), null !== r && (A.points[x].push(A.cumulative), h[E] = A.cumulative);
                "percent" === k && (w.usePercentage = !0);
                this.stackedYData = h;
                w.oldStacks = {}
            }
        };
        w.prototype.modifyStacks = function () {
            var a = this,
                c = a.stackKey,
                h = a.yAxis.stacks,
                f = a.processedXData,
                k, q = a.options.stacking;
            a[q + "Stacker"] && e([c, "-" + c], function (c) {
                for (var b = f.length, d, e; b--;)
                    if (d = f[b], k = a.getStackIndicator(k, d, a.index, c), e = (d = h[c] && h[c][d]) && d.points[k.key]) a[q +
                        "Stacker"](e, d, b)
            })
        };
        w.prototype.percentStacker = function (a, c, e) {
            c = c.total ? 100 / c.total : 0;
            a[0] = I(a[0] * c);
            a[1] = I(a[1] * c);
            this.stackedYData[e] = a[1]
        };
        w.prototype.getStackIndicator = function (a, c, e, f) {
            !n(a) || a.x !== c || f && a.key !== f ? a = {
                x: c,
                index: 0,
                key: f
            } : a.index++;
            a.key = [e, c, a.index].join();
            return a
        }
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.animate,
            I = a.Axis,
            n = a.createElement,
            f = a.css,
            e = a.defined,
            u = a.each,
            x = a.erase,
            t = a.extend,
            w = a.fireEvent,
            y = a.inArray,
            c = a.isNumber,
            h = a.isObject,
            p = a.isArray,
            k = a.merge,
            q = a.objectEach,
            d = a.pick,
            b = a.Point,
            v = a.Series,
            J = a.seriesTypes,
            l = a.setAnimation,
            L = a.splat;
        t(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var e, h = this;
                a && (b = d(b, !0), w(h, "addSeries", {
                    options: a
                }, function () {
                    e = h.initSeries(a);
                    h.isDirtyLegend = !0;
                    h.linkSeries();
                    w(h, "afterAddSeries");
                    b && h.redraw(c)
                }));
                return e
            },
            addAxis: function (a, b, c, e) {
                var h = b ? "xAxis" : "yAxis",
                    f = this.options;
                a = k(a, {
                    index: this[h].length,
                    isX: b
                });
                b = new I(this, a);
                f[h] = L(f[h] || {});
                f[h].push(a);
                d(c, !0) && this.redraw(e);
                return b
            },
            showLoading: function (a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = c.loading,
                    h = function () {
                        d && f(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = n("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = n("span", {
                    className: "highcharts-loading-inner"
                }, null, d), C(b, "redraw", h));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                f(d, t(e.style, {
                    zIndex: 10
                }));
                f(b.loadingSpan, e.labelStyle);
                b.loadingShown || (f(d, {
                    opacity: 0,
                    display: ""
                }), F(d, {
                    opacity: e.style.opacity || .5
                }, {
                    duration: e.showDuration || 0
                }));
                b.loadingShown = !0;
                h()
            },
            hideLoading: function () {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", F(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        f(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function (a, b, h, f) {
                var l = this,
                    m = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    p = a.chart,
                    g, r, v = [];
                w(l, "update", {
                    options: a
                });
                if (p) {
                    k(!0, l.options.chart, p);
                    "className" in p && l.setClassName(p.className);
                    "reflow" in p && l.setReflow(p.reflow);
                    if ("inverted" in p || "polar" in p || "type" in p) l.propFromSeries(), g = !0;
                    "alignTicks" in p && (g = !0);
                    q(p, function (a, b) {
                        -1 !==
                            y("chart." + b, l.propsRequireUpdateSeries) && (r = !0); - 1 !== y(b, l.propsRequireDirtyBox) && (l.isDirtyBox = !0)
                    });
                    "style" in p && l.renderer.setStyle(p.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && k(!0, this.options.plotOptions, a.plotOptions);
                q(a, function (a, b) {
                    if (l[b] && "function" === typeof l[b].update) l[b].update(a, !1);
                    else if ("function" === typeof l[m[b]]) l[m[b]](a);
                    "chart" !== b && -1 !== y(b, l.propsRequireUpdateSeries) && (r = !0)
                });
                u("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    var c;
                    a[b] && ("series" === b && (c = [], u(l[b], function (a, b) {
                        a.options.isInternal || c.push(b)
                    })), u(L(a[b]), function (a, d) {
                        (d = e(a.id) && l.get(a.id) || l[b][c ? c[d] : d]) && d.coll === b && (d.update(a, !1), h && (d.touched = !0));
                        if (!d && h)
                            if ("series" === b) l.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) l.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), h && u(l[b], function (a) {
                        a.touched || a.options.isInternal ? delete a.touched : v.push(a)
                    }))
                });
                u(v, function (a) {
                    a.remove && a.remove(!1)
                });
                g && u(l.axes, function (a) {
                    a.update({}, !1)
                });
                r && u(l.series,
                    function (a) {
                        a.update({}, !1)
                    });
                a.loading && k(!0, l.options.loading, a.loading);
                g = p && p.width;
                p = p && p.height;
                c(g) && g !== l.chartWidth || c(p) && p !== l.chartHeight ? l.setSize(g, p, f) : d(b, !0) && l.redraw(f);
                w(l, "afterUpdate", {
                    options: a
                })
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        t(b.prototype, {
            update: function (a, b, c, e) {
                function f() {
                    l.applyOptions(a);
                    null === l.y && g && (l.graphic = g.destroy());
                    h(a, !0) && (g && g.element && a && a.marker && void 0 !== a.marker.symbol && (l.graphic = g.destroy()), a && a.dataLabels && l.dataLabel && (l.dataLabel =
                        l.dataLabel.destroy()), l.connector && (l.connector = l.connector.destroy()));
                    k = l.index;
                    m.updateParallelArrays(l, k);
                    p.data[k] = h(p.data[k], !0) || h(a, !0) ? l.options : d(a, p.data[k]);
                    m.isDirty = m.isDirtyData = !0;
                    !m.fixedBox && m.hasCartesianSeries && (q.isDirtyBox = !0);
                    "point" === p.legendType && (q.isDirtyLegend = !0);
                    b && q.redraw(c)
                }
                var l = this,
                    m = l.series,
                    g = l.graphic,
                    k, q = m.chart,
                    p = m.options;
                b = d(b, !0);
                !1 === e ? f() : l.firePointEvent("update", {
                    options: a
                }, f)
            },
            remove: function (a, b) {
                this.series.removePoint(y(this, this.series.data),
                    a, b)
            }
        });
        t(v.prototype, {
            addPoint: function (a, b, c, e) {
                var h = this.options,
                    f = this.data,
                    l = this.chart,
                    g = this.xAxis,
                    g = g && g.hasNames && g.names,
                    m = h.data,
                    k, p, q = this.xData,
                    v, n;
                b = d(b, !0);
                k = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(k, [a]);
                n = k.x;
                v = q.length;
                if (this.requireSorting && n < q[v - 1])
                    for (p = !0; v && q[v - 1] > n;) v--;
                this.updateParallelArrays(k, "splice", v, 0, 0);
                this.updateParallelArrays(k, v);
                g && k.name && (g[n] = k.name);
                m.splice(v, 0, a);
                p && (this.data.splice(v, 0, null), this.processData());
                "point" === h.legendType &&
                    this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(k, "shift"), m.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && l.redraw(e)
            },
            removePoint: function (a, b, c) {
                var e = this,
                    h = e.data,
                    f = h[a],
                    m = e.points,
                    g = e.chart,
                    k = function () {
                        m && m.length === h.length && m.splice(a, 1);
                        h.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(f || {
                            series: e
                        }, "splice", a, 1);
                        f && f.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        b && g.redraw()
                    };
                l(c, g);
                b = d(b, !0);
                f ? f.firePointEvent("remove", null, k) :
                    k()
            },
            remove: function (a, b, c) {
                function e() {
                    h.destroy();
                    h.remove = null;
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    d(a, !0) && f.redraw(b)
                }
                var h = this,
                    f = h.chart;
                !1 !== c ? w(h, "remove", null, e) : e()
            },
            update: function (b, c) {
                var e = this,
                    h = e.chart,
                    f = e.userOptions,
                    l = e.oldType || e.type,
                    q = b.type || f.type || h.options.chart.type,
                    g = J[l].prototype,
                    p, v = ["group", "markerGroup", "dataLabelsGroup"],
                    n = ["navigatorSeries", "baseSeries"],
                    B = e.finishedAnimating && {
                        animation: !1
                    },
                    D = ["data", "name", "turboThreshold"],
                    x = a.keys(b),
                    L = 0 < x.length;
                u(x, function (a) {
                    -1 === y(a, D) && (L = !1)
                });
                if (L) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1);
                else {
                    n = v.concat(n);
                    u(n, function (a) {
                        n[a] = e[a];
                        delete e[a]
                    });
                    b = k(f, B, {
                        index: e.index,
                        pointStart: d(f.pointStart, e.xData[0])
                    }, {
                        data: e.options.data
                    }, b);
                    e.remove(!1, null, !1);
                    for (p in g) e[p] = void 0;
                    J[q || l] ? t(e, J[q || l].prototype) : a.error(17, !0);
                    u(n, function (a) {
                        e[a] = n[a]
                    });
                    e.init(h, b);
                    b.zIndex !== f.zIndex && u(v, function (a) {
                        e[a] && e[a].attr({
                            zIndex: b.zIndex
                        })
                    });
                    e.oldType = l;
                    h.linkSeries()
                }
                w(this, "afterUpdate");
                d(c, !0) && h.redraw(L ? void 0 : !1)
            },
            setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        t(I.prototype, {
            update: function (a, b) {
                var c = this.chart,
                    e = a && a.events || {};
                a = k(this.userOptions, a);
                c.options[this.coll].indexOf && (c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)] = a);
                q(c.options[this.coll].events, function (a, b) {
                    "undefined" === typeof e[b] && (e[b] = void 0)
                });
                this.destroy(!0);
                this.init(c, t(a, {
                    events: e
                }));
                c.isDirtyBox = !0;
                d(b, !0) && c.redraw()
            },
            remove: function (a) {
                for (var b = this.chart, c = this.coll, e = this.series, h = e.length; h--;) e[h] && e[h].remove(!1);
                x(b.axes, this);
                x(b[c], this);
                p(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                u(b[c], function (a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                d(a, !0) && b.redraw()
            },
            setTitle: function (a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function (a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(K);
    (function (a) {
        var C = a.color,
            F = a.each,
            I = a.map,
            n = a.pick,
            f = a.Series,
            e = a.seriesType;
        e("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function (e) {
                var f = [],
                    t = [],
                    u = this.xAxis,
                    y = this.yAxis,
                    c = y.stacks[this.stackKey],
                    h = {},
                    p = this.index,
                    k = y.series,
                    q = k.length,
                    d, b = n(y.options.reversedStacks, !0) ? 1 : -1,
                    v;
                e = e || this.points;
                if (this.options.stacking) {
                    for (v = 0; v < e.length; v++) e[v].leftNull = e[v].rightNull = null, h[e[v].x] = e[v];
                    a.objectEach(c, function (a, b) {
                        null !== a.total && t.push(b)
                    });
                    t.sort(function (a, b) {
                        return a - b
                    });
                    d = I(k, function () {
                        return this.visible
                    });
                    F(t,
                        function (a, e) {
                            var l = 0,
                                k, n;
                            if (h[a] && !h[a].isNull) f.push(h[a]), F([-1, 1], function (f) {
                                var l = 1 === f ? "rightNull" : "leftNull",
                                    m = 0,
                                    u = c[t[e + f]];
                                if (u)
                                    for (v = p; 0 <= v && v < q;) k = u.points[v], k || (v === p ? h[a][l] = !0 : d[v] && (n = c[a].points[v]) && (m -= n[1] - n[0])), v += b;
                                h[a][1 === f ? "rightCliff" : "leftCliff"] = m
                            });
                            else {
                                for (v = p; 0 <= v && v < q;) {
                                    if (k = c[a].points[v]) {
                                        l = k[1];
                                        break
                                    }
                                    v += b
                                }
                                l = y.translate(l, 0, 1, 0, 1);
                                f.push({
                                    isNull: !0,
                                    plotX: u.translate(a, 0, 0, 0, 1),
                                    x: a,
                                    plotY: l,
                                    yBottom: l
                                })
                            }
                        })
                }
                return f
            },
            getGraphPath: function (a) {
                var e = f.prototype.getGraphPath,
                    t = this.options,
                    u = t.stacking,
                    y = this.yAxis,
                    c, h, p = [],
                    k = [],
                    q = this.index,
                    d, b = y.stacks[this.stackKey],
                    v = t.threshold,
                    J = y.getThreshold(t.threshold),
                    l, t = t.connectNulls || "percent" === u,
                    L = function (c, e, h) {
                        var f = a[c];
                        c = u && b[f.x].points[q];
                        var l = f[h + "Null"] || 0;
                        h = f[h + "Cliff"] || 0;
                        var m, n, f = !0;
                        h || l ? (m = (l ? c[0] : c[1]) + h, n = c[0] + h, f = !!l) : !u && a[e] && a[e].isNull && (m = n = v);
                        void 0 !== m && (k.push({
                            plotX: d,
                            plotY: null === m ? J : y.getThreshold(m),
                            isNull: f,
                            isCliff: !0
                        }), p.push({
                            plotX: d,
                            plotY: null === n ? J : y.getThreshold(n),
                            doCurve: !1
                        }))
                    };
                a =
                    a || this.points;
                u && (a = this.getStackPoints(a));
                for (c = 0; c < a.length; c++)
                    if (h = a[c].isNull, d = n(a[c].rectPlotX, a[c].plotX), l = n(a[c].yBottom, J), !h || t) t || L(c, c - 1, "left"), h && !u && t || (k.push(a[c]), p.push({
                        x: c,
                        plotX: d,
                        plotY: l
                    })), t || L(c, c + 1, "right");
                c = e.call(this, k, !0, !0);
                p.reversed = !0;
                h = e.call(this, p, !0, !0);
                h.length && (h[0] = "L");
                h = c.concat(h);
                e = e.call(this, k, !1, t);
                h.xMap = c.xMap;
                this.areaPath = h;
                return e
            },
            drawGraph: function () {
                this.areaPath = [];
                f.prototype.drawGraph.apply(this);
                var a = this,
                    e = this.areaPath,
                    t = this.options,
                    w = [
                        ["area", "highcharts-area", this.color, t.fillColor]
                    ];
                F(this.zones, function (e, c) {
                    w.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + e.className, e.color || a.color, e.fillColor || t.fillColor])
                });
                F(w, function (f) {
                    var c = f[0],
                        h = a[c];
                    h ? (h.endX = a.preventGraphAnimation ? null : e.xMap, h.animate({
                        d: e
                    })) : (h = a[c] = a.chart.renderer.path(e).addClass(f[1]).attr({
                        fill: n(f[3], C(f[2]).setOpacity(n(t.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), h.isArea = !0);
                    h.startX = e.xMap;
                    h.shiftUnit = t.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function (a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, I, n) {
                var f = I.plotX,
                    e = I.plotY,
                    u = a[n - 1];
                n = a[n + 1];
                var x, t, w, y;
                if (u && !u.isNull && !1 !== u.doCurve && !I.isCliff && n && !n.isNull && !1 !== n.doCurve && !I.isCliff) {
                    a = u.plotY;
                    w = n.plotX;
                    n = n.plotY;
                    var c = 0;
                    x = (1.5 * f + u.plotX) / 2.5;
                    t = (1.5 * e + a) / 2.5;
                    w = (1.5 * f + w) / 2.5;
                    y = (1.5 * e + n) / 2.5;
                    w !== x && (c = (y - t) * (w - f) / (w - x) + e - y);
                    t += c;
                    y += c;
                    t > a && t > e ? (t = Math.max(a, e), y = 2 * e - t) : t < a && t < e && (t = Math.min(a, e), y = 2 * e - t);
                    y > n && y > e ? (y = Math.max(n, e), t = 2 * e - y) : y < n && y < e &&
                        (y = Math.min(n, e), t = 2 * e - y);
                    I.rightContX = w;
                    I.rightContY = y
                }
                I = ["C", C(u.rightContX, u.plotX), C(u.rightContY, u.plotY), C(x, f), C(t, e), f, e];
                u.rightContX = u.rightContY = null;
                return I
            }
        })
    })(K);
    (function (a) {
        var C = a.seriesTypes.area.prototype,
            F = a.seriesType;
        F("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function (a) {
        var C = a.animObject,
            F = a.color,
            I = a.each,
            n = a.extend,
            f = a.defined,
            e = a.isNumber,
            u = a.merge,
            x = a.pick,
            t = a.Series,
            w = a.seriesType,
            y = a.svg;
        w("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group",
                "dataLabelsGroup"
            ],
            negStacks: !0,
            init: function () {
                t.prototype.init.apply(this, arguments);
                var a = this,
                    e = a.chart;
                e.hasRendered && I(e.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this,
                    e = a.options,
                    f = a.xAxis,
                    k = a.yAxis,
                    q = f.options.reversedStacks,
                    q = f.reversed && !q || !f.reversed && q,
                    d, b = {},
                    v = 0;
                !1 === e.grouping ? v = 1 : I(a.chart.series, function (c) {
                    var e = c.options,
                        f = c.yAxis,
                        h;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || k.len !== f.len || k.pos !== f.pos ||
                        (e.stacking ? (d = c.stackKey, void 0 === b[d] && (b[d] = v++), h = b[d]) : !1 !== e.grouping && (h = v++), c.columnIndex = h)
                });
                var n = Math.min(Math.abs(f.transA) * (f.ordinalSlope || e.pointRange || f.closestPointRange || f.tickInterval || 1), f.len),
                    l = n * e.groupPadding,
                    t = (n - 2 * l) / (v || 1),
                    e = Math.min(e.maxPointWidth || f.len, x(e.pointWidth, t * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (t - e) / 2 + (l + ((a.columnIndex || 0) + (q ? 1 : 0)) * t - n / 2) * (q ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, e, f, k) {
                var c = this.chart,
                    d = this.borderWidth,
                    b = -(d % 2 ? .5 : 0),
                    d = d % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (d += 1);
                this.options.crisp && (f = Math.round(a + f) + b, a = Math.round(a) + b, f -= a);
                k = Math.round(e + k) + d;
                b = .5 >= Math.abs(e) && .5 < k;
                e = Math.round(e) + d;
                k -= e;
                b && k && (--e, k += 1);
                return {
                    x: a,
                    y: e,
                    width: f,
                    height: k
                }
            },
            translate: function () {
                var a = this,
                    e = a.chart,
                    p = a.options,
                    k = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    k = a.borderWidth = x(p.borderWidth, k ? 0 : 1),
                    q = a.yAxis,
                    d = p.threshold,
                    b = a.translatedThreshold = q.getThreshold(d),
                    v = x(p.minPointLength, 5),
                    n = a.getColumnMetrics(),
                    l = n.width,
                    u = a.barW = Math.max(l, 1 + 2 * k),
                    B = a.pointXOffset = n.offset;
                e.inverted && (b -= .5);
                p.pointPadding && (u = Math.ceil(u));
                t.prototype.translate.apply(a);
                I(a.points, function (c) {
                    var h = x(c.yBottom, b),
                        k = 999 + Math.abs(h),
                        p = l,
                        k = Math.min(Math.max(-k, c.plotY), q.len + k),
                        n = c.plotX + B,
                        t = u,
                        g = Math.min(k, h),
                        r, w = Math.max(k, h) - g;
                    v && Math.abs(w) < v && (w = v, r = !q.reversed && !c.negative || q.reversed && c.negative, c.y === d && a.dataMax <= d && q.min < d && (r = !r), g = Math.abs(g - b) > v ? h - v : b - (r ? v : 0));
                    f(c.options.pointWidth) && (p = t = Math.ceil(c.options.pointWidth),
                        n -= Math.round((p - l) / 2));
                    c.barX = n;
                    c.pointWidth = p;
                    c.tooltipPos = e.inverted ? [q.len + q.pos - e.plotLeft - k, a.xAxis.len - n - t / 2, w] : [n + t / 2, k + q.pos - e.plotTop, w];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [n, b, t, 0] : [n, g, t, w])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, e) {
                var c = this.options,
                    f, h = this.pointAttrToOptions || {};
                f = h.stroke || "borderColor";
                var d =
                    h["stroke-width"] || "borderWidth",
                    b = a && a.color || this.color,
                    n = a && a[f] || c[f] || this.color || b,
                    t = a && a[d] || c[d] || this[d] || 0,
                    h = c.dashStyle;
                a && this.zones.length && (b = a.getZone(), b = a.options.color || b && b.color || this.color);
                e && (a = u(c.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, b = a.color || void 0 !== e && F(b).brighten(a.brightness).get() || b, n = a[f] || n, t = a[d] || t, h = a.dashStyle || h);
                f = {
                    fill: b,
                    stroke: n,
                    "stroke-width": t
                };
                h && (f.dashstyle = h);
                return f
            },
            drawPoints: function () {
                var a = this,
                    f = this.chart,
                    p =
                    a.options,
                    k = f.renderer,
                    q = p.animationLimit || 250,
                    d;
                I(a.points, function (b) {
                    var c = b.graphic,
                        h = c && f.pointCount < q ? "animate" : "attr";
                    if (e(b.plotY) && null !== b.y) {
                        d = b.shapeArgs;
                        if (c) c[h](u(d));
                        else b.graphic = c = k[b.shapeType](d).add(b.group || a.group);
                        p.borderRadius && c.attr({
                            r: p.borderRadius
                        });
                        c[h](a.pointAttribs(b, b.selected && "select")).shadow(p.shadow, null, p.stacking && !p.borderRadius);
                        c.addClass(b.getClassName(), !0)
                    } else c && (b.graphic = c.destroy())
                })
            },
            animate: function (a) {
                var c = this,
                    e = this.yAxis,
                    f = c.options,
                    q =
                    this.chart.inverted,
                    d = {},
                    b = q ? "translateX" : "translateY",
                    v;
                y && (a ? (d.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(f.threshold))), q ? d.translateX = a - e.len : d.translateY = a, c.group.attr(d)) : (v = c.group.attr(b), c.group.animate({
                    scaleY: 1
                }, n(C(c.options.animation), {
                    step: function (a, f) {
                        d[b] = v + f.pos * (e.pos - v);
                        c.group.attr(d)
                    }
                })), c.animate = null))
            },
            remove: function () {
                var a = this,
                    e = a.chart;
                e.hasRendered && I(e.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                t.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(K);
    (function (a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function (a) {
        var C = a.deg2rad,
            F = a.isNumber,
            I = a.pick,
            n = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    e = this.chart,
                    u = 2 * (a.slicedOffset || 0),
                    x = e.plotWidth - 2 * u,
                    e = e.plotHeight - 2 * u,
                    t = a.center,
                    t = [I(t[0], "50%"), I(t[1], "50%"), a.size || "100%", a.innerSize || 0],
                    w = Math.min(x, e),
                    y, c;
                for (y = 0; 4 > y; ++y) c = t[y], a = 2 > y || 2 === y &&
                    /%$/.test(c), t[y] = n(c, [x, e, w, t[2]][y]) + (a ? u : 0);
                t[3] > t[2] && (t[3] = t[2]);
                return t
            },
            getStartAndEndRadians: function (a, e) {
                a = F(a) ? a : 0;
                e = F(e) && e > a && 360 > e - a ? e : a + 360;
                return {
                    start: C * (a + -90),
                    end: C * (e + -90)
                }
            }
        }
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.CenteredSeriesMixin,
            I = a.defined,
            n = a.each,
            f = a.extend,
            e = F.getStartAndEndRadians,
            u = a.inArray,
            x = a.noop,
            t = a.pick,
            w = a.Point,
            y = a.Series,
            c = a.seriesType,
            h = a.setAnimation;
        c("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var c = this,
                    e = c.points,
                    d = c.startAngleRad;
                a || (n(e, function (a) {
                    var b = a.graphic,
                        e = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || c.center[3] / 2,
                        start: d,
                        end: d
                    }), b.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function () {
                var a, c = 0,
                    e = this.points,
                    d = e.length,
                    b, f = this.options.ignoreHiddenPoint;
                for (a = 0; a < d; a++) b = e[a], c += f && !b.visible ? 0 : b.isNull ? 0 : b.y;
                this.total = c;
                for (a = 0; a < d; a++) b = e[a], b.percentage = 0 < c && (b.visible || !f) ? b.y / c * 100 : 0, b.total = c
            },
            generatePoints: function () {
                y.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var c = 0,
                    f = this.options,
                    d = f.slicedOffset,
                    b = d + (f.borderWidth || 0),
                    h, n, l, p = e(f.startAngle, f.endAngle),
                    u = this.startAngleRad = p.start,
                    p = (this.endAngleRad = p.end) - u,
                    w = this.points,
                    m, x = f.dataLabels.distance,
                    f = f.ignoreHiddenPoint,
                    A, y = w.length,
                    E;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c, d) {
                    l = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(l) * (a[2] / 2 + d.labelDistance)
                };
                for (A = 0; A < y; A++) {
                    E = w[A];
                    E.labelDistance = t(E.options.dataLabels && E.options.dataLabels.distance, x);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, E.labelDistance);
                    h = u + c * p;
                    if (!f || E.visible) c += E.percentage / 100;
                    n = u + c * p;
                    E.shapeType = "arc";
                    E.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * h) / 1E3,
                        end: Math.round(1E3 * n) / 1E3
                    };
                    l = (n + h) / 2;
                    l > 1.5 * Math.PI ? l -= 2 * Math.PI : l < -Math.PI / 2 && (l += 2 * Math.PI);
                    E.slicedTranslation = {
                        translateX: Math.round(Math.cos(l) * d),
                        translateY: Math.round(Math.sin(l) * d)
                    };
                    n = Math.cos(l) * a[2] /
                        2;
                    m = Math.sin(l) * a[2] / 2;
                    E.tooltipPos = [a[0] + .7 * n, a[1] + .7 * m];
                    E.half = l < -Math.PI / 2 || l > Math.PI / 2 ? 1 : 0;
                    E.angle = l;
                    h = Math.min(b, E.labelDistance / 5);
                    E.labelPos = [a[0] + n + Math.cos(l) * E.labelDistance, a[1] + m + Math.sin(l) * E.labelDistance, a[0] + n + Math.cos(l) * h, a[1] + m + Math.sin(l) * h, a[0] + n, a[1] + m, 0 > E.labelDistance ? "center" : E.half ? "right" : "left", l]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this,
                    c = a.chart.renderer,
                    e, d, b, h, t = a.options.shadow;
                t && !a.shadowGroup && (a.shadowGroup = c.g("shadow").add(a.group));
                n(a.points, function (l) {
                    d =
                        l.graphic;
                    if (l.isNull) d && (l.graphic = d.destroy());
                    else {
                        h = l.shapeArgs;
                        e = l.getTranslate();
                        var k = l.shadowGroup;
                        t && !k && (k = l.shadowGroup = c.g("shadow").add(a.shadowGroup));
                        k && k.attr(e);
                        b = a.pointAttribs(l, l.selected && "select");
                        d ? d.setRadialReference(a.center).attr(b).animate(f(h, e)) : (l.graphic = d = c[l.shapeType](h).setRadialReference(a.center).attr(e).add(a.group), d.attr(b).attr({
                            "stroke-linejoin": "round"
                        }).shadow(t, k));
                        d.attr({
                            visibility: l.visible ? "inherit" : "hidden"
                        });
                        d.addClass(l.getClassName())
                    }
                })
            },
            searchPoint: x,
            sortByAngle: function (a, c) {
                a.sort(function (a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: F.getCenter,
            getSymbol: x
        }, {
            init: function () {
                w.prototype.init.apply(this, arguments);
                var a = this,
                    c;
                a.name = t(a.name, "Slice");
                c = function (c) {
                    a.slice("select" === c.type)
                };
                C(a, "select", c);
                C(a, "unselect", c);
                return a
            },
            isValid: function () {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function (a, c) {
                var e = this,
                    d = e.series,
                    b = d.chart,
                    f = d.options.ignoreHiddenPoint;
                c = t(c, f);
                a !== e.visible && (e.visible = e.options.visible = a = void 0 === a ? !e.visible : a, d.options.data[u(e, d.data)] = e.options, n(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (e[b]) e[b][a ? "show" : "hide"](!0)
                }), e.legendItem && b.legend.colorizeItem(e, a), a || "hover" !== e.state || e.setState(""), f && (d.isDirty = !0), c && b.redraw())
            },
            slice: function (a, c, e) {
                var d = this.series;
                h(e, d.chart);
                t(c, !0);
                this.sliced = this.options.sliced = I(a) ? a : !this.sliced;
                d.options.data[u(this, d.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r - 1,
                    start: c.start,
                    end: c.end
                })
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.arrayMax,
            I = a.defined,
            n = a.each,
            f = a.extend,
            e = a.format,
            u = a.map,
            x = a.merge,
            t = a.noop,
            w = a.pick,
            y = a.relativeLength,
            c =
            a.Series,
            h = a.seriesTypes,
            p = a.some,
            k = a.stableSort,
            q = a.isArray,
            d = a.splat;
        a.distribute = function (b, c, d) {
            function e(a, b) {
                return a.target - b.target
            }
            var f, h = !0,
                q = b,
                m = [],
                v;
            v = 0;
            var t = q.reducedLen || c;
            for (f = b.length; f--;) v += b[f].size;
            if (v > t) {
                k(b, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (v = f = 0; v <= t;) v += b[f].size, f++;
                m = b.splice(f - 1, b.length)
            }
            k(b, e);
            for (b = u(b, function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: w(a.align, .5)
                    }
                }); h;) {
                for (f = b.length; f--;) h = b[f], v = (Math.min.apply(0, h.targets) + Math.max.apply(0,
                    h.targets)) / 2, h.pos = Math.min(Math.max(0, v - h.size * h.align), c - h.size);
                f = b.length;
                for (h = !1; f--;) 0 < f && b[f - 1].pos + b[f - 1].size > b[f].pos && (b[f - 1].size += b[f].size, b[f - 1].targets = b[f - 1].targets.concat(b[f].targets), b[f - 1].align = .5, b[f - 1].pos + b[f - 1].size > c && (b[f - 1].pos = c - b[f - 1].size), b.splice(f, 1), h = !0)
            }
            q.push.apply(q, m);
            f = 0;
            p(b, function (b) {
                var e = 0;
                if (p(b.targets, function () {
                        q[f].pos = b.pos + e;
                        if (Math.abs(q[f].pos - q[f].target) > d) return n(q.slice(0, f + 1), function (a) {
                                delete a.pos
                            }), q.reducedLen = (q.reducedLen || c) -
                            .1 * c, q.reducedLen > .1 * c && a.distribute(q, c, d), !0;
                        e += q[f].size;
                        f++
                    })) return !0
            });
            k(q, e)
        };
        c.prototype.drawDataLabels = function () {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }

            function c(a, b) {
                var c = [],
                    d;
                if (q(a) && !q(b)) c = u(a, function (a) {
                    return x(a, b)
                });
                else if (q(b) && !q(a)) c = u(b, function (b) {
                    return x(a, b)
                });
                else if (q(a) || q(b))
                    for (d = Math.max(a.length,
                            b.length); d--;) c[d] = x(a[d], b[d]);
                else c = x(a, b);
                return c
            }
            var f = this,
                h = f.chart,
                k = f.options,
                p = k.dataLabels,
                t = f.points,
                m, y = f.hasRendered || 0,
                A, F = w(p.defer, !!k.animation),
                E = h.renderer,
                p = c(c(h.options.plotOptions && h.options.plotOptions.series && h.options.plotOptions.series.dataLabels, h.options.plotOptions && h.options.plotOptions[f.type] && h.options.plotOptions[f.type].dataLabels), p);
            if (q(p) || p.enabled || f._hasPointLabels) A = f.plotGroup("dataLabelsGroup", "data-labels", F && !y ? "hidden" : "visible", p.zIndex || 6), F &&
                (A.attr({
                    opacity: +y
                }), y || C(f, "afterAnimate", function () {
                    f.visible && A.show(!0);
                    A[k.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: 200
                    })
                })), n(t, function (g) {
                    m = d(c(p, g.dlOptions || g.options && g.options.dataLabels));
                    n(m, function (c, d) {
                        var l = c.enabled && !g.isNull && b(g, c),
                            m, n, q, r, p = g.dataLabels ? g.dataLabels[d] : g.dataLabel,
                            v = g.connectors ? g.connectors[d] : g.connector,
                            t = !p;
                        l && (m = g.getLabelConfig(), n = c[g.formatPrefix + "Format"] || c.format, m = I(n) ? e(n, m, h.time) : (c[g.formatPrefix + "Formatter"] || c.formatter).call(m, c),
                            n = c.style, q = c.rotation, n.color = w(c.color, n.color, f.color, "#000000"), "contrast" === n.color && (g.contrastColor = E.getContrast(g.color || f.color), n.color = c.inside || 0 > w(c.distance, g.labelDistance) || k.stacking ? g.contrastColor : "#000000"), k.cursor && (n.cursor = k.cursor), r = {
                                fill: c.backgroundColor,
                                stroke: c.borderColor,
                                "stroke-width": c.borderWidth,
                                r: c.borderRadius || 0,
                                rotation: q,
                                padding: c.padding,
                                zIndex: 1
                            }, a.objectEach(r, function (a, b) {
                                void 0 === a && delete r[b]
                            }));
                        !p || l && I(m) ? l && I(m) && (p ? r.text = m : (g.dataLabels = g.dataLabels || [], p = g.dataLabels[d] = q ? E.text(m, 0, -9999).addClass("highcharts-data-label") : E.label(m, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label"), d || (g.dataLabel = p), p.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (c.className || "") + (c.useHTML ? " highcharts-tracker" : ""))), p.options = c, p.attr(r), p.css(n).shadow(c.shadow), p.added || p.add(A), f.alignDataLabel(g, p, c, null, t)) : (g.dataLabel = g.dataLabel.destroy(), g.dataLabels && (1 === g.dataLabels.length ? delete g.dataLabels : delete g.dataLabels[d]), d || delete g.dataLabel,
                            v && (g.connector = g.connector.destroy(), g.connectors && (1 === g.connectors.length ? delete g.connectors : delete g.connectors[d])))
                    })
                });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        c.prototype.alignDataLabel = function (a, c, d, e, h) {
            var b = this.chart,
                l = b.inverted,
                m = w(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                k = w(a.plotY, -9999),
                n = c.getBBox(),
                q, p = d.rotation,
                g = d.align,
                r = this.visible && (a.series.forceDL || b.isInsidePlot(m, Math.round(k), l) || e && b.isInsidePlot(m, l ? e.x + 1 : e.y + e.height - 1, l)),
                v = "justify" === w(d.overflow, "justify");
            if (r && (q = d.style.fontSize, q = b.renderer.fontMetrics(q, c).b, e = f({
                    x: l ? this.yAxis.len - k : m,
                    y: Math.round(l ? this.xAxis.len - m : k),
                    width: 0,
                    height: 0
                }, e), f(d, {
                    width: n.width,
                    height: n.height
                }), p ? (v = !1, m = b.renderer.rotCorr(q, p), m = {
                    x: e.x + d.x + e.width / 2 + m.x,
                    y: e.y + d.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    } [d.verticalAlign] * e.height
                }, c[h ? "attr" : "animate"](m).attr({
                    align: g
                }), k = (p + 720) % 360, k = 180 < k && 360 > k, "left" === g ? m.y -= k ? n.height : 0 : "center" === g ? (m.x -= n.width / 2, m.y -= n.height / 2) : "right" === g && (m.x -= n.width, m.y -= k ? 0 : n.height), c.placed = !0, c.alignAttr = m) : (c.align(d, null, e), m = c.alignAttr), v && 0 <= e.height ? a.isLabelJustified = this.justifyDataLabel(c, d, m, n, e, h) : w(d.crop, !0) && (r = b.isInsidePlot(m.x, m.y) && b.isInsidePlot(m.x + n.width, m.y + n.height)), d.shape && !p)) c[h ? "attr" : "animate"]({
                anchorX: l ? b.plotWidth - a.plotY : a.plotX,
                anchorY: l ? b.plotHeight - a.plotX : a.plotY
            });
            r || (c.attr({
                y: -9999
            }), c.placed = !1)
        };
        c.prototype.justifyDataLabel = function (a, c, d, e, f, h) {
            var b = this.chart,
                l = c.align,
                k = c.verticalAlign,
                n, q, p = a.box ? 0 : a.padding || 0;
            n = d.x + p;
            0 > n && ("right" ===
                l ? c.align = "left" : c.x = -n, q = !0);
            n = d.x + e.width - p;
            n > b.plotWidth && ("left" === l ? c.align = "right" : c.x = b.plotWidth - n, q = !0);
            n = d.y + p;
            0 > n && ("bottom" === k ? c.verticalAlign = "top" : c.y = -n, q = !0);
            n = d.y + e.height - p;
            n > b.plotHeight && ("top" === k ? c.verticalAlign = "bottom" : c.y = b.plotHeight - n, q = !0);
            q && (a.placed = !h, a.align(c, null, f));
            return q
        };
        h.pie && (h.pie.prototype.drawDataLabels = function () {
            var b = this,
                d = b.data,
                e, f = b.chart,
                h = b.options.dataLabels,
                k = w(h.connectorPadding, 10),
                q = w(h.connectorWidth, 1),
                m = f.plotWidth,
                p = f.plotHeight,
                t =
                Math.round(f.chartWidth / 3),
                u, x = b.center,
                g = x[2] / 2,
                r = x[1],
                y, C, H, K, Q = [
                    [],
                    []
                ],
                z, P, T, S, U = [0, 0, 0, 0];
            b.visible && (h.enabled || b._hasPointLabels) && (n(d, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), c.prototype.drawDataLabels.apply(b), n(d, function (a) {
                a.dataLabel && (a.visible ? (Q[a.half].push(a), a.dataLabel._pos = null, !I(h.style.width) && !I(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) &&
                    a.dataLabel.getBBox().width > t && (a.dataLabel.css({
                        width: .7 * t
                    }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
            }), n(Q, function (c, d) {
                var l, q, t = c.length,
                    v = [],
                    u;
                if (t)
                    for (b.sortByAngle(c, d - .5), 0 < b.maxLabelDistance && (l = Math.max(0, r - g - b.maxLabelDistance), q = Math.min(r + g + b.maxLabelDistance, f.plotHeight), n(c, function (a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, r - g - a.labelDistance), a.bottom = Math.min(r + g + a.labelDistance, f.plotHeight),
                                u = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                    target: a.labelPos[1] - a.top + u / 2,
                                    size: u,
                                    rank: a.y
                                }, v.push(a.distributeBox))
                        }), l = q + u - l, a.distribute(v, l, l / 5)), S = 0; S < t; S++) e = c[S], H = e.labelPos, y = e.dataLabel, T = !1 === e.visible ? "hidden" : "inherit", P = l = H[1], v && I(e.distributeBox) && (void 0 === e.distributeBox.pos ? T = "hidden" : (K = e.distributeBox.size, P = e.top + e.distributeBox.pos)), delete e.positionIndex, z = h.justify ? x[0] + (d ? -1 : 1) * (g + e.labelDistance) : b.getX(P < e.top + 2 || P > e.bottom - 2 ? l : P, d, e), y._attr = {
                            visibility: T,
                            align: H[6]
                        },
                        y._pos = {
                            x: z + h.x + ({
                                left: k,
                                right: -k
                            } [H[6]] || 0),
                            y: P + h.y - 10
                        }, H.x = z, H.y = P, w(h.crop, !0) && (C = y.getBBox().width, l = null, z - C < k && 1 === d ? (l = Math.round(C - z + k), U[3] = Math.max(l, U[3])) : z + C > m - k && 0 === d && (l = Math.round(z + C - m + k), U[1] = Math.max(l, U[1])), 0 > P - K / 2 ? U[0] = Math.max(Math.round(-P + K / 2), U[0]) : P + K / 2 > p && (U[2] = Math.max(Math.round(P + K / 2 - p), U[2])), y.sideOverflow = l)
            }), 0 === F(U) || this.verifyDataLabelOverflow(U)) && (this.placeDataLabels(), q && n(this.points, function (a) {
                var c;
                u = a.connector;
                if ((y = a.dataLabel) && y._pos && a.visible &&
                    0 < a.labelDistance) {
                    T = y._attr.visibility;
                    if (c = !u) a.connector = u = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup), u.attr({
                        "stroke-width": q,
                        stroke: h.connectorColor || a.color || "#666666"
                    });
                    u[c ? "attr" : "animate"]({
                        d: b.connectorPath(a.labelPos)
                    });
                    u.attr("visibility", T)
                } else u && (a.connector = u.destroy())
            }))
        }, h.pie.prototype.connectorPath = function (a) {
            var b = a.x,
                c = a.y;
            return w(this.options.dataLabels.softConnector,
                !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, h.pie.prototype.placeDataLabels = function () {
            n(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, h.pie.prototype.alignDataLabel = t, h.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center,
                c = this.options,
                d = c.center,
                e = c.minSize || 80,
                f, h = null !== c.size;
            h || (null !== d[0] ? f = Math.max(b[2] - Math.max(a[1], a[3]), e) : (f = Math.max(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2), null !== d[1] ? f = Math.max(Math.min(f, b[2] - Math.max(a[0], a[2])), e) : (f = Math.max(Math.min(f, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2), f < b[2] ? (b[2] = f, b[3] = Math.min(y(c.innerSize || 0, f), f), this.translate(b), this.drawDataLabels &&
                this.drawDataLabels()) : h = !0);
            return h
        });
        h.column && (h.column.prototype.alignDataLabel = function (a, d, e, f, h) {
            var b = this.chart.inverted,
                l = a.series,
                m = a.dlBox || a.shapeArgs,
                k = w(a.below, a.plotY > w(this.translatedThreshold, l.yAxis.len)),
                n = w(e.inside, !!this.options.stacking);
            m && (f = x(m), 0 > f.y && (f.height += f.y, f.y = 0), m = f.y + f.height - l.yAxis.len, 0 < m && (f.height -= m), b && (f = {
                x: l.yAxis.len - f.y - f.height,
                y: l.xAxis.len - f.x - f.width,
                width: f.height,
                height: f.width
            }), n || (b ? (f.x += k ? 0 : f.width, f.width = 0) : (f.y += k ? f.height : 0, f.height =
                0)));
            e.align = w(e.align, !b || n ? "center" : k ? "right" : "left");
            e.verticalAlign = w(e.verticalAlign, b || n ? "middle" : k ? "top" : "bottom");
            c.prototype.alignDataLabel.call(this, a, d, e, f, h);
            a.isLabelJustified && a.contrastColor && d.css({
                color: a.contrastColor
            })
        })
    })(K);
    (function (a) {
        var C = a.Chart,
            F = a.each,
            I = a.isArray,
            n = a.objectEach,
            f = a.pick;
        a = a.addEvent;
        a(C, "render", function () {
            var a = [];
            F(this.labelCollectors || [], function (e) {
                a = a.concat(e())
            });
            F(this.yAxis || [], function (e) {
                e.options.stackLabels && !e.options.stackLabels.allowOverlap &&
                    n(e.stacks, function (e) {
                        n(e, function (e) {
                            a.push(e.label)
                        })
                    })
            });
            F(this.series || [], function (e) {
                var n = e.options.dataLabels;
                e.visible && (!1 !== n.enabled || e._hasPointLabels) && F(e.points, function (e) {
                    if (e.visible) {
                        var n = I(e.dataLabels) ? e.dataLabels : e.dataLabel ? [e.dataLabel] : [];
                        F(n, function (n) {
                            var c = n.options;
                            n.labelrank = f(c.labelrank, e.labelrank, e.shapeArgs && e.shapeArgs.height);
                            c.allowOverlap || a.push(n)
                        })
                    }
                })
            });
            this.hideOverlappingLabels(a)
        });
        C.prototype.hideOverlappingLabels = function (a) {
            var e = a.length,
                f = this.renderer,
                n, w, y, c, h, p, k = function (a, c, b, e, f, h, k, n) {
                    return !(f > a + b || f + k < a || h > c + e || h + n < c)
                };
            y = function (a) {
                var c, b, e, h = a.box ? 0 : a.padding || 0;
                e = 0;
                if (a && (!a.alignAttr || a.placed)) return c = a.alignAttr || {
                    x: a.attr("x"),
                    y: a.attr("y")
                }, b = a.parentGroup, a.width || (e = a.getBBox(), a.width = e.width, a.height = e.height, e = f.fontMetrics(null, a.element).h), {
                    x: c.x + (b.translateX || 0) + h,
                    y: c.y + (b.translateY || 0) + h - e,
                    width: a.width - 2 * h,
                    height: a.height - 2 * h
                }
            };
            for (w = 0; w < e; w++)
                if (n = a[w]) n.oldOpacity = n.opacity, n.newOpacity = 1, n.absoluteBox = y(n);
            a.sort(function (a,
                c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (w = 0; w < e; w++)
                for (p = (y = a[w]) && y.absoluteBox, n = w + 1; n < e; ++n)
                    if (h = (c = a[n]) && c.absoluteBox, p && h && y !== c && 0 !== y.newOpacity && 0 !== c.newOpacity && (h = k(p.x, p.y, p.width, p.height, h.x, h.y, h.width, h.height)))(y.labelrank < c.labelrank ? y : c).newOpacity = 0;
            F(a, function (a) {
                var c, b;
                a && (b = a.newOpacity, a.oldOpacity !== b && (a.alignAttr && a.placed ? (b ? a.show(!0) : c = function () {
                    a.hide()
                }, a.alignAttr.opacity = b, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, c)) : a.attr({
                    opacity: b
                })), a.isOld = !0)
            })
        }
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.Chart,
            I = a.createElement,
            n = a.css,
            f = a.defaultOptions,
            e = a.defaultPlotOptions,
            u = a.each,
            x = a.extend,
            t = a.fireEvent,
            w = a.hasTouch,
            y = a.inArray,
            c = a.isObject,
            h = a.Legend,
            p = a.merge,
            k = a.pick,
            q = a.Point,
            d = a.Series,
            b = a.seriesTypes,
            v = a.svg,
            J;
        J = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart.pointer,
                    c = function (a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                u(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel &&
                        (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (u(a.trackerGroups, function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (w) a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(n).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                t(this, "afterDrawTracker")
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    f = a.chart,
                    h =
                    f.pointer,
                    k = f.renderer,
                    n = f.options.tooltip.snap,
                    g = a.tracker,
                    q, p = function () {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    },
                    x = "rgba(192,192,192," + (v ? .0001 : .002) + ")";
                if (e && !c)
                    for (q = e + 1; q--;) "M" === d[q] && d.splice(q + 1, 0, d[q + 1] - n, d[q + 2], "L"), (q && "M" === d[q] || q === e) && d.splice(q, 0, "L", d[q - 2] + n, d[q - 1]);
                g ? g.attr({
                    d: d
                }) : a.graph && (a.tracker = k.path(d).attr({
                    "stroke-linejoin": "round",
                    stroke: x,
                    fill: c ? x : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * n),
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(c ? "highcharts-tracker-area" :
                    "highcharts-tracker-line").add(a.group), u([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function (a) {
                        h.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (w) a.on("touchstart", p)
                }));
                t(this, "afterDrawTracker")
            }
        };
        b.column && (b.column.prototype.drawTracker = J.drawTrackerPoint);
        b.pie && (b.pie.prototype.drawTracker = J.drawTrackerPoint);
        b.scatter && (b.scatter.prototype.drawTracker = J.drawTrackerPoint);
        f.legend.itemStyle.cursor = "pointer";
        x(h.prototype, {
            setItemEvents: function (a, b, c) {
                var d = this,
                    e = d.chart.renderer.boxWrapper,
                    f = "highcharts-legend-" + (a instanceof q ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    e.addClass(f);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(p(a.visible ? d.itemStyle : d.itemHiddenStyle));
                    e.removeClass(f);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    e.removeClass(f);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick",
                        b, c) : t(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = I("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function (b) {
                    t(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        x(F.prototype, {
            showResetZoom: function () {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    c = f.lang,
                    d = b.options.chart.resetZoomButton,
                    e = d.theme,
                    h =
                    e.states,
                    k = "chart" === d.relativeTo ? null : "plotBox";
                t(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, h && h.hover).attr({
                        align: d.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, k)
                })
            },
            zoomOut: function () {
                t(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function (a) {
                var b, d = this.pointer,
                    e = !1,
                    f;
                !a || a.resetSelection ? (u(this.axes, function (a) {
                    b = a.zoom()
                }), d.initiated = !1) : u(a.xAxis.concat(a.yAxis),
                    function (a) {
                        var c = a.axis;
                        d[c.isXAxis ? "zoomX" : "zoomY"] && (b = c.zoom(a.min, a.max), c.displayBtn && (e = !0))
                    });
                f = this.resetZoomButton;
                e && !f ? this.showResetZoom() : !e && c(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(k(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && u(d, function (a) {
                    a.setState()
                });
                u("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        f = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        h = c[d],
                        g = (b.pointRange ||
                            0) / 2,
                        l = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                        m = b.getExtremes(),
                        k = b.toValue(h - f, !0) + g * l,
                        l = b.toValue(h + b.len - f, !0) - g * l,
                        n = l < k,
                        h = n ? l : k,
                        k = n ? k : l,
                        l = Math.min(m.dataMin, g ? m.min : b.toValue(b.toPixels(m.min) - b.minPixelPadding)),
                        g = Math.max(m.dataMax, g ? m.max : b.toValue(b.toPixels(m.max) + b.minPixelPadding)),
                        n = l - h;
                    0 < n && (k += n, h = l);
                    n = k - g;
                    0 < n && (k = g, h -= n);
                    b.series.length && h !== m.min && k !== m.max && (b.setExtremes(h, k, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                n(c.container, {
                    cursor: "move"
                })
            }
        });
        x(q.prototype, {
            select: function (a, b) {
                var c = this,
                    d = c.series,
                    e = d.chart;
                a = k(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function () {
                    c.selected = c.options.selected = a;
                    d.options.data[y(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || u(e.getSelectedPoints(), function (a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[y(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this,
                    b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                u(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = p(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        C(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    f = this.series,
                    h = f.options.states[a || "normal"] || {},
                    l =
                    e[f.type].marker && f.options.marker,
                    n = l && !1 === l.enabled,
                    q = l && l.states && l.states[a || "normal"] || {},
                    g = !1 === q.enabled,
                    p = f.stateMarkerGraphic,
                    v = this.marker || {},
                    u = f.chart,
                    w = f.halo,
                    y, C = l && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === h.enabled || a && (g || n && !1 === q.enabled) || a && v.states && v.states[a] && !1 === v.states[a].enabled)) {
                    C && (y = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" +
                        a), this.graphic.animate(f.pointAttribs(this, a), k(u.options.chart.animation, h.animation)), y && this.graphic.animate(y, k(u.options.chart.animation, q.animation, l.animation)), p && p.hide();
                    else {
                        if (a && q) {
                            l = v.symbol || f.symbol;
                            p && p.currentSymbol !== l && (p = p.destroy());
                            if (p) p[b ? "animate" : "attr"]({
                                x: y.x,
                                y: y.y
                            });
                            else l && (f.stateMarkerGraphic = p = u.renderer.symbol(l, y.x, y.y, y.width, y.height).add(f.markerGroup), p.currentSymbol = l);
                            p && p.attr(f.pointAttribs(this, a))
                        }
                        p && (p[a && u.isInsidePlot(c, d, u.inverted) ? "show" : "hide"](),
                            p.element.point = this)
                    }(c = h.halo) && c.size ? (w || (f.halo = w = u.renderer.path().add((this.graphic || p).parentGroup)), w.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), w.attr({
                        "class": "highcharts-halo highcharts-color-" + k(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), w.point = this, w.attr(x({
                        fill: this.color || f.color,
                        "fill-opacity": c.opacity
                    }, c.attributes))) : w && w.point && w.point.haloPath && w.animate({
                        d: w.point.haloPath(0)
                    }, null, w.hide);
                    this.state = a;
                    t(this, "afterSetState")
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        x(d.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && t(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && t(this, "mouseOut");
                !c || this.stickyTracking ||
                    c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function (a) {
                var b = this,
                    c = b.options,
                    d = b.graph,
                    e = c.states,
                    f = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (u([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (f = {
                            "stroke-width": f
                        }, d.animate(f, k(e[a || "normal"] && e[a || "normal"].animation,
                            b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(f), c += 1
            },
            setVisible: function (a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f, h = d.options.chart.ignoreHiddenSeries,
                    k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                u(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking &&
                    u(d.series, function (a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                u(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                t(c, f);
                !1 !== b && d.redraw()
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                t(this, a ? "select" : "unselect")
            },
            drawTracker: J.drawTrackerGraph
        })
    })(K);
    (function (a) {
        var C = a.Chart,
            F = a.each,
            I = a.inArray,
            n = a.isArray,
            f = a.isObject,
            e = a.pick,
            u = a.splat;
        C.prototype.setResponsive = function (e) {
            var f = this.options.responsive,
                n = [],
                u = this.currentResponsive;
            f && f.rules && F(f.rules, function (c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, n, e)
            }, this);
            var c = a.merge.apply(0, a.map(n, function (c) {
                    return a.find(f.rules, function (a) {
                        return a._id === c
                    }).chartOptions
                })),
                n = n.toString() || void 0;
            n !== (u && u.ruleIds) && (u && this.update(u.undoOptions, e), n ? (this.currentResponsive = {
                    ruleIds: n,
                    mergedOptions: c,
                    undoOptions: this.currentOptions(c)
                }, this.update(c, e)) :
                this.currentResponsive = void 0)
        };
        C.prototype.matchResponsiveRule = function (a, f) {
            var n = a.condition;
            (n.callback || function () {
                return this.chartWidth <= e(n.maxWidth, Number.MAX_VALUE) && this.chartHeight <= e(n.maxHeight, Number.MAX_VALUE) && this.chartWidth >= e(n.minWidth, 0) && this.chartHeight >= e(n.minHeight, 0)
            }).call(this) && f.push(a._id)
        };
        C.prototype.currentOptions = function (e) {
            function t(e, c, h, p) {
                var k;
                a.objectEach(e, function (a, d) {
                    if (!p && -1 < I(d, ["series", "xAxis", "yAxis"]))
                        for (a = u(a), h[d] = [], k = 0; k < a.length; k++) c[d][k] &&
                            (h[d][k] = {}, t(a[k], c[d][k], h[d][k], p + 1));
                    else f(a) ? (h[d] = n(a) ? [] : {}, t(a, c[d] || {}, h[d], p + 1)) : h[d] = c[d] || null
                })
            }
            var w = {};
            t(e, this.options, w, 0);
            return w
        }
    })(K);
    return K
});
//# sourceMappingURL=highcharts.js.map