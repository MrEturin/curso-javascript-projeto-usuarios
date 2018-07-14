class UserController{
    
    constructor(formId, formIdUpdate, tableId){
        this.formEl = document.getElementById(formId);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        this._onSubmit();
        this._onEdit();
    }



    _showPanelCreate(){
        document.querySelector("#box-user-update").style.display = 'none';
        document.querySelector("#box-user-create").style.display = 'block';
    }

    _showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = 'none';
        document.querySelector("#box-user-update").style.display = 'block';
    }

    _onSubmit(){
        this.formEl.addEventListener(("submit"), event => {
            event.preventDefault();
            let botaoSubmit = document.querySelector("[type=submit]");
            botaoSubmit.disabled = true;
            let values = this._getValues(this.formEl);
            if(!values){
                botaoSubmit.disabled = false;
                return false;
            }else{
                this._getPhoto(this.formEl).then(
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

    _onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
            this._showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", event => {
            event.preventDefault();
            let btn = this.formUpdateEl.querySelector("[type=submit]");
            btn.disabled = true;
            let values = this._getValues(this.formUpdateEl);
            if(!values){
                btn.disabled = false;
                return false;
            }
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);

            this._getPhoto(this.formUpdateEl).then(
                (content) => {

                    if(!values.photo){
                        result._photo = userOld._photo;
                    }else{
                        result._photo = content;
                    }

                    tr.dataset.user = JSON.stringify(result);

                    tr.innerHTML = `
                        <td>
                            <img src="${result._photo}" alt="User Image" class="img-circle img-sm">
                        </td>
                        <td>${result._name}</td>
                        <td>${result._email}</td>
                        <td>${(result._admin) ? 'SIM' : 'NÃO'}</td>
                        <td>${Helpers.dateFormatBr(result._register)}</td>
                        <td>
                            <button type="button" class="btn btn-edit btn-primary btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-cancel btn-danger btn-xs btn-flat">Excluir</button>
                        </td>
                    `;
                    this._addEventsTR(tr);
                    this._updateCount();
                    result._photo = content;
                    btn.disabled = false;
                    this._showPanelCreate();
                    this.formUpdateEl.reset();
                },
                (e) => {
                    console.error(e);
                }
            );
        });

    }

    _getPhoto(form, callBack){
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let filePhoto = [...form.elements].filter(item => {
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

    _getValues(formEl){
        let user = {};
        let isValid = true;
        [...formEl.elements].forEach((field, index) => {

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
                user[field.name] = field.checked;
            }else if(field.name == 'photo'){
                user[field.name] = field.value;
            }else{
                user[field.name] = field.value;
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
                <button type="button" class="btn btn-edit btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-cancel btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this._addEventsTR(tr);
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

    _addEventsTR(tr){
        tr.querySelector(".btn-edit").addEventListener("click", e => {
            let infoUser = JSON.parse(tr.dataset.user);
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
            for(let name in infoUser){
                if(name == '_register') continue;
                let field = this.formUpdateEl.querySelector("[name="+name.replace('_', '')+"]");
                switch (field.type){
                    case 'file':
                        break;
                    case 'radio':
                        field = this.formUpdateEl.querySelector("[name="+name.replace("_", "")+"][value="+infoUser[name]+"]");
                        field.checked = true;
                        break;
                    case 'checkbox':
                        field.checked = infoUser[name];
                        break;
                    case 'text':
                    case 'select':
                    case 'number':
                    case 'date':
                    case 'email':
                        field.value = infoUser[name];
                        break;
                }
            }
            this.formUpdateEl.querySelector(".photo").src= infoUser._photo;
            this._showPanelUpdate();
        });
    }
}