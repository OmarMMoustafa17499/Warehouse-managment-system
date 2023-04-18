
let addOrder = document.getElementById('addOrder')
let proList = document.getElementById('proList')
let BuyList = document.getElementById('BuyList')
let SupList = document.getElementById('SupList')
let qty = document.getElementById('qty')
let DropList = document.getElementById('DropList')
let Status = document.getElementById('status')
let qtyMsg = document.getElementById('qtyMsg')
let updateOrder = document.getElementById('updateOrder')
let daty = document.getElementById('daty')


////////////////////////////get orders list//////////////////////////////////////////////////

let OrderArr = [];
const getOrders = async () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/Order/`,
  })
    .then((response) => {
        const { data } = response;
        OrderArr = data;
        showOrderData();
    })
    .catch((error) => {
      console.log(error);
    });
};

getOrders();
/////////////////////////////////////////show data/////////////////////////////////////////////////
const showOrderData = () => {
  let cartona = "";
  for (let i = 0; i < OrderArr.length; i++) {
    cartona += `<tr>
        <td>${OrderArr[i].product.name}</td>
        <td>${OrderArr[i].buyer.name}</td>
        <td>${OrderArr[i].supplier.name}</td>
        <td>${OrderArr[i].quantity}</td>
        <td>${OrderArr[i].drop_name.drop_name}</td>
        <td>${OrderArr[i].order_date}</td>
        <td>${OrderArr[i].delivery_status}</td>
        <td>  <button type="button" class="btn btn-danger" onclick="deleteOrder(${OrderArr[i].id})">
        <i class="fa fa-trash"></i>
         </button>
         <button type="button" class="btn btn-primary "  onclick="updateProduct(${OrderArr[i].id})">
         <i class="fa fa-edit"></i>
          </button></td>
        </tr>
        `;
  }
    document.getElementById("tOrder").innerHTML = cartona;
};



///////////////////////////////////delete order//////////////////////////////////////////////////
const deleteOrder = (id) => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:8000/api/Order/delete/${id}/`,
    }).then((response) => {
        getOrders();
    });
  };
  
  //////////////////////////////////////update order///////////////////////////////////////////////////////
  const updateProduct = (id) => {
    localStorage.setItem('orderId',id)
    window.location.replace("C:/Users/OMAR/Desktop/Omar_Web/omar/omar/updateorder.html");
  };
  



/////////////////////////////////get product list /////////////////////////////////////////////////

let productsArray = [];
const getproducts = async () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/Product`,
  })
    .then((response) => {
        const { data } = response;
        productsArray = data;
        showdataPro();
    })
    .catch((error) => {
      console.log(error);
    });
};
getproducts()
// add product to list
const showdataPro = function () {
  let cartonepro =``
    for(var i = 0; i <productsArray.length;i++ ){
      cartonepro += `<option value='${productsArray[i].name}'>${productsArray[i].name}</option>`
    }
    document.getElementById("proList").innerHTML = cartonepro;

};

/////////////////////////////////get Buyer list /////////////////////////////////////////////////

let BuyerArray = [];
const getBuyerList = async () => {
    axios({
        method:"get",
        url:`http://127.0.0.1:8000/api/Buyer/`
    }).then((response)=>{
        const {data}= response;
        BuyerArray = data;
        showdataBuyer()
    }).catch((error)=> {
        console.log(error);
      })
};
getBuyerList()
// add buyer to list
const showdataBuyer = function () {
    BuyerArray.forEach((buy) => {
    document.getElementById("BuyList").innerHTML += `
            <option value='${buy.name}'>${buy.name}</option>
        `;
  });
};


/////////////////////////////////get supplier list /////////////////////////////////////////////////

let supplyArray = [];
const getSupplyList = async () => {
    axios({
        method:"get",
     url:`http://127.0.0.1:8000/api/Supplier/`
    }).then((response)=>{
        const {data}= response;
        supplyArray = data;
        showdataSupply()
    }).catch((error)=> {
        console.log(error);
      })
};
getSupplyList()
// add supplier to list
const showdataSupply = function () {
    supplyArray.forEach((item) => {
    document.getElementById("SupList").innerHTML += `
            <option value='${item.name}'>${item.name}</option>
        `;
  });
};



/////////////////////////////////get drop list /////////////////////////////////////////////////

let DropArray = [];
const getDropList = async () => {
    axios({
        method:"get",
        url:`http://127.0.0.1:8000/api/CarDrop/`
    }).then((response)=>{
        const {data}= response;
        DropArray = data;
        showdataDrop()
    }).catch((error)=> {
        console.log(error);
      })
};
getDropList()
// add supplier to list
const showdataDrop = function () {
    DropArray.forEach((item) => {
    document.getElementById("DropList").innerHTML += `
            <option value='${item.drop_name}'>${item.drop_name}</option>
        `;
  });
};





//////////////////////////add order//////////////////////////////

if(addOrder){
    addOrder.addEventListener('click',()=>{
        const data = {
            product: proList.value,
            quantity:qty.value,
            buyer:BuyList.value,
            supplier:SupList.value,
            delivery_status:Status.value,
            drop_name:DropList.value,
            order_date:daty.value
        }
        console.log(proList.value);
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/Order/`,
            data: data
        }).then((response)=>{
            console.log(response);
            if(response.status === 201){
                window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/order.html')
                showOrderData()
            }
        }).catch((error)=> {
            if(error.message === 'Request failed with status code 500'){
              qtyMsg.classList.remove('d-none');
            }else if(error.data.message){
              qtyMsg.classList.remove('d-none');
              qtyMsg.innerHTML = error.data.message;
            }
            console.log(error);
          })
    })
  }
  









