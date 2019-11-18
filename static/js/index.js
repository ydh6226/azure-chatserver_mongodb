var socket = io()

socket.on('connect', function() {
  var name = prompt('사용할 닉네임을 입력하시오.', '사용자 닉네임')

  if(!name) {
    name = '익명'
  }
  socket.emit('newUser', name)
  socket.emit('add_array')//접속자 추가
})

//접속자 목록 출력
socket.on('update_array',function(array){
    
    del_array()

    array.forEach(function(element){
        var chatuser=document.getElementById('list')
        var user=document.createElement('li')
        var node=document.createTextNode(element)
        
        user.appendChild(node)
        chatuser.appendChild(user)
    })

})

socket.on('update', function(data) {
  var chat = document.getElementById('chat')
  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name} : ${data.message}`)
  var className = ''

  switch(data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  message.classList.add(className)
  message.appendChild(node)
  chat.appendChild(message)
})

function send() {
  var message = document.getElementById('send_message').value
  
  document.getElementById('send_message').value = ''

  var chat = document.getElementById('chat')
  var msg = document.createElement('div')
  var node = document.createTextNode(message)
  
  msg.classList.add('me')
  msg.appendChild(node)
  chat.appendChild(msg)

  socket.emit('message', {type: 'message', message: message})

  chat.scrollTop=chat.scrollHeight
}

//기존 접속자 목록 지우는 함수
function del_array(){
    var parent_node=document.getElementById('UserList')
    var child_node=document.getElementById('list')
    parent_node.removeChild(child_node)

    var tag=document.createElement('ul')
    tag.id='list'
    parent_node.appendChild(tag)
}

function check_enter(){
  if(window.event.keyCode==13){
    send();
  }
}