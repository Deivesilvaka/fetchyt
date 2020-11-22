'use strict'

const ytdl = require("ytdl-core")
const fs = require("fs")

async function robot(object, config) {

    let Config = {}

    if(!config){
        Config.path = `${__dirname}/videos/`
    }else{
        if(config.path.substr(-1) === "/"){
            Config = config    
        }else{
            Config.path = `${config.path}/`
        }
    }

   await fetchObject(object)

   async function fetchObject(object){
        for(const music in object){
            await download(object[music].href, music)
        }
   }


    async function download(music, name) {
        return new Promise(async (resolve, reject) => {
            await ytdl(music)
            .pipe(fs.createWriteStream(`${Config.path}${name}.mp4`))
            
            resolve("success")
        })
    }

}

module.exports = robot