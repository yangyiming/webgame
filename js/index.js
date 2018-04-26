//动态版本需要引入question，获取题目数据
require(['./lib/config'], function() {
    require(['conso', 'jquery', 'init', 'play', 'fps','html2canvas'], function(conso, $, supers, playObj, fps,html2canvas,questionObj) {
        supers();
        //每一帧执行的函数队列
        window.updateFunction = {};
        var pangxie1,pangxie2,pangxie3,pangxie4;

        create();
        event();

        //更新队列
        fps().go(update);

        function update() {
            for(x in updateFunction){
                updateFunction[x]();
            }
        } 


       //偏移量换算
        function getOffset(prams){
            var scaleY = realStage[1] / stage[1];
            var y = prams * scaleY;
            return y;
        }

        //事件绑定
        function event() {
            $(window).on('resize', function() {
                create();
                //textTop 值依然保存在内存中
                //需要释放updateFunction中的函数内存
                for(x in updateFunction){
                    if(x=='pangxie1'){
                        updateFunction['pangxie1'] = pangxie1.go;
                    }
                     if(x=='pangxie2'){
                         updateFunction['pangxie2'] = pangxie2.go;
                    }
                    if(x=='pangxie3'){
                        updateFunction['pangxie3'] = pangxie3.go;
                    }
                    if(x=='pangxie4'){
                        updateFunction['pangxie4'] = pangxie4.go;
                    }
                }
            })
            $(document).on('click','.pangxie,.pangxieItem',function(){

                var id = $(this)[0].id;
                var num = id.match(/\d/g)[0];
                removeUpdate(id);
                $("#pangxie"+num).find('img[animate="true"]').hide();
                $('#pangxieText'+num).hide();
                $('#pangxieText'+num).attr('isShow','false')
                $("#pangxie"+num).append('<img src="image/pangxie-right.png" width="100%" style="position:absolute;bottom:0px;"/>');
            })

            $(document).on('mouseover','.pangxie,.pangxieItem',function(){
                var id = $(this)[0].id;
                var num = id.match(/\d/g)[0];
                if(num==1){
                    updateFunction['pangxie1'] = pangxie1.go;
                }
                if(num==2){
                    updateFunction['pangxie2'] = pangxie2.go;
                }
                if(num==3){
                    updateFunction['pangxie3'] = pangxie3.go;
                }
                if(num==4){
                    updateFunction['pangxie4'] = pangxie4.go;
                }
            })
        }



        //构建界面
        function create() {
            
            //初始化题目动态数据
            // var questionJson = questionObj();
            // var subject = questionJson.subject;
            // var answerContent = questionJson.answerContent;
            // $(".subjectText").text(subject);
            // $('.pangxieItem').each(function(index) {
            //     var itemId = 'item' + index;
            //     var itemContent = answerContent[itemId];
            //     $(this).find('span').text(itemContent);
            // });

            //设置题目模板的宽高
            //题目面板的坐标
            var subjectWH = [520, 404, 460, 0];
            var react = setRect('.subject', subjectWH);

            //文字的坐标
            var subjectText = [470, 200, 486, 150];
            var react = setRect('.subjectText', subjectText,'text');

             if ($(window).width() <= 800) {
                var fontSize = '14px';
                var lineHeight = '22px';
                var textSize = '12px';
            } else {
                var fontSize = '18px'
                var lineHeight = '28px'
                var textSize = '18px';
            }

            $('.subjectText').css({
                fontSize: fontSize,
                lineHeight: lineHeight,
                display:'block'
            })

            //窗口缩放的时候 处理文字显示隐藏
             $('.pangxieItem').each(function(){
                if($(this).attr('isShow') !== 'false'){
                    $(this).show()
                }
            })
            $('.pangxieItem').css({
                fontSize: textSize
            })

            $('.pangxie').show()
            
            $('.subject').show()

           
            var pangxieText = {
                pangxieText1: [142, 60, 323, 500],
                pangxieText2: [142, 60, 541, 540],
                pangxieText3: [142, 60, 800, 560],
                pangxieText4: [142, 60, 1038, 500]
            }

            var textTop = []
            for (var x in pangxieText) {
                var obj = $('#' + x);
                var react = setRect('#' + x, pangxieText[x]);
                textTop.push(react[3])
            }

            for(var x = 1;x<5;x++){
                (function(x,textTop){
                     if(x==1){
                        var top =  textTop[x-1];
                        pangxie1 = playObj("#pangxie"+x, [322, 460],function(index){
                            textFps(index,top,x);
                        },top);
                        // updateFunction['pangxie1'] = pangxie1.go;
                     }
                     if(x==2){
                        var top =  textTop[x-1];
                        pangxie2 = playObj("#pangxie"+x, [541, 500],function(index){
                            textFps(index,top,x);
                        });
                        // updateFunction['pangxie2'] = pangxie2.go;
                     }
                     if(x==3){
                        var top =  textTop[x-1];
                        pangxie3 = playObj("#pangxie"+x, [800, 522],function(index){
                            textFps(index,top,x);
                        });
                       // updateFunction['pangxie3'] = pangxie3.go;
                     }
                     if(x==4){
                        var top =  textTop[x-1];
                        pangxie4 = playObj("#pangxie"+x, [1038, 460],function(index){
                            textFps(index,top,x);
                        });
                        // updateFunction['pangxie4'] =  pangxie4.go;
                     }
                })(x,textTop)
               
            }

            // text2image(['.subjectText']);
             
        }
        //根据物体的宽度和XY坐标 返回新的坐标和宽高
        function setRect(obj, prams,type) {
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

     


        function timer() {
            var now = new Date().getTime();
            var isStop = false;
            return function(time, callback) {
                if (Date.now() - now >= time && !isStop) {
                    callback();
                    isStop = true;
                }
            }
        }

         //螃蟹文字动画函数
           
            function textFps(index,top,x){
                 if(index==2 || index==3 || index==4 || index==5 ||index==6){
                    $('#pangxieText'+x).css({
                        top:'+='+getOffset(1)
                    })
                 }
                if(index==7 || index==8 || index==9 || index==10){
                    $('#pangxieText'+x).css({
                            top:'-='+getOffset(10)
                        })
                    }
                if(index==0){
                        $('#pangxieText'+x).css({
                            top:top+'px'
                        })
                 }
            }
       
       //移除更新对象
       
       function removeUpdate(type){
            for(var x in updateFunction){
                if(x==type){
                    delete updateFunction[x]
                }
            }
       }



       //文字转换成图片操作
       function text2image(params){
             var screenShotInterval = setInterval(function(){
                if(window.start){
                    clearInterval(screenShotInterval)
                    setTimeout(function(){
                        for(var x = 0;x<params.length;x++){
                            (function(x){
                                try{
                                    var canvas = document.createElement('canvas').getContext('2d');
                                }catch(e){
                                    console.log('不支持截图功能')
                                    return;
                                }
                                var w = $(params[x]).width();
                                var h = $(params[x]).height();
                                var clone = $(params[x]).clone();
                                clone.css('height','auto');
                                $('body').append(clone);
                                var h2 =  clone.height();   
                                clone.remove();
                                html2canvas($(params[x]), {
                                    onrendered: function(canvas) {
                                        var temp = $("<div>");
                                        var image = $("<img>");
                                        image.attr('src',canvas.toDataURL())
                                        temp.css({
                                            position:'absolute',
                                            left: $(params[x])[0].style.left,
                                            top:$(params[x])[0].style.top,
                                            textAlign:'center',
                                            width:w,
                                            height:h
                                        })
                                        image.css({
                                            maxWidth:'100%',
                                            maxHeight:'100%'
                                        })
                                        temp.append(image);
                                        // $(params[x]).hide();
                                        $('#main').append(temp);
                                    },
                                    width:w,
                                    height:h2
                                });
                            })(x)
                        }
                        
                    },1000)
                }
            },10)
       }



    });
});