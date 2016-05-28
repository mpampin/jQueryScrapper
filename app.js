/*
 * WebScrapper
 * https://github.com/mpampin/news-feeder
 *
 * Copyright (c) 2016 MPampin
 * Licensed under the MIT license.
 */

'use strict'

var CsvUrlScrapperChainBuilder = require('./lib/Builder/CsvUrlScraperChainBuilder.js');

var csvUrlScrapperChainBuilder = new CsvUrlScrapperChainBuilder('TodoInfantilLinks.csv');

csvUrlScrapperChainBuilder.build();