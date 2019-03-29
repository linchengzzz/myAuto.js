launch("com.jm.video");
// 启动后 冷却5s
sleep(5000);

// 设置定时器
var timer = null;

function loop() {
    var delayTime = 10000;
    timer = setInterval(() => {
        delayTime = random(10000, 20000);
        // 设置随机开始和结束的位置
        var x1 = random(300, 1200)
        var y1 = random(2000, 2500)
        var x2 = random(300, 1200)
        var y2 = random(500, 1000)
        var time = random(300, 800)
        // 滑动
        swipe(x1, y1, x2, y2, time)
    }, delayTime);
}

var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="90" h="40" bg="#77ffffff" />
    </frame>
);

setInterval(() => {}, 1000);

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x), windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});

function onClick() {
    if (window.action.getText() == '开始运行') {
        loop();
        window.action.setText('停止运行');
    } else {
        if (timer) {
            clearInterval(timer);
        }
        window.action.setText('开始运行');
    }
}
