'use strict';

// import modules
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import * as _const from './const/server'

// import webhook controller
import webhookPostController from './webhook/post'
import webhookGetController from './webhook/get'
import tichhop247Webhook from './webhook/tichhop247'

// import runtime env
dotenv.config()
const { PAGE_ACCESS_TOKEN } = process.env

const app = express().use(bodyParser.json())

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log(_const.SERVER_LISTENING));

// messenger webhook
app.post('/webhook', webhookPostController)
app.get('/webhook', webhookGetController)

// tichhop247 webhook
app.get('/tichhop247', tichhop247Webhook)