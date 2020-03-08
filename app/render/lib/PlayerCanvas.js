// 合成视频

class PlayerCanvas {
  constructor(width, height){
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context2d = this.canvas.getContext('2d');
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.cameraVideoWidth = 200;
    this.cameraVideoHeight = 150;
    requestAnimationFrame(this.animationFrameHandler.bind(this));
  }
  /**
   * @param {HTMLVideoElement} video 视频标签
   */
  setScreenVideo (video) {
    this.screenVideo = video;
  }

  /**
   * @param {HTMLVideoElement} video 视频标签
   */
  setCameraVideo (video) {
    this.cameraVideo = video;
  }
  animationFrameHandler () {
    console.log('animation');
    if(this.screenVideo){
      this.context2d.drawImage(this.screenVideo, 0, 0, this.canvas.width, this.canvas.height);
    }
    // 绘制头像
    if(this.cameraVideo){
      this.context2d.drawImage(
        this.cameraVideo,
        this.canvasWidth - this.cameraVideoWidth,
        this.canvasHeight - this.cameraVideoHeight,
        this.cameraVideoWidth,
        this.cameraVideoHeight
      );
    }
    requestAnimationFrame(this.animationFrameHandler.bind(this));
  }
}

export default PlayerCanvas;