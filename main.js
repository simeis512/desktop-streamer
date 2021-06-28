'use strict'

const { app, Menu, BrowserWindow } = require("electron")
const path = require('path')
const url = require('url')

const express = require("express")
const webApp = express()

const fs = require('fs')
const key = fs.readFileSync('./privatekey.pem')
const cert = fs.readFileSync('./cert.pem')

const { networkInterfaces } = require('os')

const nets = networkInterfaces()
const results = []

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            results.push(net.address);
        }
    }
}

console.log(results)


webApp.use(express.static("public"))
const server = require('https').createServer({
  key: key,
  cert: cert
}, webApp)
server.listen(8800, results[0])


const WebSocketServer = require('ws').Server
const wssServer = require('https').createServer({
  key: key,
  cert: cert
})

const wss = new WebSocketServer({ server: wssServer })

wss.on('connection', (ws) => {
  ws.on('close', () => {

  })

  ws.on('message', (msg) => {
    console.log(msg)
    wss.clients.forEach((client) => {
      if (ws !== client) {
        client.send(msg)
      }
    })
  })
})

wssServer.listen(8801)


app.on("ready", function () {
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'electron_public', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  Menu.setApplicationMenu(null)
  mainWindow.on("closed", () => {
    mainWindow = null
  })
})

app.on('certificate-error', function(event, webContents, url, error, certificate, callback) {
  event.preventDefault()
  callback(true)
})
