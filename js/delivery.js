let productList = document.getElementById("productList");
let address = document.getElementById("address");
let addDelivery = document.getElementById("addDelivery");
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

///////////////////////////////////////////////delivery///////////////////////////////////////
let DeliverysArr =[]
const getDelivery = () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/Delivery/`,
  })
    .then((response) => {
      const { data } = response;
      DeliverysArr = data;
      showDelivery();
    })
    .catch((error) => {
      console.log(error);
    });
};

getDelivery();

////show all delivery //////////////////////////
const showDelivery = () => {
  let cartona = ``;
  for (let i = 0; i < DeliverysArr.length; i++) {
    cartona += `<tr>
        <td>${DeliverysArr[i].order_name.product_name}</td>
        <td>${DeliverysArr[i].delivery_address}</td>
        <td>${DeliverysArr[i].delivery_date}</td>
        <td>  <button type="button" class="btn btn-danger mx-4 " onclick="deleteDelivery(${DeliverysArr[i].id})">
        <i class="fa fa-trash"></i>
         </button>
         <button type="button" class="btn btn-primary "  onclick="updateDelivery(${DeliverysArr[i].id})">
         <i class="fa fa-edit"></i>
          </button></td>
        </tr>
        `;
  }
  document.getElementById("tdelivery").innerHTML = cartona;
};





//////add delivery/////
if (addDelivery) {
  addDelivery.addEventListener("click", () => {
    const data = {
      order:productList.value,
      delivery_address:address.value,
      delivery_date:deliveryDate.value
    };
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/Delivery/`,
      data: data,
    }).then((response) => {
        if(response.status === 201){
            window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/delivery.html')
            showDelivery()
        }
      }).catch((error) => {
        if(error.message === 'Request failed with status code 500'){
          qtyMsg.classList.remove('d-none');
        }
        console.log(error);
      });
  });
}



///////////////////////////////////delete delivery//////////////////////////////////////////////////
const deleteDelivery = (id) => {
  axios({
    method: "delete",
    url: `http://127.0.0.1:8000/api/Delivery/delete/${id}/`,
  }).then((response) => {
    getDelivery();
  });
};

//////////////////////////////////////update delivery///////////////////////////////////////////////////////
const updateDelivery = (id) => {
  localStorage.setItem('deliveryId',id)
  window.location.replace("C:/Users/OMAR/Desktop/Omar_Web/omar/omar/updatedelivery.html");
};