#!/usr/bin/env node

var ShipComponentsBanner = require('../lib/PackageBanner');

// Basic Usage
var banner = new ShipComponentsBanner().build();

console.log(banner);
