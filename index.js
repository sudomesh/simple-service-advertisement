#!/usr/bin/env node

/*
  Copyright 2014 Marc Juul
  License: AGPLv3

  This file is part of service-test.

  service-test is free software: you can redistribute it 
  and/or modifyit under the terms of the GNU Affero General 
  Public License as published by the Free Software Foundation,
  either version 3 of the License, or (at your option) any 
  later version.

  service-test is distributed in the hope that it will be
  useful, but WITHOUT ANY WARRANTY; without even the implied
  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
  PURPOSE.  See the GNU Affero General Public License for 
  more details.

  You should have received a copy of the GNU Affero General 
  Public License along with service-test. 
  If not, see <http://www.gnu.org/licenses/>.
*/


var util = require('util');
var path = require('path');
var http = require('http');
var express = require('express');
var sockjs = require('sockjs');
var mdns = require('mdns2');

var config = require('./config.js');

var clients = [];
var services = [];

// advertise a http server on port 80
var txtRecord = {
    sudomesh: true,
    description: "Maxb OwnCloud Service",
    type: "storage"
};
var ad = mdns.createAdvertisement(mdns.tcp('http'), 80, {txtRecord: txtRecord});
ad.start();

// watch all http servers
var browser = mdns.createBrowser(mdns.tcp('http'));
browser.on('serviceUp', function(service) {
  console.log("service up: ", service);
});
browser.on('serviceDown', function(service) {
  console.log("service down: ", service);
});
browser.start();
