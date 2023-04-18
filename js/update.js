let update = document.getElementById('update')
let title = document.getElementById('title')








////////////////get classificationsById ////////////////////////
const getClassId = ()=>{

    axios({
        method:"get",
        url:`http://127.0.0.1:8000/api/Classification/${localStorage.getItem('classId')}/`
    }).then((response)=>{
        if(response.status ===200){
            title.value = response.data.title;
        }
    }).catch((error)=> {
        console.log(error);
      })
}
getClassId()

/////update classificationsById ////////////////////////

 if(update){
    update.addEventListener('click',()=>{
        const data = {
            title: title.value
        }
        axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/Classification/${localStorage.getItem('classId')}/update/`,
            data: data,
        }).then((response)=>{
           if(response.status ===200){
            window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/classification.html');
           }
        }).catch((error)=> {
            msgClass.classList.remove('d-none');
          })
    })
 }   















