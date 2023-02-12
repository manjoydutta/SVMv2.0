const user = sessionStorage.getItem("user");
const logged_in_user = document.querySelector("#voter-id");
logged_in_user.textContent = user;
document.getElementById('log-out-btn').addEventListener('click',function(){
      location.replace("../index.html");});