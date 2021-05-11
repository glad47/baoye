/*
 * @Description: Event Bus 通信
 */
import { Component } from "react";

import { EventEmitter } from "events";

const event = new EventEmitter();

// @ts-ignore
Component.prototype.$eventBus = event;

export default event;
