class UserController{
    
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this._onSubmit();
    }

    _onSubmit(){
        this.formEl.addEventListener(("submit"), event => {
            event.preventDefault();
            let botaoSubmit = document.querySelector("[type=submit]");
            botaoSubmit.disabled = true;
            let values = this._getValues();
            if(!values){
                botaoSubmit.disabled = false;
            }else{
                this._getPhoto().then(
                    (content) => {
                        values.photo = content;
                        this._addLine(values); // Adiciona linha ao html
                        this.formEl.reset();
                        botaoSubmit.disabled = false;
                    },
                    (e) => {
                        console.error(e);
                    }
                );
            }
        });
    }

    _getPhoto(callBack){
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let filePhoto = [...this.formEl.elements].filter(item => {
                if(item.name === "photo"){
                    return item;
                }
            });
            let file = filePhoto[0].files[0];
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (e) => {
                reject(e);
            };
            if(file){
                fileReader.readAsDataURL(file);
            }else{
                resolve("dist/img/avatar.png");
            }
        });
    }

    _getValues(){
        let user = {};
        let isValid = true;
        [...this.formEl.elements].forEach((field, index) => {

            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add('has-error');
                isValid = false;
            }else{
                if(['has-error'].indexOf(field.parentElement.classList)){
                    field.parentElement.classList.remove('has-error');
                }
            }

            if(field.name == 'gender'){
                if(field.checked){
                    user[field.name] = field.value;
                }
            }else if(field.name == "admin"){
                user[field.name] = (field.checked) ? true : false;
            }else{
                if(field.name == 'photo'){
                    user[field.name] = field.value;
                }else{
                    user[field.name] = field.value;
                }
            }
        });

        if(!isValid) return false;
    
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin,
        );
    }

    _getDataPT(data){
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    _addLine(dataUser){
        let tr = document.createElement("tr");
        tr.dataset.user = JSON.stringify(dataUser);
        //Criando o dataset, o JSON não armazena os metodos. Então é necessário acessar os atridutos diretamente.
        
        tr.innerHTML = `
            <td>
                <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
            </td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'SIM' : 'NÃO'}</td>
            <td>${Helpers.dateFormatBr(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this.tableEl.appendChild(tr);
        this._updateCount();
    }

    _updateCount(){
        let numUsers    = 0;
        let numAdmins   = 0;
        [...this.tableEl.children].forEach(tr => {
            numUsers++;
            let user = JSON.parse(tr.dataset.user);
            if(user._admin) numAdmins++;
        });
        document.querySelector('#number-users').innerHTML = numUsers;
        document.querySelector('#number-admins').innerHTML = numAdmins;
    }
}