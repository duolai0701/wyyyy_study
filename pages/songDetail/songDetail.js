// pages/songDetail/songDetail.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: true,//音乐是否播放
    song: {},
    musicId: '',
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
    this.musicControl(this.data.isPlay, this.data.musicId)

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
    // console.log(songDetailData)
    this.setData({
      song: songDetailData.songs[0]
    })

    wx.setNavigationBarTitle({
      title: this.data.song.name
    })
  },
  handleMusicPlay () {
    this.musicControl(!this.data.isPlay, this.data.musicId)
  },
  async musicControl (isPlay, musicId) {
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    if (isPlay) {
      let musicLinkData = await request('/song/url', { id: musicId })
      this.backgroundAudioManager.src = musicLinkData.data[0].url
      this.backgroundAudioManager.title = this.data.song.name
    } else {
      this.backgroundAudioManager.pause()
    }
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