//存放交互逻辑js代码
var seckill = {
    //封装秒杀相关的URL
    URL: {
        now: function () {
            return '/seckill/time/now';
        }
    },
    //验证手机号
    validatePhone: function (phone) {
        return (phone && phone.length == 11 && !isNaN(phone));
    },
    countdown: function (seckillId, nowTime, startTime, endTime) {
        var seckillBox = $('#seckill-box');
        //时间判断
        if (nowTime > endTime) {
            //秒杀结束
            seckillBox.html('秒杀结束');
        } else if (nowTime < startTime) {
            //秒杀开始计时
            var killTime = new Date(startTime + 1000);
            seckillBox.countdown(killTime, function (event) {
                var format = event.strftime('秒杀倒计时: %D天 %H时 %M分 %S秒');
                seckillBox.html(format);
            });
        } else {
            //秒杀开始 //TODO

        }
    },
    //详情页秒杀逻辑
    detail: {
        //详情页初始化
        init: function (params) {
            //手机验证和登录，计时交互
            //在cookie中获得killPhone
            var killPhone = $.cookie('killPhone');
            //验证手机号
            if (!seckill.validatePhone(killPhone)) {
                //绑定phone
                var killPhoneModal = $('#killPhoneModal');
                killPhoneModal.modal({
                    show: true, //显示弹出层
                    backdrop: 'static',//禁止位置关闭
                    keyboard: false //关闭键盘监听
                });
                $('#killPhoneBtn').on('click', function (event) {
                    var inputPhone = $('#killPhone').val();
                    if (seckill.validatePhone(inputPhone)) {
                        //电话写入cookie
                        $.cookie('killPhone', inputPhone, {expired: 7, path: '/seckill'});
                        window.location.reload();
                    } else {
                        $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误</label>').show(300);
                    }
                });
            } else {
                //已经登录
                //计时交互
                $.get(seckill.URL.now(), {}, function (result) {
                    if (result && result['success']) {
                        var nowTime = result['data'];
                        var startTime = params.startTime;
                        var endTime = params.endTime;
                        var seckillId = params.seckillId;
                        seckill.countdown(seckillId, nowTime, startTime, endTime);
                    } else {
                        console.log('result:' + result);
                    }
                });
            }
        }
    }
}