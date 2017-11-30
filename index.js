
const express = require('express');
const app = express();
const startCrawl = require('./getArticles');
const data = require('config-lite')(__dirname).data;
// const match = require('./match.js');
// match();

const target = data[6];
startCrawl( target.sql,  target.class, target.page, target.type, target.sort);