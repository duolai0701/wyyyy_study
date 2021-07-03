// pages/songDetail/songDetail.js
import moment from 'moment'
import PubSub from 'pubsub-js'
import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: true,//音乐是否播放
    song: {},
    musicId: '',
    musicLink:'',
    currentTime:'00:00',
    durationTime:'00:00',
    currentWidth:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // console.log(options.musicId)
    this.getSongDetail(options.musicId)
    this.setData({
      musicId: options.musicId
    })
    this.musicControl(this.data.isPlay, this.data.musicId,this.data.musicLink)

    //监听音乐播放/暂停
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.backgroundAudioManager.onPlay(()=>{
      this.changePlayState(true)
    })
    this.backgroundAudioManager.onPause(()=>{
      this.changePlayState(false)
    })
    this.backgroundAudioManager.onStop(()=>{
      this.changePlayState(false)
    })
    this.backgroundAudioManager.onTimeUpdate(()=>{
      let currentWidth = (this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration) * 450
      this.setData({
        currentTime:moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss'),
        currentWidth
      })
    })
    this.backgroundAudioManager.onEnded(()=>{
      PubSub.publish('switchType','next')
      this.setData({
        currentWidth:0,
        currentTime:'00:00'
      })
    })
  },
  changePlayState(isPlay){
    this.setData({
      isPlay
    })
  },
  async getSongDetail (musicId) {
    let songDetailData = await request('/song/detail', {
      ids: musicId
    })
    let durationTime = moment(songDetailData.songs[0].dt).format('mm:ss')
    // console.log(songDetailData)
    this.setData({
      song: songDetailData.songs[0],
      durationTime
    })

    wx.setNavigationBarTitle({
      title: this.data.song.name
    })
  },
  handleMusicPlay () {
    this.musicControl(!this.data.isPlay, this.data.musicId,this.data.musicLink)
  },
  async musicControl (isPlay, musicId,musicLink) {
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    if (isPlay) {
      if(!musicLink){
       let musicLinkData =  await request('/song/url', { id: musicId })
       musicLink = musicLinkData.data[0].url
       this.setData({
         musicLink
       })
      }
      
      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name
    } else {
      this.backgroundAudioManager.pause()
    }
  },
  handleSwitch(event){
    let type = event.currentTarget.id
    // console.log(type)

    this.backgroundAudioManager.stop()

    PubSub.subscribe('musicId',(msg,musicId)=>{
      console.log(musicId)
      
      this.getSongDetail(musicId)
      this.musicControl(true,musicId)
      
      //取消订阅
      PubSub.unsubscribe('musicId')
    })
    PubSub.publish('switchType',type)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})