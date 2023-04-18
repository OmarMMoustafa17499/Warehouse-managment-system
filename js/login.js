const userName = document.getElementById('name');
const userPassword = document.getElementById('password');
const Btn = document.getElementById('signin');


Btn.addEventListener('click', () => {

    const data = {
        username: userName.value,
        password: userPassword.value
    }

    axios({
        method: 'post',
        url: `http://127.0.0.1:8000/api/Signin/`,
        data,
    }).then((response) => {
        if(response.data.access){
            localStorage.setItem('token', response.data.access)
            window.location.replace('C:/Users/OMAR/Desktop/Omar_Web/omar/omar/dashboard.html')
        }
    }).catch((error)=> {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Please check your username or password"
          })
      })
    })


