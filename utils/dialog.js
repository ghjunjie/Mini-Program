
const open = function (title, content, callback, showCancel){
    wx.showModal({
        title: title,
        content: content,
        showCancel: showCancel||false,
        success: callback
    })
}




module.exports = {
    open: open
}