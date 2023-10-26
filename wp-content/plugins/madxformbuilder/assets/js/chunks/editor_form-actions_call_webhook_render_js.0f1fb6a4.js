"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["editor_form-actions_call_webhook_render_js"],{

/***/ "./editor/form-actions/call.webhook/render.js":
/*!****************************************************!*\
  !*** ./editor/form-actions/call.webhook/render.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar _madxFBComponents = madxFBComponents,\n  AdvancedModalControl = _madxFBComponents.AdvancedModalControl;\n\n/**\r\n * Internal dependencies\r\n */\nvar TextControl = wp.components.TextControl;\nfunction CallWebHookRender(_ref) {\n  var settings = _ref.settings,\n    label = _ref.label,\n    onChangeSettingObj = _ref.onChangeSettingObj;\n  /* eslint-disable jsx-a11y/no-onchange */\n  return wp.element.createElement(AdvancedModalControl, {\n    value: settings.webhook_url,\n    label: label('webhook_url'),\n    macroWithCurrent: true,\n    onChangeMacros: function onChangeMacros(name) {\n      var _settings$webhook_url;\n      return onChangeSettingObj({\n        webhook_url: ((_settings$webhook_url = settings.webhook_url) !== null && _settings$webhook_url !== void 0 ? _settings$webhook_url : '') + name\n      });\n    }\n  }, function (_ref2) {\n    var instanceId = _ref2.instanceId;\n    return wp.element.createElement(TextControl, {\n      id: instanceId,\n      value: settings.webhook_url,\n      onChange: function onChange(webhook_url) {\n        return onChangeSettingObj({\n          webhook_url: webhook_url\n        });\n      }\n    });\n  });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CallWebHookRender);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9lZGl0b3IvZm9ybS1hY3Rpb25zL2NhbGwud2ViaG9vay9yZW5kZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUFBLGdCQUFBLEdBRVVDLGVBQWU7RUFEbEJDLG9CQUFvQixHQUFBRixnQkFBQSxDQUFwQkUsb0JBQW9COztBQUczQjtBQUNBO0FBQ0E7QUFDQSxJQUNPQyxXQUFXLEdBQ1JDLEVBQUUsQ0FBQ0MsVUFBVSxDQURoQkYsV0FBVztBQUdsQixTQUFTRyxpQkFBaUJBLENBQUFDLElBQUEsRUFBNEM7RUFBQSxJQUF4Q0MsUUFBUSxHQUFBRCxJQUFBLENBQVJDLFFBQVE7SUFBRUMsS0FBSyxHQUFBRixJQUFBLENBQUxFLEtBQUs7SUFBRUMsa0JBQWtCLEdBQUFILElBQUEsQ0FBbEJHLGtCQUFrQjtFQUVoRTtFQUNBLE9BQU9OLEVBQUEsQ0FBQU8sT0FBQSxDQUFBQyxhQUFBLENBQUNWLG9CQUFvQjtJQUMzQlcsS0FBSyxFQUFHTCxRQUFRLENBQUNNLFdBQWE7SUFDOUJMLEtBQUssRUFBR0EsS0FBSyxDQUFFLGFBQWMsQ0FBRztJQUNoQ00sZ0JBQWdCO0lBQ2hCQyxjQUFjLEVBQUcsU0FBQUEsZUFBQUMsSUFBSTtNQUFBLElBQUFDLHFCQUFBO01BQUEsT0FBSVIsa0JBQWtCLENBQUU7UUFDNUNJLFdBQVcsRUFBRSxFQUFBSSxxQkFBQSxHQUNaVixRQUFRLENBQUNNLFdBQVcsY0FBQUkscUJBQUEsY0FBQUEscUJBQUEsR0FBSSxFQUFFLElBQ3ZCRDtNQUNMLENBQUUsQ0FBQztJQUFBO0VBQUUsR0FFSCxVQUFBRSxLQUFBO0lBQUEsSUFBSUMsVUFBVSxHQUFBRCxLQUFBLENBQVZDLFVBQVU7SUFBQSxPQUFRaEIsRUFBQSxDQUFBTyxPQUFBLENBQUFDLGFBQUEsQ0FBQ1QsV0FBVztNQUNuQ2tCLEVBQUUsRUFBR0QsVUFBWTtNQUNqQlAsS0FBSyxFQUFHTCxRQUFRLENBQUNNLFdBQWE7TUFDOUJRLFFBQVEsRUFBRyxTQUFBQSxTQUFBUixXQUFXO1FBQUEsT0FBSUosa0JBQWtCLENBQzNDO1VBQUVJLFdBQVcsRUFBWEE7UUFBWSxDQUNmLENBQUM7TUFBQTtJQUFFLENBQ0gsQ0FBQztFQUFBLENBQ21CLENBQUM7QUFDeEI7QUFFQSxpRUFBZVIsaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZWRpdG9yL2Zvcm0tYWN0aW9ucy9jYWxsLndlYmhvb2svcmVuZGVyLmpzP2EwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge1xyXG5cdCAgICAgIEFkdmFuY2VkTW9kYWxDb250cm9sLFxyXG4gICAgICB9ID0gSmV0RkJDb21wb25lbnRzO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuY29uc3Qge1xyXG5cdCAgICAgIFRleHRDb250cm9sLFxyXG4gICAgICB9ID0gd3AuY29tcG9uZW50cztcclxuXHJcbmZ1bmN0aW9uIENhbGxXZWJIb29rUmVuZGVyKCB7IHNldHRpbmdzLCBsYWJlbCwgb25DaGFuZ2VTZXR0aW5nT2JqIH0gKSB7XHJcblxyXG5cdC8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW9uY2hhbmdlICovXHJcblx0cmV0dXJuIDxBZHZhbmNlZE1vZGFsQ29udHJvbFxyXG5cdFx0dmFsdWU9eyBzZXR0aW5ncy53ZWJob29rX3VybCB9XHJcblx0XHRsYWJlbD17IGxhYmVsKCAnd2ViaG9va191cmwnICkgfVxyXG5cdFx0bWFjcm9XaXRoQ3VycmVudFxyXG5cdFx0b25DaGFuZ2VNYWNyb3M9eyBuYW1lID0+IG9uQ2hhbmdlU2V0dGluZ09iaigge1xyXG5cdFx0XHR3ZWJob29rX3VybDogKFxyXG5cdFx0XHRcdHNldHRpbmdzLndlYmhvb2tfdXJsID8/ICcnXHJcblx0XHRcdCkgKyBuYW1lLFxyXG5cdFx0fSApIH1cclxuXHQ+XHJcblx0XHR7ICggeyBpbnN0YW5jZUlkIH0gKSA9PiA8VGV4dENvbnRyb2xcclxuXHRcdFx0aWQ9eyBpbnN0YW5jZUlkIH1cclxuXHRcdFx0dmFsdWU9eyBzZXR0aW5ncy53ZWJob29rX3VybCB9XHJcblx0XHRcdG9uQ2hhbmdlPXsgd2ViaG9va191cmwgPT4gb25DaGFuZ2VTZXR0aW5nT2JqKFxyXG5cdFx0XHRcdHsgd2ViaG9va191cmwgfSxcclxuXHRcdFx0KSB9XHJcblx0XHQvPiB9XHJcblx0PC9BZHZhbmNlZE1vZGFsQ29udHJvbD47XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbGxXZWJIb29rUmVuZGVyO1xyXG4iXSwibmFtZXMiOlsiX0pldEZCQ29tcG9uZW50cyIsIkpldEZCQ29tcG9uZW50cyIsIkFkdmFuY2VkTW9kYWxDb250cm9sIiwiVGV4dENvbnRyb2wiLCJ3cCIsImNvbXBvbmVudHMiLCJDYWxsV2ViSG9va1JlbmRlciIsIl9yZWYiLCJzZXR0aW5ncyIsImxhYmVsIiwib25DaGFuZ2VTZXR0aW5nT2JqIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsIndlYmhvb2tfdXJsIiwibWFjcm9XaXRoQ3VycmVudCIsIm9uQ2hhbmdlTWFjcm9zIiwibmFtZSIsIl9zZXR0aW5ncyR3ZWJob29rX3VybCIsIl9yZWYyIiwiaW5zdGFuY2VJZCIsImlkIiwib25DaGFuZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./editor/form-actions/call.webhook/render.js\n");

/***/ })

}]);