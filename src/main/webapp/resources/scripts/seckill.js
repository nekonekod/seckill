//存放交互逻辑js代码
var seckill = {
    //封装秒杀相关的URL
    URL: {
        now: function () {
            return '/seckill/time/now';
        },
        exposer:function (seckillId) {
            return '/seckill/'+seckillId+'/exposer' ;
        },
        execution:function (seckillId,md5) {
            return '/seckill/'+seckillId+'/'+md5+'/execution' ;
        }
    },
    //验证手机号
    validatePhone: function (phone) {
        return (phone && phone.length == 11 && !isNaN(phone));
    },
    //处理秒杀逻辑
    handleSeckill: function (seckillId, node) {
        node.hide()
            .html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>') ;
        $.post(seckill.URL.exposer(seckillId),{},function(result){
            //在回调函数中执行交互流程
            if(result && result.success){
                var exposer = result.data ;
                if(exposer.exposed){
                    //开启秒杀
                    //获取秒杀地址
                    var md5 = exposer['md5'] ;
                    var killUrl = seckill.URL.execution(seckillId,md5) ;
                    //绑定一定点击事件
                    $('#killBtn').one('click',function(){
                        $(this).addClass('disabled') ;
                        //发送秒杀请求
                        $.post(killUrl,{},function(result){
                            if(result&&result['success']){
                                var killResult = result['data'] ;
                                var state = killResult['state'] ;
                                var stateInfo = killResult['stateInfo'] ;
                                //显示秒杀结果
                                node.html('<span class="label label-success">'+stateInfo+'</span>')
                            }
                        }) ;
                    }) ;
                    node.show() ;
                }else{
                    //未开启秒杀
                    var now = exposer.now ;
                    var start = exposer.start ;
                    var end = exposer.end ;
                    //重新计算计时逻辑
                    seckill.countdown(seckillId,now,start,end) ;
                }
            }else{
                console.log('result:'+result)
            }
        }) ;


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
            }).on('finish.countdown',function(){
                seckill.handleSeckill(seckillId,seckillBox) ;
            });
        } else {
            //秒杀开始 //TODO
            seckill.handleSeckill(seckillId,seckillBox) ;
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
                        var startTime = params['startTime'];
                        var endTime = params['endTime'];
                        var seckillId = params['seckillId'];
                        seckill.countdown(seckillId, nowTime, startTime, endTime);
                    } else {
                        console.log('result:' + result);
                    }
                });
            }
        }
    }
}