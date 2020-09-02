function readData() { //加载json文件
    var url = "../data/MeridiansProp.json"; /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var okStatus = document.location.protocol === "file:" ? 0 : 200;
    var xhr = new XMLHttpRequest();
    xhr.open("get", url,false); /*设置请求方法与路径*/
    xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
    xhr.send(null); /*不发送数据到服务器*/
    return xhr.status === okStatus ? xhr.responseText : null;
}
var propData= JSON.parse(readData());

var jingMaiHoverProp = document.getElementById('hoverProp');
var hoverTable = document.getElementById('hoverTable');
var hoverName = document.getElementById('hoverPropJingMaiName');
var hoverLevel = document.getElementById('hoverPropJingMaiLevel');
function mOver(obj){
    var name = obj.id.slice(0,obj.id.length-5);
    var selected = document.getElementById(name+"Select");
    var index = selected.selectedIndex;
    var lever = selected[index].value;
    name += lever;
    formatPrint(propData[name]);
    setOffset(obj);
    jingMaiHoverProp.style.display = 'block';

}
function mOut(obj){
    setOffset(obj);
    jingMaiHoverProp.style.display = 'none';
}
function formatPrint(obj){
    var j = 0;
    for(var i in obj){
        if(i == "name" ){
            hoverName.innerHTML = obj[i];
            continue;
        }
        if(i == "level") {
            hoverLevel.innerHTML = obj[i]+"周天";
            continue;
        }
        hoverTable.rows[j].cells[0].innerText = charToChinese(i);
        hoverTable.rows[j].cells[1].innerText = "+" + obj[i];
        j++;
    }
}
function charToChinese(str){
    var text = "";
    switch (str){
        case "name": text = "经脉名称";break;
        case "level": text = "周天";break;
        case "zhaoJiaNaiLi": text = "招架耐力";break;
        case "neiGongFangYu": text = "内功防御";break;
        case "gangQi": text = "罡气";break;
        case "tiPo": text = "体魄";break;
        case "qiXue": text = "气血";break;
        case "neiLi": text = "内力";break;
        case "neiGongHuaJie": text = "内功化解";break;
        case "zhaoJiaNaiLiHuiFu": text = "招架耐力回复";break;
    }
    return text;
}
function setOffset(obj){
    jingMaiHoverProp.style.left = getPosition(obj).left + obj.scrollWidth  + "px";

    jingMaiHoverProp.style.top = getPosition(obj).top + obj.scrollHeight + "px";
}
function getPosition(element){
    var dc = document,
        rec = element.getBoundingClientRect(),
        _x = rec.left, // 获取元素相对浏览器视窗window的左、上坐标
        _y = rec.top;
    // 与html或body元素的滚动距离相加就是元素相对于文档区域document的坐标位置
    _x += dc.documentElement.scrollLeft || dc.body.scrollLeft;
    _y += dc.documentElement.scrollTop || dc.body.scrollTop;
    return {
        left: _x,
        top: _y
    };
}
