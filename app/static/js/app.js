var can;
var ct;
var ox = 0, oy = 0, x = 0, y = 0;
var mf = false;

// main canvas操作
function mam_draw_init() {
    can = document.getElementById("can"); 
    can.addEventListener("touchstart", onDown, false);
    can.addEventListener("touchmove", onMove, false);
    can.addEventListener("touchend", onUp, false);
    can.addEventListener("mousedown", onMouseDown, false);
    can.addEventListener("mousemove", onMouseMove, false);
    can.addEventListener("mouseup", onMouseUp, false);
    ct = can.getContext("2d");
    ct.strokeStyle = "#000000";
    ct.lineWidth = 15;
    ct.lineJoin = "round";
    ct.lineCap = "round";
    clearCan();
}

//処理１
function onDown(event) {
    mf = true;
    ox = event.touches[0].pageX - event.target.getBoundingClientRect().left;
    oy = event.touches[0].pageY - event.target.getBoundingClientRect().top;
    event.stopPropagation();
}

//処理2
function onMove(event) {
    if (mf) {
        x = event.touches[0].pageX - event.target.getBoundingClientRect().left;
        y = event.touches[0].pageY - event.target.getBoundingClientRect().top;
        drawLine();
        ox = x;
        oy = y;
        event.preventDefault();
        event.stopPropagation();
    }
}

//処理3
function onUp(event) {
    mf = false;
    event.stopPropagation();
}

//処理4
function onMouseDown(event) {
    ox = event.clientX - event.target.getBoundingClientRect().left;
    oy = event.clientY - event.target.getBoundingClientRect().top;
    mf = true;
}

//処理5
function onMouseMove(event) {
    if (mf) {
        x = event.clientX - event.target.getBoundingClientRect().left;
        y = event.clientY - event.target.getBoundingClientRect().top;
        drawLine();
        ox = x;
        oy = y;
    }
}

//処理6
function onMouseUp(event) {
    mf = false;
}

//処理7
function drawLine() {
    ct.beginPath();
    ct.moveTo(ox, oy);
    ct.lineTo(x, y);
    ct.stroke();
}

// clear
function clearCan() {
    ct.fillStyle = "rgb(255,255,255)";
    ct.fillRect(0, 0, can.getBoundingClientRect().width, can.getBoundingClientRect().height);
}

// 画像のサーバーへのPOST
function sendImage() {
    var img = document.getElementById("can").toDataURL('image/png'); // document:htmlの全document内, getElementById:html内のidに対応, toDataURL: キャンパスをデータURIに変換(今回はpngに変換)
    img = img.replace('image/png', 'image/octet-stream'); // image/octet-stream: MIMEタイプ imageに分類されるoctet-streamなファイル
    //img = img.replace('image/png', 'application/octet-stream');
    $.ajax({
        type: "POST",
        url: "http://localhost:5000",
        data: {
            "img": img
        }
    })
    .done( (data) => {
        $('#answer').html('答えは<span class="answer">'+data['ans']+'</span>です')
    });
}
