document.addEventListener("DOMContentLoaded",function () {  

const mylist=[];
const button= document.getElementById("btn");
let itemlist= document.getElementById("itemslist");
const inputField=document.getElementById("item");
let clearButton;

if(localStorage.getItem("grocery")){
    const storeditems=JSON.parse(localStorage.getItem("grocery"));
    storeditems.forEach((item)=>{
        createElement(item);
        mylist.push(item)
       })
     
       itemlist.addEventListener("click",deleteItem)

}
button.addEventListener("click",(e)=>{
   e.preventDefault();
   let items= inputField.value ;
  if(items===""){
    alert("please enter something");
  }else{
   mylist.push(items)
   localStorage.setItem("grocery",JSON.stringify(mylist));
   
   // Clear existing content
   itemlist.innerHTML = "";
   mylist.forEach(item=>{
    createElement(item);
    items.innerText="";
    
})
inputField.value="";
itemlist.addEventListener("click",deleteItem)

// Show clear button if it's hidden
if (clearButton && clearButton.style.display === "none") {
    clearButton.style.display = "block";
}
  }
  
})


function createElement(item){
    let del="<i class='fa-solid fa-trash deleteitem 'style='font-size:15px;color:red'>delete</i>";
    let row= "<div class='rows'><span class='leftitem'>"+item+"</span><span class='rightitem'><input type='checkbox' value='"+item+"'><div class='tooltip'>"+del+"<span class='tooltiptext'>delete item</span></div></span></div>"
    itemlist.style.display="block"; 
    itemlist.insertAdjacentHTML("beforeend",row);
    // Remove clear button if it exists
    if (clearButton) {
        clearButton.remove();
    }

    // Add clear button after the last row
    createClearButton();
   
}
//addd clear button
function createClearButton() {
    clearButton = document.createElement('button');
 
    clearButton.id = 'clearButton';
    clearButton.textContent = 'Clear All';
 // Initially hide it
 clearButton.style.display = "none";
    clearButton.addEventListener('click', () => {
        // Clear all items and remove clear button
        itemlist.innerHTML = '';
        localStorage.removeItem("grocery");
        clearButton.style.display="none";
        mylist.length = 0; // Clear the array
    });
    
    itemlist.appendChild(clearButton);// Append to the body or appropriate parent element
    
}

function deleteItem(e){
    if (e.target.classList.contains('fa-solid')) {
        let row = e.target.closest('.rows');
        let index = Array.from(row.parentNode.children).indexOf(row);
        if (index !== -1) {
            // Remove the row from the HTML
            row.remove();
            // Remove the corresponding item from the array
            mylist.splice(index, 1);
            // Update the local storage
            localStorage.setItem("grocery", JSON.stringify(mylist));
        }
        if(mylist.length<1){
            clearButton.style.display = "none";
            mylist.length=0;
        }
    }

}


createClearButton();

})


