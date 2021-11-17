let timer = null;
let count = 0;
const APPLICATION_KEY = "52cc74097495a2d073517fce51e0e1da44b3fe245c35976c925ff8a8fcf7d60f";
const CLIENT_KEY = "9e9aa0db0ef1cb012c2931da84a2c47c0467a3a37bf874000bf46ae9bf4977e1";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";

let TestClass = ncmb.DataStore(DBName);

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function fetch() {
  TestClass
  .order("message")
  .fetchAll()
  .then(function(results) {
    for (let i=0; i<results.length; i++) {
      console.log(results[i].message);
      console.log(timer);
      if (timer<results[0].message) {
        timer = timer - 1;
        alert("High Score: " + timer);
      }
    }
  })
    .catch(function(err) {
      console.log("err",err)
    });
}

function save () {
  let test = new TestClass();
  let key = "message";
// let value = "Hello, NCMB!";
const text = document.getElementById('message');
let value = timer - 1;
test.set(key, parseInt(value));
test.save()
  .then (function() {
    console.log("成功");
  })
  .catch(function(err) {
    console.log("エラー発生： " + err);
  });
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for (let i=0; i<size*size; i++) {
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num"+i);
    s.addEventListener("click", function(){
      if (this.textContent == q[qNum][1]) {
        // alert("正解");
        correct.play();
        count++;
        if (max == count) {
          save();
          fetch();
          alert("GAME CLEAR!");
          clearTimeout(timer);
        }
        console.log(count);
        while (cells.firstChild) {
          cells.removeChild(cells.firstChild);
        }
        gameStart();
      } else {
        wrong.play();
      }
    })
    cells.appendChild(s);
    if (i % size == size - 1) {
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}
