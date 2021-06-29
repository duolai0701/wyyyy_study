// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],//导航的标签数据
    navId: '',//导航标识
    videoList: [],//视频列表数据
    videoId:'',//视频Id的标识
    videoUpdateTime:[],//记录video播放的时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData()

  },

  async getVideoGroupListData () {
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })
    this.getVideoList(this.data.navId)
  },
  async getVideoList (navId) {
    let videoListData = await request('/video/group', {
      id: navId
    })
    wx.hideLoading();
    console.log(videoListData)
    let index = 0
    let videoList = videoListData.datas.map(item => {
      item.id = index
      index++
      return item
    })
    this.setData({
      videoList
    })
  },
  changeNav (event) {
    let navId = event.currentTarget.id
    this.setData({
      navId: navId * 1,
      videoList:[]
    })
    this.getVideoList(this.data.navId)
    wx.showLoading({
      title: '正在加载'
    });
  },
  handlePlay(event){
     let vid = event.currentTarget.id
    //  this.vid !== vid && this.videoContext && this.videoContext.stop()
    //  this.vid = vid
     this.setData({
       videoId:vid
     })
     this.videoContext = wx.createVideoContext(vid)
     this.videoContext.play()

     let {videoUpdateTime} = this.data
     let videoItem = videoUpdateTime.find(item=>item.vid === event.currentTarget.id)
     if(videoItem){
        this.videoContext.seek(videoItem.currentTime)
     }
  },
  handleTimeUpdate(event){
    // console.log(event)
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime}
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item=>item.vid === event.currentTarget.id)
    if(videoItem){
      videoItem.currentTime = event.detail.currentTime
    }else{
      videoUpdateTime.push(videoTimeObj)
    }
    this.setData({
      videoUpdateTime
    })
  },
  handleEnd(event){
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item=>item.vid === event.currentTarget.id)
    if(videoItem){
      videoUpdateTime.splice(videoUpdateTime.findIndex(item=>item.vid === event.currentTarget.id),1)
      this.setData({
        videoUpdateTime
      })
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