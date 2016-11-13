$(function(){
  /*初始化 菜单的高度*/
    var clientW=$(window).width();
    var clientH=$(window).height();
    $(".son").css({
        width:clientW,
        height:clientH
    })

    $(".menu").click(function(){

      $(".son").slideToggle(200);
    })
  /*轮播图*/
  var currentNum=0;//声明现在的下标为0；
  var nextNum=0;//声明下一个的下标为0；
  var currentTime=0;//声明时间的初始值为；
  var flag=true;//开关思想将flag的初始值设为true；
  //图片部分
  function move(){
  	nextNum++;
  	if (nextNum==3){
  		nextNum=0;
  		flag=false;
  }
    $(".list:eq("+currentNum+")").animate({width:"80%",height:"80%"}).css("zIndex",0);//将现在的图片缩放
    //80%，将优先级设为最低即隐藏；
    $(".list:eq("+nextNum+")").animate({left:0},function (){
       $(".list:eq("+currentNum+")").css({
        left:"100%",width:"100%",height:"100%"
       })
       currentNum=nextNum;
       currentTime=0;
       flag=true;
    }).css("zIndex",1)
  }

   //底部按钮部分
   function move1(){
     currentTime+=50;//进度条每次变化的时间加50；
     var bili=currentTime/3000;//用变化的时间/除以预设的3秒为进度条加载的比例；
     if (bili>=1) {//当比例大于1时进度条不能再加载，若加载会超出
       bili=1;//将比例设为1；
     }
      $(".progress").eq(currentNum).css({width:bili*100+"%"})
        if(flag===false){
            $(".progress").css("width",0);
        }
   }

    var t1=setInterval(move,3000)
    var t2=setInterval(move1,50)

    $(window).focus(function(){
        t1=setInterval(move,3000);
        t2=setInterval(move1,50)
    })
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    })


     $(".btns-list").click(function(){
        nextNum=$(this).index(".btns-list");
        stop();
    })

    $(".leftBtn").click(function(){
        nextNum--
        if(nextNum==-1){
            nextNum=2;
        }
        stop();
    })
    $(".rightBtn").click(function(){
        nextNum++
        if(nextNum==3){
            nextNum=0;
        }
        stop();
    })


    function stop(){
        /*
        *  定时器停掉
        * */
        clearInterval(t1);
        clearInterval(t2);

        /*按钮的变化*/
        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").eq(nextNum).find(".progress").css("width","100%");

        /*轮播图发生变化*/
        if(nextNum>currentNum){
            $(".list:eq("+currentNum+")").animate({width:"80%",height:"80%"}).css("zIndex",0);

            $(".list:eq("+nextNum+")").animate({left:0},function(){
                $(".list:eq("+currentNum+")").css({
                    left:"100%",width:"100%",height:"100%"
                })
                currentNum=nextNum;

            }).css("zIndex",1)
        }else{
            $(".list:eq("+currentNum+")").animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(nextNum).css({
                width:"80%",height:"80%",left:0
            }).animate({width:"100%",height:"100%"},function(){
                currentNum=nextNum;
            })


        }
    }

    $(".footer span").click(function(){
      $(this).next("ul").slideToggle(200);
  });

})