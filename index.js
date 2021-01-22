'use strict'

const fetchyt = require("./src/youtube/fetchyt")
const cluster = require("./src/youtube/cluster")
const spotifypl = require("./src/spotify/spotifyPlaylist")
const downloader = require("./src/youtube/downloader")
const yts = require("./src/youtube/yts")

module.exports = {
    fetchyt,
    spotifypl,
    downloader,
    cluster,
    yts
}
