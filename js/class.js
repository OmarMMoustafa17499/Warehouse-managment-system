//variables
let title = document.getElementById('title')
let addClassBtn = document.getElementById('add') 
let msgClass = document.getElementById('msgClass')
let update = document.getElementById('update')
let allInputs = document.getElementsByClassName('form-control');


//classifcation

/////////////////////////////get all classification //////////////////////////

let classificationsArr = [];
const getClassi = ()=>{
    axios({
        method:"get",
        url:`http://127.0.0.1:8000/api/Classification/`
    }).then((response)=>{
        const {data}= response;
        classificationsArr = data;
        showClass()
    }).catch((error)=> {
        console.log(error);
      })
}

getClassi()

////show all classification //////////////////////////
const showClass = ()=>{
    let cartona =``
    for(let i=0;i< classificationsArr.length;i++){
        cartona+= `<tr>
        <td>${classificationsArr[i].title}</td>
        <td>  <button type="button" class="btn btn-danger mx-4 " onclick="deleteClass(${classificationsArr[i].id})">
        <i class="fa fa-trash"></i>
         </button>
         <button type="button" class="btn btn-primary "  onclick="updateClass(${classificationsArr[i].id})">
         <i class="fa fa-edit"></i>
          </button></td>
        </tr>
        `
    }
    document.getElementById("tbodyClass").innerHTML = cartona;
}
//////add classifications/////
if(addClassBtn){
    addClassBtn.addEventListener('click',()=>{
        const data = {
            title: title.value
        }
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/Classification/`,
            data: data
        }).then((response)=>{
            if(response.status === 201){
                window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/classification.html')
                showClass()
            }
        }).catch((error)=> {
            msgClass.classList.remove('d-none');
          })
    })
}


///////////////delete classifications ////////////////


const deleteClass = (id)=>{
    axios({
        method:"delete",
        "url":`http://127.0.0.1:8000/api/Classification/${id}/delete/`
    }).then((response)=>{
        getClassi()
    })
    }


//////////update classs ////////////////////////

const updateClass =(id)=>{
    localStorage.setItem('classId',id)
    window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/updateclassification.html');
    }

