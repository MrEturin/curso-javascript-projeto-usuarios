class UserController{
    
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this._onSubmit();
    }

    _onSubmit(){
        this.formEl.addEventListener(("submit"), event => {
            event.preventDefault();

            let values = this._getValues();

            this._getPhoto().then(
                (content) => {
                    values.photo = content;
                    this._addLine(values); // Adiciona linha ao html
                    this.formEl.reset();
                },
                (e) => {
                    console.error(e);
                }
            );

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

        [...this.formEl.elements].forEach((field, index) => {
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
    
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

    }

    _addLine(dataUser){
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
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
        this.tableEl.appendChild(tr);
    
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
}