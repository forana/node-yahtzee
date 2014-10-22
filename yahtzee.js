#!/usr/bin/env node

"use strict";

var _ = require("lodash");

require("colors");

var rolls = _.sortBy(_.times(5, function() {
    return _.random(1,6);
}, function(a, b) {
    return a - b;
}));

var freqs = [0,0,0,0,0,0];
rolls.forEach(function(r) {
    freqs[r-1]++;
});
freqs = _.sortBy(_.compact(freqs), function(a, b) {
    return a - b;
});

function isSequential(array) {
    for (var i = 1; i < array.length; i++) {
        if (array[i] - array[i-1] != 1) {
            return false;
        }
    }
    return true;
}

var ruling;

if (freqs.length == 1) {
    ruling = "Yahtzee!".rainbow
} else if (freqs.length == 2) {
    ruling = freqs[0] == 2 ? "Full House" : "Four of a Kind";
} else if (freqs.length == 3 && freqs[2] == 3) {
    ruling = "Three of a Kind";
} else if (freqs.length == 4 && isSequential(_.uniq(rolls))) {
    ruling = "Small Straight";
} else if (freqs.length == 5 && isSequential(rolls)) {
    ruling = "Large Straight";
} else {
    ruling = "Junk";
}

console.log(_.shuffle(rolls).join(" ").white, "-".white, ruling);

