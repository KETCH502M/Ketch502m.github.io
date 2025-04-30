(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    16: function (e, t, n) {},
    24: function (e, t, n) {},
    25: function (e, t, n) {},
    26: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n(1),
        r = n.n(a),
        c = n(10),
        i = n.n(c),
        s = (n(16), n(4)),
        o = n(2),
        l = n.n(o),
        u = n(5),
        d = n(0);
      function f(e) {
        var t = e.stream,
          n = e.detectorName,
          a = e.workerConnection,
          c = e.windowSize,
          i = e.powerThreshold,
          o = e.clarityThreshold,
          f = e.enabled,
          C = e.pitchRenderer,
          j = r.a.useState(null),
          h = Object(u.a)(j, 2),
          m = h[0],
          b = h[1],
          p = r.a.useState(null),
          x = Object(u.a)(p, 2),
          O = x[0],
          w = x[1],
          v = r.a.useRef(!1),
          g = r.a.useRef({}),
          k = r.a.useCallback(
            Object(s.a)(
              l.a.mark(function e() {
                var r, i;
                return l.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          a.remoteHandle().call("createDetector", n, c, c / 2)
                        );
                      case 2:
                        ((r = g.current).buffer = new Float32Array(c)),
                          (r.audioContext = new AudioContext()),
                          (i = r.audioContext.createMediaStreamSource(t)),
                          (r.analyser = r.audioContext.createAnalyser()),
                          (r.analyser.fftSize = c),
                          i.connect(r.analyser);
                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            ),
            [g, c, n, t, a]
          ),
          L = r.a.useCallback(
            Object(s.a)(
              l.a.mark(function e() {
                var t, n, r, c, s, u, d;
                return l.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (v.current) {
                          e.next = 15;
                          break;
                        }
                        if (
                          ((v.current = !0),
                          (t = g.current),
                          (n = t.analyser),
                          (r = t.buffer),
                          (c = t.audioContext),
                          n && r && c)
                        ) {
                          e.next = 7;
                          break;
                        }
                        return (
                          console.warn(
                            "Trying to update the pitch, but missing an analyser/buffer/audioContext"
                          ),
                          e.abrupt("return")
                        );
                      case 7:
                        return (
                          n.getFloatTimeDomainData(r),
                          (e.next = 10),
                          a
                            .remoteHandle()
                            .call("getPitch", r, c.sampleRate, i, o)
                        );
                      case 10:
                        (s = e.sent),
                          (u = s[0]),
                          (d = s[1]),
                          u > 0 ? (b(u), w(d)) : w(null),
                          (v.current = !1);
                      case 15:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            ),
            [v, g, b, w, i, o, a]
          );
        r.a.useEffect(
          function () {
            if (f) {
              var e = { cancelRender: !1 };
              return (
                Object(s.a)(
                  l.a.mark(function e() {
                    return l.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), k();
                          case 2:
                            t();
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                )(),
                function () {
                  e.cancelRender = !0;
                }
              );
            }
            function t() {
              e.cancelRender || (requestAnimationFrame(t), L());
            }
          },
          [k, L, f]
        );
        var S = C;
        return Object(d.jsx)(S, { freq: m, clarity: O });
      }
      var C = [
        {
          d: "M5.0064 173.531C2.24508 173.507 0.0184649 171.249 0.121197 168.49C0.579513 156.179 2.33654 143.951 5.36299 132.009C6.04138 129.332 8.81378 127.792 11.4701 128.546L57.9638 141.754C60.6202 142.508 62.1508 145.271 61.5107 147.958C59.8652 154.863 58.8534 161.905 58.488 168.995C58.3459 171.752 56.0992 173.973 53.3379 173.949L5.0064 173.531Z",
          fill: "#a50e0e",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M12.3057 125.699C9.66293 124.899 8.16276 122.104 9.03876 119.486C12.9468 107.802 18.0776 96.5645 24.3458 85.959C25.7508 83.5817 28.8448 82.885 31.181 84.3574L72.0707 110.128C74.4068 111.601 75.0971 114.683 73.7261 117.08C70.2017 123.243 67.2471 129.714 64.8991 136.414C63.9858 139.02 61.2047 140.517 58.5619 139.716L12.3057 125.699Z",
          fill: "#d93025",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M32.7848 81.8612C30.4747 80.3483 29.8225 77.2446 31.4008 74.9787C38.442 64.8698 46.5309 55.5326 55.5331 47.1225C57.551 45.2374 60.7159 45.4406 62.5426 47.5115L94.5158 83.7582C96.3425 85.8291 96.1364 88.981 94.1457 90.8948C89.0279 95.8148 84.3698 101.192 80.2295 106.958C78.619 109.202 75.5286 109.855 73.2186 108.342L32.7848 81.8612Z",
          fill: "#e37400",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M64.7847 45.5682C62.9944 43.4658 63.243 40.3041 65.3958 38.5746C74.9997 30.8588 85.3915 24.1786 96.3984 18.6454C98.8656 17.4051 101.845 18.4917 103.014 20.9933L123.481 64.7795C124.65 67.2812 123.564 70.2473 121.115 71.5228C114.819 74.8016 108.834 78.6484 103.237 83.0152C101.06 84.7138 97.9107 84.4699 96.1204 82.3675L64.7847 45.5682Z",
          fill: "#f29900",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M105.713 19.7604C104.588 17.2388 105.717 14.2752 108.27 13.2222C119.658 8.52459 131.511 5.04268 143.631 2.83441C146.348 2.33942 148.9 4.22142 149.318 6.95115L156.62 54.7298C157.037 57.4595 155.159 59.9997 152.45 60.5334C145.485 61.9056 138.659 63.9106 132.058 66.5236C129.491 67.54 126.538 66.4188 125.412 63.8972L105.713 19.7604Z",
          fill: "#fbbc04",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M200.638 6.94443C201.055 4.21459 203.607 2.33193 206.324 2.82621C218.444 5.0313 230.298 8.51011 241.688 13.2047C244.241 14.257 245.371 17.2203 244.246 19.7423L224.559 63.8842C223.434 66.4062 220.481 67.5281 217.913 66.5124C211.312 63.9011 204.486 61.8978 197.52 60.5275C194.811 59.9945 192.933 57.4548 193.349 54.7249L200.638 6.94443Z",
          fill: "#fbbc04",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M246.945 20.9745C248.114 18.4725 251.093 17.3851 253.561 18.6248C264.569 24.1552 274.963 30.8326 284.569 38.5459C286.722 40.2748 286.971 43.4365 285.181 45.5394L253.855 82.3468C252.066 84.4497 248.916 84.6944 246.739 82.9964C241.14 78.6311 235.155 74.7859 228.858 71.5087C226.408 70.2339 225.322 67.268 226.49 64.766L246.945 20.9745Z",
          fill: "#f29900",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M287.424 47.482C289.25 45.4107 292.415 45.2066 294.433 47.0913C303.438 55.499 311.529 64.8341 318.573 74.9411C320.152 77.2066 319.501 80.3105 317.191 81.824L276.764 108.315C274.454 109.829 271.364 109.176 269.753 106.934C265.611 101.168 260.951 95.7923 255.832 90.8736C253.841 88.9604 253.634 85.8085 255.46 83.7371L287.424 47.482Z",
          fill: "#e37400",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M318.795 84.3198C321.131 82.8468 324.225 83.5427 325.631 85.9196C331.902 96.5235 337.036 107.76 340.947 119.442C341.823 122.061 340.324 124.855 337.681 125.657L291.429 139.686C288.786 140.487 286.005 138.991 285.091 136.385C282.741 129.686 279.785 123.215 276.259 117.054C274.887 114.657 275.577 111.574 277.912 110.101L318.795 84.3198Z",
          fill: "#d93025",
          width: "16px",
          className: "chart-item",
        },
        {
          d: "M338.518 128.503C341.174 127.748 343.947 129.288 344.626 131.964C347.655 143.905 349.416 156.133 349.877 168.444C349.981 171.203 347.755 173.462 344.993 173.487L296.662 173.917C293.901 173.942 291.653 171.722 291.51 168.964C291.143 161.875 290.13 154.833 288.482 147.928C287.841 145.242 289.371 142.478 292.027 141.723L338.518 128.503Z",
          fill: "#a50e0e",
          width: "16px",
          className: "chart-item",
        },
      ];
      function j(e) {
        var t = e.chartNumber,
          n = void 0 === t ? 0 : t;
        return Object(d.jsxs)(r.a.Fragment, {
          children: [
            C.map(function (e, t) {
              return Object(d.jsx)(
                "path",
                { className: n <= t ? e.className : "", d: e.d, fill: e.fill },
                t
              );
            }),
            Object(d.jsx)("path", {
              d: "M152.254 6.52852C151.885 3.79193 153.803 1.26651 156.549 0.975363C168.8 -0.323498 181.154 -0.325115 193.405 0.97054C196.151 1.26096 198.07 3.78589 197.701 6.52258L191.247 54.423C190.878 57.1597 188.361 59.0681 185.611 58.8169C178.542 58.1712 171.428 58.1722 164.358 58.8197C161.608 59.0716 159.091 57.1639 158.721 54.4273L152.254 6.52852Z",
              fill: n > 5 ? "#fbbc04" : "#ccc",
            }),
          ],
        });
      }
      var h = n(11),
        m = n(3),
        b = n(9),
        p = Object(m.createStore)({
          windowSize: 8192,
          detectorName: "mcleod",
          displayType: "circle",
          clarityThreshold: 0.85,
          enabled: !1,
          loading: !1,
          loaded: !1,
          stream: null,
          audioOptions: {
            audio: { echoCancellation: !0, autoGainControl: !0 },
          },
          workerConnection: null,
          setWindowSize: Object(m.action)(function (e, t) {
            e.windowSize = t;
          }),
          setDetectorName: Object(m.action)(function (e, t) {
            e.detectorName = t;
          }),
          setDisplayType: Object(m.action)(function (e, t) {
            e.displayType = t;
          }),
          setClarityThreshold: Object(m.action)(function (e, t) {
            e.clarityThreshold = t;
          }),
          setEnabled: Object(m.action)(function (e, t) {
            e.enabled = t;
          }),
          setStream: Object(m.action)(function (e, t) {
            e.stream = t;
          }),
          setLoading: Object(m.action)(function (e, t) {
            e.loading = t;
          }),
          setLoaded: Object(m.action)(function (e, t) {
            e.loaded = t;
          }),
          setWorkerConnection: Object(m.action)(function (e, t) {
            e.workerConnection = t;
          }),
          initializeStream: Object(m.thunk)(
            (function () {
              var e = Object(s.a)(
                l.a.mark(function e(t, n, a) {
                  var r, c, i, s;
                  return l.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (r = a.getState),
                              (c = r()),
                              (i = c.audioOptions),
                              t.setLoading(!0),
                              (e.prev = 4),
                              (e.next = 7),
                              navigator.mediaDevices.getUserMedia(i)
                            );
                          case 7:
                            (s = e.sent),
                              t.setStream(s),
                              t.setLoading(!1),
                              t.setLoaded(!0),
                              (e.next = 19);
                            break;
                          case 13:
                            (e.prev = 13),
                              (e.t0 = e.catch(4)),
                              console.error(e.t0),
                              t.setStream(null),
                              t.setLoading(!1),
                              t.setLoaded(!1);
                          case 19:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[4, 13]]
                  );
                })
              );
              return function (t, n, a) {
                return e.apply(this, arguments);
              };
            })()
          ),
          stopStream: Object(m.thunk)(
            (function () {
              var e = Object(s.a)(
                l.a.mark(function e(t, n, a) {
                  var r, c, i, s;
                  return l.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (((r = a.getState), (c = r().stream))) {
                            i = Object(h.a)(c.getTracks());
                            try {
                              for (i.s(); !(s = i.n()).done; ) s.value.stop();
                            } catch (n) {
                              i.e(n);
                            } finally {
                              i.f();
                            }
                          }
                          t.setStream(null), t.setLoading(!1), t.setLoaded(!1);
                        case 6:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function (t, n, a) {
                return e.apply(this, arguments);
              };
            })()
          ),
          initializeWorker: Object(m.thunk)(
            (function () {
              var e = Object(s.a)(
                l.a.mark(function e(t) {
                  var n, a, r;
                  return l.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (n = new Worker(
                                "".concat(
                                  "/static/es/",
                                  "js/worker.js"
                                )
                              )),
                              (a = new b.b({ worker: n })),
                              (e.prev = 2),
                              (e.next = 5),
                              Object(b.a)(a, {}, 5, 1e3)
                            );
                          case 5:
                            (r = e.sent),
                              t.setWorkerConnection(r),
                              (e.next = 13);
                            break;
                          case 9:
                            (e.prev = 9),
                              (e.t0 = e.catch(2)),
                              console.error(
                                "Failed to connect to worker",
                                e.t0
                              ),
                              t.setWorkerConnection(null);
                          case 13:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[2, 9]]
                  );
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })()
          ),
        }),
        x = Object(m.createTypedHooks)(),
        O = x.useStoreActions,
        w = (x.useStoreDispatch, x.useStoreState),
        v = function () {
          var e = r.a.useState(!1),
            t = Object(u.a)(e, 2),
            n = t[0],
            a = t[1],
            c = O(function (e) {
              return e;
            }),
            i = c.initializeStream,
            o = c.setEnabled;
          return (
            r.a.useEffect(
              function () {
                n &&
                  Object(s.a)(
                    l.a.mark(function e() {
                      return l.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), i();
                            case 2:
                              o(!0);
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  )();
              },
              [i, n, o]
            ),
            Object(d.jsxs)("g", {
              transform: "translate(175,110)",
              className: "mic-button",
              onClick: function () {
                a(!0);
              },
              children: [
                Object(d.jsx)("circle", { r: "27", fill: "#72ac51" }),
                Object(d.jsx)("g", {
                  transform: "translate(-10,-15)",
                  children: Object(d.jsx)("path", {
                    xmlns: "http://www.w3.org/2000/svg",
                    d: "M10 22C13.0125 22 15.4545 19.3138 15.4545 16V6C15.4545 2.68625 13.0125 0 10 0C6.9875 0 4.54545 2.68625 4.54545 6V16C4.54545 19.3138 6.9875 22 10 22ZM19.0909 12H18.1818C17.6795 12 17.2727 12.4475 17.2727 13V16C17.2727 20.675 13.6085 24.4263 9.2733 23.9613C5.49489 23.5556 2.72727 19.8194 2.72727 15.6438V13C2.72727 12.4475 2.32045 12 1.81818 12H0.909091C0.406818 12 0 12.4475 0 13V15.51C0 21.1125 3.63466 26.1069 8.63636 26.8656V29H5.45455C4.95227 29 4.54545 29.4475 4.54545 30V31C4.54545 31.5525 4.95227 32 5.45455 32H14.5455C15.0477 32 15.4545 31.5525 15.4545 31V30C15.4545 29.4475 15.0477 29 14.5455 29H11.3636V26.8894C16.2335 26.1544 20 21.5563 20 16V13C20 12.4475 19.5932 12 19.0909 12Z",
                    fill: "#fff",
                  }),
                }),
              ],
            })
          );
        },
        g = function () {
          return Object(d.jsxs)("g", {
            transform: "translate(175,110)",
            children: [
              Object(d.jsxs)("g", {
                children: [
                  Object(d.jsx)("animateTransform", {
                    attributeName: "transform",
                    additive: "sum",
                    type: "scale",
                    dur: "1.5s",
                    values: "1; 1.3",
                    repeatCount: "indefinite",
                  }),
                  Object(d.jsx)("animate", {
                    attributeName: "opacity",
                    from: "1",
                    to: "0",
                    dur: "1.5s",
                    begin: "0s",
                    repeatCount: "indefinite",
                  }),
                  Object(d.jsx)("circle", {
                    r: "27",
                    stroke: "#72ac51",
                    fill: "none",
                    strokeWidth: "5",
                  }),
                ],
              }),
              Object(d.jsx)("circle", { r: "27", fill: "#72ac51" }),
              Object(d.jsx)("g", {
                transform: "translate(-10,-15)",
                children: Object(d.jsx)("path", {
                  xmlns: "http://www.w3.org/2000/svg",
                  d: "M10 22C13.0125 22 15.4545 19.3138 15.4545 16V6C15.4545 2.68625 13.0125 0 10 0C6.9875 0 4.54545 2.68625 4.54545 6V16C4.54545 19.3138 6.9875 22 10 22ZM19.0909 12H18.1818C17.6795 12 17.2727 12.4475 17.2727 13V16C17.2727 20.675 13.6085 24.4263 9.2733 23.9613C5.49489 23.5556 2.72727 19.8194 2.72727 15.6438V13C2.72727 12.4475 2.32045 12 1.81818 12H0.909091C0.406818 12 0 12.4475 0 13V15.51C0 21.1125 3.63466 26.1069 8.63636 26.8656V29H5.45455C4.95227 29 4.54545 29.4475 4.54545 30V31C4.54545 31.5525 4.95227 32 5.45455 32H14.5455C15.0477 32 15.4545 31.5525 15.4545 31V30C15.4545 29.4475 15.0477 29 14.5455 29H11.3636V26.8894C16.2335 26.1544 20 21.5563 20 16V13C20 12.4475 19.5932 12 19.0909 12Z",
                  fill: "#fff",
                }),
              }),
            ],
          });
        },
        k = window.translation,
        L = k.accidentals,
        S = k.listening,
        N = k.tune_up,
        y = k.tune_down,
        M = k.in_tune,
        V = k.click_to_start;
      function T(e) {
        var t = e.noteName,
          n = e.cents,
          c = e.clarity,
          i = Object(a.useState)(""),
          s = Object(u.a)(i, 2),
          o = s[0],
          l = s[1],
          f = Object(a.useState)(1),
          C = Object(u.a)(f, 2),
          h = C[0],
          m = C[1],
          b = p.getState().enabled,
          x = (function (e) {
            return e < -42.5
              ? 0
              : e < -35
              ? 1
              : e < -27.5
              ? 2
              : e < -20
              ? 3
              : e < -7
              ? 4
              : e < 7
              ? 5
              : e < 20
              ? 6
              : e < 27.5
              ? 7
              : e < 35
              ? 8
              : e < 42.5
              ? 9
              : e < 51
              ? 10
              : 0;
          })(n),
          O = (n > -7 && n <= 0) || (n >= 0 && n < 7),
          w = n > 7 ? y : n < -7 ? N : "",
          k = h < 0;
        return (
          r.a.useEffect(
            function () {
              var e = setInterval(function () {
                m(function (e) {
                  return e - 1;
                });
              }, 1e3);
              return (
                c && (l(L[t]), m(5)),
                k && l(""),
                function () {
                  return clearInterval(e);
                }
              );
            },
            [c, t, k]
          ),
          Object(d.jsxs)(d.Fragment, {
            children: [
              Object(d.jsxs)("svg", {
                className: "chart",
                height: "220",
                width: "350",
                version: "1.1",
                viewBox: "0 0 350 149",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  b &&
                    Object(d.jsx)("g", {
                      transform: "translate(175,135)",
                      children: Object(d.jsx)("text", {
                        className: "noteName",
                        fontSize: "4rem",
                        textAnchor: "middle",
                        dangerouslySetInnerHTML: { __html: o },
                      }),
                    }),
                  !k &&
                    Object(d.jsx)("g", {
                      transform: "translate(175,170)",
                      children: Object(d.jsx)("text", {
                        alignmentBaseline: "middle",
                        className: "is-tuned",
                        textAnchor: "middle",
                        children: b && w,
                      }),
                    }),
                  Object(d.jsx)("g", {
                    transform: "translate(175,170)",
                    children: Object(d.jsx)("text", {
                      alignmentBaseline: "middle",
                      className: "is-tuned",
                      textAnchor: "middle",
                      children: !b && V,
                    }),
                  }),
                  Object(d.jsx)(j, { chartNumber: x }),
                  !b && Object(d.jsx)(v, {}),
                  b && k && Object(d.jsx)(g, {}),
                  O &&
                    b &&
                    !k &&
                    Object(d.jsxs)(d.Fragment, {
                      children: [
                        Object(d.jsx)("g", {
                          transform: "translate(175,170)",
                          children: Object(d.jsx)("text", {
                            alignmentBaseline: "middle",
                            className: "is-tuned",
                            textAnchor: "middle",
                            children: M,
                          }),
                        }),
                        Object(d.jsx)("path", {
                          d: "M152.254 6.52852C151.885 3.79193 153.803 1.26651 156.549 0.975363C168.8 -0.323498 181.154 -0.325115 193.405 0.97054C196.151 1.26096 198.07 3.78589 197.701 6.52258L191.247 54.423C190.878 57.1597 188.361 59.0681 185.611 58.8169C178.542 58.1712 171.428 58.1722 164.358 58.8197C161.608 59.0716 159.091 57.1639 158.721 54.4273L152.254 6.52852Z",
                          fill: "#72ac51",
                          stroke: "#72ac51",
                        }),
                        Object(d.jsx)("path", {
                          className: "in-tune",
                          d: "M152.254 6.52852C151.885 3.79193 153.803 1.26651 156.549 0.975363C168.8 -0.323498 181.154 -0.325115 193.405 0.97054C196.151 1.26096 198.07 3.78589 197.701 6.52258L191.247 54.423C190.878 57.1597 188.361 59.0681 185.611 58.8169C178.542 58.1712 171.428 58.1722 164.358 58.8197C161.608 59.0716 159.091 57.1639 158.721 54.4273L152.254 6.52852Z",
                          fill: "#72ac51",
                          stroke: "#72ac51",
                        }),
                      ],
                    }),
                ],
              }),
              b &&
                k &&
                Object(d.jsx)("span", {
                  className: "listening-text",
                  children: S,
                }),
            ],
          })
        );
      }
      n(24);
      var Z = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        F = function (e, t) {
          if (e)
            return Math.floor(
              (1200 *
                Math.log(
                  e /
                    (function (e) {
                      return 440 * Math.pow(2, (e - 69) / 12);
                    })(t)
                )) /
                Math.log(2)
            );
        };
      function H(e) {
        var t = e.freq,
          n = void 0 === t ? 440 : t,
          a = e.clarity,
          r = void 0 === a ? 0 : a,
          c = (function (e) {
            var t = (Math.log(e / 440) / Math.log(2)) * 12;
            return Math.round(t) + 69;
          })(n),
          i = F(n, c),
          s = Z[c % 12];
        return Object(d.jsx)("div", {
          className: "tuner",
          children: Object(d.jsxs)("div", {
            className: "chart",
            children: [
              Object(d.jsx)("span", {
                className: "accidentals",
                children: "\xa8",
              }),
              Object(d.jsx)(T, { noteName: s, clarity: r, cents: i }),
              Object(d.jsx)("span", {
                className: "accidentals",
                children: "\xa9",
              }),
            ],
          }),
        });
      }
      n(25);
      var z = window.translation.button_names,
        A = z.start_tune,
        D = z.stop_tune;
      function E(e) {
        var t = e.children,
          n = r.a.useState(!1),
          a = Object(u.a)(n, 2),
          c = a[0],
          i = a[1],
          o = O(function (e) {
            return e;
          }),
          f = o.initializeStream,
          C = o.stopStream,
          j = o.setEnabled;
        r.a.useEffect(
          function () {
            return (
              c
                ? Object(s.a)(
                    l.a.mark(function e() {
                      return l.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), f();
                            case 2:
                              j(!0);
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  )()
                : Object(s.a)(
                    l.a.mark(function e() {
                      return l.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return j(!1), (e.next = 3), C();
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  )(),
              C
            );
          },
          [f, c, j, C]
        );
        var h = p.getState().enabled;
        return Object(d.jsxs)(r.a.Fragment, {
          children: [
            Object(d.jsx)("button", {
              onClick: function () {
                h && !c
                  ? Object(s.a)(
                      l.a.mark(function e() {
                        return l.a.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return j(!1), (e.next = 3), C();
                              case 3:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    )()
                  : i(!c);
              },
              children: h ? D : A,
            }),
            Object(d.jsx)("main", { role: "main", children: t }),
          ],
        });
      }
      var _ = function () {
          var e = w(function (e) {
              return e.detectorName;
            }),
            t = w(function (e) {
              return e.windowSize;
            }),
            n = w(function (e) {
              return e.clarityThreshold;
            }),
            a = w(function (e) {
              return e.enabled;
            }),
            c = w(function (e) {
              return {
                loaded: e.loaded,
                loading: e.loading,
                stream: e.stream,
                workerConnection: e.workerConnection,
              };
            }),
            i = c.loaded,
            o = c.stream,
            u = c.workerConnection,
            C = O(function (e) {
              return e;
            }).initializeWorker;
          r.a.useEffect(
            function () {
              Object(s.a)(
                l.a.mark(function e() {
                  return l.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), C();
                        case 2:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )();
            },
            [C]
          );
          var j = Object(d.jsx)(f, { pitchRenderer: H });
          return (
            i &&
              o &&
              u &&
              (j = Object(d.jsx)(f, {
                stream: o,
                detectorName: e,
                workerConnection: u,
                windowSize: t,
                powerThreshold: 0.15,
                clarityThreshold: n,
                enabled: a,
                pitchRenderer: H,
              })),
            Object(d.jsx)(E, { children: j })
          );
        },
        R = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 28))
              .then(function (t) {
                var n = t.getCLS,
                  a = t.getFID,
                  r = t.getFCP,
                  c = t.getLCP,
                  i = t.getTTFB;
                n(e), a(e), r(e), c(e), i(e);
              });
        };
      i.a.render(
        Object(d.jsx)(r.a.StrictMode, {
          children: Object(d.jsx)(m.StoreProvider, {
            store: p,
            children: Object(d.jsx)(_, {}),
          }),
        }),
        document.getElementById("tuner")
      ),
        R();
    },
  },
  [[26, 1, 2]],
]);
