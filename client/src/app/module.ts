/// <reference path="app.d.ts" />
var app = angular.module('tomedescontos', ['ui.router', 'pascalprecht.translate', 'angularMoment', 'ezfb'])
.config(function(ezfbProvider){
    ezfbProvider.setLocale('pt_BR');
    ezfbProvider.setInitParams({
        appId: 182301688833957 // My FB APP ID
    });
});