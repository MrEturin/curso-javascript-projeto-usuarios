/*
    function getUserInfo(){
        let $ = document.querySelector.bind(document);
        let name            = $("#exampleInputName");
        let gender          = $("#form-user-create [name=gender]:checked");
        let birth           = $("#exampleInputBirth");
        let country         = $("#exampleInputCountry");
        let email           = $("#exampleInputEmail1");
        let password        = $("#exampleInputPassword1");
        let picture        = $("#exampleInputFile");
        let administrator   = $("#exempleAdmin");
        console.log(
            "Nome: "+ name.value, 
            "Gênero: "+gender.value, 
            "Nascimento: "+birth.value, 
            "País: "+country.value, 
            "Email: "+email.value,
            "Senha: "+password.value,
            "Foto: "+picture.value,
            "Adm: "+administrator.value
        );   
    }
*/

function addLine(dataUser){
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
            <img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm">
        </td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.data}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    `;
    document.getElementById("table-users").appendChild(tr);

    /*
        <tr>
            <td>
                <img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm">
            </td>
            <td>Fulano</td>
            <td>fulano@hcode.com.br</td>
            <td>Sim</td>
            <td>02/04/2018</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr> 
     */
}

document.getElementById("form-user-create").addEventListener(("submit"), function(event){
    event.preventDefault();
    let form = document.querySelectorAll("#form-user-create [name]");
    let user = {};

    form.forEach((field, index) => {
        if(field.name == 'gender'){
            if(field.checked){
                user[field.name] = field.value;
            }
        }else{
            if(field.name == 'photo'){
                user[field.name] = field.value;
            }else{
                user[field.name] = field.value;
            }
        }
    });
    addLine(user);
});