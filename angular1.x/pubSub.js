/**
 * Created by administrator on 16/5/6.
 */

var pubSubServices = angular.module('kpServices', []);

pubSubServices.factory('pubSubClient', function () {
  var pubSub = {};//作为参数返回
  var eventQueue = {};//事件存储队列
  var argueHub = {};//存储事件参数,json格式
  /*
   * 事件订阅
   * (事件名称,事件函数,函数参数)
   * [!此时的函数参数为保留参数,事件发布时不需要再次传参数,使用当前参数]
   * @事件订阅唯一性,同一个名称仅对应事件函数,重复订阅将覆盖.*/
  pubSub.on = function (eventName, eventFunc, keepArgue) {
    eventQueue[eventName] = [];
    argueHub[eventName] = [];
    eventQueue[eventName].push(eventFunc);
    if (keepArgue)argueHub[eventName].push(keepArgue);
  };
  /*
   * 事件取消订阅
   * (事件名称)*/
  pubSub.off = function (eventName) {
    var currentEvent = eventQueue[eventName];
    if (currentEvent) {
      eventQueue[eventName] = [];
    } else {
      console.log('取消订阅的事件不存在!');
    }
  };
  /*
   * 事件发布
   * (事件名称,函数参数)
   * [!此时的函数参数为事件发布时需要传入的参数,可与保留参数同时使用]*/
  pubSub.emit = function (eventName, releaseArgue) {
    var currentEvent = eventQueue[eventName];
    var currentArgue = argueHub[eventName];
    if (currentEvent) {
      if (currentArgue) {
        return currentEvent[0](releaseArgue);
      }
      return currentEvent[0](releaseArgue, argueHub[eventName]);
    } else {
      console.log('发布的事件不存在!');
    }
  };
  return function () {
    return pubSub;
  }
});