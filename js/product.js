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


////////////////////////////get products list//////////////////////////////////////////////////

let productArr = [];
const getproducts = async () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/Product`,
  })
    .then((response) => {
        const { data } = response;
      productArr = data;
      showData();
    })
    .catch((error) => {
      console.log(error);
    });
};

getproducts();
/////////////////////////////////////////show data/////////////////////////////////////////////////
const showData = () => {
  let cartona = "";
  for (let i = 0; i < productArr.length; i++) {
    cartona += `<tr>
        <td>${productArr[i].name}</td>
        <td>${productArr[i].qr_code}</td>
        <td>${productArr[i].price}</td>
        <td>${productArr[i].shelf.name}</td>
        <td>${productArr[i].zone.name}</td>
        <td>${productArr[i].quantity}</td>
        <td>${productArr[i].classification.title}</td>
        <td>${productArr[i].date_created}</td>
        <td>${productArr[i].status}</td>
        <td>  <button type="button" class="btn btn-danger" onclick="deleteProduct(${productArr[i].id})">
        <i class="fa fa-trash"></i>
         </button>
         <button type="button" class="btn btn-primary "  onclick="updateProduct(${productArr[i].id})">
         <i class="fa fa-edit"></i>
          </button></td>
        </tr>
        `;
  }
    document.getElementById("tproduct").innerHTML = cartona;
};

///////////////////////////////////delete product//////////////////////////////////////////////////
const deleteProduct = (id) => {
  axios({
    method: "delete",
    url: `http://127.0.0.1:8000/api/Product/${id}/delete/`,
  }).then((response) => {
    getproducts();
  });
};

//////////////////////////////////////update product///////////////////////////////////////////////////////
const updateProduct = (id) => {
  localStorage.setItem('productId',id)
  window.location.replace("C:/Users/OMAR/Desktop/Omar_Web/omar/omar/updateproduct.html");
};



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
            <option value='${shelfy.name}'>${shelfy.name}</option>
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
            <option value='${zony.name}'>${zony.name}</option>
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
            <option value='${claiss.title}'>${claiss.title}</option>
        `;
  });
};


//////////////////////////add products//////////////////////////////

if(addPro){
  addPro.addEventListener('click',()=>{
      const data = {
          name: productName.value,
          price:productPrice.value,
          shelf:Shelfy.value,
          classification:Classy.value,
          quantity:qty.value,
          status:Status.value,
          qr_code:productCode.value,
          zone:zony.value
      }
      axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/Product/`,
          data: data
      }).then((response)=>{
          console.log(response);
          if(response.status === 201){
              window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/productList.html')
              showData()
          }
      }).catch((error)=> {
        console.log(error);
          if(error.message === 'Request failed with status code 500'){
            qtyMsg.classList.remove('d-none');
          }
        })
  })
}





