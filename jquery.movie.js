;(function($){
	$.movie = function(tag,method,options){
        var movieArr = undefined;
        if(tag in $.movie.tags){
            movieArr = $.movie.tags[tag];    
        }
        else{
            return movieArr;
        }
        //取出tag对应的对象
        if(method!=undefined){
            if(method in $.movie.methods){
                var fun = $.movie.methods[method];
                options = {}||options;
                //执行方法
                return fun.call(movieArr,options);
            }
            throw $.movie.options.errmsg[2];
        }
        else{
           return movieArr;
        }
    }

    $.movie.tags = {};

    function _moviePlay(arr){
        return function(){
            moviePlay(arr);    
        }    
    }

    function moviePlay(arr){
        if(!arr.stop&&arr.current<arr.length){
            //执行动画
            if(arr.delay>0){
                var delay = arr.delay;
                arr.delay = 0;
                setTimeout(_moviePlay(arr),delay);
            }
            else{
                var obj = arr[arr.current];
                var $elem = $(obj.elem);
                arr.isStart = true;
                $elem.animate(obj.options,obj.speed);
                arr.current++;
                setTimeout(_moviePlay(arr),obj.speed<300?obj.options.minSpeed:obj.speed);
            }
        }
        else{
            arr.isStart = false;
            if(arr.stopFun!=undefined&&$.isFunction(arr.stopFun)){
                arr.stopFun.call(arr);
            }
        }
    }

    //停止播放
    function movieStop(arr,fun){
        arr.stop = true;
        if(fun == undefined||!$.isFunction(fun)){
            arr.stopFun = function(){
                arr.stop = false;  
                arr.isStart = false;
            };    
        }
        else{
            arr.stopFun = fun;
        }
    }

	$.movie.methods = {
		'play':function(options){
            $.extend(this,options);
	        moviePlay(this);	
		},
        'stop':function(fun){
            movieStop(this,fun);
        },
        'restart':function(){
            if(this.isStart){
                 movieStop(this,function(){
                    this.stop = false;
                    this.isStart = false;
                    this.current = 0;
                });     
            }
            this.current = 0;
            moviePlay(this);
        },
		'clear':function(){
		    movieStop(this,function(arr){
                arr.length = 0;
                delete $.movie.tags[arr.name];
            });
		}
	};
	
	$.movie.options = {
		//default options
		minSpeed:300,   //两个动画之间的最小间隔时间...大于间隔时间时，使用动画本身的间隔时间
        delay:0,        //延迟
        defaultTag:'isea533',
        speed:500,
        errmsg:['参数不能为空','options参数类型错误','不存在该方法']
	}
	
	$.fn.movie = function(options,speed,tag){
        if(arguments.length==0){
            throw $.movie.options.errmsg[0]; 
        }
        else{
            if(!$.isPlainObject(arguments[0])){
                throw $.movie.options.errmsg[0]; 
            }    
        }
        var opt = $.extend({},options);
        if(arguments.length==1){
            speed = opt.speed;        
            tag = opt.defaultTag;
        }
        if(arguments.length==2){
            var arg2 = arguments[1];
            if(['slow','fast','normal'].indexOf(arg2)>-1||$.isNumeric(arg2)){
                speed = arg2;
                tag = opt.defaultTag;
            }
            else if(typeof arg2 === 'string'){
                if(arg2===opt.defaultTag){
                    opt.defaultTag+=opt.defaultTag;
                    if(arg2 in $.movie.tags){
                        $.movie.tags[opt.defaultTag] = $.movie.tags[arg2];
                        delete $movie.tags[arg2];
                    }
                }
                tag = arg2;
                speed = opt.speed;
            }
        }

		if(!(tag in $.movie.tags)){
            $.movie.tags[tag] = new Array(); 
            $.movie.tags[tag].name = tag;
            $.movie.tags[tag].isStart = false;
            $.movie.tags[tag].complete = false;
            $.movie.tags[tag].stop = false;
            $.movie.tags[tag].current = 0;
        } 
        var sel = this.selector;
        $.movie.tags[tag].push(
        {
            'elem':sel,
            'options':opt,
            'speed':speed
        }
        );
        return this;
	}
})(jQuery);
