// @ts-ignore
import JSMpeg from '@cycjimmy/jsmpeg-player'
import Hls from 'hls.js'
// import '/src/utils/H5Player/h5player.min.js';
import '@/utils/H5Player/HaiKangH5Player.js'
import * as console from 'console'

class BaseVideoPlayer {
  constructor() {}

  player() {}

  play() {}

  pause() {}

  stop() {}

  destroy() {}

  upDataSrc(_src?: string) {}

  protected init() {}
}

// enum PLAYER_MODE {
//   WEBSOCKET_MODE,
//   MP4_MODE,
//   HLS_MODE,
// }

type PLAYER_MODE = 'WEBSOCKET_MODE' | 'MP4_MODE' | 'HLS_MODE'

//  外部访问的Player播放类
class VideoPlayer {
  protected m_player: BaseVideoPlayer | null
  private readonly _m_mode: PLAYER_MODE

  constructor(mode: PLAYER_MODE, videoParentDom: HTMLDivElement | string, src: string) {
    this._m_mode = mode

    switch (this._m_mode) {
      // case PLAYER_MODE.WEBSOCKET_MODE:
      case 'WEBSOCKET_MODE':
        this.m_player = new PlayerWebsocket(videoParentDom, src)
        break

      // case PLAYER_MODE.MP4_MODE:
      case 'MP4_MODE':
        this.m_player = new PlayerMp4(videoParentDom, src)
        break

      // case PLAYER_MODE.HLS_MODE:
      case 'HLS_MODE':
        this.m_player = new PlayerMp4(videoParentDom, src)
        break

      default:
        this.m_player = null
        console.log('没有合适的播放器！')
    }
  }

  get player() {
    return this.m_player
  }
}

/**
 * PlayerWebsocket
 */

class PlayerWebsocket extends BaseVideoPlayer {
  /**********************************
   * 变量s
   ***********************************/
  private m_VideoParentDom: Element | null
  private m_VideoSrc: string
  private m_JSMpeg: any

  /**********************************
   * 方法s
   ***********************************/
  constructor(videoParentDom: Element | string, src: string) {
    super()
    if (videoParentDom instanceof Element) {
      this.m_VideoParentDom = videoParentDom
    } else if (typeof videoParentDom === 'string') {
      let dom = document.querySelector(videoParentDom)
      dom ? (this.m_VideoParentDom = dom) : (this.m_VideoParentDom = null)
    } else {
      this.m_VideoParentDom = null
    }
    this.m_VideoSrc = src
    this.init()
  }

  play() {
    this.m_JSMpeg.play()
  }

  pause() {
    this.m_JSMpeg.pause()
  }

  stop() {
    this.m_JSMpeg.stop()
  }

  destroy() {
    this.m_JSMpeg.destroy()
  }

  upDataSrc(src: string) {
    this.destroy()
    this.m_VideoSrc = src
    this.init()
  }

  protected init() {
    if (!this.m_VideoParentDom) return
    let videoCanvas = document.createElement('canvas')
    this.m_VideoParentDom.appendChild(videoCanvas)
    videoCanvas.style.width = '100%'
    videoCanvas.style.height = '100%'
    this.m_JSMpeg = new JSMpeg.Player(this.m_VideoSrc, {
      canvas: videoCanvas,
    })
  }
}

/**
 * PlayerMp4
 */

class PlayerMp4 extends BaseVideoPlayer {
  /**********************************
   * 变量s
   ***********************************/
  private m_VideoParentDom: Element | null
  private m_VideoSrc: string
  private m_VideoDom!: HTMLVideoElement

  /**********************************
   * 方法s
   ***********************************/
  constructor(videoParentDom: Element | string, src: string) {
    super()
    if (videoParentDom instanceof Element) {
      this.m_VideoParentDom = videoParentDom
    } else if (typeof videoParentDom === 'string') {
      let dom = document.querySelector(videoParentDom)
      dom ? (this.m_VideoParentDom = dom) : (this.m_VideoParentDom = null)
    } else {
      this.m_VideoParentDom = null
    }
    this.m_VideoSrc = src
    this.init()
  }

  play() {
    this.m_VideoDom.play()
  }

  pause() {
    this.m_VideoDom.pause()
  }

  upDataSrc(src: string) {
    this.m_VideoDom.src = src
    this.m_VideoSrc = src
  }

  protected init() {
    if (!this.m_VideoParentDom) return
    this.m_VideoDom = document.createElement('video')
    this.m_VideoDom.style.width = '100%'
    this.m_VideoDom.style.height = '100%'
    this.m_VideoDom.src = this.m_VideoSrc
    this.m_VideoParentDom.appendChild(this.m_VideoDom)
  }
}

/**
 * PlayerHLS
 */

//TODO: 未实现，不播放
class PlayerHLS extends BaseVideoPlayer {
  /**********************************
   * 变量s
   ***********************************/
  private m_VideoDom: HTMLVideoElement | null
  private m_VideoSrc: string
  private m_VideoHls!: Hls

  /**********************************
   * 方法s
   ***********************************/
  constructor(videoParentDom: HTMLVideoElement | string, src: string) {
    super()
    if (videoParentDom instanceof HTMLVideoElement) {
      this.m_VideoDom = videoParentDom
    } else if (typeof videoParentDom === 'string') {
      let dom = document.querySelector(videoParentDom) as HTMLVideoElement
      dom ? (this.m_VideoDom = dom) : (this.m_VideoDom = null)
    } else {
      this.m_VideoDom = null
    }
    this.m_VideoSrc = src

    this.init()
  }

  play() {
    this.m_VideoDom?.play()
  }

  pause() {
    this.m_VideoDom?.pause()
  }

  upDataSrc(src: string) {
    this.m_VideoSrc = src
    this.m_VideoHls.destroy()
    this.init()
  }

  protected init() {
    if (!this.m_VideoDom) return
    console.log(1)
    if (Hls.isSupported()) {
      console.log(2)
      // 检查当前浏览器是否支持 HLS
      this.m_VideoHls = new Hls()
      this.m_VideoHls.loadSource(this.m_VideoSrc)
      this.m_VideoHls.attachMedia(this.m_VideoDom)
      console.log(3)
    } else if (this.m_VideoDom.canPlayType('application/vnd.apple.mpegurl')) {
      this.m_VideoDom.src = this.m_VideoSrc
      this.m_VideoDom.addEventListener('loadedmetadata', () => {
        this.m_VideoDom?.play()
      })
      console.log(4)
    }
    this.play()
  }
}

/**
 * PlayerHaiK
 * 海康的H5Player 视频播放插件
 */

//TODO: 未实现，不播放
class PlayerHaiK extends BaseVideoPlayer {
  /**********************************
   * 变量s
   ***********************************/
  private _m_VideoDom: string //TODO:此处的_m_VideoDom 和 其他播放类的 m_VideoDom 有什么区别？？没有区别，要合成一个 放置在基类里
  private m_VideoSrc: string
  private readonly m_Plugin: any

  /**********************************
   * 方法s
   ***********************************/
  constructor(videoDom: string, src: string) {
    super()

    this._m_VideoDom = videoDom
    this.m_VideoSrc = src

    // @ts-ignore
    this.m_Plugin = new window.JSPlugin({
      szId: videoDom,
      szBasePath: '/src/utils/H5Player/h5player.min.js',
      iMaxSplit: 4,
      iCurrentSplit: 1,
    })

    this.init()
    this.play()
  }

  play() {
    this.m_Plugin
      .JS_Play(
        this.m_VideoSrc,
        {
          playURL: this.m_VideoSrc,
          mode: 0,
        },
        0,
        undefined,
        undefined,
      )
      .then(
        () => {
          console.info('success!')
        },
        (err: any) => {
          console.info('failed: ', err)
        },
      )
  }

  pause() {
    this.m_Plugin.JS_Stop(0).then(
      () => {
        console.info('success!')
      },
      (err: any) => {
        console.info('failed:', err)
      },
    )
  }

  upDataSrc(src: string) {
    this.m_VideoSrc = src
  }

  protected init() {
    console.log(this.m_Plugin)
  }

  get mVideoDom(): string {
    return this._m_VideoDom
  }

  set mVideoDom(value: string) {
    this._m_VideoDom = value
  }
}

export { PlayerWebsocket, PlayerMp4, PlayerHLS, PlayerHaiK, VideoPlayer }
