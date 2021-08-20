
     var modalBtn = document.getElementById("add-user");
var modal1=document.getElementById("myModal")
var close=document.getElementsByClassName("close1")
modalBtn.onclick=function(){
  console.log("in modal")
  modal1.style.display="block";
}
close[0].onclick=function(){
  modal1.style.display="none";
}

async function getData()
{
    let data= await fetch("https://611f26309771bf001785c71e.mockapi.io/users");
    let userData=await data.json();
    console.log(userData);
   
    createUser(userData);
}
 getData();
container=document.getElementById("container")

function createUser(a)
{ console.log("in")
 container.innerHTML=` `
a.forEach(b =>
  { 
   let tdate =new Date(b.createdAt).toDateString()
  container.innerHTML += ` 
 <div class="shareContainer"> 
      <div><img class=profile id=image src=${b.avatar}></div>                  
       <div ><p id="name" > ${b.name}</p><p id="date">${tdate}</p></div>
      <div>
        <div><button  class=" btn button" data-toggle="modal" data-target="#editModal" onclick="editModal(${b.id})">Edit</button></div>
        <div><button class=" btn button" onclick="deleteUser(${b.id})">Delete</button></div>
      </div>                            
</div>`
   }
  
   )
}

async function  deleteUser(id)
{
 let data= await fetch(`https://611f26309771bf001785c71e.mockapi.io/users/${id}`,
                {method:"delete"
                 })
 let user= await data.json();
  console.log(user)
  getData();
}

async function addUser()
{
  modal1.style.display="none";
  name=document.querySelector("#username").value;
  avatar=document.querySelector("#avatar").value;
  date=new Date().toISOString();
  console.log(name,avatar,date);
  post=await fetch("https://611f26309771bf001785c71e.mockapi.io/users",
 {
   method:"post",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      createdAt: date,
       name: name,
       avatar: avatar
    })
  })
  data=await post.json();
  getData();
  document.querySelector("#username").value='';
  document.querySelector("#avatar").value=' ';
}
let Uid
async function editModal(id)
{
  let data= await fetch(`https://611f26309771bf001785c71e.mockapi.io/users/${id}`);
  user=await data.json()
   username=document.querySelector("#username1");
   avatar=document.querySelector("#avatar1");
   Uid=user.id;
   username.value=user.name;
   avatar.value=user.avatar;
  console.log(user)
}

async function editUser()
{
  username=document.querySelector("#username1").value;
   avatar=document.querySelector("#avatar1").value;
   console.log(username,avatar)

   put=await fetch(`https://611f26309771bf001785c71e.mockapi.io/users/${Uid}`,
 {
   method:"put",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
       name: username,
       avatar: avatar
    })
  })
  console.log(put)
  getData();
}
