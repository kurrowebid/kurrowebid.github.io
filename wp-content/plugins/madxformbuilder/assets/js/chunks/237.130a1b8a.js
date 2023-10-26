"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[237],{4237:(e,t,l)=>{l.r(t),l.d(t,{default:()=>m});var n=wp.components,o=n.TextControl,a=n.BaseControl,r=wp.i18n.__;const m=function(e){var t=e.settings,l=e.onChangeSettingObj,n=(e.source,e.label);return e.help,wp.element.createElement("div",{key:"call_hook"},wp.element.createElement(o,{key:"hook_name",label:n("hook_name"),value:t.hook_name,onChange:function(e){return l({hook_name:e})}}),wp.element.createElement(a,{key:"help_message"},wp.element.createElement("div",{className:"madx-call-hook-instruction"},r("Called hook names:"),wp.element.createElement("ul",null,wp.element.createElement("li",null,wp.element.createElement("code",null,"madx-form-builder/custom-action/",t.hook_name)," - ",r("WP action. Perform a hook without an ability to validate form,")),wp.element.createElement("li",null,wp.element.createElement("code",null,"madx-form-builder/custom-filter/",t.hook_name)," - ",r("WP filter. Perform a hook with an ability to validate form. Allows to return error message."))),r("Hook arguments:"),wp.element.createElement("ul",null,wp.element.createElement("li",null,wp.element.createElement("code",null,"$result")," - ",r("only for WP filter. Hook execution result,")),wp.element.createElement("li",null,wp.element.createElement("code",null,"$request")," - ",r("array with submitted form data,")),wp.element.createElement("li",null,wp.element.createElement("code",null,"$action_handler")," - ",r("action handler object, allows to manage actions data and to throws error status:"),wp.element.createElement("code",null,"throw new Action_Exception( 'failed' )"))))))}}}]);