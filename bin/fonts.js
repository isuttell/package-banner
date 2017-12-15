#!/usr/bin/env node

var PackageBanner = require('../lib/PackageBanner');

var result = new PackageBanner().fonts();

console.log(result);
