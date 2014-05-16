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


var mdns = require('mdns2');
var process = require('process');
var _ = require('lodash');

var configArray = require('./config.js');

var adArray = [];

_.each(configArray, function(config) {

  // advertise a http server on port 80
  var txtRecord = {
      scope: config.scope,
      description: config.description,
      type: config.type,
      region: config.region
  };
  var ad = mdns.createAdvertisement(mdns.tcp('http'), config.port, {name: config.name, txtRecord: txtRecord});
  ad.start();
  adArray.push(ad);
});


process.on('SIGINT', function() {
  _.each(adArray, function(ad) {
    ad.stop();
  });
  console.log('exiting');
  process.exit();
});
