var posting = false, loadidx=0;
//全局js错误处理
var alertcnt = 0;
$.ajaxSetup({
    cache: false,
    error: function (jqXHR) {
        posting = false;
        switch (jqXHR.status) {
            case (503):
                alert('正在更新，请5分钟后重试！');
                break;
            case (500):
                alert('网络繁忙，请稍后再试！');
                break;
            case (401):
                if (alertcnt == 0) {
                    alertcnt = 1;
                    alert("会话已过期，请重新登录");
                    location.href = 'Account/Login.html?returnurl=' + location.hash.substr(1);
                }
                break;
            case (404):
                alert('服务请求地址不存在，请联系客服');
                break;
            case (403):
                alert('该权限已回收，请刷新页面！');
                break;
            case (408):
                if (iframe.html().length < 1) {
                    iframe.append('<div class="empty" style="margin- top:100px;text - align:center; background - color:#fff; padding-top:60px; padding-bottom:60px;">连接请求超时，请稍后再试！</div>');
                } else {
                    alert('连接请求超时，请稍后再试！');
                }
                break;
        }
        layer.close(loadidx);
        if (parent)
            layer.close(parent.loadidx);
    }
});