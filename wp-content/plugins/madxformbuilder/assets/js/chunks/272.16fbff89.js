"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[272],{8272:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var r=wp.components.TextControl,l=wp.element.useContext,o=madxFBComponents,a=o.CurrentActionEditContext,i=o.ActionFieldsMapContext,s=o.CurrentPropertyMapContext;const u=function(){var e=l(s),t=e.FieldSelect,n=e.property,o=l(a),u=o.setMapField,c=o.getMapField,p=l(i),m=p.name,d=p.index;return"user_meta"===n?wp.element.createElement("div",{className:"components-base-control madx-margin-bottom-wrapper"},t,wp.element.createElement(r,{key:m+d+"_text",value:c({name:m}),onChange:function(e){return u({nameField:m,value:e})}})):t};function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=madxFBActions,m=(p.addAction,p.getFormFieldsBlocks),d=p.convertListToFieldsMap,f=madxFBComponents,y=f.ActionFieldsMap,w=f.WrapperRequiredControl,b=f.ActionMessages,h=f.DynamicPropertySelect,v=madxFBHooks,C=v.withRequestFields,F=v.useSanitizeFieldsMap,g=wp.data.withSelect,_=wp.components.SelectControl,A=(wp.i18n.__,wp.element),E=A.useState,S=A.useEffect;const k=g(C)((function(e){var t,n,r=(t=E([]),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,l,o,a,i=[],s=!0,u=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);s=!0);}catch(e){u=!0,l=e}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw l}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=r[0],o=r[1],a=e.settings,i=e.onChangeSetting,s=e.source,p=e.label,f=e.requestFields;return S((function(){o(d(m(),f))}),[]),F(),wp.element.createElement("div",{key:"update_user"},wp.element.createElement(y,{label:p("fields_map"),key:"user_fields_map",fields:l},wp.element.createElement(w,null,wp.element.createElement(h,{dynamic:["user_meta"]},wp.element.createElement(u,null)))),wp.element.createElement(_,{label:p("user_role"),labelPosition:"side",key:"user_role_list",className:"full-width",value:a.user_role,options:s.userRoles,onChange:function(e){return i(e,"user_role")}}),wp.element.createElement(b,e))}))}}]);