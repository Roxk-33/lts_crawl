
const express = require('express');
const app = express();
const startCrawl = require('./getArticles');
const config = require('config-lite')(__dirname);
// const match = require('./match.js');
// match();


startCrawl(config.sql, config.class,config.page,config.type,config.sort);