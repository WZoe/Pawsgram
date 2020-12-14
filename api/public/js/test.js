console.log("test.js");

$(document).ready(function (){
    $("#register").click(function (){
        $.post("/users/signUp", { username: "Zoe", password: "zoe"},
            function(data, status){
                console.log(data, status);
            });
    });

    $("#changeUserInfo").click(function (){
        $.post("/users/changeInfo",
            {
                username: "Zoe",
                password: "zoe",
                pet_name: "Graylind",
                avatar: "photo2.png",
                gender: "male",
                breed: "feline",
                color: "blue & white tabby",
                birthday: "2020/06/11" },
            function(data, status){
                console.log(data, status);
            });
    });

    $("#login").click(function (){
        $.post("/users/login", { username: "Zoe", password: "zoe"},
            function(data, status){
                console.log(data, status);
            });
    });

    $("#logout").click(function (){
        $.post("/users/logout",
            function(data, status){
                console.log(data, status);
            });
    });

    $("#getCurrentUser").click(function (){
        console.log("get current user");
        $.post("/users/getCurrentUser",
            function(data, status){
                console.log(data, status);
            });
    });

    $("#showEvents").click(function (){

    });

    $("#createEvent").click(function (){

    });

    $("#register").click(function (){

    });
});