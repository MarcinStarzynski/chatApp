const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';
let login = '';
let sendMessage = '';

loginForm.addEventListener('submit', login = function(event){
    event.preventDefault();
    if(userNameInput.value == ''){
        alert('Please type Your username')
    }else{
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
});

addMessageForm.addEventListener('submit', sendMessage = function(event){
    event.preventDefault();
    if(messageContentInput.value == ''){
        alert('Message cant be empty');
    }else{
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    }
});

const addMessage = function(author, content){
    const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}