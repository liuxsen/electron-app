<template lang="pug">
  div
    video(ref="video", controls autoplay)
    div flv直播
    video(ref="videoflv" controls)
    div
      button(@click="playFlv") 拉流
    div 当前共享桌面 {{ selectScreenId }}
    div(
      @click="fnClickSelectScreen(item)"
      v-for="(item, i) in captureWindowPng" :key="i")
      p {{ item.name }}
      img.mr-10(:src="item.png")
</template>

<script>
import http from 'http';
import flvjs from './lib/flv.min.js';
console.log(flvjs)
// import spawn from 'cross-spawn';
const { spawn } = require('child_process');
export default {
  data () {
    return {
      app: '1',
      windowList: [],
      selectScreenId: null
    }
  },
  computed: {
    captureWindowPng () {
      return this.windowList.map(item=>{
        return {
          ...item,
          png: item.thumbnail.toDataURL()
        }
      })
    }
  },
  methods: {
    playFlv(){
      if (flvjs.isSupported()) {
        var videoElement = this.$refs.videoflv;
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://127.0.0.1/live?port=1935&app=myapp&stream=stream'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    },
    execFFmpeg(){
      var fs = require('fs');
      var ffmpeg = require('fluent-ffmpeg');
      const {remote} = require('electron');
      const {appPath} = remote.getGlobal('shareObject');
      const ffmpegPath = appPath + '/app/lib/ffmpeg-mac/bin/ffmpeg'
      let command = null;
      command = ffmpeg()
                .setFfmpegPath(ffmpegPath)
                .videoBitrate('1024k')
                .input('http://127.0.0.1:3003/stream.webm')
                .addOptions([
                    '-vcodec libx264',
                    '-preset ultrafast',
                    '-acodec libmp3lame',
                    '-pix_fmt yuv422p'
                ])
                .format('flv')
                .on('start', function (commandLine) {
                    console.log('[' + new Date() + '] Vedio is Pushing !');
                    console.log('commandLine: ' + commandLine);
                })
                .on('error', function (err, stdout, stderr) {
                    console.log('error: ' + err.message);
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                })
                .on('end', function () {
                    console.log('[' + new Date() + '] Vedio Pushing is Finished !');
                })
                // rtmp://example.com[:port]/appname/streamname
                // http://127.0.0.1:1985/live?app=live&stream=stream
                // http://127.0.0.1/live?port=1935&app=myapp&stream=stream
                .output('rtmp://127.0.0.1/myapp/stream')
                .run()
    },
    getScreenStream(){
      const {desktopCapturer} = require('electron');
      console.log(desktopCapturer)
      desktopCapturer.getSources({types: ['window', 'screen'], thumbnailSize: {
        width: 500,
        height: 500
      }}).then(sources=>{
        console.log(sources)
        this.windowList = sources;
      })
    },
    fnClickSelectScreen(item){
      this.selectScreenId = item.id;
      this.catchScreenStream(item.id);
    },
    catchScreenStream (screenId) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: screenId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      })
      .then((stream) => this.handleStream(stream))
      .catch((e) => console.log(e))
    },
    handleStream(stream){
      this.stream = stream;
      const video = this.$refs.video;
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
      this.pushStreamToServer();
      setTimeout(()=>{
        this.execFFmpeg();
      }, 3000)
    },
    readBlob(blob) {
      return new Promise(resolve => {
        let r = new FileReader();
        r.onload = () => {
            resolve(r.result);
        };
        r.readAsArrayBuffer(blob);
      });
    },
    pushStreamToServer () {
      let server = http.createServer((req, res) => {
        if(req.url === '/stream.webm'){
          res.setHeader("Content-Type", "video/webm");
          let mr = new MediaRecorder(this.stream, {mimeType: 'video/webm; codecs="opus,vp8"'})
          mr.ondataavailable = async e => {
            res.write(Buffer.from(await this.readBlob(e.data)), err=> {
              if(err){
                mr.stop;
              }
            })
          }
          mr.start(300);
        }else{
          res.end('not found')
        }
      }).listen(3003, ()=>{
        console.log('server is listening at 127.0.0.1:3003')
      })
      server.on('error', (err)=>{
        console.log(err);
      })
    }
  },
  mounted(){
    this.getScreenStream();
  }
}
</script>