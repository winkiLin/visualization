$(function(){
    let dragDiv = document.getElementsByClassName('boxall')
// 容器
let container = null
var first_index = ''
var first_con = ''
for (let i = 0; i < dragDiv.length; i++) {
    //当开始拖动的时候，用容器保存 
    dragDiv[i].ondragstart = function(){
        first_index = $(this).index()
        first_con = $(this).parent()
        container = this
    }
    // 默认当你dragover,会阻止drag操作，所以需要阻止
    dragDiv[i].ondragover = function(){
        event.preventDefault();
    }
    // 当拖动结束的时候，给拖动div所在位置下面的div做drag操作
    dragDiv[i].ondrop = function(){
        if(container != null && container != this){
            if($(this).attr('id') == 'spec') return
            $(this).replaceWith(container)
            var l =  first_con.children().length
            // 最后一个盒子、插入一个盒子，供before使用
            if(l == first_index){
              first_con.append('<div class="temp"></div>')
            }
            first_con.children().eq(first_index).before(this)
            // $(this).css({"background":"red"})
            // $(container).css({"background":"green"})
            // this 盒子重绘
            $(this).children().each(function(){
              if($(this).attr('id')){
                var Charts = echarts.init(document.getElementById($(this).attr('id')));
                Charts.resize()
              }
            })
            // container 盒子重绘
            $(container).children().each(function(){
              if($(this).attr('id')){
                var Charts = echarts.init(document.getElementById($(this).attr('id')));
                Charts.resize()
              }
            })
         }
    }

}

})