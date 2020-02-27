/**
 * Created by acer on 2020/2/18.
 */
var app = new Vue({
    el:"#whole",
    data:{
        search:"",
        musicList:[],
        musicUrl:"",
        picUrl:"",
        lyrics:[],
       

    },
    methods:{
        searchMusic:function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.search)
                .then(function (response) {
                    // console.log(response);
                    that.musicList = response.data.result.songs;
                    that.search = "";
                    that.musicUrl=[];
                    that.lyrics=[];
                    that.picUrl=""

                },function(err){})

        },
        playMusic:function(musicId){
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
                .then(function(response){
                    that.musicUrl=response.data.data[0].url;
                },function(err){}),
           axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
               .then(function(response){
                   that.picUrl=response.data.songs[0].al.picUrl
               // console.log(response.data.songs[0].al.picUrl);
            },function(err){}),
            axios.get("https://autumnfish.cn/lyric?id="+musicId)
                .then(function(response){
                    var x=0;
                    that.lyrics=response.data.lrc.lyric.split("\n");
                    for(x in that.lyrics){
                        that.lyrics[x]=that.lyrics[x].slice(that.lyrics[x].lastIndexOf("]")+1);
                    }

                },function(err){})
        }
    }
})