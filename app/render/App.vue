<template lang="pug">
  div
    video(ref="video", controls autoplay)
    div
      button 开始共享
    div 当前共享桌面 {{ selectScreenId }}
    div(
      @click="fnClickSelectScreen(item)"
      v-for="(item, i) in captureWindowPng" :key="i")
      p {{ item.name }}
      img.mr-10(:src="item.png")
</template>

<script>
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
      .catch((e) => handleError(e))
    },
    handleStream(stream){
      const video = this.$refs.video;
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    }
  },
  mounted(){
    this.getScreenStream();
  }
}
</script>