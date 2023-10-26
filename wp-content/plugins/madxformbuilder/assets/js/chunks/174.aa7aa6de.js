"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[174],{5174:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===r(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t),n.d(t,{default:()=>dt});var c=madxFBComponents.BaseAction,a=[i(i({},JSON.parse(JSON.stringify(new c))),{},{settings:{send_email:{subject:"New order on website",content:"Hi admin!\n\nThere are new order on your website.\n\nOrder details:\n- Post ID: %post_id%"}}})],u=window.madxFormEditorData.actionConditionSettings,s=madxFBComponents.ActionModal,m=madxFBHooks,p=m.useCurrentAction,f=m.useActionCallback,b=m.useUpdateCurrentAction,d=m.useUpdateCurrentActionMeta,y=wp.data.useSelect;const v=function(){var e=y((function(e){return e("madx-forms/actions").isSettingsModal()})),t=f(),n=d(),r=b(),o=r.setTypeSettings,i=r.clearCurrent,l=p(),c=l.currentAction,a=l.currentSettings;return e?wp.element.createElement(s,{classNames:["width-60"],title:"Edit Action",onRequestClose:i,onCancelClick:i,onUpdateClick:function(){n({settings:c.settings}),i()}},t&&wp.element.createElement(t,{settings:a,actionId:c.id,onChange:function(e){return o(e)}})):null};function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function O(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==w(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===w(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,l,c=[],a=!0,u=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=i.call(n)).done)&&(c.push(r.value),c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{if(!a&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(u)throw o}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var S=madxFBComponents,C=(S.FieldWithPreset,S.DynamicPreset,S.RepeaterItemContext),P=S.Repeater,A=S.RepeaterAddNew,k=(S.SafeDeleteToggle,S.AdvancedModalControl),_=S.RepeaterState,D=S.BaseHelp,F=madxFBHooks,x=F.useRequestEvents,T=F.useCurrentAction,B=F.useUpdateCurrentAction,N=madxFBActions.getFormFieldsBlocks,J=wp.components,I=J.SelectControl,R=J.TextareaControl,M=J.ToggleControl,H=J.FormTokenField,L=(J.BaseControl,J.TabPanel),U=wp.i18n.__,q=wp.data.useSelect,z=wp.element,W=z.useEffect,$=z.useState,G=z.useContext,V=z.RawHTML,K=[{value:"and",label:U("AND (ALL conditions must be met)","madx-form-builder")},{value:"or",label:U("OR (at least ONE condition must be met)","madx-form-builder")}];function Q(e,t){var n=u[e].find((function(e){return e.value===t}));return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return n&&n[e]||t}}function X(e){var t=e.formFields,n=G(C),r=n.currentItem,o=n.changeCurrentItem,i=U("To fulfill this condition, the result of the check must be","madx-form-builder")+" ";i+=r.execute?"TRUE":"FALSE";var l=Q("compare_value_formats",r.compare_value_format),c=Q("operators",r.operator);return wp.element.createElement(React.Fragment,null,wp.element.createElement(M,{label:i,checked:r.execute,onChange:function(e){o({execute:e})}}),wp.element.createElement(I,{label:"Operator",labelPosition:"side",help:c("help"),value:r.operator,options:u.operators,onChange:function(e){return o({operator:e})}}),wp.element.createElement(I,{label:"Field",labelPosition:"side",value:r.field,options:t,onChange:function(e){return o({field:e})}}),wp.element.createElement(I,{label:U("Type transform comparing value","madx-form-builder"),labelPosition:"side",value:r.compare_value_format,options:u.compare_value_formats,onChange:function(e){o({compare_value_format:e})}}),l("help").length>0&&wp.element.createElement("p",{className:"components-base-control__help",style:{marginTop:"0px",color:"rgb(117, 117, 117)"},dangerouslySetInnerHTML:{__html:l("help")}}),wp.element.createElement(k,{value:r.default,label:U("Value to Compare","madx-form-builder"),macroWithCurrent:!0,onChangePreset:function(e){o({default:e})}},(function(e){var t=e.instanceId;return wp.element.createElement(R,{id:t,value:r.default,help:c("need_explode")?u.help_for_exploding_compare:"",onChange:function(e){o({default:e})}})})))}function Y(e){var t,n=e.events,r=T().currentAction,o=B().setCurrentAction,i=h($(!1),2),l=i[0],c=i[1],a=q((function(e){return e("madx-forms/events").getHelpMap()}));return wp.element.createElement(React.Fragment,null,wp.element.createElement(H,{label:U("Add event","madx-form-builder"),value:null!==(t=r.events)&&void 0!==t?t:[],suggestions:n,onChange:function(e){return o(g(g({},r),{},{events:e}))},tokenizeOnSpace:!0,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:""}),wp.element.createElement(D,null,U("Separate with commas or the Enter key.")+" ",wp.element.createElement("a",{href:"javascript:void(0)",onClick:function(){return c((function(e){return!e}))}},U(l?"Hide":"Details","madx-form-builder"))),l&&wp.element.createElement("ul",{className:"madx-fb-ul-revert-layer"},n.map((function(e){return wp.element.createElement("li",null,wp.element.createElement("b",null,e),": ",wp.element.createElement(V,null,a[e]))}))))}function Z(){var e,t=h($([]),2),n=t[0],r=t[1];W((function(){r(N([],"--"))}),[]);var o=T().currentAction,i=B(),l=i.setCurrentAction,c=i.updateCurrentConditions;return wp.element.createElement(React.Fragment,null,wp.element.createElement(I,{key:"SelectControl-operator",label:U("Condition Operator","madx-form-builder"),labelPosition:"side",value:o.condition_operator||"and",options:K,onChange:function(e){return l(g(g({},o),{},{condition_operator:e}))}}),wp.element.createElement(_,{state:c},wp.element.createElement(P,{items:null!==(e=o.conditions)&&void 0!==e?e:[]},wp.element.createElement(X,{formFields:n})),wp.element.createElement(A,{item:{execute:!0}},U("Add New Condition","madx-form-builder"))))}const ee=function(){var e=x();return 1===e.length?wp.element.createElement(Z,null):wp.element.createElement(React.Fragment,null,wp.element.createElement(L,{className:"jfb-conditions-tab-panel",initialTabName:"fields",tabs:[{name:"fields",title:U("Fields comparison","madx-form-builder"),edit:wp.element.createElement(Z,null)},{name:"events",title:U("Events match","madx-form-builder"),edit:wp.element.createElement(Y,{events:e})}]},(function(e){return e.edit})))};function te(e){return te="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},te(e)}function ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function re(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==te(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==te(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===te(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var oe=wp.i18n.__,ie=madxFBComponents.ActionModal,le=madxFBHooks,ce=le.useRequestEvents,ae=le.useUpdateCurrentActionMeta,ue=le.useCurrentAction,se=wp.data,me=se.useDispatch,pe=se.useSelect;const fe=function(){var e=pe((function(e){return e("madx-forms/actions").isConditionalModal()})),t=me("madx-forms/actions",[]).clearCurrent,n=ae(),r=ue().currentAction,o=ce();if(!e)return null;var i=["width-60"];return 1!==o.length&&i.push("without-margin"),wp.element.createElement(ie,{classNames:i,title:oe("Edit Action Conditions & Events","madx-form-builder"),onRequestClose:t,onCancelClick:t,onUpdateClick:function(){n(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(n),!0).forEach((function(t){re(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ne(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},r)),t()}},wp.element.createElement(ee,null))};function be(e){return be="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},be(e)}function de(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ye(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==be(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==be(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===be(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ve=wp.data,we=(ve.useDispatch,ve.useSelect),je=wp.element.useContext,ge=madxFBComponents.ActionListItemContext,Oe=madxFBHooks.useActionsEdit,he=wp.i18n.__;function Ee(e){var t,n,r=e.slug,o=e.index,i=je(ge).action,l=we((function(e){return e("madx-forms/events").getType(r)})),c=Oe().updateActionObj,a=[null!==(t=null==l?void 0:l.title)&&void 0!==t?t:"",he("(Click to delete)","madx-form-builder")].join(" ");return wp.element.createElement("button",{type:"button",className:"jfb-events-item",title:a,onClick:function(){i.events.splice(o,1),c(i.id,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?de(Object(n),!0).forEach((function(t){ye(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):de(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},i))}},null!==(n=null==l?void 0:l.value)&&void 0!==n?n:r)}const Se=function(e){var t=e.events;return(void 0===t?[]:t).map((function(e,t){return wp.element.createElement(Ee,{key:e,slug:e,index:t})}))};function Ce(e){return Ce="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ce(e)}function Pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ae(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Pe(Object(n),!0).forEach((function(t){ke(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Pe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ke(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Ce(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==Ce(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===Ce(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _e=wp.data,De=_e.useDispatch,Fe=_e.useSelect,xe=wp.hooks.applyFilters,Te=wp.i18n.__,Be=wp.components,Ne=Be.SelectControl,Je=Be.Button,Ie=Be.Card,Re=Be.CardBody,Me=Be.CardHeader,He=Be.CardFooter,Le=Be.DropdownMenu,Ue=Be.Flex,qe=madxFBComponents,ze=qe.ActionListItemContext,We=qe.MacrosButtonTemplate,$e=madxFBHooks,Ge=$e.useActionCallback,Ve=$e.useActionsEdit,Ke=$e.useActionDetail,Qe=window.madxFormActionTypes.map((function(e){return{value:e.id,label:e.name,disabled:e.disabled}}));const Xe=function(e){var t,n,r,o=e.action,i=e.index,l=Ve(),c=l.moveAction,a=l.deleteAction,u=l.actions,s=l.updateActionObj,m=l.toggleExecute,p=Ge(o.type),f=Ke(o.type),b=De("madx-forms/actions",[]),d=b.setCurrentAction,y=b.setMeta,v=Fe((function(e){return e("madx-forms/actions").getCurrentAction()})),w=xe("madx.fb.section.actions.header.".concat(o.type),null,o),j=null!=o&&null!==(t=o.conditions)&&void 0!==t&&t.length?wp.element.createElement("span",{className:"dashicon dashicons dashicons-randomize","data-count":null==o?void 0:o.conditions.length}):wp.element.createElement("span",{className:"dashicon dashicons dashicons-randomize"}),g=["madx-form-action"],O=null===(n=o.is_execute)||void 0===n||n;return O||g.push("is-disabled"),(null==v?void 0:v.id)===o.id&&g.push("is-current"),wp.element.createElement(Ie,{elevation:2,key:o.id,size:"extraSmall",className:g},w&&wp.element.createElement(Me,null,w),wp.element.createElement(Re,null,wp.element.createElement(Ne,{value:o.type,options:Qe,onChange:function(e){return s(o.id,{type:e})}},Qe.map((function(e){return wp.element.createElement("option",{key:o.id+"__"+e.value,value:e.value,disabled:e.disabled,dangerouslySetInnerHTML:{__html:e.label}})}))),xe("madx.fb.section.actions.afterSelect.".concat(o.type),null,o,u),wp.element.createElement(Ue,{style:{marginTop:"0.5em"},justify:"space-around"},wp.element.createElement(Je,{disabled:!p,icon:"edit",label:Te("Edit Action","madx-form-builder"),onClick:function(){d(Ae(Ae({},o),{},{index:i})),y({index:i,modalType:"settings"})}}),wp.element.createElement(Je,{className:"madx-fb-button",icon:j,label:Te("Edit Conditions & Events","madx-form-builder"),onClick:function(){d(Ae(Ae({},o),{},{index:i})),y({index:i,modalType:"conditions"})}}),wp.element.createElement((function(){return wp.element.createElement(Le,{icon:"ellipsis",label:"Edit, move or delete",controls:[{title:Te("Up","madx-form-builder"),icon:"arrow-up",disabled:0===i,onClick:function(){c(i,i-1)}},{title:Te("Down","madx-form-builder"),icon:"arrow-down",disabled:u.length-1===i,onClick:function(){c(i,i+1)}},{title:Te("Delete","madx-form-builder"),icon:"trash",onClick:function(){a(i)}},{title:Te(O?"Turn off":"Turn on","madx-form-builder"),icon:O?"no-alt":"yes",onClick:function(){m(o)}}]})}),null),wp.element.createElement(We,{variant:null,isSmall:!1,icon:"editor-help",label:Te("Show details about selected action","madx-form-builder")},wp.element.createElement("div",{className:"madx-fb p-06em flex flex-dir-column gap-default"},wp.element.createElement("div",{"data-title":Te("ID:","madx-form-builder")},wp.element.createElement("b",null,o.id)),f&&wp.element.createElement(f,null))))),Boolean(null===(r=o.events)||void 0===r?void 0:r.length)&&wp.element.createElement(He,{style:{flexWrap:"wrap",rowGap:"0.5em"}},wp.element.createElement(ze.Provider,{value:{index:i,action:o}},wp.element.createElement(Se,{events:o.events}))))};function Ye(e){return Ye="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ye(e)}function Ze(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function et(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ze(Object(n),!0).forEach((function(t){tt(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ze(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function tt(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Ye(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==Ye(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===Ye(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function nt(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var rt=wp.element,ot=rt.useEffect,it=(rt.useState,rt.Children),lt=rt.cloneElement,ct=wp.components,at=ct.Button,ut=ct.ExternalLink,st=wp.i18n.__,mt=madxFBComponents.BaseAction,pt=madxFBHooks.useActionsEdit,ft=wp.data.useSelect,bt=!1;const dt=function(){var e=pt(),t=e.actions,n=e.setActions,r=ft((function(e){return e("core/editor").isEditedPostNew()}),[]);ot((function(){0===t.length&&r&&!bt&&(n(a),bt=!0)}),[]);var o=t.map((function(e,t){return wp.element.createElement(Xe,{action:e,index:t})}));return wp.element.createElement(React.Fragment,null,it.map(o,lt),wp.element.createElement("div",{className:"madx-fb flex jc-space-between"},wp.element.createElement(at,{isPrimary:!0,onClick:function(){var e;n([].concat(function(e){if(Array.isArray(e))return nt(e)}(e=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return nt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?nt(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[et({},new mt)]))}},st("+ New Action","madx-form-builder")),!madxFormEditorData.isActivePro&&wp.element.createElement("div",{className:"madx-fb flex-center"},wp.element.createElement(ut,{href:madxFormEditorData.utmLinks.allProActions},st("All PRO Actions","madx-form-builder")))),wp.element.createElement(v,null),wp.element.createElement(fe,null))}}}]);