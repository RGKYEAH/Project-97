var firebaseConfig = {
  apiKey: "AIzaSyBfZrDDmhc2W4Yak-YggRKyklMniEJoDRg",
  authDomain: "project-97-a726f.firebaseapp.com",
  databaseURL: "https://project-97-a726f-default-rtdb.firebaseio.com",
  projectId: "project-97-a726f",
  storageBucket: "project-97-a726f.appspot.com",
  messagingSenderId: "456643736425",
  appId: "1:456643736425:web:b962405c4174dce60703f8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML = "Welcome "+ user_name+ "!";

  function addroom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
          purpose : "adding_room_name"
    });
    localStorage.setItem("room_name",room_name);
    window.location = "Chatter_page.html";
  }

  function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
   //Start code
   console.log("Room_name "+Room_names);
   row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div> <hr>";
   document.getElementById("output").innerHTML += row;
   //End code
   });});}
  getData();


function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name",name);
    window.location = "Chatter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}