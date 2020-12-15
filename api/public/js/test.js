$(document).ready(function (){
    // users
    $("#register").click(function (){
        $.post("/users/signUp", { username: "Eimee", password: "eimee"},
            function(data, status){
                console.log(data, status);
            });
    });

    $("#changeUserInfo").click(function (){
        $.post("/users/changeInfo",
            {
                username: "Eimee",
                password: "eimee",
                pet_name: "Brownie",
                avatar: "photo2.png",
                gender: "male",
                breed: "feline",
                color: "brown tabby",
                birthday: "2020/07/31" },
            function(data, status){
                console.log(data, status);
            });
    });

    $("#login").click(function (){
        $.post("/users/login", { username: "Eimee", password: "eimee"},
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
        $.post("/users/getCurrentUser",
            function(data, status){
                console.log(data, status);
            });
    });

    // events
    $("#createEvent").click(function (){
        $.post("/events/create",
            // {
            //     title: "weight tracking",
            //     category: "Weight Tracking",
            //     date: "2020/12/15",
            //     description: "Graylind's weight description",
            //     likes: 5,
            //     private: false,
            //     photo: "",
            //     location: "St. Louis",
            //     weight: 3.3
            // },
            // {
            //     title: "vaccination",
            //     category: "Vaccination",
            //     date: "2020/12/15",
            //     description: "vaccination",
            //     likes: 5,
            //     private: false,
            //     photo: "",
            //     location: "St. Louis",
            //     vac_name: "Rabies"
            // },
            {
                title: "vet visit",
                category: "Vet Visit",
                date: "2020/12/15",
                description: "vet visit",
                likes: 5,
                private: false,
                photo: "",
                location: "St. Louis",
                reason: "dental issues",
                medication: "xxx medication"
            },
            function(data, status){
                console.log(data, status);
            });
    });

    $("#timeline").click(function (){
        $.post("/events/timeline",
            {user_id: "5fd7c0501fb324782a89a9dd"},
            function(data, status){
                console.log(data, status);
            });
    });

    $("#foryou").click(function (){
        $.post("/events/forYou",
            function(data, status){
                console.log(data, status);
            });
    });

    $("#likeEvent").click(function (){
        $.post("/events/like",
            {event_id: "5fd8c8594251260f9c80c9b6"},
            function(data, status){
                console.log(data, status);
            });
    });
});