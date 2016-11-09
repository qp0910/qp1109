$(function(){
    var banner=$(".banner a");
    var w=document.documentElement.clientWidth;
    for(i=1;i<banner.length;i++){
        banner.eq(i).css("left",w+"px")
    }
    var num=0;
    var next=0;

    function move(){
        w=document.documentElement.clientWidth;
        next++;
        if(next>=banner.length){
            next=0;
        }
        //alert(next);
        //alert(num);
        banner.css("left",w)
            banner.eq(num).css("left",0);
        banner.eq(num).animate({left:-w},2000)
            banner.eq(next).animate({left:0},2000);
        num=next;
    }
    var t=setInterval(move,3000)
})