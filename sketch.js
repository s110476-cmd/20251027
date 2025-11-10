let objs = [];
let colors = ['#f71735', '#f7d002', '#1A53C0', '#232323'];
let cnv;
let menuDiv;

function setup() {
  // 建立與視窗同大的畫布
  cnv = createCanvas(windowWidth, windowHeight);
  // 由於畫布已滿版，此行置中程式碼可以選擇保留或移除
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  // 將整個網頁背景設為黑色，使畫布以外的區域也為黑
  document.body.style.backgroundColor = '#000';

  // 建立固定在整個視窗左側的選單（HTML + CSS）
  const css = `
    /* 建立一個感應區塊，當滑鼠進入此區塊時，選單會滑出 */
    #hoverZone {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 50px; /* 設定感應區的寬度，例如 50px */
      z-index: 10002; /* 確保感應區在選單之上（但選單在畫布之上） */
    }

    #leftMenu {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 320px;
      background: rgba(10,10,10,0.95);
      color: #fff;
      padding: 40px 24px;
      box-sizing: border-box;
      font-size: 32px;
      line-height: 1.6;
      z-index: 10001;
      box-shadow: 4px 0 12px rgba(0,0,0,0.7);
      font-family: sans-serif;
      
      /* 關鍵改動：預設將選單移到左邊隱藏 */
      transform: translateX(-300px); 
      transition: transform 0.3s ease-out; /* 平滑過渡效果 */
    }
    
    /* 關鍵改動：當滑鼠懸停在 #hoverZone 上或選單本身時，選單滑出 */
    #hoverZone:hover + #leftMenu,
    #leftMenu:hover {
      transform: translateX(0);
    }

    #leftMenu a {
      color: #fff;
      text-decoration: none;
      display: block;
      cursor: pointer;
      margin: 14px 0;
    }
    #leftMenu a:hover { opacity: 0.9; }
    
    /* 避免 canvas 被選單遮蓋時仍可看到完整畫布邊界（選擇性）*/
    /* 注意：當畫布滿版時，這個樣式通常不需要，但保留以防萬一 */
    .canvas-offset { margin-left: 340px; }
  `;
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
  
  // 新增感應區 DOM
  const hoverZone = document.createElement('div');
  hoverZone.id = 'hoverZone';
  document.body.appendChild(hoverZone);

  // 建立選單 DOM
  menuDiv = document.createElement('div');
  menuDiv.id = 'leftMenu';
  menuDiv.innerHTML = `
    <a id="menu1">第一單元作品</a>
    <a id="menu2">第一單元講義</a>
    <a id="menu3">測驗系統</a>
    <a id="menu5">測驗卷筆記</a>
    <a id="menu6">作品筆記</a>
    <a id="menu4">回到首頁</a>
  `;
  document.body.appendChild(menuDiv);

  // 範例：可加上點擊事件（視需求調整）
  document.getElementById('menu1').addEventListener('click', ()=> {
    const existing = document.getElementById('iframeOverlayUnit1');
    if (existing) {
      existing.remove();
      return;
    }
    const overlay = document.createElement('div');
    overlay.id = 'iframeOverlayUnit1';
    overlay.style.position = 'fixed';
    overlay.style.left = '50%';
    overlay.style.top = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.width = '70vw';   // 70% 視窗寬度
    overlay.style.height = '85vh';  // 85% 視窗高度
    overlay.style.background = '#111';
    overlay.style.zIndex = 10003; 
    overlay.style.borderRadius = '6px';
    overlay.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
    overlay.style.overflow = 'hidden';

    overlay.innerHTML = `
      <button id="closeIframeUnit1" style="
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10004;
        font-size: 18px;
        padding: 6px 10px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background: rgba(255,255,255,0.12);
        color: #fff;
      ">關閉</button>
      <iframe src="https://s110476-cmd.github.io/2025-1020/" style="width:100%;height:100%;border:0;" allowfullscreen></iframe>
    `;
    document.body.appendChild(overlay);
    document.getElementById('closeIframeUnit1').addEventListener('click', ()=> overlay.remove());
  });
  document.getElementById('menu2').addEventListener('click', ()=> {
    const existing = document.getElementById('iframeOverlay');
    if (existing) {
      existing.remove();
      return;
    }
    const overlay = document.createElement('div');
    overlay.id = 'iframeOverlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '50%';
    overlay.style.top = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.width = '70vw';   // 70% 視窗寬度
    overlay.style.height = '85vh';  // 85% 視窗高度
    overlay.style.background = '#111';
    overlay.style.zIndex = 10003;
    overlay.style.borderRadius = '6px';
    overlay.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
    overlay.style.overflow = 'hidden';

    // 內含關閉按鈕與 iframe（改為 HackMD 網址）
    overlay.innerHTML = `
      <button id="closeIframe" style="
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10004;
        font-size: 18px;
        padding: 6px 10px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background: rgba(255,255,255,0.12);
        color: #fff;
      ">關閉</button>
      <iframe src="https://hackmd.io/@RXcou08ERlul7o47xjnHCg/H1KxP7Cilx" style="width:100%;height:100%;border:0;" allowfullscreen></iframe>
    `;
    document.body.appendChild(overlay);
    document.getElementById('closeIframe').addEventListener('click', ()=> overlay.remove());
  });
  
  // 「測驗系統」點擊事件 (menu3)
  document.getElementById('menu3').addEventListener('click', ()=> {
    const existing = document.getElementById('iframeOverlayQuiz');
    if (existing) {
      existing.remove();
      return;
    }
    const overlay = document.createElement('div');
    overlay.id = 'iframeOverlayQuiz';
    overlay.style.position = 'fixed';
    overlay.style.left = '50%';
    overlay.style.top = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.width = '70vw';
    overlay.style.height = '85vh';
    overlay.style.background = '#111';
    overlay.style.zIndex = 10003; 
    overlay.style.borderRadius = '6px';
    overlay.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
    overlay.style.overflow = 'hidden';

    overlay.innerHTML = `
      <button id="closeIframeQuiz" style="
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10004;
        font-size: 18px;
        padding: 6px 10px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background: rgba(255,255,255,0.12);
        color: #fff;
      ">關閉</button>
      <iframe src="https://s110476-cmd.github.io/2025-11-03/" style="width:100%;height:100%;border:0;" allowfullscreen></iframe>
    `;
    document.body.appendChild(overlay);
    document.getElementById('closeIframeQuiz').addEventListener('click', ()=> overlay.remove());
  });
  
  // ****** 新增「測驗卷筆記」點擊事件 (menu5) ******
  document.getElementById('menu5').addEventListener('click', ()=> {
    const existing = document.getElementById('iframeOverlayQuizNotes');
    if (existing) {
      existing.remove();
      return;
    }
    const overlay = document.createElement('div');
    overlay.id = 'iframeOverlayQuizNotes'; // 使用獨立 ID
    overlay.style.position = 'fixed';
    overlay.style.left = '50%';
    overlay.style.top = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.width = '70vw';   // 70% 視窗寬度
    overlay.style.height = '85vh';  // 85% 視窗高度
    overlay.style.background = '#111';
    overlay.style.zIndex = 10003; 
    overlay.style.borderRadius = '6px';
    overlay.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
    overlay.style.overflow = 'hidden';

    overlay.innerHTML = `
      <button id="closeIframeQuizNotes" style="
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10004;
        font-size: 18px;
        padding: 6px 10px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background: rgba(255,255,255,0.12);
        color: #fff;
      ">關閉</button>
      <iframe src="https://hackmd.io/@RXcou08ERlul7o47xjnHCg/HkvNLsrkZl" style="width:100%;height:100%;border:0;" allowfullscreen></iframe>
    `;
    document.body.appendChild(overlay);
    document.getElementById('closeIframeQuizNotes').addEventListener('click', ()=> overlay.remove());
  });
  // **********************************************

  // 作品筆記 (menu6) - 保持 TODO
  document.getElementById('menu6').addEventListener('click', ()=>{ /* TODO */ });

  document.getElementById('menu4').addEventListener('click', ()=>{ /* TODO */ });

  // 可選：若希望畫布右移避免被選單遮蓋，可啟用下列樣式（目前為選用）
  // cnv.elt.classList.add('canvas-offset');

  // 設定繪圖參數
  rectMode(CENTER);
  objs.push(new DynamicShape());
}

function draw() {
  // 畫布背景為黑色
  background(0);

  for (let i of objs) {
    i.run();
  }

  if (frameCount % int(random([15, 30])) == 0) {
    let addNum = int(random(1, 30));
    for (let i = 0; i < addNum; i++) {
      objs.push(new DynamicShape());
    }
  }
  for (let i = objs.length - 1; i >= 0; i--) {
    if (objs[i].isDead) {
      objs.splice(i, 1);
    }
  }
}

function windowResized() {
  // 讓畫布尺寸隨視窗調整
  resizeCanvas(windowWidth, windowHeight);
  // 畫布重新置中 (滿版時此行效果不大，但可保留)
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function easeInOutExpo(x) {
  return x === 0 ? 0 :
    x === 1 ?
    1 :
    x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 :
    (2 - Math.pow(2, -20 * x + 10)) / 2;
}

class DynamicShape {
  constructor() {
    this.x = random(0.3, 0.7) * width;
    this.y = random(0.3, 0.7) * height;
    this.reductionRatio = 1;
    this.shapeType = int(random(4));
    this.animationType = 0;
    this.maxActionPoints = int(random(2, 5));
    this.actionPoints = this.maxActionPoints;
    this.elapsedT = 0;
    this.size = 0;
    // 粒子的最大尺寸也會隨著畫布寬度調整
    this.sizeMax = width * random(0.01, 0.05); 
    this.fromSize = 0;
    this.init();
    this.isDead = false;
    this.clr = random(colors);
    this.changeShape = true;
    this.ang = int(random(2)) * PI * 0.25;
    this.lineSW = 0;
  }

  show() {
    push();
    translate(this.x, this.y);
    if (this.animationType == 1) scale(1, this.reductionRatio);
    if (this.animationType == 2) scale(this.reductionRatio, 1);
    fill(this.clr);
    stroke(this.clr);
    strokeWeight(this.size * 0.05);
    if (this.shapeType == 0) {
      noStroke();
      circle(0, 0, this.size);
    } else if (this.shapeType == 1) {
      noFill();
      circle(0, 0, this.size);
    } else if (this.shapeType == 2) {
      noStroke();
      rect(0, 0, this.size, this.size);
    } else if (this.shapeType == 3) {
      noFill();
      rect(0, 0, this.size * 0.9, this.size * 0.9);
    } else if (this.shapeType == 4) {
      line(0, -this.size * 0.45, 0, this.size * 0.45);
      line(-this.size * 0.45, 0, this.size * 0.45, 0);
    }
    pop();
    strokeWeight(this.lineSW);
    stroke(this.clr);
    line(this.x, this.y, this.fromX, this.fromY);
  }

  move() {
    let n = easeInOutExpo(norm(this.elapsedT, 0, this.duration));
    if (0 < this.elapsedT && this.elapsedT < this.duration) {
      if (this.actionPoints == this.maxActionPoints) {
        this.size = lerp(0, this.sizeMax, n);
      } else if (this.actionPoints > 0) {
        if (this.animationType == 0) {
          this.size = lerp(this.fromSize, this.toSize, n);
        } else if (this.animationType == 1) {
          this.x = lerp(this.fromX, this.toX, n);
          this.lineSW = lerp(0, this.size / 5, sin(n * PI));
        } else if (this.animationType == 2) {
          this.y = lerp(this.fromY, this.toY, n);
          this.lineSW = lerp(0, this.size / 5, sin(n * PI));
        } else if (this.animationType == 3) {
          if (this.changeShape == true) {
            this.shapeType = int(random(5));
            this.changeShape = false;
          }
        }
        this.reductionRatio = lerp(1, 0.3, sin(n * PI));
      } else {
        this.size = lerp(this.fromSize, 0, n);
      }
    }

    this.elapsedT++;
    if (this.elapsedT > this.duration) {
      this.actionPoints--;
      this.init();
    }
    if (this.actionPoints < 0) {
      this.isDead = true;
    }
  }

  run() {
    this.show();
    this.move();
  }

  init() {
    this.elapsedT = 0;
    this.fromSize = this.size;
    this.toSize = this.sizeMax * random(0.5, 1.5);
    this.fromX = this.x;
    this.toX = this.fromX + (width / 10) * random([-1, 1]) * int(random(1, 4));
    this.fromY = this.y;
    this.toY = this.fromY + (height / 10) * random([-1, 1]) * int(random(1, 4));
    this.animationType = int(random(3));
    this.duration = random(20, 50);
  }
}
