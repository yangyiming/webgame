define(function() {

    //获取题目数据
    function questionObj() {
        // var siteID = $("#siteID").val();
        // var website = 'http://' + '192.168.44.143:8090/lsptJcLl/getLsptJcLlDetail?llId=' + siteID;
        // var website = 'http://192.168.66.92:8080/data.json';
        var port = window.location.host;
        var urlStr = window.location.search;
        var contentJtId = '?' + urlStr.match(/(contentJtId=)([0-9]+)/g).join('').replace('contentJtId','llId');
        var urlPara =urlStr.match(/(lsptJcLlDetail=)(.*)(\&)*/g).join('').replace('lsptJcLlDetail=','').replace(/(%2F)/g,'/');
        var website = "http://" + port + urlPara + contentJtId;

        var jsonData = {};
        $.ajax({
            url: website,
            type: 'get',
            async: false,
            dataType: 'json',
            success: function (data) {
                var subject = data.data.lsptQuestionList[0].lsptJcLl.topicContent.replace(/(&nbsp;)/g,'');
                var answer = data.data.lsptQuestionList[0].lsptJcLlItemList;
                var answerNum = answer.length;
                var answerList = {};
                for(var i=0;i<answerNum;i++) {
                    var item = 'item' + i;
                    answerList[item] = answer[i].itemContent;
                }
                jsonData = {
                    subject: subject,
                    answerContent: answerList
                };
            }
        });
        return jsonData;
    }

    return questionObj;
});
