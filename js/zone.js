
let addZone = document.getElementById('addzone')
let zoneName = document.getElementById('zoneName')
let msgzone = document.getElementById('msgzone')
//////////////////////////////////////get all zones ////////////////////////////////
let zoneArr = []


const getzone = ()=>{
    axios({
            method:"get",
             url:`http://127.0.0.1:8000/api/Zone/`
            }).then((response)=>{
                const {data}= response;
                zoneArr = data;
                showzone()
            }).catch((error)=> {
                console.log(error);
              })
}

getzone()

////////////////////showzoneData///////////////////////////////


const showzone = ()=>{
    let zoneData =``
    for(let i=0;i< zoneArr.length;i++){
        zoneData+= `<tr>
        <td>${zoneArr[i].name}</td>
        <td>  <button type="button" class="btn btn-danger mx-4 " onclick="deletezone(${zoneArr[i].id})">
        <i class="fa fa-trash"></i>
         </button>
         <button type="button" class="btn btn-primary "  onclick="updatezone(${zoneArr[i].id})">
         <i class="fa fa-edit"></i>
          </button></td>
        </tr>
        `
    }
    document.getElementById("tZone").innerHTML = zoneData;
}


//////////////////////delete zone ////////////////////////////////////

const deletezone = (id)=>{
    axios({
        method:"delete",
        "url":`http://127.0.0.1:8000/api/Zone/${id}/delete/`
    }).then((response)=>{
        getzone()
    })
    }

//////////////////update zone ///////////////////////////

const updatezone =(id)=>{
    localStorage.setItem('zoneId',id)
    window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/updateZone.html');
    }



    /////////////////////////////////add zone ///////////////////////////

    if(addZone){
        addZone.addEventListener('click',()=>{
            const data = {
                name: zoneName.value,
            }
            axios({
                method: "post",
                url: `http://127.0.0.1:8000/api/Zone/`,
                data: data
            }).then((response)=>{
                console.log(response);
                if(response.status === 201){
                    window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/zone.html')
                    showzone()
                }
            }).catch((error)=> {
                console.log(error);
                    msgzone.classList.remove('d-none');
                    msgzone.innerHTML = error.response.data.message;   
              })
        })
    }