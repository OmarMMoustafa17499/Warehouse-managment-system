let productName = document.getElementById('productName')
let productCode = document.getElementById('productCode')
let productPrice = document.getElementById('productPrice')
let qty = document.getElementById('qty')
let Status = document.getElementById('avilable')
let Classy = document.getElementById('classificationList')
let Shelfy = document.getElementById('shelfList')
let addPro = document.getElementById('addPro')
let qtyMsg = document.getElementById('qtyMsg')
let updatePro = document.getElementById('updatePro')
let zony = document.getElementById('zoneList')




/////////////////////////////////get shelf list /////////////////////////////////////////////////

let shelfInProducts = []
const getShelfInProducts = ()=>{
    axios({
                method:"get",
             url:`http://127.0.0.1:8000/api/Shelf/`
            }).then((response)=>{
                const {data}= response;
                shelfInProducts = data;
                showdataShelf()
            }).catch((error)=> {
                console.log(error);
              })
}
getShelfInProducts()

// add shelf to list
const showdataShelf = function () {
  shelfInProducts.forEach((shelfy) => {
    document.getElementById("shelfList").innerHTML += `
            <option value=${shelfy.name}>${shelfy.name}</option>
        `;
  });
};





/////////////////////////////////get zone list /////////////////////////////////////////////////

let zoneInProducts = []
const getZoneInProducts = ()=>{
    axios({
                method:"get",
             url:`http://127.0.0.1:8000/api/Zone/`
            }).then((response)=>{
                const {data}= response;
                zoneInProducts = data;
                showdatazone()
            }).catch((error)=> {
                console.log(error);
              })
}
getZoneInProducts()

// add shelf to list
const showdatazone = function () {
  zoneInProducts.forEach((zony) => {
    document.getElementById("zoneList").innerHTML += `
            <option value=${zony.name}>${zony.name}</option>
        `;
  });
};


/////////////////////////////////get classification list//////////////////////////////////////
let classificationsArray = [];
const getClassi = ()=>{
    axios({
        method:"get",
        url:`http://127.0.0.1:8000/api/Classification/`
    }).then((response)=>{
        const {data}= response;
        classificationsArray = data;
        showclassData()
    }).catch((error)=> {
        console.log(error);
      })
}

getClassi()



// add class to list
const showclassData = function () {
  classificationsArray.forEach((claiss) => {
    document.getElementById("classificationList").innerHTML += `
            <option value=${claiss.title}>${claiss.title}</option>
        `;
  });
};






///////////////////////////////////////////////get product by id ////////////////////////////////////////


const getproductId = ()=>{

  axios({
      method:"get",
      url:`http://127.0.0.1:8000/api/Product/${localStorage.getItem('productId')}/`
  }).then((response)=>{
      if(response.status ===200){
            productName.value=response.data.name,
            productPrice.value=response.data.price,
            Shelfy.value=response.data.shelf.name,
            Classy.value= response.data.classification.title,
            qty.value= response.data.quantity,
            Status.value= response.data.status,
            productCode.value= response.data.qr_code
       }
      console.log(response);
  }).catch((error)=> {
      console.log(error);
    })
}
getproductId()


//////////////////////////////////////update product /////////////////////////////////////////////////
if(updatePro){
  updatePro.addEventListener('click',()=>{
    const data = {
      name: productName.value,
      price:productPrice.value,
      shelf:Shelfy.value,
      classification:Classy.value,
      quantity:qty.value,
      status:Status.value,
      qr_code:productCode.value,

  }
      axios({
          method: "put",
          url: `http://127.0.0.1:8000/api/Product/${localStorage.getItem('productId')}/update/`,
          data: data,
      }).then((response)=>{
         if(response.status ===200){
          window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/productList.html');
         }
      }).catch((error)=> {
        if(error.message === 'Request failed with status code 500'){
          qtyMsg.classList.remove('d-none');
        }
        })
  })
}