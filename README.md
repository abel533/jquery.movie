# Jquery.movie.js
* * *
Jquery.movie.js是一个用来顺序执行动画的插件。

##使用方法:
* 添加动画时
    $(selector).movie(status[,speed][,'groupname']);
    ###参数说明
    - status:动画的下一个状态，和animate的参数一致
    - speed:动画的速度
    - groupname:该组动画的名字，同一组动画使用同一个名字

* 对动画进行操作时
    使用$.movie('groupname'[,method]);
    当只有一个参数groupname时，返回该组动画的状态数组
    ###method有如下几种方法：
    - play:播放 - 暂停后可以从暂停状态继续播放
    - stop:停止
    - replay:重新执行 - 播放结束后不能重新播放，使用replay可以将状态从头再次执行一遍。这里有一点需要特别注意，该动画不会记录对象的初始状态，所以replay会在当前状态的基础上继续动画。
    - clear:清空

* 默认参数
    $.movie.options - 详细内容参看源码

##作者
email:[abel533@gmail.com]
blog:[blog.csdn.net/isea533]

汉诺塔动画演示：http://tut.ap01.asw.af.cm/visual/hanoi.htm
##其他
该插件正在开发中，许多内容还不完善，如果有更好的想法或者意见可以跟我联系。
