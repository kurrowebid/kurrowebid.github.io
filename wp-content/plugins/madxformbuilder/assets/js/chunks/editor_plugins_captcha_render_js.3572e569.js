"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["editor_plugins_captcha_render_js"],{

/***/ "./editor/plugins/captcha/options.js":
/*!*******************************************!*\
  !*** ./editor/plugins/captcha/options.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"help\": () => (/* binding */ help),\n/* harmony export */   \"labels\": () => (/* binding */ labels)\n/* harmony export */ });\nvar __ = wp.i18n.__;\nvar labels = {\n  enabled: __('Enable reCAPTCHA v3 form verification', 'madx-form-builder'),\n  key: __('Site Key:', 'madx-form-builder'),\n  secret: __('Secret Key:', 'madx-form-builder'),\n  use_global: __('Use Global Settings', 'madx-form-builder'),\n  threshold: __('Score Threshold', 'madx-form-builder')\n};\nvar help = {\n  threshold: __(\"It should be a value between 0 and 1, default 0.5 \\n(1.0 is very likely a good interaction, 0.0 is very likely a bot).\", 'madx-form-builder')\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9lZGl0b3IvcGx1Z2lucy9jYXB0Y2hhL29wdGlvbnMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFRQSxFQUFFLEdBQUtDLEVBQUUsQ0FBQ0MsSUFBSSxDQUFkRixFQUFFO0FBRVYsSUFBTUcsTUFBTSxHQUFHO0VBQ2RDLE9BQU8sRUFBRUosRUFBRSxDQUFFLHVDQUF1QyxFQUFFLGtCQUFtQixDQUFDO0VBQzFFSyxHQUFHLEVBQUVMLEVBQUUsQ0FBRSxXQUFXLEVBQUUsa0JBQW1CLENBQUM7RUFDMUNNLE1BQU0sRUFBRU4sRUFBRSxDQUFFLGFBQWEsRUFBRSxrQkFBbUIsQ0FBQztFQUMvQ08sVUFBVSxFQUFFUCxFQUFFLENBQUUscUJBQXFCLEVBQUUsa0JBQW1CLENBQUM7RUFDM0RRLFNBQVMsRUFBRVIsRUFBRSxDQUFFLGlCQUFpQixFQUFFLGtCQUFtQjtBQUN0RCxDQUFDO0FBRUQsSUFBTVMsSUFBSSxHQUFHO0VBQ1pELFNBQVMsRUFBRVIsRUFBRSwySEFHWixrQkFDRDtBQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9lZGl0b3IvcGx1Z2lucy9jYXB0Y2hhL29wdGlvbnMuanM/MDg1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xyXG5cclxuY29uc3QgbGFiZWxzID0ge1xyXG5cdGVuYWJsZWQ6IF9fKCAnRW5hYmxlIHJlQ0FQVENIQSB2MyBmb3JtIHZlcmlmaWNhdGlvbicsICdqZXQtZm9ybS1idWlsZGVyJyApLFxyXG5cdGtleTogX18oICdTaXRlIEtleTonLCAnamV0LWZvcm0tYnVpbGRlcicgKSxcclxuXHRzZWNyZXQ6IF9fKCAnU2VjcmV0IEtleTonLCAnamV0LWZvcm0tYnVpbGRlcicgKSxcclxuXHR1c2VfZ2xvYmFsOiBfXyggJ1VzZSBHbG9iYWwgU2V0dGluZ3MnLCAnamV0LWZvcm0tYnVpbGRlcicgKSxcclxuXHR0aHJlc2hvbGQ6IF9fKCAnU2NvcmUgVGhyZXNob2xkJywgJ2pldC1mb3JtLWJ1aWxkZXInICksXHJcbn07XHJcblxyXG5jb25zdCBoZWxwID0ge1xyXG5cdHRocmVzaG9sZDogX18oXHJcblx0XHRgSXQgc2hvdWxkIGJlIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLCBkZWZhdWx0IDAuNSBcclxuKDEuMCBpcyB2ZXJ5IGxpa2VseSBhIGdvb2QgaW50ZXJhY3Rpb24sIDAuMCBpcyB2ZXJ5IGxpa2VseSBhIGJvdCkuYCxcclxuXHRcdCdqZXQtZm9ybS1idWlsZGVyJyxcclxuXHQpLFxyXG59O1xyXG5cclxuZXhwb3J0IHsgbGFiZWxzLCBoZWxwIH07Il0sIm5hbWVzIjpbIl9fIiwid3AiLCJpMThuIiwibGFiZWxzIiwiZW5hYmxlZCIsImtleSIsInNlY3JldCIsInVzZV9nbG9iYWwiLCJ0aHJlc2hvbGQiLCJoZWxwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./editor/plugins/captcha/options.js\n");

/***/ }),

/***/ "./editor/plugins/captcha/render.js":
/*!******************************************!*\
  !*** ./editor/plugins/captcha/render.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options */ \"./editor/plugins/captcha/options.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar __ = wp.i18n.__;\nvar _madxFBHooks = madxFBHooks,\n  useMetaState = _madxFBHooks.useMetaState;\nvar _madxFBComponents = madxFBComponents,\n  ToggleControl = _madxFBComponents.ToggleControl,\n  BaseHelp = _madxFBComponents.BaseHelp;\nvar _wp$components = wp.components,\n  CoreToggleControl = _wp$components.ToggleControl,\n  TextControl = _wp$components.TextControl,\n  __experimentalNumberControl = _wp$components.__experimentalNumberControl;\nvar NumberControl = wp.components.NumberControl;\nNumberControl = NumberControl || __experimentalNumberControl;\nvar _madxFBActions = madxFBActions,\n  globalTab = _madxFBActions.globalTab;\nvar currentTab = globalTab({\n  slug: 'captcha-tab'\n});\nfunction PluginCaptcha() {\n  var _useMetaState = useMetaState('_jf_recaptcha'),\n    _useMetaState2 = _slicedToArray(_useMetaState, 2),\n    args = _useMetaState2[0],\n    setArgs = _useMetaState2[1];\n  var score = args.use_global ? currentTab.threshold : args.threshold;\n  return wp.element.createElement(React.Fragment, null, wp.element.createElement(CoreToggleControl, {\n    key: 'enabled',\n    label: _options__WEBPACK_IMPORTED_MODULE_0__.labels.enabled,\n    checked: args.enabled,\n    onChange: function onChange(newVal) {\n      setArgs(function (prevArgs) {\n        return _objectSpread(_objectSpread({}, prevArgs), {}, {\n          enabled: Boolean(newVal)\n        });\n      });\n    }\n  }), args.enabled && wp.element.createElement(React.Fragment, null, wp.element.createElement(ToggleControl, {\n    checked: args.use_global,\n    onChange: function onChange(use_global) {\n      setArgs(function (prevArgs) {\n        return _objectSpread(_objectSpread({}, prevArgs), {}, {\n          use_global: Boolean(use_global)\n        });\n      });\n    }\n  }, __('Use', 'madx-form-builder') + ' ', wp.element.createElement(\"a\", {\n    href: madxFormEditorData.global_settings_url + '#captcha-tab'\n  }, __('Global Settings', 'madx-form-builder'))), wp.element.createElement(TextControl, {\n    key: 'site_key',\n    label: _options__WEBPACK_IMPORTED_MODULE_0__.labels.key,\n    value: args.use_global ? currentTab.key : args.key,\n    disabled: args.use_global,\n    onChange: function onChange(newValue) {\n      return setArgs(function (prevArgs) {\n        return _objectSpread(_objectSpread({}, prevArgs), {}, {\n          key: newValue\n        });\n      });\n    }\n  }), wp.element.createElement(TextControl, {\n    key: 'secret_key',\n    label: _options__WEBPACK_IMPORTED_MODULE_0__.labels.secret,\n    value: args.use_global ? currentTab.secret : args.secret,\n    disabled: args.use_global,\n    onChange: function onChange(newValue) {\n      return setArgs(function (prevArgs) {\n        return _objectSpread(_objectSpread({}, prevArgs), {}, {\n          secret: newValue\n        });\n      });\n    }\n  }), wp.element.createElement(NumberControl, {\n    label: _options__WEBPACK_IMPORTED_MODULE_0__.labels.threshold,\n    labelPosition: \"top\",\n    value: score,\n    disabled: args.use_global,\n    min: 0,\n    max: 1,\n    step: 0.1,\n    placeholder: '0.5',\n    onChange: function onChange(newValue) {\n      return setArgs(function (prevArgs) {\n        return _objectSpread(_objectSpread({}, prevArgs), {}, {\n          threshold: newValue\n        });\n      });\n    }\n  }), wp.element.createElement(BaseHelp, {\n    style: {\n      marginTop: '-1em'\n    }\n  }, _options__WEBPACK_IMPORTED_MODULE_0__.help.threshold), wp.element.createElement(\"span\", null, 'Register reCAPTCHA v3 keys ', wp.element.createElement(\"a\", {\n    href: \"https://www.google.com/recaptcha/admin/create\",\n    target: \"_blank\"\n  }, \"here\"))));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PluginCaptcha);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxFQUFHLENBQUc7SUFDVEMsR0FBRyxFQUFHLENBQUc7SUFDVEMsSUFBSSxFQUFHLEdBQUs7SUFDWkMsV0FBVyxFQUFHLEtBQU87SUFDckJoQixRQUFRLEVBQUcsU0FBQUEsU0FBQVUsUUFBUTtNQUFBLE9BQUl0QixPQUFPLENBQUUsVUFBRWMsUUFBUTtRQUFBLE9BQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUVyQ0QsUUFBUTtVQUNYWCxTQUFTLEVBQUVtQjtRQUFRO01BQUEsQ0FFbkIsQ0FBQztJQUFBO0VBQUUsQ0FDTCxDQUFDLEVBQ0YvQyxFQUFBLENBQUE2QixPQUFBLENBQUFDLGFBQUEsQ0FBQ3RCLFFBQVE7SUFDUjhDLEtBQUssRUFBRztNQUFFQyxTQUFTLEVBQUU7SUFBTztFQUFHLEdBRTdCMUQsb0RBQ08sQ0FBQyxFQUNYRyxFQUFBLENBQUE2QixPQUFBLENBQUFDLGFBQUEsZUFBUSw2QkFBNkIsRUFDcEM5QixFQUFBLENBQUE2QixPQUFBLENBQUFDLGFBQUE7SUFBR1ksSUFBSSxFQUFDLCtDQUErQztJQUNwRGMsTUFBTSxFQUFDO0VBQVEsR0FBQyxNQUFPLENBQ25CLENBQ1AsQ0FDRCxDQUFDO0FBQ0o7QUFFQSxpRUFBZXBDLGFBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9lZGl0b3IvcGx1Z2lucy9jYXB0Y2hhL3JlbmRlci5qcz8yOTg0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhlbHAsIGxhYmVscyB9IGZyb20gJy4vb3B0aW9ucyc7XHJcblxyXG5jb25zdCB7XHJcblx0ICAgICAgX18sXHJcbiAgICAgIH0gPSB3cC5pMThuO1xyXG5jb25zdCB7XHJcblx0ICAgICAgdXNlTWV0YVN0YXRlLFxyXG4gICAgICB9ID0gSmV0RkJIb29rcztcclxuY29uc3Qge1xyXG5cdCAgICAgIFRvZ2dsZUNvbnRyb2wsXHJcblx0ICAgICAgQmFzZUhlbHAsXHJcbiAgICAgIH0gPSBKZXRGQkNvbXBvbmVudHM7XHJcbmNvbnN0IHtcclxuXHQgICAgICBUb2dnbGVDb250cm9sOiBDb3JlVG9nZ2xlQ29udHJvbCxcclxuXHQgICAgICBUZXh0Q29udHJvbCxcclxuXHQgICAgICBfX2V4cGVyaW1lbnRhbE51bWJlckNvbnRyb2wsXHJcbiAgICAgIH0gPSB3cC5jb21wb25lbnRzO1xyXG5cclxubGV0IHsgTnVtYmVyQ29udHJvbCB9ID0gd3AuY29tcG9uZW50cztcclxuXHJcbk51bWJlckNvbnRyb2wgPSBOdW1iZXJDb250cm9sIHx8IF9fZXhwZXJpbWVudGFsTnVtYmVyQ29udHJvbDtcclxuXHJcbmNvbnN0IHsgZ2xvYmFsVGFiIH0gPSBKZXRGQkFjdGlvbnM7XHJcbmNvbnN0IGN1cnJlbnRUYWIgICAgPSBnbG9iYWxUYWIoIHsgc2x1ZzogJ2NhcHRjaGEtdGFiJyB9ICk7XHJcblxyXG5mdW5jdGlvbiBQbHVnaW5DYXB0Y2hhKCkge1xyXG5cclxuXHRjb25zdCBbIGFyZ3MsIHNldEFyZ3MgXSA9IHVzZU1ldGFTdGF0ZSggJ19qZl9yZWNhcHRjaGEnICk7XHJcblxyXG5cdGxldCBzY29yZSA9IGFyZ3MudXNlX2dsb2JhbFxyXG5cdCAgICAgICAgICAgID8gY3VycmVudFRhYi50aHJlc2hvbGRcclxuXHQgICAgICAgICAgICA6IGFyZ3MudGhyZXNob2xkO1xyXG5cclxuXHRyZXR1cm4gPD5cclxuXHRcdDxDb3JlVG9nZ2xlQ29udHJvbFxyXG5cdFx0XHRrZXk9eyAnZW5hYmxlZCcgfVxyXG5cdFx0XHRsYWJlbD17IGxhYmVscy5lbmFibGVkIH1cclxuXHRcdFx0Y2hlY2tlZD17IGFyZ3MuZW5hYmxlZCB9XHJcblx0XHRcdG9uQ2hhbmdlPXsgbmV3VmFsID0+IHtcclxuXHRcdFx0XHRzZXRBcmdzKCAoIHByZXZBcmdzICkgPT4gKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHQuLi5wcmV2QXJncyxcclxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogQm9vbGVhbiggbmV3VmFsICksXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KSApO1xyXG5cdFx0XHR9IH1cclxuXHRcdC8+XHJcblx0XHR7IGFyZ3MuZW5hYmxlZCAmJiA8PlxyXG5cdFx0XHQ8VG9nZ2xlQ29udHJvbFxyXG5cdFx0XHRcdGNoZWNrZWQ9eyBhcmdzLnVzZV9nbG9iYWwgfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXsgdXNlX2dsb2JhbCA9PiB7XHJcblx0XHRcdFx0XHRzZXRBcmdzKCBwcmV2QXJncyA9PiAoXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQuLi5wcmV2QXJncyxcclxuXHRcdFx0XHRcdFx0XHR1c2VfZ2xvYmFsOiBCb29sZWFuKCB1c2VfZ2xvYmFsICksXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCkgKTtcclxuXHRcdFx0XHR9IH1cclxuXHRcdFx0PlxyXG5cdFx0XHRcdHsgX18oICdVc2UnLCAnamV0LWZvcm0tYnVpbGRlcicgKSArICcgJyB9XHJcblx0XHRcdFx0PGEgaHJlZj17IEpldEZvcm1FZGl0b3JEYXRhLmdsb2JhbF9zZXR0aW5nc191cmwgK1xyXG5cdFx0XHRcdCcjY2FwdGNoYS10YWInIH0+XHJcblx0XHRcdFx0XHR7IF9fKCAnR2xvYmFsIFNldHRpbmdzJywgJ2pldC1mb3JtLWJ1aWxkZXInICkgfVxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9Ub2dnbGVDb250cm9sPlxyXG5cdFx0XHQ8VGV4dENvbnRyb2xcclxuXHRcdFx0XHRrZXk9eyAnc2l0ZV9rZXknIH1cclxuXHRcdFx0XHRsYWJlbD17IGxhYmVscy5rZXkgfVxyXG5cdFx0XHRcdHZhbHVlPXsgYXJncy51c2VfZ2xvYmFsID8gY3VycmVudFRhYi5rZXkgOiBhcmdzLmtleSB9XHJcblx0XHRcdFx0ZGlzYWJsZWQ9eyBhcmdzLnVzZV9nbG9iYWwgfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXsgbmV3VmFsdWUgPT4gc2V0QXJncyggKCBwcmV2QXJncyApID0+IChcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Li4ucHJldkFyZ3MsXHJcblx0XHRcdFx0XHRcdGtleTogbmV3VmFsdWUsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KSApIH1cclxuXHRcdFx0Lz5cclxuXHRcdFx0PFRleHRDb250cm9sXHJcblx0XHRcdFx0a2V5PXsgJ3NlY3JldF9rZXknIH1cclxuXHRcdFx0XHRsYWJlbD17IGxhYmVscy5zZWNyZXQgfVxyXG5cdFx0XHRcdHZhbHVlPXsgYXJncy51c2VfZ2xvYmFsID8gY3VycmVudFRhYi5zZWNyZXQgOiBhcmdzLnNlY3JldCB9XHJcblx0XHRcdFx0ZGlzYWJsZWQ9eyBhcmdzLnVzZV9nbG9iYWwgfVxyXG5cdFx0XHRcdG9uQ2hhbmdlPXsgbmV3VmFsdWUgPT4gc2V0QXJncyggKCBwcmV2QXJncyApID0+IChcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Li4ucHJldkFyZ3MsXHJcblx0XHRcdFx0XHRcdHNlY3JldDogbmV3VmFsdWUsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KSApIH1cclxuXHRcdFx0Lz5cclxuXHRcdFx0PE51bWJlckNvbnRyb2xcclxuXHRcdFx0XHRsYWJlbD17IGxhYmVscy50aHJlc2hvbGQgfVxyXG5cdFx0XHRcdGxhYmVsUG9zaXRpb249XCJ0b3BcIlxyXG5cdFx0XHRcdHZhbHVlPXsgc2NvcmUgfVxyXG5cdFx0XHRcdGRpc2FibGVkPXsgYXJncy51c2VfZ2xvYmFsIH1cclxuXHRcdFx0XHRtaW49eyAwIH1cclxuXHRcdFx0XHRtYXg9eyAxIH1cclxuXHRcdFx0XHRzdGVwPXsgMC4xIH1cclxuXHRcdFx0XHRwbGFjZWhvbGRlcj17ICcwLjUnIH1cclxuXHRcdFx0XHRvbkNoYW5nZT17IG5ld1ZhbHVlID0+IHNldEFyZ3MoICggcHJldkFyZ3MgKSA9PiAoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdC4uLnByZXZBcmdzLFxyXG5cdFx0XHRcdFx0XHR0aHJlc2hvbGQ6IG5ld1ZhbHVlLFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdCkgKSB9XHJcblx0XHRcdC8+XHJcblx0XHRcdDxCYXNlSGVscFxyXG5cdFx0XHRcdHN0eWxlPXsgeyBtYXJnaW5Ub3A6ICctMWVtJyB9IH1cclxuXHRcdFx0PlxyXG5cdFx0XHRcdHsgaGVscC50aHJlc2hvbGQgfVxyXG5cdFx0XHQ8L0Jhc2VIZWxwPlxyXG5cdFx0XHQ8c3Bhbj57ICdSZWdpc3RlciByZUNBUFRDSEEgdjMga2V5cyAnIH1cclxuXHRcdFx0XHQ8YSBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWNhcHRjaGEvYWRtaW4vY3JlYXRlXCJcclxuXHRcdFx0XHQgICB0YXJnZXQ9XCJfYmxhbmtcIj5oZXJlPC9hPlxyXG5cdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0PC8+IH1cclxuXHQ8Lz47XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsdWdpbkNhcHRjaGE7XHJcbiJdLCJuYW1lcyI6WyJoZWxwIiwibGFiZWxzIiwiX18iLCJ3cCIsImkxOG4iLCJfSmV0RkJIb29rcyIsIkpldEZCSG9va3MiLCJ1c2VNZXRhU3RhdGUiLCJfSmV0RkJDb21wb25lbnRzIiwiSmV0RkJDb21wb25lbnRzIiwiVG9nZ2xlQ29udHJvbCIsIkJhc2VIZWxwIiwiX3dwJGNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiQ29yZVRvZ2dsZUNvbnRyb2wiLCJUZXh0Q29udHJvbCIsIl9fZXhwZXJpbWVudGFsTnVtYmVyQ29udHJvbCIsIk51bWJlckNvbnRyb2wiLCJfSmV0RkJBY3Rpb25zIiwiSmV0RkJBY3Rpb25zIiwiZ2xvYmFsVGFiIiwiY3VycmVudFRhYiIsInNsdWciLCJQbHVnaW5DYXB0Y2hhIiwiX3VzZU1ldGFTdGF0ZSIsIl91c2VNZXRhU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJhcmdzIiwic2V0QXJncyIsInNjb3JlIiwidXNlX2dsb2JhbCIsInRocmVzaG9sZCIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiUmVhY3QiLCJGcmFnbWVudCIsImtleSIsImxhYmVsIiwiZW5hYmxlZCIsImNoZWNrZWQiLCJvbkNoYW5nZSIsIm5ld1ZhbCIsInByZXZBcmdzIiwiX29iamVjdFNwcmVhZCIsIkJvb2xlYW4iLCJocmVmIiwiSmV0Rm9ybUVkaXRvckRhdGEiLCJnbG9iYWxfc2V0dGluZ3NfdXJsIiwidmFsdWUiLCJkaXNhYmxlZCIsIm5ld1ZhbHVlIiwic2VjcmV0IiwibGFiZWxQb3NpdGlvbiIsIm1pbiIsIm1heCIsInN0ZXAiLCJwbGFjZWhvbGRlciIsInN0eWxlIiwibWFyZ2luVG9wIiwidGFyZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./editor/plugins/captcha/render.js\n");

/***/ })

}]);