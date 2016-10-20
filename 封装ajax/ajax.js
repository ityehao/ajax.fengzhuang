/*
 * 我们使用了ajax 的xmlHttpRequest 跟服务器进行交互。
 *
 * 交互了有四个基本步骤
 * 1：创建对象
 * 2：建立连接
 * 3：发送请求
 * 4：接收数据
 *
 *  这些操作特别繁琐，一个页面有很多地方都发送ajax 请求。
 *  这里面我们就使用了一个jQuery 的框架，它提供了一些方法
 *  让我们来发送ajax 请求。 我模拟jQuery 封装一个方法出来
 *  我们以后用我们自己的方法来发送ajax 请求。
/*
 *  $.ajax({
 *      url:"",
 *      type:""
 *      data:"",
 *      success:function(){
 *      }
 *  });
 * */
var $={
    /*
     * 进来一个对象，出来一个字符串。
     * username=zhangsan&age=11
     *
     * */
    params:function(obj){
        var data='';

        for(var key in obj){

            data+=key+"="+obj[key]+"&"
        }
        return data.substring(0,data.length-1);
    },
    /*
     * 可以通过此方法来发送一个http 请求。
     * */
    ajax:function(obj){
        //实现这样的功能，可以用来发送请求。

        //接收用户传递的数据.
        var type=obj.type;
        var url=obj.url;
        var data=obj.data;
        var success=obj.success;
        var complete=obj.complete;
        var error=obj.error;


        //我必须创建一个XMLHttpRequest 对象。
        var xhr=new XMLHttpRequest();
        if(type=='get'){
            url=obj.url+"?"+this.params(data);
            data=null;
        }

        xhr.open(type,url);
        /*
         * post要给服务器端一个请求头
         * */
        if(type=='post'){
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            data=this.params(data);
        }
        //我在这里要进行一个判断，如果用户的请求时get
        //发送服务器的参数的数据就应该在请求的地址的后面
        //username=''&age=''
        //如果我的请求是post 请求，
        //假设get ，send(null);
        //如果是post ，send("username=zhangsan&age=11")
        xhr.send(data);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && xhr.status==200){
               var data=xhr.responseText;
                success(data);
                complete();
            }
            else if(xhr.readyState==4 && xhr.status!=200){

                error();
                //这个属于请求完成了之后调用
                complete();
            }
        }
    }

};
