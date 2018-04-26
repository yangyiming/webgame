	

(function(){
	var getDataURL = function (url,type,callback) {
	  	var image = new Image();
	  	image.setAttribute('crossOrigin','anonymous');
	  	image.onload =function(){
	  		var retCanvas = document.createElement('canvas');
	        var retCtx = retCanvas.getContext('2d');
	        retCanvas.width = image.width;
	        retCanvas.height = image.height;
	        retCtx.drawImage(image, 0, 0,image.width,image.height);
	        var imageData = retCanvas.toDataURL(type)
	        callback(imageData)
	  	}
	  	image.src= url;   

    }




		/**
		 * 获取mimeType
		 * @param  {String} type the old mime-type
		 * @return the new mime-type
		 */
		var _fixType = function(type) {
		    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
		    var r = type.match(/png|jpeg|bmp|gif/)[0];
		    return 'image/' + r;
		};
		   
	
		/**
		 * 在本地进行文件保存
		 * @param  {String} data     要保存到本地的图片数据
		 * @param  {String} filename 文件名
		 */
		var saveFile = function(data, filename){
		    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		    save_link.href = data;
		    save_link.download = filename;
		   
		    var event = document.createEvent('MouseEvents');
		    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		    save_link.dispatchEvent(event);
		};




		
	window.saveImage = function(imageData,type){
			// 加工image data，替换mime type
			imgData = imageData.replace(_fixType(type),'image/octet-stream');
			// 下载后的问题名
			var filename = 'baidufe_' + (new Date()).getTime() + '.' + type;
			// download
			saveFile(imgData,filename);
	
	}
})()


