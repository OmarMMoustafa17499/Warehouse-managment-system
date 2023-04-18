let supName = document.getElementById('name')
let address = document.getElementById('address')
let phone = document.getElementById('phone')
let email = document.getElementById('email')
let addSupp =   document.getElementById('addSupp')
let msgsup = document.getElementById('msgsup')
let msgaddress = document.getElementById('msgaddress')
let msgphone = document.getElementById('msgphone')
let msgemail = document.getElementById('msgemail')



//////////////////get supplier ////////////////////////////////

let suppArr = []


const getSupp = ()=>{
    axios({
                method:"get",
             url:`http://127.0.0.1:8000/api/Supplier/`
            }).then((response)=>{
                const {data}= response;
                suppArr = data;
                showSupp()
            }).catch((error)=> {
                console.log(error);
              })
}

getSupp()



////////////////////showssuppData///////////////////////////////


const  showSupp = ()=>{
    let suppData =``
    for(let i=0;i< suppArr.length;i++){
        suppData+= `<tr>
        <td>${suppArr[i].name}</td>
        <td>${suppArr[i].address}</td>
        <td>${suppArr[i].phone}</td>
        <td>${suppArr[i].email}</td>
        <td>${suppArr[i].created_date}</td>
        <td>  <button type="button" class="btn btn-danger mx-4 " onclick="deleteSupp(${suppArr[i].id})">
        <i class="fa fa-trash"></i>
         </button>
         <button type="button" class="btn btn-primary "  onclick="updateSupp(${suppArr[i].id})">
         <i class="fa fa-edit"></i>
          </button></td>
        </tr>
        `
    }
    document.getElementById("tSupplier").innerHTML = suppData;
}



//////////////////////delete supp ////////////////////////////////////

const deleteSupp = (id)=>{
    axios({
        method:"delete",
        "url":`http://127.0.0.1:8000/api/Supplier/${id}/delete/`
    }).then((response)=>{
        getSupp()
    })
    }


///////////////////////////add supp////////////////////////////////////////

if(addSupp){
    addSupp.addEventListener('click',()=>{
        const data = {
            name: supName.value,
            address:address.value,
            phone:phone.value,
            email:email.value

        }
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/Supplier/`,
            data: data
        }).then((response)=>{
            console.log(response);
            if(response.status === 201){
                window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/supplier.html')
                showSupp()
            }
        }).catch((error)=> {
          if(error.response.data.name){
                msgsup.classList.remove('d-none');
                msgaddress.classList.add('d-none');
                msgphone.classList.add('d-none');
                msgemail.classList.add('d-none');
                msgsup.innerHTML = error.response.data.name
           }else if(error.response.data.address){
                 msgaddress.classList.remove('d-none');
                 msgsup.classList.add('d-none');
                msgphone.classList.add('d-none');
                msgemail.classList.add('d-none');
                msgaddress.innerHTML = error.response.data.address
            }else if(error.response.data.phone){
                msgphone.classList.remove('d-none');
                msgsup.classList.add('d-none');
                msgaddress.classList.add('d-none');
               msgemail.classList.add('d-none');
               msgphone.innerHTML = error.response.data.phone
           }else{
                msgemail.classList.remove('d-none');
                msgsup.classList.add('d-none');
                msgaddress.classList.add('d-none');
                msgphone.classList.add('d-none');
               msgemail.innerHTML = error.response.data.email
           }
        })
    })

}



//////////////////update supp ///////////////////////////

const updateSupp =(id)=>{
    localStorage.setItem('supplierId',id)
    window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/updatesupplier.html');
    }