function scrollToSection(id){
    let section = document.getElementById(id);

    window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
    });
}

window.addEventListener("scroll", function(){

    let sections = ["about","how","info","login"];

    let scrollPos = window.scrollY + 150; 

    sections.forEach(function(sec){
        let section = document.getElementById(sec);
        let nav = document.getElementById("nav-" + sec);

        let top = section.offsetTop;
        let bottom = top + section.offsetHeight;

        if(scrollPos >= top && scrollPos < bottom){

            document.querySelectorAll(".navItem").forEach(item=>{
                item.classList.remove("active");
            });

            nav.classList.add("active");
        }
    });

});

function validateForm(){

    var username = document.forms["login"]["username"].value.trim(); 

    var pattern = /^[A-Za-z\d_]+$/; 

    if(username === ""){
        alert("Username cannot be empty!");
        return false;
    }

    if(!pattern.test(username)){
        alert("Only letters, numbers, and underscores allowed!");
        return false;
    }

    var existingUser = localStorage.getItem("username");

    if(existingUser && existingUser === username){
        alert("Welcome back, " + username + "!");
    }

    localStorage.setItem("username", username);

    return true;
}

window.onload = function(){
    var user = localStorage.getItem("username");

    if(user){
        document.getElementById("greeting").innerText =
            "Welcome back, " + user;
    }
}
