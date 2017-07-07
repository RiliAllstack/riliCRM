var util = require('../util/util.js')

class DBPost {
    constructor(postId) {
        this.storageKeyName = 'postList';
        this.postId = postId;
    }

    getAllPostData() {
        var res = wx.getStorageSync(this.storageKeyName);
        if (!res) {
            res = require('../data/data.js').postList;
            this.initPostList(res);
        }
        return res;
    }

};

export { DBPost }