$(document).ready(function (){
    // users
    $("#register").click(function (){
        $.post("http://ec2-18-206-208-42.compute-1.amazonaws.com:3000/users/signUp", { username: "Test", password: "test"},
            function(data, status){
                console.log(data, status);
            });
    });

    $("#changeUserInfo").click(function (){
        $.post("http://ec2-18-206-208-42.compute-1.amazonaws.com:3000/users/changeInfo",
            {
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
        let username = $("#username").val();
        let password = $("#password").val();
        console.log("input username:",username,"\tinput password:",password);
        $.post("http://ec2-18-206-208-42.compute-1.amazonaws.com:3000/users/login", { username: username, password: password},
            function(data, status){
                console.log(data, status);
                console.log(data.success);
                console.log(data.msg);
            });
    });

    // $("#logout").click(function (){
    //     $.post("http://ec2-18-206-208-42.compute-1.amazonaws.com:3000/users/logout",
    //         function(data, status){
    //             console.log(data, status);
    //         });
    // });

    $("#getCurrentUser").click(function (){
        $.post("http://ec2-18-206-208-42.compute-1.amazonaws.com:3000/users/getCurrentUser",
            {current_user_id: "5fd921e26502451c005840ed"},
            function(data, status){
                console.log(data, status);
                console.log(data.logged_in);
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
            //     private: false,
            //     photo: "",
            //     location: "St. Louis",
            //     vac_name: "Rabies"
            // },
            // {
            //     title: "vet visit",
            //     category: "Vet Visit",
            //     date: "2020/12/15",
            //     description: "vet visit",
            //     private: false,
            //     photo: "",
            //     location: "St. Louis",
            //     reason: "dental issues",
            //     medication: "xxx medication"
            // },
            {
                current_user_id: "5fd921e26502451c005840ed",
                title: "adoption",
                category: "Memorial",
                date: "2020/02/29",
                description: "come to his new home!",
                private: false,
                photo: "photo.png",
                location: "St. Louis"
            },
            function(data, status){
                console.log(data, status);
            });
    });

    $("#timeline").click(function (){
        $.post("/events/timeline",
            // user_id: "5fd7c0501fb324782a89a9dd"
            {current_user_id: "5fd921e26502451c005840ed"},
            function(data, status){
                console.log(data, status);
            });
    });

    $("#foryou").click(function (){
        $.post("/events/forYou",
            {current_user_id: "5fd921e26502451c005840ed"},
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