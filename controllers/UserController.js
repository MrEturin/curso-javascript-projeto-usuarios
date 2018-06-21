class UserController{
    
    constructor(formId, formIdUpdate, tableId){
        this.formEl = document.getElementById(formId);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        this._onSubmit();
        this._onEdit();
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
            
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            tr.dataset.user = JSON.stringify(values);

            tr.innerHTML = `
                <td>
                    <img src="${values.photo}" alt="User Image" class="img-circle img-sm">
                </td>
                <td>${values.name}</td>
                <td>${values.email}</td>
                <td>${(values.admin) ? 'SIM' : 'NÃO'}</td>
                <td>${Helpers.dateFormatBr(values.register)}</td>
                <td>
                    <button type="button" class="btn btn-edit btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-cancel btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            `;

            btn.disabled = false;

            this._addEventsTR(tr);
            this._updateCount();
        });

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
            let form = document.querySelector('#form-user-update');
            form.dataset.trIndex = tr.sectionRowIndex;
            for(let name in infoUser){
                if(name == '_register') continue;
                let field = form.querySelector("[name="+name.replace('_', '')+"]");
                switch (field.type){
                    case 'file':
                        break;
                    case 'radio':
                        field = form.querySelector("[name="+name.replace("_", "")+"][value="+infoUser[name]+"]");
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
            this._showPanelUpdate();
        });
    }
}