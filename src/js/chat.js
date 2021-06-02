// socketio를 불러옴
"use strict"
const socket = io();

const nickname = document.querySelector("#nickname") // css 선택자를 그대로 사용 가능
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (event)=> {
    if(event.keyCode === 13) {
        send()
    }
})

function send() {
    // 오브젝트 형태로 데이터 전달
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    // 메세지를 강제로 보내기
    socket.emit("chatting", param)
    }

sendButton.addEventListener("click", send)


// 받아주는 내용 작성(서버에서 보낸 내용 확인)
socket.on("chatting", (data) => {
    console.log(data)
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time); // LiModel를 인스턴스화 시켜준다
    item.makeLi() // 메서드 호출
    displayContainer.scrollTo(0, displayContainer.scrollingHeight)
})

// li를 생성하고 ul에 append를 한다
// 서버에서 data를 받았을 때 마다 LiModel를 계속 찍어낸다
function LiModel(name, msg, time) {
    this.name = name; // 초기화(할당) 시켜주는 역할
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=> { // 내가 만든 makeLi라는 메서드에서 값들의 접근을 해서 사용하기 위함
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent": "received");
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt ="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
    }
}