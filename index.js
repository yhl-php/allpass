$(document).ready(function() {
	// 创建渲染器
	var render = new Render();
});

// 首屏动画渲染器
var Render = function() {
	this.init();
};
Render.prototype = {
	last_scroll: 0, // 最后滚动高度
	updateRule: {}, // 更新规则
	groundHeight: 0, // 地面高度
	headerStatus: "absolute", // 顶部栏位置状态
	section2Show: false, // 第二屏显示标记
	section3Show: false, // 第三屏显示标记
	section4Show: false, // 第四屏显示标记
	imgList: {
		"ground": "ground",
		"cloud1": "cloud1",
		"cloud2": "cloud2",
		"grass1": "grass1",
		"grass2": "grass2",
		"mountain1": "mountain1",
		"mountain2": "mountain2",
		"column1": "column1",
		"column2": "column2",
		"column3": "column3",
		"column4": "column4",
		"tree1": "tree1",
		"tree2": "tree2",
		"leaf1": "leaf1",
		"leaf2": "leaf2",
		"leaf3": "leaf3",
		"leaf4": "leaf4",
		"flower1": ["flower1_1", "flower1_2"],
		"flower2": ["flower2_1", "flower2_2"],
		"flower3": ["flower3_1", "flower3_2", "flower3_3"],
		"rock": "rock",
		"dinosaur1": "dinosaur1",
		"dinosaur2": "dinosaur2"
	}, // 图片素材列表
	totalImg: 22, // 总图片数
	imgLoaded: 0, // 已加载图片数

	// 初始化
	init: function() {
		this.groundHeight = window.innerWidth * 0.0667 * 0.8;
		this.setScroll();
		this.setUpdate();
		this.setImgOnload();
	},

	// 设置图片加载完成事件
	setImgOnload: function() {
		var self = this;
		for (var index in this.imgList) {
			var img = new Image();
			img.obj = this.imgList[index];
			img.onload = function() {
				// 根据类型做不同操作
				if (this.obj == "ground") {
					$("#"+this.obj).css("opacity", "1");
					self.update();
				} else if (this.obj == "rock") { // 岩石
					$(".rock-container img").css("opacity", "1");
				} else if (this.obj instanceof Array) { // obj是数组，例如 白色的花
					for (var obj_index in this.obj) {
						$("#"+this.obj[obj_index]).css("opacity", "1");
					}
				} else { // 其他
					$("#"+this.obj).css("opacity", "1");
				}
				// 加载完成后更新视图
				if (++self.imgLoaded == self.totalImg) self.update();
			}
			img.src = "http://24haowan-cdn.shanyougame.com/public/images/web/animation/"+index+".png";
		}
	},
	
	// 设置滚动事件
	setScroll: function() {
		var self = this;

		// 窗口调整大小事件
		window.onresize = function() {
			self.update();
		}
	},

	// 设置更新方式
	setUpdate: function() {
		var self = this;

		// 字体大小
		// var html = $("html")
		// this.updateRule.html = {
		// 	obj: html,
		// 	action: function(obj) {
		// 		if (window.innerWidth >= 1024) obj.css("font-size", 62.5*window.innerWidth/1366+"%");
		// 	}
		// }

		// 地面
		this.updateRule.ground = {
			obj: this,
			action: function(obj) {
				obj.groundHeight = $("#ground").height() * 0.8;
			}
		}

		// 其他动画元素
		var grass1 = $("#grass1");
		var grass2 = $("#grass2");
		var mountain1 = $("#mountain1");
		var mountain2 = $("#mountain2");
		var column1 = $("#column1");
		var column2 = $("#column2");
		var column3 = $("#column3");
		var column4 = $("#column4");
		var tree1 = $("#tree1");
		var tree2 = $("#tree2");
		var leaf1 = $("#leaf1");
		var leaf2 = $("#leaf2");
		var leaf3 = $("#leaf3");
		var leaf4 = $("#leaf4");
		var flower1_1 = $("#flower1_1");
		var flower1_2 = $("#flower1_2");
		var flower2_1 = $("#flower2_1");
		var flower2_2 = $("#flower2_2");
		var flower3_1 = $("#flower3_1");
		var flower3_2 = $("#flower3_2");
		var flower3_3 = $("#flower3_3");
		var rock1 = $("#rock1");
		var rock2 = $("#rock2");
		var rock3 = $("#rock3");
		var rock4 = $("#rock4");
		var rock5 = $("#rock5");
		var dinosaur1 = $("#dinosaur1");
		var dinosaur2 = $("#dinosaur2");
		this.updateRule.grass1 = {
			obj: [
				grass1, grass2,
				mountain1, mountain2,
				column1, column2, column3, column4,
				tree1, tree2,
				leaf1, leaf2, leaf3, leaf4,
				flower1_1, flower1_2, flower2_1, flower2_2, flower3_1, flower3_2, flower3_3,
				rock1, rock2, rock3, rock4, rock5,
				dinosaur1, dinosaur2
			],
			action: function(obj) {
				obj.css("bottom", self.groundHeight+"px");
			}
		}
		this.update();
	},

	// 更新视图
	update: function() {
		for (var index in this.updateRule) {
			var obj = this.updateRule[index].obj; // 更新对象
			var action = this.updateRule[index].action; // 更新操作
			if (obj instanceof Array) {
				for(var i in obj) {
					action(obj[i]);
				}
			} else {
				action(obj);
			}
		}
	}
};