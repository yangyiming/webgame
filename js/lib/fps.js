define(function() {

    function fps() {
        var requestAnimationFrame =
            window.requestAnimationFrame || //Chromium  
            window.webkitRequestAnimationFrame || //Webkit 
            window.mozRequestAnimationFrame || //Mozilla Geko 
            window.oRequestAnimationFrame || //Opera Presto 
            window.msRequestAnimationFrame || //IE Trident? 
            function(callback) { //Fallback function 
                window.setTimeout(callback, 1000 / 60);
            };
        var e, pe, pid, fps, last, offset, step, appendFps;

        fps = 0;
        last = new Date().getTime();
        step = function(callback) {
            offset = new Date().getTime() - last;
            fps += 1;
            callback(offset);
            if (offset >= 1000) {
                last += offset;
                appendFps(fps);
                fps = 0;
            }
            requestAnimationFrame(function() { step(callback) });
        };
        //显示fps; 如果未指定元素id，默认<body>标签 
        appendFps = function(fps) {
            if (!e) e = document.createElement('span');
            e.className="fps";
            pe = pid ? document.getElementById(pid) : document.getElementsByTagName('body')[0];
            e.innerHTML = "FPS: " + fps;
            pe.appendChild(e);
        }
        return {
            setParentElementId: function(id) { pid = id; },
            go: function(callback) { step(callback); }
        }

    }
    return fps;
})