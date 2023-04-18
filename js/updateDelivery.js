

let productList = document.getElementById("productList");
let address = document.getElementById("address");
let updateDelivery = document.getElementById("updateDelivery");
let deliveryDate = document.getElementById("date");
let qtyMsg = document.getElementById('qtyMsg')

////get order list /////////////////////

let orderArrr = [];
const getorders = async () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/Order/`,
  })
    .then((response) => {
      const { data } = response;
      orderArrr = data;
      showOrders();
    })
    .catch((error) => {
      console.log(error);
    });
};


getorders();

const showOrders = function () {
  orderArrr.forEach((item) => {
  document.getElementById("productList").innerHTML += `
          <option value='${item.product.name}'>${item.product.name}</option>
      `;
});
};





  ///////////////////////////////////////////////get delivery by id ////////////////////////////////////////
  const getDeliveryId = ()=>{

    axios({
        method:"get",
        url:`http://127.0.0.1:8000/api/Delivery/${localStorage.getItem('deliveryId')}/`
    }).then((response)=>{
        if(response.status ===200){
          productList.value=response.data.order_name.name,
          address.value=response.data.delivery_address,
          deliveryDate.value= response.data.delivery_date
         }
    }).catch((error)=> {
        console.log(error);
      })
  }
  getDeliveryId()
  
  
  
  
  
  //////////////////////////////////////update delivery /////////////////////////////////////////////////
  if(updateDelivery){
    updateDelivery.addEventListener('click',()=>{
      const data = {
        order_name: productList.value,
        delivery_address: address.value,
   
    }
        axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/Delivery/${localStorage.getItem('deliveryId')}/update/`,
            data: data,
        }).then((response)=>{
           if(response.status ===200){
            window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/delivery.html');
           }
        }).catch((error)=> {
          console.log(error);
          if(error.message === 'Request failed with status code 500'){
            qtyMsg.classList.remove('d-none');
          }
          })
    })
  }