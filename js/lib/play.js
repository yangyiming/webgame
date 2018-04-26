define(function() {

    //动画类对象
    //obj 是html对象
    //pos 提供坐标
    function playObj(obj, pos,callback) {
        var index = 0;
        var now = new Date().getTime();
        var temp = $(obj).find('img[animate="true"]').attr('src').split('.')[0].split('/');
        var animateObj = temp[temp.length - 1];
        var isStop = false;
        var temp = true;
        var currentNum;
       
        play(0)

        function go() {
            if (new Date().getTime() - now >= animate[animateObj]['delay'] && temp) {
                now = new Date().getTime();
                if (index >= animate[animateObj]['fps'].length) {
                    if (isStop) {
                        if (currentNum) {
                            index = currentNum;
                        } else {
                            index = 0;
                        }

                        play();
                        temp = false;
                    } else {
                        index = 0;
                    }
                }
                play()
            }
        }

        function play(num) {
            if (num || num == 0) {
                index = num;
            }
            var w = animate[animateObj]['fps'][index][0];
            var h = animate[animateObj]['fps'][index][1];
            var x = animate[animateObj]['fps'][index][2];
            var y = animate[animateObj]['fps'][index][3];
            var imgReat = getRect([w, h, x, y]);
            var imgPos = getRect([w, h, pos[0], pos[1]]);
            $(obj).css({
                width: imgReat[0],
                height: imgReat[1],
                overflow: "hidden",
                position: "absolute",
                left: imgPos[2] + "px",
                top: imgPos[3] + "px"
            })


            if(animate[animateObj]['dir']=='left'){
                 $(obj).find('img[animate="true"]').css({
                        height: '100%',
                        marginLeft: "-" + imgReat[2] + "px",
                 })
            }else{
                $(obj).find('img[animate="true"]').css({
                        width: '100%',
                        marginTop: "-" + imgReat[3] + "px",
                 })
            }
            
            if(callback){
                callback(index)
            }
            

            if (!num && num !== 0) {
                index++;
            }


        }

     

        //可控制在某个帧数下停止动作
        function stop(num) {
            isStop = true;
            currentNum = num;
        }
        function setRect(obj, prams) {
            //缩放比例
            var scaleX = realStage[0] / stage[0];
            var scaleY = realStage[1] / stage[1];
            var w = prams[0] * scaleX;
            var h = prams[1] * scaleY;
            var x = prams[2] * scaleX;
            var y = prams[3] * scaleY;
            $(obj).css({
                width: w,
                height: h,
                left: x,
                top: y
            })
            return [w, h, x, y, scaleX, scaleY]

        }
       function getRect(prams) {
            //缩放比例
            var scaleX = realStage[0] / stage[0];
            var scaleY = realStage[1] / stage[1];
            var w = prams[0] * scaleX;
            var h = prams[1] * scaleY;
            var x = prams[2] * scaleX;
            var y = prams[3] * scaleY;
            return [w, h, x, y]
        }
        return {
            go: go,
            stop: stop,
            play: function(num) {
                play(num);
            }
         }

    }
return playObj
})