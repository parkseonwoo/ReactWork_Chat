const express = require("express"); // 필요한 라이브러리를 가져옴
const http = require("http")
const app = express(); // express를 실행한 내용을 app 에다 담음
const path = require("path") // 서버 주소(node.js의 기본 모듈)
const server = http.createServer(app);
// 소켓io를 받을 수 있도록 서버쪽에서 세팅
const socketIO = require("socket.io") // 설치한 라이브러리를 가져옴
const moment = require("moment")

const io  = socketIO(server); // socketIO에 서버를 담아줌

// 보여줄 폴더를 지정
app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000;  // 환경에 포트가 지정 또는 5000

// 서버에서는 보내주는 내용 까지만
io.on("connection", (socket) => { // 연결에 대한 정보들을 소켓에 담는다 
    // 서버에서 받아주는 코드
    socket.on("chatting", (data) => { // 만들어줬던 채팅 아이디, 실행 할 함수
       const {name, msg } = data;  
        // 되돌려받기
        io.emit("chatting", {
            name, //  name: name 넘겨줄때 이름: 넘겨받은 이름
            msg, // 하지만 이름이 똑같기 때문에 생략 가능
            time: moment(new Date()).format("h:ss A")
        })
    })
}) 


server.listen(PORT, () => console.log(`server is running ${PORT}` )) //여기서 ~의 ` 사용함