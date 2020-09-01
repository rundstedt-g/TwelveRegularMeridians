var jingMaiHoverProp = document.getElementById('hoverProp');
var propData = readData();
jingMaiHoverProp.innerHTML = propData.kunLun216.name;

 function mOver(obj){
        jingMaiHoverProp.style.display = 'block';
 }
 function mOut(obj){
        jingMaiHoverProp.style.display = 'none';
 }

function readData() {
    var url = "../data/MeridiansProp.json"; /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var request = new XMLHttpRequest();
    request.open("get", url); /*设置请求方法与路径*/
    request.send(null); /*不发送数据到服务器*/
    request.onload = function () { /*XHR对象获取到返回信息后执行*/
        if (request.status == 200) { /*返回状态为200，即为数据获取成功*/
            var json = JSON.parse(request.responseText); /*通过 JSON.parse() 解析数据，这些数据会成为 JavaScript 对象。*/
            return json;
        }
    }
}