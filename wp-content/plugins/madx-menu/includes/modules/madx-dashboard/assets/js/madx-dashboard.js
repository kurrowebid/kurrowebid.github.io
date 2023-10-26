'use strict';

const { __, _x, _n, _nx, sprintf } = wp.i18n;

window.madxDashboardEventBus = new Vue();

window.madxDasboard = new madxDasboardClass();

//window.madxDasboard.initVueComponents();

window.madxDasboardPageInstance = madxDasboard.initDashboardPageInstance();
