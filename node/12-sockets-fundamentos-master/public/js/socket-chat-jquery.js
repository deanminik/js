var params = new URLSearchParams(window.location.search);

//References
var divUsuarios = $('#divUsuarios');

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