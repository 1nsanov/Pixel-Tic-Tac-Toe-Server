#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
var debug = require("debug")("socketio-server:server");
const http = require("http");
const socket_1 = require("./socket");
const ConnectDB_1 = require("./api/controllers/MongoDB/ConnectDB");
// Connect to MongoDB
const connectDB = new ConnectDB_1.ConnectDB();
connectDB.conectionDB();
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "5000");
app_1.default.set("port", port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
const io = (0, socket_1.default)(server);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
    console.log("Server Running on Port: ", port);
}
