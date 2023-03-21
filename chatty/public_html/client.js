
function buildUrl(alias, message){
    var url = 'http://localhost:80/chats/post/'+alias + '/'+message;
    return url;
}

function sendMessage(){
    var alias = document.getElementById('Alias').value;
    var message = document.getElementById('Message').value;
    document.getElementById('Alias').value = '';
    document.getElementById('Message').value = '';

    if (alias != '' && message != ''){
        let url = buildUrl(alias, message);

        fetch(url)
            .then(() => {
                console.log("CHAT SAVED!");
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function getMessages(){
    console.log("Retrieving\n");
    let url = 'http://localhost:80/chats';

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let str = JSON.stringify(json);
            var chat = JSON.parse(str);
            console.log("STRING: "+ str);
            updatePage(chat);
        })
        .catch((err) => {
            console.log(err);
        });

}

function updatePage(chat){
    document.getElementById('convoBox').innerHTML = '';
    let i = 0;
    while (i < chat.length){
        var alias = chat[i].alias;
        var message = chat[i].message;
        console.log("ALIAS: " + alias + " MESSAGE: "+ message);
        addMessage(alias, message);
        i++;
    }
}

function addMessage(alias, message){
    var para = document.createElement('p');
    var name = document.createElement('span');
    var sentence = document.createElement('span');
    name.className = 'alias';
    sentence.className = 'sentence';
    
    var aliasText = document.createTextNode(alias + ': ');
    var messageText = document.createTextNode(message);
    name.appendChild(aliasText);
    sentence.appendChild(messageText);

    para.appendChild(name);
    para.appendChild(sentence);

    var chatbox = document.getElementById('convoBox');
    chatbox.appendChild(para);
}

function startChat(){
    setInterval(getMessages, 1000);
}