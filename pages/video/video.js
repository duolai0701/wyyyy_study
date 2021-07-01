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
    videoId: '',//视频Id的标识
    videoUpdateTime: [],//记录video播放的时长
    isTriggered: false,//下拉状态
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
    // console.log(videoListData)
    let index = 0
    let videoList = videoListData.datas.map(item => {
      item.id = index
      index++
      return item
    })
    this.setData({
      videoList,
      isTriggered: false
    })
  },
  changeNav (event) {
    let navId = event.currentTarget.id
    this.setData({
      navId: navId * 1,
      videoList: []
    })
    this.getVideoList(this.data.navId)
    wx.showLoading({
      title: '正在加载'
    });
  },
  handlePlay (event) {
    let vid = event.currentTarget.id
    //  this.vid !== vid && this.videoContext && this.videoContext.stop()
    //  this.vid = vid
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
    this.videoContext.play()

    let { videoUpdateTime } = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === event.currentTarget.id)
    if (videoItem) {
      this.videoContext.seek(videoItem.currentTime)
    }
  },
  handleTimeUpdate (event) {
    // console.log(event)
    let videoTimeObj = { vid: event.currentTarget.id, currentTime: event.detail.currentTime }
    let { videoUpdateTime } = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === event.currentTarget.id)
    if (videoItem) {
      videoItem.currentTime = event.detail.currentTime
    } else {
      videoUpdateTime.push(videoTimeObj)
    }
    this.setData({
      videoUpdateTime
    })
  },
  handleEnd (event) {
    let { videoUpdateTime } = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === event.currentTarget.id)
    if (videoItem) {
      videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1)
      this.setData({
        videoUpdateTime
      })
    }
  },
  handleRefresh () {
    this.getVideoList(this.data.navId)
  },
  handleToLower () {
    let newVideoList = [
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_972CB1F7602AF5EEE32585A447E22C7B",
          "coverUrl": "https://p2.music.126.net/PliWDISFQwTFDVKUdH2tKw==/109951163926549558.jpg",
          "height": 1080,
          "width": 1920,
          "title": "戳爷Troye Sivan音乐节现场版《for him》，这也太酥了吧",
          "description": "戳爷Troye Sivan音乐节现场版《for him》，戳爷的这个现场也太酥了吧！听戳爷歌真的是享受！[色]希望你能喜欢@_iluvtros",
          "commentCount": 1934,
          "shareCount": 18300,
          "resolutions": [
            {
              "resolution": 240,
              "size": 21154313
            },
            {
              "resolution": 480,
              "size": 34249070
            },
            {
              "resolution": 720,
              "size": 49840719
            },
            {
              "resolution": 1080,
              "size": 72172102
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 510000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/fsS0ghfHy7zpQ1VNaO7Igg==/109951163468947517.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 510100,
            "birthday": 814118400000,
            "userId": 95799637,
            "userType": 204,
            "nickname": "和我去音乐现场",
            "signature": "B站搜索：和我去音乐现场\n【合作推广私信联系】",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163468947520,
            "backgroundImgId": 109951165609262770,
            "backgroundUrl": "http://p1.music.126.net/S51mzKfQGXIcqntNKNLx7g==/109951165609262764.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "欧美音乐资讯达人"
            },
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "backgroundImgIdStr": "109951165609262764",
            "avatarImgIdStr": "109951163468947517"
          },
          "urlInfo": {
            "id": "972CB1F7602AF5EEE32585A447E22C7B",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/oZQXCt5G_2375899874_uhd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=aufKujkeXHWXkQVneLkyZLXYElfXOvKK&sign=fe1a80b7f7fa862ca1c3528c313edeb6&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 72172102,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 14163,
              "name": "Troye Sivan",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": [
            101
          ],
          "relateSong": [
            {
              "name": "for him.",
              "id": 37955044,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 45129,
                  "name": "Troye Sivan",
                  "tns": [],
                  "alias": []
                },
                {
                  "id": 784209,
                  "name": "Allday",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": null,
              "fee": 8,
              "v": 46,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 3329047,
                "name": "Blue Neighbourhood (Deluxe)",
                "picUrl": "http://p4.music.126.net/iOeMIf1fhlHotBAx-Vooyw==/3404088002870760.jpg",
                "tns": [],
                "pic": 3404088002870760
              },
              "dt": 208706,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 8350868,
                "vd": -28200
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 5010538,
                "vd": -25700
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3340373,
                "vd": -24200
              },
              "a": null,
              "cd": "1",
              "no": 12,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 2,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 7003,
              "mv": 0,
              "publishTime": 1449158400007,
              "privilege": {
                "id": 37955044,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "972CB1F7602AF5EEE32585A447E22C7B",
          "durationms": 269942,
          "playTime": 4044502,
          "praisedCount": 63733,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_15F0375A28D6533EF23E4DE3065BBF68",
          "coverUrl": "https://p2.music.126.net/yV-lsTd1nK6xM5hpDTmlJw==/109951164300475392.jpg",
          "height": 1080,
          "width": 1920,
          "title": "生命转弯处，会有重来的幸福！周传雄《雨打花瓣的声音》",
          "description": "\n生命转弯处，会有重来的幸福！周传雄倾情演唱《雨打花瓣的声音》",
          "commentCount": 1,
          "shareCount": 3,
          "resolutions": [
            {
              "resolution": 240,
              "size": 45913770
            },
            {
              "resolution": 480,
              "size": 86752300
            },
            {
              "resolution": 720,
              "size": 144514173
            },
            {
              "resolution": 1080,
              "size": 172578181
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 710000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/5o854xH3bkGHwLpa0AOuRA==/109951163650074554.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 710100,
            "birthday": -2209017600000,
            "userId": 1664328643,
            "userType": 0,
            "nickname": "台灣音樂風雲榜",
            "signature": "權威音樂榜單持續即時更新，最新發片動態，歌曲MV，及時更新。合作投稿請私訊！",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163650074560,
            "backgroundImgId": 109951164316932430,
            "backgroundUrl": "http://p1.music.126.net/-So6gvMBSiEWeBnPii7QDg==/109951164316932439.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "视频达人(华语、音乐现场)"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951164316932439",
            "avatarImgIdStr": "109951163650074554"
          },
          "urlInfo": {
            "id": "15F0375A28D6533EF23E4DE3065BBF68",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/JqSmqfpU_2592894909_uhd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=mjXcuFIDlijGtJdvqIVnilwGhJtKANGD&sign=0ef5e3318ab0c2f62dbee939d0ecf292&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 172578181,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "雨打花瓣的声音",
              "id": 29722667,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 6652,
                  "name": "周传雄",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 80,
              "st": 0,
              "rt": null,
              "fee": 8,
              "v": 191,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 3054271,
                "name": "时不知归",
                "picUrl": "http://p4.music.126.net/z9851kUxWMBSsql6eBATjQ==/3236962232658689.jpg",
                "tns": [],
                "pic": 3236962232658689
              },
              "dt": 207066,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 8285040,
                "vd": -12800
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 4971041,
                "vd": -10200
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3314042,
                "vd": -8500
              },
              "a": null,
              "cd": "1",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 2,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 659011,
              "mv": 370068,
              "publishTime": 1415635200007,
              "privilege": {
                "id": 29722667,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "15F0375A28D6533EF23E4DE3065BBF68",
          "durationms": 194491,
          "playTime": 3149,
          "praisedCount": 17,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_E89364A81A7343D8D80D4C6060E6762B",
          "coverUrl": "https://p2.music.126.net/7oy64gS5Xfe_G5FGCMv_4g==/109951163721914788.jpg",
          "height": 1080,
          "width": 1920,
          "title": "AOA《Execuse me》现场",
          "description": "#在云村看现场#AOA《Execuse me》现场",
          "commentCount": 42,
          "shareCount": 24,
          "resolutions": [
            {
              "resolution": 240,
              "size": 52553295
            },
            {
              "resolution": 480,
              "size": 89177851
            },
            {
              "resolution": 720,
              "size": 133339336
            },
            {
              "resolution": 1080,
              "size": 220418162
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/cAamE7SfekMUc3U-9PdRsw==/109951163665265569.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 110101,
            "birthday": 853257600000,
            "userId": 1671504377,
            "userType": 0,
            "nickname": "高清韩国打歌现场",
            "signature": "最热最新最高清韩国音乐打歌现场",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163665265570,
            "backgroundImgId": 109951162868128400,
            "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868128395",
            "avatarImgIdStr": "109951163665265569"
          },
          "urlInfo": {
            "id": "E89364A81A7343D8D80D4C6060E6762B",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/UuBMiDdW_2184211802_uhd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=JAscVpYIRbKllOfHYDBvrplFfXPNPXiq&sign=e4d553cea78eafa6658e2fbceaed38ac&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 220418162,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1101,
              "name": "舞蹈",
              "alg": null
            },
            {
              "id": 9102,
              "name": "演唱会",
              "alg": null
            },
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "E89364A81A7343D8D80D4C6060E6762B",
          "durationms": 228330,
          "playTime": 105925,
          "praisedCount": 506,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_DBF81C30DFEAD0A41CC54CBD4938B549",
          "coverUrl": "https://p2.music.126.net/7leERXe3o-8y76e5dkNeNA==/109951163574042863.jpg",
          "height": 1080,
          "width": 1920,
          "title": "Bruno Mars-Treasure- iHeartRadio",
          "description": "听到Treasure就想做个骚动作，这是病吗。",
          "commentCount": 40,
          "shareCount": 83,
          "resolutions": [
            {
              "resolution": 240,
              "size": 59445649
            },
            {
              "resolution": 480,
              "size": 80178359
            },
            {
              "resolution": 720,
              "size": 124830145
            },
            {
              "resolution": 1080,
              "size": 199238133
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/KQYslSH26t337VbuSstbTQ==/109951163117881906.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 110101,
            "birthday": 826300800000,
            "userId": 1345107052,
            "userType": 0,
            "nickname": "壹颗橙子阿",
            "signature": "是一颗喜欢音乐现场的橙子阿",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163117881900,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868126486",
            "avatarImgIdStr": "109951163117881906"
          },
          "urlInfo": {
            "id": "DBF81C30DFEAD0A41CC54CBD4938B549",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/nZxIPHYo_1820751212_uhd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=gGlDPKKzjUdeTaAGDiHslCksMRbYUgPU&sign=40c9e4119bd550b95cb67b8244e99e32&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 199238133,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 24121,
              "name": "Bruno Mars",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "Treasure",
              "id": 25657233,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 178059,
                  "name": "Bruno Mars",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "",
              "fee": 1,
              "v": 412,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 2270037,
                "name": "Unorthodox Jukebox",
                "picUrl": "http://p4.music.126.net/NbG1-SLzHtAMIPsOmVcm5g==/18334356393748369.jpg",
                "tns": [],
                "pic_str": "18334356393748369",
                "pic": 18334356393748370
              },
              "dt": 178560,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 7145055,
                "vd": -28500
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 4287050,
                "vd": -25900
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 2858047,
                "vd": -24500
              },
              "a": null,
              "cd": "1",
              "no": 4,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 7002,
              "mv": 113012,
              "publishTime": 1355155200007,
              "privilege": {
                "id": 25657233,
                "fee": 1,
                "payed": 0,
                "st": 0,
                "pl": 0,
                "dl": 0,
                "sp": 0,
                "cp": 0,
                "subp": 0,
                "cs": false,
                "maxbr": 999000,
                "fl": 0,
                "toast": false,
                "flag": 1284,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "DBF81C30DFEAD0A41CC54CBD4938B549",
          "durationms": 230336,
          "playTime": 126583,
          "praisedCount": 526,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_34DC294D3659210F7CAF5D161A74169E",
          "coverUrl": "https://p2.music.126.net/XyumOgxRZH0ig-5nbw2-yg==/109951163574084697.jpg",
          "height": 720,
          "width": 1280,
          "title": "1995年刘德华凭借这首歌击败歌神张学友，拿下金曲奖！",
          "description": "1995年刘德华凭借这首歌击败歌神张学友，拿下十大劲歌金曲奖！",
          "commentCount": 454,
          "shareCount": 630,
          "resolutions": [
            {
              "resolution": 240,
              "size": 23567992
            },
            {
              "resolution": 480,
              "size": 42705683
            },
            {
              "resolution": 720,
              "size": 54147735
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 1000000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/VPGeeVnQ0jLp4hK9kj0EPg==/18897306347016806.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 1002400,
            "birthday": -2209017600000,
            "userId": 449979212,
            "userType": 202,
            "nickname": "全球潮音乐",
            "signature": "有时候音乐是陪我熬过那些夜晚的唯一朋友。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18897306347016810,
            "backgroundImgId": 18987466300481468,
            "backgroundUrl": "http://p1.music.126.net/qx6U5-1LCeMT9t7RLV7r1A==/18987466300481468.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "华语音乐|欧美音乐资讯达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "18987466300481468",
            "avatarImgIdStr": "18897306347016806"
          },
          "urlInfo": {
            "id": "34DC294D3659210F7CAF5D161A74169E",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/mVM6ek5d_1838263902_shd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=UJRQlowLPiAHBeGJepIieoquBLoDZBip&sign=3fee8cea981f682f82b3c325a6351e0d&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 54147735,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 16180,
              "name": "刘德华",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "34DC294D3659210F7CAF5D161A74169E",
          "durationms": 243230,
          "playTime": 605932,
          "praisedCount": 1569,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_5383E0C50EC5D2257C22A3EDB12E5071",
          "coverUrl": "https://p2.music.126.net/DqEt6nQQWuZUZz4EgY1S4Q==/109951163883133133.jpg",
          "height": 720,
          "width": 1280,
          "title": "终于见识到“炮姐”第一神曲的威力,全程高燃,现场嗨到极",
          "description": "第一天跟大家见面 很开心\n终于见识到“炮姐”第一神曲的威力,全程高燃,现场嗨到极",
          "commentCount": 211,
          "shareCount": 126,
          "resolutions": [
            {
              "resolution": 240,
              "size": 37608648
            },
            {
              "resolution": 480,
              "size": 62104815
            },
            {
              "resolution": 720,
              "size": 91565001
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 510000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/vUd5xKJJk8DsL3uv-V5wIg==/109951163880600438.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 510500,
            "birthday": -2209017600000,
            "userId": 1771507866,
            "userType": 204,
            "nickname": "荒草音乐",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163880600430,
            "backgroundImgId": 109951165492077660,
            "backgroundUrl": "http://p1.music.126.net/-3xs1LIOhcJBNCFkSh0G3g==/109951165492077657.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "超燃联盟视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951165492077657",
            "avatarImgIdStr": "109951163880600438"
          },
          "urlInfo": {
            "id": "5383E0C50EC5D2257C22A3EDB12E5071",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/85WUKei6_2332603455_shd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=ypyHcrjofGpPZeGFRtZaHqCmrhCNdmOs&sign=b390c3eb7ef3a58016d1c10bf15cad73&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 91565001,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 9102,
              "name": "演唱会",
              "alg": null
            },
            {
              "id": 60101,
              "name": "日语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "5383E0C50EC5D2257C22A3EDB12E5071",
          "durationms": 321024,
          "playTime": 745761,
          "praisedCount": 2431,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_932A7EA9098F4DB9330D2BFD2C949D25",
          "coverUrl": "https://p2.music.126.net/Psu5JjtsKU9F0NiN_bVrdA==/109951163574262274.jpg",
          "height": 1080,
          "width": 1920,
          "title": "李健写给父亲的一首歌，一字一句都是深情，感动了无数人",
          "description": "李健写给父亲的一首歌，一字一句都是深情，感动了无数人！",
          "commentCount": 173,
          "shareCount": 355,
          "resolutions": [
            {
              "resolution": 240,
              "size": 27208537
            },
            {
              "resolution": 480,
              "size": 48523230
            },
            {
              "resolution": 720,
              "size": 74282152
            },
            {
              "resolution": 1080,
              "size": 113706817
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 340000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/C6VID_CReqmt8ETsUWaYTQ==/18499283139231828.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 340100,
            "birthday": -2209017600000,
            "userId": 479954154,
            "userType": 202,
            "nickname": "音乐诊疗室",
            "signature": "当我坐在那架破旧古钢琴旁边的时候，我对最幸福的国王也不羡慕。（合作推广请私信，或者+V信：mjs927721）",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18499283139231828,
            "backgroundImgId": 1364493978647983,
            "backgroundUrl": "http://p1.music.126.net/i4J_uvH-pb4sYMsh4fgQAA==/1364493978647983.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "音乐资讯达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "1364493978647983",
            "avatarImgIdStr": "18499283139231828"
          },
          "urlInfo": {
            "id": "932A7EA9098F4DB9330D2BFD2C949D25",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/RHIDBYEd_1933338707_uhd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=BBTtRskimPkXvRmKMTkJsYzKqbGDXPHb&sign=efcfc6a471dc77baf8a7d1a57e19604d&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 113706817,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 57109,
              "name": "民谣现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 26130,
              "name": "李健",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "932A7EA9098F4DB9330D2BFD2C949D25",
          "durationms": 221854,
          "playTime": 403548,
          "praisedCount": 1376,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_6267D963B2A5D24D42B4003740F2D93C",
          "coverUrl": "https://p2.music.126.net/QZurIji7acajKnyR5erTyQ==/109951164147935939.jpg",
          "height": 1080,
          "width": 1920,
          "title": "【宇宙少女】鹅爹刘海我来守护 | BeBe 雪娥生无可恋直拍",
          "description": "\n\n",
          "commentCount": 79,
          "shareCount": 48,
          "resolutions": [
            {
              "resolution": 240,
              "size": 46608304
            },
            {
              "resolution": 480,
              "size": 83695095
            },
            {
              "resolution": 720,
              "size": 127998419
            },
            {
              "resolution": 1080,
              "size": 205166186
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 1000000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/ODymGynYBPpmlDwJErTWXw==/109951166131822946.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 1010000,
            "birthday": 880992000000,
            "userId": 262627192,
            "userType": 204,
            "nickname": "-SummerDawn-",
            "signature": "Love for PRC.",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951166131822940,
            "backgroundImgId": 109951165645819250,
            "backgroundUrl": "http://p1.music.126.net/OSPVKyp9KitmLEDaygOnEA==/109951165645819255.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "backgroundImgIdStr": "109951165645819255",
            "avatarImgIdStr": "109951166131822946"
          },
          "urlInfo": {
            "id": "6267D963B2A5D24D42B4003740F2D93C",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/e7hMUJsY_2548272330_uhd.mp4?ts=1624976883&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=dnVkKMdOquwGRSJjDvjXmlZafBBOoZrl&sign=4039250402fd7bb137a4e3f862c7e759&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANLm/GUb1QPWIQLEJa2U4krg84DOHpETkEs4AlRuVubz7l2UVJvcyH7Aif8WwAFMDjwnJAY8OkzOLrch/EyXWY1KvqPeTGxpz9sFh71hwdeTCj5cmi+W1fr2j3E1RKiIk+ulHetExmGmNdt/QcNYz2IxhGjKVw7T1LC9wvQUO2hOgWa4/uzOpR2YGkVH/RsrgYmUbMQFPuisexpEtZHAtYCP",
            "size": 205166186,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1101,
              "name": "舞蹈",
              "alg": null
            },
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 57110,
              "name": "饭拍现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "BeBe",
              "id": 426026162,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 1193531,
                  "name": "宇宙少女",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 45,
              "st": 0,
              "rt": null,
              "fee": 1,
              "v": 43,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 34826040,
                "name": "THE SECRET",
                "picUrl": "http://p3.music.126.net/VdNstEkGb0Qq5cMUF6ogOA==/18627925997817552.jpg",
                "tns": [],
                "pic_str": "18627925997817552",
                "pic": 18627925997817550
              },
              "dt": 198204,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 7930819,
                "vd": -34600
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 4758509,
                "vd": -32000
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3172354,
                "vd": -30700
              },
              "a": null,
              "cd": "1",
              "no": 2,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 2,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 1374822,
              "mv": 0,
              "publishTime": 1471363200007,
              "privilege": {
                "id": 426026162,
                "fee": 1,
                "payed": 0,
                "st": 0,
                "pl": 0,
                "dl": 0,
                "sp": 0,
                "cp": 0,
                "subp": 0,
                "cs": false,
                "maxbr": 999000,
                "fl": 0,
                "toast": false,
                "flag": 1348,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "6267D963B2A5D24D42B4003740F2D93C",
          "durationms": 201509,
          "playTime": 191370,
          "praisedCount": 960,
          "praised": false,
          "subscribed": false
        }
      }]
    let videoList = this.data.videoList
    videoList.push(...newVideoList)
    this.setData({
      videoList
    })  
  },
  searchMusic(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
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
  onShareAppMessage: function ({from}) {
    console.log(from)
    if(from === 'button'){
      return {
        title:'来自button的转发',
        page:'/pages/video/video',
        imageUrl:'/static/images/nvsheng.jpg'
      }
    }else {
      return {
        title:'来自menu的转发',
        page:'/pages/video/video',
        imageUrl:'/static/images/nvsheng.jpg'
      }
    }
  }
})