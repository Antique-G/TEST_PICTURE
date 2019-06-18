window.onload = function(){
	var main = document.getElementsByClassName("main1")[0];
	var oUl = document.getElementsByClassName("ul")[0];
	var oliImgs = oUl.getElementsByTagName("li");
	var oOl = document.getElementsByTagName("ol")[0];
	var olis = oOl.getElementsByTagName("li");
	var prev = document.getElementsByClassName("prev")[0];
	var next = document.getElementsByClassName("next")[0];
	var num = 0;
	var timer = null;
	timer = setInterval(function(){
		moveImg(oliImgs.length,0)
          
	},1000)
	//

	main.onmouseover = function(){
		clearInterval(timer);
	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			moveImg(oliImgs.length,0)
		},1000)
	}
	prev.onclick = function(){
		moveImg(-1,oliImgs.length-1)
	}
	next.onclick = function(){
		moveImg(oliImgs.length,0)
	}
	
	function moveImg(iTarget,value){
		if(iTarget>value){
			num++;
		}else{
			num--;
		}
		if(num===iTarget){
			num = value;
		}
		for(var i=0;i<oliImgs.length;i++){
			oliImgs[i].style.opacity =" 0";
			olis[i].className = "";
		}
		oliImgs[num].style.opacity = "1";
		olis[num].className = "active"
	}
	
		for(var i=0;i<olis.length;i++){
		olis[i].index = i;
		olis[i].onclick = function(){
			for(var j=0;j<olis.length;j++){
				olis[j].className = ""
				oliImgs[j].style.display = "none";
			}
			this.className = "active"
			oliImgs[this.index].style.display = "block";
			num = this.index;
		}
	}

/*柱状图*/
$(function(){
	var myChart = echarts.init(document.getElementById('chart'));
	var xA=[];
	var yA=[];
    myChart.setOption({
        //定义一个标题
        title:{
            text:'商品数'
        },
        legend:{
            data:['柱状图数据展示'],
            itemWidth:0
        },
        //X轴设置
        xAxis:{
            data:xA
        },
        yAxis:{
        	splitLine:{
        		lineStyle:{
        			type:'dashed'
        		}
        	}
        },
        //name=legend.data的时候才能显示图例
        series:[{
           name:'柱状图数据展示',
           type:'bar',
            data:yA,
            itemStyle:{
            	color:'#4587ef'
            }
        }]
   
    })
     $.ajax({
        type: 'POST',
        dataType:'jsonp',
        url: 'https://edu.telking.com/api/?type=week',
        success: function(data){
            var reslutData=data
            var x1=reslutData.data.xAxis;
             /*console.log(x1); */
             for(var i=0;i<x1.length;i++){
             	 xA.push(x1[i]);
             }
           /* console.log(xA);  */
            var y1=reslutData.data.series;
            for(var i=0;i<y1.length;i++){
             	 yA.push(y1[i]);
            }
            /*console.log(yA);  */
             myChart.setOption({        //加载数据图表
                xAxis: {
                    data: xA
                },
                series: [{
                    // 根据名字对应到相应的系列
                    name: '柱状图数据展示',
                    data: yA
                }]
            });
        }
    })
})  
   
    /*饼状图*/
    var myChart1 = echarts.init(document.getElementById('chart1'));
    myChart1.setOption({
    	legend:{
            data:['饼状图数据展示'],
            itemWidth:0
            
        },
    series : [
        {
            name: '饼状图数据展示',
            type: 'pie',
            radius: '55%',
            data:[
                {value:40, name:'Mon'},
                {value:35, name:'Tue'},
                {value:30, name:'Wed'},
                {value:15, name:'Thu'},
                {value:100, name:'Fri'},
                {value:55, name:'Sat'},
                {value:65, name:'Sun'},
            ]
        }
    ]
})		
					
/*曲线*/
$(function(){
	var lineChart = echarts.init(document.getElementById('chart2'));
    var xA2=[];
	var yA2=[];
    lineChart.setOption({
   		legend:{
            data:['曲线图数据展示'],
            itemWidth:0
        },
   		xAxis : {
			data:xA2
   		},
	    yAxis :{
			splitLine:{
	        	lineStyle:{
	        		type:'dashed'
	        	}
	        }
	    },
        series : [
           {
            name:'曲线图数据展示',
            type:'line',
            smooth:true,
			itemStyle: {
       	 		normal: {
       	 			color: '#669bf1',
       	 			label : {show: true}
       	 			}
         		},
         	areaStyle: {
       	 			normal: {
       	 			opacity: 0.3
       	 			}
         	},
           data: yA2
       }
   ]	
   })
   
     $.ajax({
        type: 'POST',
        dataType:'jsonp',
        url: 'https://edu.telking.com/api/?type=month',
        success: function(data){
            var reslutData=data;
            var x2=reslutData.data.xAxis;
            /* console.log(x2); */
             for(var i=0;i<x2.length;i++){
             	 xA2.push(x2[i]);
             }
           
            /*console.log(xA2);  */
            var y2=reslutData.data.series;
            for(var i=0;i<y2.length;i++){
             	 yA2.push(y2[i]);
            }
            /*console.log(yA2);  */
             lineChart.setOption({        //加载数据图表
                xAxis: {
                    data: xA2
                },
                series: [{
                    // 根据名字对应到相应的系列
                    name: '曲线图数据展示',
                    data: yA2
                }]
            });
        }
    })
})
	

}