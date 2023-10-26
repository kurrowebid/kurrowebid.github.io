!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1)},function(e,t,n){"use strict";function r(e){return function(t){return t.isSelected?wp.element.createElement(s,null,wp.element.createElement(e,t),wp.element.createElement(i.a,t)):wp.element.createElement(e,t)}}function o(e,t){return _.assign({},e,{attributes:_.assign({},e.attributes,{madxDynamicVisibility:{type:"object",default:{}}}),supports:_.assign({},e.supports,{madxDynamicVisibility:!0})})}var i=n(2),a=wp.hooks,l=a.addFilter,s=(a.applyFilters,wp.element.Fragment);l("editor.BlockEdit","madx-engine/add-visibility-controls",r,900),l("blocks.registerBlockType","madx-engine/register-visibility-attributes",o)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(3),l=n(4),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=(wp.hooks.addFilter,wp.components),u=c.ToolbarGroup,p=c.ToolbarButton,f=wp.blockEditor.BlockControls,m=wp.element,b=m.Component,d=(m.Fragment,function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={showModal:!1},n}return i(t,e),s(t,[{key:"getValue",value:function(e,t,n){return n=n||{},e&&t&&n[t]?n[t][e]:null}},{key:"closeModal",value:function(e){this.props.setAttributes({madxDynamicVisibility:e}),this.setState({showModal:!1})}},{key:"render",value:function(){var e=this;if(!this.props.attributes.madxDynamicVisibility)return null;var t=this.props.attributes.madxDynamicVisibility,n={},r=!1;return t&&t.jedv_enabled&&(r=!0),r&&(n.color="var(--wp-admin-theme-color)"),wp.element.createElement(f,null,wp.element.createElement(u,null,wp.element.createElement(p,{icon:a.a,label:"Dynamic Visibility",className:r?"dynamic-visibility-is-active":"",style:n,onClick:function(){e.setState({showModal:!e.state.showModal})},"aria-expanded":this.state.showModal}),this.state.showModal&&wp.element.createElement(l.a,{attributes:this.props.attributes.madxDynamicVisibility,onClose:function(t){e.closeModal(t)},onComplete:function(t){e.closeModal(t)}})))}}]),t}(b));t.a=d},function(e,t,n){"use strict";var r=wp.components,o=r.SVG,i=r.Path,a=wp.element.createElement(o,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},wp.element.createElement(i,{d:"M18.3 9.5C15 4.9 8.5 3.8 3.9 7.2c-1.2.9-2.2 2.1-3 3.4.2.4.5.8.8 1.2 3.3 4.6 9.6 5.6 14.2 2.4.9-.7 1.7-1.4 2.4-2.4.3-.4.5-.8.8-1.2-.3-.4-.5-.8-.8-1.1zm-8.2-2.3c.5-.5 1.3-.5 1.8 0s.5 1.3 0 1.8-1.3.5-1.8 0-.5-1.3 0-1.8zm-.1 7.7c-3.1 0-6-1.6-7.7-4.2C3.5 9 5.1 7.8 7 7.2c-.7.8-1 1.7-1 2.7 0 2.2 1.7 4.1 4 4.1 2.2 0 4.1-1.7 4.1-4v-.1c0-1-.4-2-1.1-2.7 1.9.6 3.5 1.8 4.7 3.5-1.7 2.6-4.6 4.2-7.7 4.2z"}));t.a=a},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(5),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=wp.components,p=u.Modal,f=u.ToggleControl,m=u.SelectControl,b=u.Popover,d=wp.element,y=d.Component,v=(d.Fragment,window.madxEngineBlocksComponents),w=v.RepeaterControl,h=v.CustomControl,g=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={attributes:_.assign({jedv_enabled:!1,jedv_type:"show",jedv_conditions:[],jedv_relation:"AND"},n.props.attributes)},n}return l(t,e),c(t,[{key:"setAttributes",value:function(e){this.setState({attributes:_.assign({},this.state.attributes,e)})}},{key:"render",value:function(){var e=this,t={width:"560px",maxWidth:"80vw",minHeight:"95vh"};this.state.isBusy&&(t.opacity="0.9");for(var n=["madx-engine-visibility-modal"],i=window.madxEngineDynamicVisibilityData.controls,a={},l=0;l<i.length;l++)a[i[l].name]=i[l].default||null;return wp.element.createElement(p,{title:"Set up visibility conditions for current block",style:t,className:n.join(" "),onRequestClose:function(t){t.target.classList.contains("is-nested-modal-trigger")||e.props.onClose(e.state.attributes)}},wp.element.createElement(f,{label:"Enable",checked:this.state.attributes.jedv_enabled,onChange:function(){e.setAttributes({jedv_enabled:!e.state.attributes.jedv_enabled})}}),wp.element.createElement("br",null),this.state.attributes.jedv_enabled&&wp.element.createElement(m,{label:"Visibility condition type",value:this.state.attributes.jedv_type,options:[{value:"show",label:"Show element if condition met"},{value:"hide",label:"Hide element if condition met"}],onChange:function(t){e.setAttributes({jedv_type:t})}}),this.state.attributes.jedv_enabled&&wp.element.createElement(w,{data:this.state.attributes.jedv_conditions,default:a,onChange:function(t){e.setAttributes({jedv_conditions:t})}},function(t,n){return wp.element.createElement("div",null,i.map(function(i){var a=function(t){var a=[].concat(o(e.state.attributes.jedv_conditions)),l=a[n];l&&(a[n]=_.assign({},l,r({},i.name,t)),e.setAttributes({jedv_conditions:[].concat(o(a))}))};return wp.element.createElement(h,{control:i,value:t[i.name],condition:i.condition,getValue:function(e,t,n){return n=n||{},e&&t&&n[e]?n[e]:""},attr:i.name,attributes:t,onChange:function(e){a(e)}},i.dynamic&&wp.element.createElement(s.a,{control:i.name,value:t[i.name],onChange:function(e){a(e)}}))}))}),this.state.attributes.jedv_enabled&&this.state.attributes.jedv_conditions.length>1&&wp.element.createElement(m,{label:"Relation",value:this.state.attributes.jedv_relation,options:[{value:"AND",label:"AND"},{value:"OR",label:"OR"}],onChange:function(t){e.setAttributes({jedv_relation:t})}}),wp.element.createElement(b.Slot,{name:"jedv_popover_slot"}))}}]),t}(y);t.a=g},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(6),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=wp.components,u=c.Button,p=c.Dropdown,f=c.PanelBody,m=wp.element,b=m.Component,d=m.Fragment,y=window.madxEngineBlocksComponents,v=y.DataSourceControls,w=y.DataContextControls,h=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r={};if(e.value){try{r=JSON.parse(e.value)}catch(e){r={}}r&&r.data_source||(r={})}return n.state={attributes:r},n}return a(t,e),s(t,[{key:"render",value:function(){var e=this;return wp.element.createElement(d,null,wp.element.createElement("div",{className:"madx-engine-visibility-dynamic-trigger"},wp.element.createElement(p,{className:"madx-engine-dynamic-source",contentClassName:"madx-engine-dynamic-source--inner-content",position:"bottom center",key:"dynamic_control_"+this.props.control,popoverProps:{__unstableSlotName:"jedv_popover_slot"},renderToggle:function(e){var t=e.isOpen,n=e.onToggle;return wp.element.createElement(u,{isSmall:!0,variant:"tertiary",className:t?"is-selected":"",icon:l.a,onClick:n})},renderContent:function(t){var n=(t.isOpen,t.onToggle);return wp.element.createElement(d,null,wp.element.createElement(f,{title:"Data Source",initialOpen:!0},wp.element.createElement(v,{getValue:function(e,t,n){return n=n||{},e&&t?n[e]:null},setValue:function(t,n,o,i,a,l){e.setState({attributes:_.assign({},e.state.attributes,r({},n,t))})},attr:"dynamic_value",attributes:e.state.attributes,setAttributes:function(e){return null},supports:[]})),wp.element.createElement(f,{title:"Data Context",initialOpen:!1},wp.element.createElement(w,{getValue:function(e,t,n){return n=n||{},e&&t?n[e]:null},setValue:function(t,n,o,i,a,l){e.setState({attributes:_.assign({},e.state.attributes,r({},n,t))})},attr:"dynamic_value",attributes:e.state.attributes,setAttributes:function(e){return null},supports:[]})),wp.element.createElement(u,{isSmall:!0,variant:"tertiary",style:{width:"100%",justifyContent:"center"},className:"madx-engine-dynamic-source--apply",onClick:function(){e.props.onChange(JSON.stringify(e.state.attributes)),n()}},"Apply"))}})))}}]),t}(b);t.a=h},function(e,t,n){"use strict";var r=wp.components,o=r.SVG,i=r.Path,a=wp.element.createElement(o,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},wp.element.createElement(i,{d:"M10 6c3.9 0 7-.9 7-2s-3.1-2-7-2-7 .9-7 2 3.1 2 7 2zm0 9c-3.9 0-7-.9-7-2v3c0 1.1 3.1 2 7 2s7-.9 7-2v-3c0 1.1-3.1 2-7 2zm0-4c-3.9 0-7-.9-7-2v3c0 1.1 3.1 2 7 2s7-.9 7-2V9c0 1.1-3.1 2-7 2zm0-4c-3.9 0-7-.9-7-2v3c0 1.1 3.1 2 7 2s7-.9 7-2V5c0 1.1-3.1 2-7 2z"}));t.a=a}]);