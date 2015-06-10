
var data = [
	{img:1,h2:'one',h3:'Lamborghini'},
	{img:2,h2:'two',h3:'Maserati'},
	{img:3,h2:'three',h3:'Ferrari'},
	{img:4,h2:'four',h3:'Citroen gt '},
	{img:5,h2:'five',h3:'Lamborghini'},
	{img:6,h2:'six',h3:'Huayra'}
];
// 定义一个通用函数
var g = function (id){
	if(id.substr(0,1) == '.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}
//添加幻灯片的操作（所有幻灯片和对应的按钮）
function addSliders(){
	//获取模板
	var tpl_main = g('template_main').innerHTML
					.replace(/^\s*/,'')
					.replace(/\s*$/,'');
	var tpl_ctrl = g('template_ctrl').innerHTML
					.replace(/^\s*/,'')
					.replace(/\s*$/,'');
	//定义变量 最终要输出的HTML变量
	var out_main = [];
	var out_ctrl = [];
	//遍历所有数据，构建最终输出的HTML
	for(i in data){
		var _html_main = tpl_main
					.replace(/{{index}}/g,data[i].img)
					.replace(/{{h2}}/g,data[i].h2)
					.replace(/{{h3}}/g,data[i].h3)
					.replace(/{{css}}/g,['','main-i_right'][i%2]);
		var _html_ctrl = tpl_ctrl
					.replace(/{{index}}/g,data[i].img);
		out_main.push( _html_main);
		out_ctrl.push( _html_ctrl);
	}
	//把HTML回写到DOM里面
	g('template_main').innerHTML = out_main.join('');
	g('template_ctrl').innerHTML = out_ctrl.join('');
	g('template_main').innerHTML += tpl_main
					.replace(/{{index}}/g,'{{index}}')
					.replace(/{{h2}}/g,data[i].h2)
					.replace(/{{h3}}/g,data[i].h3);
	g('main_{{index}}').id = 'main_background';
}
//幻灯片切换
function switchSlider(n){
// 获得要展现的幻灯片和控制按钮 DOM
	var main = g('main_'+n);
	var ctrl = g('ctrl_'+n);
	//获得所有的幻灯片以及控制按钮
	var clear_main = g('.main-i');
	var clear_ctrl = g('.ctrl-i');
	//清除他们的样式
	for(var i = 0;i<clear_ctrl.length;i++){
		clear_main[i].className = clear_main[i].className.replace(' main-i_active ','');
		clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active ','');
	}
	//添加样式
	main.className += ' main-i_active ';
	ctrl.className += ' ctrl-i_active ';
	//幻灯片在切换时复制上一张main_background;
	setTimeout(function(){
	g('main_background').innerHTML = main.innerHTML;
	},1000)
}
//动态调整图片的margin-top 时期垂直居中
// function movePictures(){
// 	var pictures = g('.picture');
// 	for(var i=0;i<pictures.length;i++){
// 		pictures[i].style.marginTop = (-1*pictures[i].clientHeight/2)+'px';
// 	}
// }

// 定义合适处理幻灯片输出
window.onload = function(){
	addSliders();
	switchSlider(1);
	// setTimeout(function(){
	// 	movePictures();
	// },100)
}