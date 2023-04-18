let updatezone = document.getElementById('zoneup')
let msgzony = document.getElementById('msgzony')
let zoneupdate = document.getElementById('zoneupdate')
 ////////////////////////get zone by id ///////////////////////////////////////

 const getZoneId = ()=>{

    axios({
        method:"get",
        url:`http://127.0.0.1:8000/api/Zone/${localStorage.getItem('zoneId')}/`
    }).then((response)=>{
        if(response.status ===200){
            zoneupdate.value = response.data.name
          
        }
    }).catch((error)=> {
        console.log(error);
      })
}
getZoneId()


//////////////////////////////update zone///////////////////////////////
if(updatezone){
    updatezone.addEventListener('click',()=>{
        const data = {
            name: zoneupdate.value,
        }
        axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/Zone/${localStorage.getItem('zoneId')}/update/`,
            data: data,
        }).then((response)=>{
           if(response.status ===200){
            window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/zone.html');
           }
        }).catch((error)=> {
            console.log(error);
            msgzony.classList.remove('d-none');
            msgzony.innerHTML = error.response.data.detail
          })
    })
 } 
