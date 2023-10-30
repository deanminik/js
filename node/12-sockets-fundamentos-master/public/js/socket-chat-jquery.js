var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var room = params.get('room');

//References
var divUsuarios = $('#divUsuarios');
var formSend = $('#formSend');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');



//Functions to render Users

function renderUsers(persons) {
    console.log(persons);
    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('room') + '</span></a>';
    html += '</li>';

    for (let index = 0; index < persons.length; index++) {
        html += '<li>';
        html += '    <a data-id="' + persons[index].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[index].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);


}

function renderMessages(message) {

    console.log('Here is the message', message);
    var html = '';

    

    html += '<li class="animated fadeIn">';
    html += '   <div class="chat-img"><img src="assets/images/users/3.jpg" alt="user" />';
    html += '</div>';
    html += '<div class="chat-content">';
    html += '<h5>' + message.name + '</h5>';
    html += '<div class="box bg-light-info">' + message.message + '</div>';
    html += '</div>';
    html += '   <div class="chat-time">11:00 am</div>';
    html += '</li>';

    divChatbox.append(html);
}

//Listeners
divUsuarios.on('click', 'a', function () {
    // id -> came from this data-id in the line 17 

    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }

});


formSend.on('submit', function (e) {

    e.preventDefault();

    if (txtMessage.val().trim().length === 0) {
        return;
    }

    console.log(txtMessage.val());

    socket.emit('createMessage', {
        name: name,
        message: txtMessage.val()
    }, function (resp) {
        console.log('server response: ', resp);
        txtMessage.val('').focus();
        renderMessages(resp);
    });

});