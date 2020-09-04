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
    var level = selected[index].value;
    name += level;
    formatPrint(propData[name]);
    setOffset(obj);
    jingMaiHoverProp.style.display = 'block';

}
function mOut(obj){
    jingMaiHoverProp.style.display = 'none';
}
function formatPrint(obj){
    var length = Object.getOwnPropertyNames(obj).length-2;
    var rowLength = hoverTable.rows.length;
    while (length != rowLength){
        if(length > rowLength){
            var newtr=document.createElement("tr");
            var newtd1=document.createElement("td");
            var newtd2=document.createElement("td");
            hoverTable.appendChild(newtr);
            newtr.appendChild(newtd1);
            newtr.appendChild(newtd2);
            rowLength++;
        }
        else if(length < rowLength){
            hoverTable.removeChild(hoverTable.lastElementChild);
            rowLength--;
        }
    }
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
        case "biLi": text = "臂力";break;
        case "neiXi": text = "内息";break;
        case "gangQi": text = "罡气";break;
        case "shenFa": text = "身法";break;
        case "tiPo": text = "体魄";break;
        case "qiXue": text = "气血";break;
        case "qiXueFuJia": text = "气血";break;
        case "qiXueHuiFu": text = "气血回复";break;
        case "qiXueHuiFuJianGeSuoDuan": text = "气血回复间隔缩短(%)";break;
        case "neiLi": text = "内力";break;
        case "neiLiFuJia": text = "内力";break;
        case "neiLiHuiFu": text = "内力回复";break;
        case "neiLiHuiFuJianGeSuoDuan": text = "内力回复间隔缩短(%)";break;
        case "jinShenWeiLi": text = "近身威力";break;
        case "yuanChengWeiLi": text = "远程威力";break;
        case "waiGongBaoJiZhi": text = "外功暴击值";break;
        case "waiGongMingZhongZhi": text = "外功命中值";break;
        case "waiGongBaoJiShangHai": text = "外功暴击伤害(%)";break;
        case "waiGongMingZhongLv": text = "外功命中率(%)";break;
        case "neiGongWeiLi": text = "内功威力";break;
        case "neiGongBaoJiZhi": text = "内功暴击值";break;
        case "neiGongMingZhongZhi": text = "内功命中值";break;
        case "neiGongBaoJiShangHai": text = "内功暴击伤害(%)";break;
        case "neiGongMingZhongLv": text = "内功命中率(%)";break;
        case "huShiNeiGongFangYu": text = "忽视内功防御";break;
        case "huShiNeiGongHuaJie": text = "忽视内功化解";break;
        case "duoShanZhi": text = "躲闪值";break;
        case "fengJin": text = "封劲";break;
        case "zhaoJiaNaiLi": text = "招架耐力";break;
        case "zhaoJiaNaiLiHuiFu": text = "招架耐力回复";break;
        case "shouDaoBaoJiShangHaiJiangDi": text = "受到暴击伤害降低(%)";break;
        case "beiBaoJiJiLvJiangDi": text = "被暴击几率降低(%)";break;
        case "neiGongHuaJie": text = "内功化解";break;
        case "yinFangYu": text = "阴防御";break;
        case "rouFangYu": text = "柔防御";break;
        case "yangFangYu": text = "阳防御";break;
        case "gangFangYu": text = "刚防御";break;
        case "neiGongFangYu": text = "内功防御";break;
    }
    return text;
}
function setOffset(obj){
    var w = document.body.scrollWidth - (getPosition(obj).left + obj.scrollWidth + document.body.scrollWidth*0.38);
    var h = document.body.scrollHeight - (getPosition(obj).top + obj.scrollHeight + document.body.scrollHeight*0.38);
    if(w < 0){
        jingMaiHoverProp.style.left = getPosition(obj).left + obj.scrollWidth + w -5 + "px";
    }else {
        jingMaiHoverProp.style.left = getPosition(obj).left + obj.scrollWidth + "px";
    }

    if(h < 0){
        jingMaiHoverProp.style.top = getPosition(obj).top + obj.scrollHeight + h - 5 + "px";
    }else{
        jingMaiHoverProp.style.top = getPosition(obj).top + obj.scrollHeight + "px";
    }
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

function checkBox(obj){
    var objs = document.getElementsByName("jingMai");
    var n = 0;
    for(var i=0; i<objs.length; i++) {
        if(objs[i].checked){
            n++;
        }
    }
    if(n>8){
        obj.checked = false;
        n--;
        alert("最多可激活8条");
    }
    else if(obj.id == "yinQiaoMai" || obj.id == "yangQiaoMai"){
        if(obj.id == "yinQiaoMai" && document.getElementById('yinQiaoMaiYin').checked == true ){
            obj.checked = false;
            n--;
            alert("[阴跷脉]与[阴跷脉·隐]无法同时激活");
        }
        else if(obj.id == "yangQiaoMai" && document.getElementById('yangQiaoMaiYin').checked == true){
            obj.checked = false;
            n--;
            alert("[阳跷脉]与[阳跷脉·隐]无法同时激活");
        }
    }
    else if(obj.id == "yinQiaoMaiYin" || obj.id == "yangQiaoMaiYin"){
        if(obj.id == "yinQiaoMaiYin" && document.getElementById('yinQiaoMai').checked == true ) {
            obj.checked = false;
            n--;
            alert("[阴跷脉·隐]与[阴跷脉]无法同时激活");
        }
        else if(obj.id == "yangQiaoMaiYin" && document.getElementById('yangQiaoMai').checked == true){
            obj.checked = false;
            n--;
            alert("[阳跷脉·隐]与[阳跷脉]无法同时激活");
        }
    }
    document.getElementById("count").innerText = n;
}

var propList = {
    biLi: 0,
    neiXi: 0,
    gangQi: 0,
    shenFa: 0,
    tiPo: 0,
    qiXue: 0,
    qiXueHuiFu: 0,
    qiXueHuiFuJianGeSuoDuan: 0,
    neiLi: 0,
    neiLiHuiFu: 0,
    neiLiHuiFuJianGeSuoDuan: 0,
    jinShenWeiLi: 0,
    yuanChengWeiLi: 0,
    waiGongBaoJiZhi: 0,
    waiGongMingZhongZhi: 0,
    waiGongBaoJiShangHai: 0,
    waiGongMingZhongLv: 0,
    neiGongWeiLi: 0,
    neiGongBaoJiZhi: 0,
    neiGongMingZhongZhi: 0,
    neiGongBaoJiShangHai: 0,
    neiGongMingZhongLv: 0,
    huShiNeiGongFangYu: 0,
    huShiNeiGongHuaJie: 0,
    duoShanZhi: 0,
    fengJin: 0,
    zhaoJiaNaiLi: 0,
    zhaoJiaNaiLiHuiFu: 0,
    shouDaoBaoJiShangHaiJiangDi: 0,
    beiBaoJiJiLvJiangDi: 0,
    neiGongHuaJie: 0,
    yinFangYu: 0,
    rouFangYu: 0,
    yangFangYu: 0,
    gangFangYu: 0,
    neiGongFangYu: 0
}

function sum(){
    var objs = document.getElementsByName("jingMai");
    var objsSelect = [];
    var selectedSet = [];
    for(var i=0; i<objs.length; i++) {
        if(objs[i].checked){
            objsSelect.push(objs[i]);
        }
    }
    for(var i=0; i<objsSelect.length; i++){
        var name = objsSelect[i].id;
        var selected = document.getElementById(name+"Select");
        var index = selected.selectedIndex;
        var level = selected[index].value;
        name += level;
        selectedSet.push(propData[name]);
    }
    for(var i=0; i<selectedSet.length; i++){
        for(var j in selectedSet[i]){
            if(j=="name" || j=="level"){
                continue;
            }
            if(j=="neiLiFuJia"){
                propList["neiLi"] += selectedSet[i][j];
            }
            if(j=="qiXueFuJia"){
                propList["qiXue"] += selectedSet[i][j];
            }
            propList[j] += selectedSet[i][j];
        }
    }

}
function sumJingMai(){

}