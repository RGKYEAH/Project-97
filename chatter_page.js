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
    room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data);

    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];

    name_tag = "<h4>" + name +"<img src='tick.png' class='user_tick'></h4>";
    message_tag = "<h4 class='message_h4'>"+ message +"</h4>";
    like_button = "<button class='btn btn-warning' id="+firebase_message_id +"value ="+like+" onclick='Update_like(this.id)'>";
    span_tag = "<span class='glyphicon glyphicon-thumbs-up'>LIKE : "+like +"</span></button><hr>";

    row = name_tag + message_tag + like_button + span_tag;
    document.getElementById("output").innerHTML += row;
//End code
    } });  }); }
getData();


function Send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });
    document.getElementById("msg").value = "";
}

function Update_like(message_id) {
    console.log("clicked on like button-" +message_id);
    button_id =message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
          like :updated_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}