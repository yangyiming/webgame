(function(){
	var bg = document.getElementById('loaddingBg');
	var loaddingDiv = document.getElementById('loadding');
	var progressNum  = document.getElementById('loaddingNum');
	var index = 0;
	var total = 0;
	var clearTime;
	var staticObj = null;
	init();
	function init(){
		// var urlID = document.getElementById('urlID').value;
        // var website = 'http://' + '192.168.44.143:8090/lsptJcLl/getLsptJcLlDetail?llId=' + urlID;
        // var website = 'http://192.168.66.92:8080/data.json';

  //       var location = window.parent.location;
  //       var port = location.host;
  //       var urlStr = location.search;
  //       var contentJtId = '?' + urlStr.match(/(contentJtId=)([0-9]+)/g).join('').replace('contentJtId','llId');
  //       var urlPara =urlStr.match(/(lsptJcLlDetail=)(.*)(\&)*/g).join('').replace('lsptJcLlDetail=','').replace(/(%2F)/g,'/');
  //       var website =  "http://" + port + urlPara + contentJtId;
        
		// ajax(website,function(staticData){
			ajax('js/lib/static.json',function(staticData){
				ajax('js/lib/animate.json',function(data){
				    parent.animate = JSON.parse(data);
					var ie = iev();
					staticObj = JSON.parse(staticData);
					//获取静态资源总字节数
					total = getFileSize(staticObj);
					//获取css加载字节数
					//获取JS加载字节数
					//获取image记载字节数
					loadFile(staticObj)
				});
			});
		// });
	}
	function changeBye(index){
		if(index>=100){
			index = 100;
			if(progressNum.length <= 0){
				return
			}
			progressNum.innerText = index
			remove(loaddingDiv);
			remove(bg);
			console.clear();
			addScript();
		}else{
			progressNum.innerText = index
		}
	}
	function remove(dom){
		try{
			dom.parentNode.removeChild(dom);
		}catch(e){
			dom.remove()
		}
	}
	//文件完成载入工作以后 添加JS执行入口
	function addScript(){
		// script src="js/lib/require.js" defer async="true" data-main="js/index.js"></script>
		 var script = document.createElement('script');
		 script.src="js/lib/require.js";
		 script.setAttribute("data-main", "js/index.js");
		 parent.document.body.appendChild(script);

		 var loaddingInterval = setInterval(function(){
		 	if(parent.start){
		 		clearInterval(loaddingInterval);
			 	parent.document.getElementById('loadding').style.display="none";
			 	parent.document.getElementById('main').style.display="block";
			 	clearInterval(loaddingInterval)
		 	}
		 },10)
			
	}
	function imageLoad(url,obj){
		var img = new Image();
		img.onload = function(){
			index+=Math.ceil(parseInt(obj.size)/total*100)
			changeBye(index)
		}
		img.src = url;
	}

	function getFileSize(list){
		var size=0
		for(var x in list){
			var objs = list[x]
			for(var y = 0;y<objs.length;y++){
				size+= parseFloat(objs[y]['size']);
				
			}
		}
		return size
	}

	//开始加载文件 并记录字节数
	function loadFile(list){
		var size=0
		for(var x in list){
			var objs = list[x]
			for(var y = 0;y<objs.length;y++){
				(function(x,y,objs){
					var url = objs[y]['path'];
					var size = parseInt(objs[y]['size']);
					if(x == 'js'){
						loadScript(url,'script',objs[y]);
					}
					if(x == 'css'){
						loadScript(url,'link',objs[y]);
					}
					if(x == 'image'){
						imageLoad(url,objs[y]);
					}
				})(x,y,objs)
				
			}
		}
		return size
	}

	function ajax(url,callback){  
		var http;  
		if(window.XMLHttpRequest){  
		    http = new XMLHttpRequest();  
		}else if(window.ActiveXObject){  
		    http = new window.ActiveXObject();  
		}else{  
		    alert("请升级至最新版本的浏览器");  
		}  
		if(http !=null){  
		    http.open("GET",url,true);  
		    http.send(null);  
		    http.onreadystatechange=function(){  
		        if(http.readyState==4&&http.status==200){  
		        	callback(http.responseText);
		            // var obj = JSON.parse(test.responseText);  
		        }else{
		        	console.log(http.status);
		        }
		    }
		  
		}  
	}  
	//动态css js请求
		function loadScript(url,type,obj) {
			  var script = document.createElement(type);
			    if (script.readyState) {
			      script.onreadystatechange = function () {
			        if (script.readyState == "loaded" || script.readyState == "complete") {
			          script.onreadystatechange = null;
			          index+=Math.ceil(parseInt(obj.size)/total*100)
					  changeBye(index)
			        }
			      }
			    } else {
			      script.onload = function () {
			        index+=Math.ceil(parseInt(obj.size)/total*100);
					changeBye(index);
			      }
			    }
			  if(type=='link'){
			  	 script.href = url;
			  }else{
			  	 script.src = url;
			  }
			  document.body.appendChild(script);
		}

		
	//判断ie浏览器版本
	function iev(){
		var browser=navigator.appName 
		var b_version=navigator.appVersion 
		var version=b_version.split(";"); 
		var trim_Version=version[1].replace(/[ ]/g,""); 
		if(browser=="Microsoft Internet Explorer") { 
			return parseInt(trim_Version)
		} 
	}
	function myDOMReady(fn){
    //判断如果支持addEc=ventListener（非IE--IE支持的是attachEvent）则绑定DOMContentLoaded事件
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",fn,false);
    }else{
        IEContenLoaded(fn);
    }

    //IE下模拟DOMContentLoaded
    function IEContenLoaded(fn){
        var done = false;
        //只执行一次用户的回调函数init
        var init = function(){
            if(!done){
                done = true;
                fn();
            }
        }

        (function(){
            try{
                //DOM树未创建完之前调用doScroll会抛出错误
                window.document.documentElement.doScroll("left");
            }catch(error){
                //延迟再执行，arguments.callee调用自己
                setTimeout(argument.callee,1);
                return;
            }
            //没有错误表示DOM树创建完毕，执行用户回调
            init();
        })();

        //监听document的加载状态
        window.document.onreadystatechange = function(){
            //如果用户是在DOMReady之后调用的函数立即执行用户回调
            if(window.document.readyState == 'complete'){
                window.document.onreadystatechange=null;
                init();
            }
        }
    }
}

function myDOMReady(fn){
    //判断如果支持addEc=ventListener（非IE--IE支持的是attachEvent）则绑定DOMContentLoaded事件
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",fn,false);
    }else{
        IEContenLoaded(fn);
    }

    //IE下模拟DOMContentLoaded
    function IEContenLoaded(fn){
        var done = false;
        //只执行一次用户的回调函数init
        var init = function(){
            if(!done){
                done = true;
                fn();
            }
        }

        (function(){
            try{
                //DOM树未创建完之前调用doScroll会抛出错误
                window.document.documentElement.doScroll("left");
            }catch(error){
                //延迟再执行，arguments.callee调用自己
                setTimeout(argument.callee,1);
                return;
            }
            //没有错误表示DOM树创建完毕，执行用户回调
            init();
        })();

        //监听document的加载状态
        window.document.onreadystatechange = function(){
            //如果用户是在DOMReady之后调用的函数立即执行用户回调
            if(window.document.readyState == 'complete'){
                window.document.onreadystatechange=null;
                init();
            }
        }
    }
}

})()