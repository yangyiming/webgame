  var fs = require('fs')

var path = {js:"../js",image:"../image",css:"../css"};
//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function geFileList(path)
{
   var filesList = [];
   readFile(path,filesList);
   return filesList;
}

//遍历读取文件
function readFile(path,filesList)
{
   files = fs.readdirSync(path);//需要用到同步读取
   files.forEach(walk);
   function walk(file)
   {  
        states = fs.statSync(path+'/'+file);         
        if(states.isDirectory())
        {
            readFile(path+'/'+file,filesList);
        }
        else
        {   
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path+'/'+file; //文件绝对路径
            filesList.push(obj);
        }     
    }
}

//写入文件utf-8格式
function writeFile(fileName,data)
{  
  fs.writeFile(fileName,data,'utf-8',complete);
  function complete()
  {
     console.log("文件生成成功");
  } 
}

var str = "{"
var index = 0
for(x in path){
  index++
  if(index==3){
    var temp="\r\n\""+x+"\":"+writeFileList(path[x])+"";
  }else{
    var temp="\r\n\""+x+"\":"+writeFileList(path[x])+",";
  }
  
  str+=temp;
}
str += "}"

function writeFileList(path){
    var filesList = geFileList(path);
  filesList.sort(sortHandler);
  function sortHandler(a,b)
  {
    if(a.size > b.size)
     return -1;
    else if(a.size < b.size) return 1
     return 0;
  }
  var str='[';
  var index = 0;
  for(var i=0;i<filesList.length;i++)
  {
     var item = filesList[i];
     if(i == filesList.length-1){
        var douhao = ''
     }else{
      var douhao = ','
     }
     if(item.name=='loadding.js' || item.name=='require.js'){
      continue;
     }
     var desc ="\r\n{\r\n\"file\":\""+item.name + "\",\r\n"
          +"\"size\":\""+Math.ceil(item.size/1024) +"KB\",\r\n"
          +"\"path\":\""+item.path.replace("../",'')+""+"\"}"+douhao+"\r\n";
     str+=desc 
  }
  str+="]"
  return str
}

writeFile("../js/lib/static.json",str);