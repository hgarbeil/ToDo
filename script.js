const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
const removeBtn = document.getElementById("removeButton");

let list = JSON.parse(localStorage.getItem("list")) ;
if(list){
list.forEach(li0=>{
    todoList(li0) ;
    inputEl.style.borderBottomLeftRadius = "0px";
    inputEl.style.borderBottomRightRadius = "0px";
});

} else {
    inputEl.style.borderBottomLeftRadius = "5px";
    inputEl.style.borderBottomRightRadius = "5px";
}


formEl.addEventListener("submit", (event)=>{
    event.preventDefault() ;
    todoList() ;

}) ;
removeBtn.addEventListener("click",()=>{
    ulEl.innerHTML = "" ;
    localStorage.clear() ;
}) ;



function todoList(task) {
    let newTask = "" ;
    if (task){
        newTask = task.name ;
    }
    else {
        newTask = inputEl.value ;
    }
    const liEl = document.createElement("li");
    liEl.innerText = newTask ;
    ulEl.appendChild(liEl) ;
    inputEl.value="" ;
    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `<i class="fas fa-square-check"></i>`;
    liEl.appendChild(checkBtnEl) ;
    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
    liEl.appendChild(trashBtnEl) ;
    if (task && task.checked){
        liEl.classList.add("checked") ;
    }
    updateLocalStorage() ;

    checkBtnEl.addEventListener("click", ()=>{
        liEl.classList.toggle("checked") ;
         updateLocalStorage();
    }) ;
    trashBtnEl.addEventListener("click",()=>{
        liEl.remove() ;
        updateLocalStorage();
    });

}

function updateLocalStorage (){
    const liEls = document.querySelectorAll("li") ;
    let mylist =[] ;
    liEls.forEach(liEl=>{
        mylist.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked") 
        })
    }) ;
    localStorage.setItem("list", JSON.stringify(mylist));

}