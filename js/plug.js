if(! localStorage.getItem('token')){
    location.href ="index.html"
}

///menu//////////////////////


$('.unHideList').click(function(e){
  $(e.currentTarget).next().slideToggle(500); 
  $('.hideList').not($(e.currentTarget).next()).slideUp(500)
})




////logOut////////////

const logOut = ()=>{
  localStorage.removeItem('token')
  window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/index.html')
}




/////////////////// order  count ///////////////////////////////////////////////////

let orderCounts = [];
const getOrdersData = async () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/order-count/`,
  })
    .then((response) => {
        const { data } = response;
        orderCounts = data.count;
        document.getElementById('orderCount').innerHTML = orderCounts
    })
    .catch((error) => {
      console.log(error);
    });
};

getOrdersData();




/////////////////// products  count ///////////////////////////////////////////////////

let productcount = [];
const getproduct = async () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/product-count/`,
  })
    .then((response) => {

        const { data } = response;
        productcount = data.count;
        document.getElementById('productCount').innerHTML = productcount
    })
    .catch((error) => {
      console.log(error);
    });
};

getproduct();


///////////////////////////zoneCount//////////////////////////////


let zonecount = [];
const getzoneCount = async () => {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/Zone-count/`,
  })
    .then((response) => {

        const { data } = response;
        zonecount = data.count;
        document.getElementById('zonecount').innerHTML = zonecount
    })
    .catch((error) => {
      console.log(error);
    });
};

getzoneCount();