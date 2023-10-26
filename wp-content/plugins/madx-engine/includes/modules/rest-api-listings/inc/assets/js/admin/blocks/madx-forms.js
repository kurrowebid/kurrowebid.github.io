!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({2:function(e,t){function n(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){i=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var l=wp.components,i=l.TextControl,u=l.SelectControl,c=l.TextareaControl,p=l.ToggleControl,s=wp.element,m=s.useState,d=s.useEffect,f=madxFBActions,h=f.addAction,b=f.getFormFieldsBlocks,y=f.Tools.withPlaceholder,g=madxFBComponents,_=(g.ActionFieldsMap,g.WrapperRequiredControl,g.MacrosInserter),v=wp.hooks,w=v.applyFilters,E=v.addFilter,C=madxFBHooks.withRequestFields;h("rest_api_request",(0,wp.data.withSelect)(C)((function(e){var t=e.settings,a=e.label,o=e.help,l=e.source,s=e.onChangeSetting,f=e.requestFields,h=(e.onChangeSettingObj,r(m([]),2)),g=h[0],v=h[1];return d((function(){v([].concat(n(b()),n(f)))}),[]),wp.element.createElement(React.Fragment,null,wp.element.createElement("div",{className:"madx-form-editor__macros-wrap"},wp.element.createElement(c,{className:"madx-border-unset",label:a("url"),value:t.url,help:o("url"),onChange:function(e){return s(e,"url")}}),wp.element.createElement(_,{fields:g,onFieldClick:function(e){var n=(t.url||"")+"%"+e+"%";s(n,"url")},zIndex:1e7})),wp.element.createElement("div",{className:"madx-form-editor__macros-wrap"},wp.element.createElement(c,{label:a("body"),value:t.body,onChange:function(e){return s(e,"body")}}),wp.element.createElement(_,{fields:g,onFieldClick:function(e){var n=(t.body||"")+"%"+e+"%";s(n,"body")},zIndex:1e7})),wp.element.createElement("p",{className:"components-base-control__help",style:{marginTop:"0px",color:"rgb(117, 117, 117)"},dangerouslySetInnerHTML:{__html:o("body")}}),wp.element.createElement(p,{label:a("authorization"),checked:t.authorization,onChange:function(e){return s(e,"authorization")}}),t.authorization&&wp.element.createElement(React.Fragment,null,wp.element.createElement(u,{label:a("auth_type"),labelPosition:"side",value:t.auth_type,onChange:function(e){s(e,"auth_type")},options:y(l.auth_types)}),"application-password"===t.auth_type&&wp.element.createElement(React.Fragment,null,wp.element.createElement(i,{label:a("application_pass"),help:o("application_pass"),value:t.application_pass,onChange:function(e){return s(e,"application_pass")}})),w("madx.engine.restapi.authorization.fields.".concat(t.auth_type),wp.element.createElement(React.Fragment,null),e)))}))),E("madx.engine.restapi.authorization.fields.rapidapi","madx-engine",(function(e,t){var n=t.settings,r=t.label,a=t.help,o=(t.source,t.onChangeSetting);return wp.element.createElement(React.Fragment,null,wp.element.createElement(i,{label:r("rapidapi_key"),help:a("rapidapi_key"),value:n.rapidapi_key,onChange:function(e){return o(e,"rapidapi_key")}}),wp.element.createElement(i,{label:r("rapidapi_host"),help:a("rapidapi_host"),value:n.rapidapi_host,onChange:function(e){return o(e,"rapidapi_host")}}))})),E("madx.engine.restapi.authorization.fields.bearer-token","madx-engine",(function(e,t){var n=t.settings,r=t.label,a=t.help,o=(t.source,t.onChangeSetting);return wp.element.createElement(React.Fragment,null,wp.element.createElement(i,{label:r("bearer_token"),help:a("bearer_token"),value:n.bearer_token,onChange:function(e){return o(e,"bearer_token")}}))})),E("madx.engine.restapi.authorization.fields.custom-header","madx-engine",(function(e,t){var n=t.settings,r=t.label,a=t.help,o=t.onChangeSettingObj;return wp.element.createElement(React.Fragment,null,wp.element.createElement(i,{label:r("custom_header_name"),help:a("custom_header_name"),value:n.custom_header_name,onChange:function(e){return o({custom_header_name:e})}}),wp.element.createElement(i,{label:r("custom_header_value"),help:a("custom_header_value"),value:n.custom_header_value,onChange:function(e){return o({custom_header_value:e})}}))}))}});