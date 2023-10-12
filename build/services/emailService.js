"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require("dotenv").config();
var sendBookingEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dataSend) {
    var transporter, emailContent, emailLanguage, info;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("Sending", dataSend);
          transporter = _nodemailer["default"].createTransport({
            // host: "smtp.forwardemail.net",
            // port: 465,
            // secure: true,
            service: "Gmail",
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD
            }
            // tls: {
            //   // Use the TLS version you need (e.g., 'TLSv1.2')
            //   ciphers: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256",
            // },
          });
          emailContent = {
            vi: {
              subject: "Xác nhận cuộc hẹn VKU Healcare ✔",
              text: "Ch\xE0o b\u1EA1n, ".concat(dataSend.patientName),
              html: "\n        <p>Ch\xE0o b\u1EA1n, ".concat(dataSend.patientName, "</p>\n        <p>L\u1ECBch h\u1EB9n c\u1EE7a b\u1EA1n \u0111\xE3 \u0111\u01B0\u1EE3c x\xE1c nh\u1EADn. D\u01B0\u1EDBi \u0111\xE2y l\xE0 chi ti\u1EBFt:</p>\n        <ul>\n          <li><strong>T\xEAn B\xE1c s\u0129:</strong> ").concat(dataSend.doctorName, "</li>\n          <li><strong>Th\u1EDDi gian h\u1EB9n:</strong> ").concat(dataSend.time, "</li>\n          <li><strong>L\xFD do kh\xE1m:</strong> ").concat(dataSend.reason, "</li>\n        </ul>\n        <p>\u0110\u1EC3 xem chi ti\u1EBFt cu\u1ED9c h\u1EB9n v\xE0 th\u1EF1c hi\u1EC7n b\u1EA5t k\u1EF3 thay \u0111\u1ED5i n\xE0o, vui l\xF2ng nh\u1EA5p v\xE0o li\xEAn k\u1EBFt sau \u0111\xE2y:</p>\n        <p><a href=\"").concat(dataSend.redirectLink, "\">Nh\u1EA5n v\xE0o \u0111\xE2y</a></p>\n        <p>C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 ch\u1ECDn VKU Healthcare.</p>\n        <p>Tr\xE2n tr\u1ECDng,<br>\u0110\u1ED9i ng\u0169 VKU Healthcare</p>\n      ")
            },
            en: {
              subject: "VKU Healcare Confirmation ✔",
              text: "Dear ".concat(dataSend.patientName),
              html: "\n        <p>Dear ".concat(dataSend.patientName, "</p>\n        <p>Your appointment has been confirmed. Here are the details:</p>\n        <ul>\n          <li><strong>Doctor Name:</strong> ").concat(dataSend.doctorName, "</li>\n          <li><strong>Appointment Time:</strong> ").concat(dataSend.time, "</li>\n          <li><strong>Reason:</strong> ").concat(dataSend.time, "</li>\n        </ul>\n        <p>To view your appointment details and make any changes, please click the following link:</p>\n        <p><a href=\"").concat(dataSend.redirectLink, "\">Click here</a></p>\n        <p>Thank you for choosing VKU Healthcare.</p>\n        <p>Sincerely,<br>VKU Healthcare Team</p>\n      ")
            }
          };
          emailLanguage = emailContent[dataSend.language || "en"];
          _context.next = 6;
          return transporter.sendMail({
            from: '"VKU Healcare 👻" <thanhtruong16092004@gmail.com>',
            // sender address
            to: dataSend.receiverEmail,
            // list of receivers
            subject: emailLanguage.subject,
            text: emailLanguage.text,
            html: emailLanguage.html
          });
        case 6:
          info = _context.sent;
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendBookingEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var sendAttachment = function sendAttachment(dataSend) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var transporter, emailContent, emailLanguage, info;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            transporter = _nodemailer["default"].createTransport({
              service: "Gmail",
              auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD
              }
            });
            emailContent = {
              vi: {
                subject: "Đặt lịch thành công VKU Healcare",
                text: "Ch\xE0o b\u1EA1n,".concat(dataSend.patientName),
                html: "\n          <p>Ch\xE0o b\u1EA1n, ".concat(dataSend.patientName, "</p>\n            <p>B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c email n\xE0y v\xEC \u0111\xE3 \u0111\u1EB7t l\u1ECBch th\xE0nh c\xF4ng tr\xEAn VKU Healcare</p>\n            <p>Th\xF4ng tin h\xF3a \u0111\u01A1n/\u0111\u01A1n thu\u1ED1c \u0111\u01B0\u1EE3c g\u1EEDi trong file \u0111\xEDnh k\xE8m</p>\n            <p>C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 ch\u1ECDn VKU Healthcare.</p>\n            <p>Tr\xE2n tr\u1ECDng,<br>\u0110\u1ED9i ng\u0169 VKU Healthcare</p>\n          ")
              },
              en: {
                subject: "Appointment Confirmation at VKU Healcare",
                text: "Dear, ".concat(dataSend.patientName),
                html: "\n          <p>Dear ".concat(dataSend.patientName, "</p>\n            <p>You are receiving this email because you have successfully booked an appointment on VKU Healcare</p>\n            <p>The invoice/prescription information is sent in the attached file.</p>\n            <p>Thank you for choosing VKU Healthcare.</p>\n            <p>Best regards,<br>The VKU Healthcare Team</p>\n          ")
              }
            };
            emailLanguage = emailContent[dataSend.language || "en"];
            _context2.next = 6;
            return transporter.sendMail({
              from: '"VKU Healcare 👻" <thanhtruong16092004@gmail.com>',
              to: dataSend.email,
              subject: emailLanguage.subject,
              text: emailLanguage.text,
              html: emailLanguage.html,
              attachments: [{
                filename: "vku-healcare-".concat(dataSend.patientName, "-").concat(new Date().getTime(), ".png"),
                content: dataSend.imgBase64.split("base64")[1],
                encoding: "base64"
              }]
            });
          case 6:
            info = _context2.sent;
            resolve("Email sent successfully");
            _context2.next = 14;
            break;
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.error("Error sending email:", _context2.t0);
            reject("Error sending email");
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 10]]);
    }));
    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());
};
module.exports = {
  sendBookingEmail: sendBookingEmail,
  sendAttachment: sendAttachment
};