// setup codes generated by command: `npx express-generator api`
let express = require('express');
let router = express.Router();
let app = express();

// cite from: https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// citation ends

// mongodb
// cite from: https://expressjs.com/en/guide/database-integration.html#mongodb
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

// special fields for categories
let categories = {
    "General": {},
    "Activity":{},
    "Memorial":{},
    "Weight Tracking":{"weight":"float"},
    "Vaccination":{"vac_name":"string"},
    "Vet Visit":{"reason":"string","medication":"string"}
};

function checkLeapYear(year){
    return (year%4==0 && year%100!=0) || (year%400==0);
}

let months = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};

function getNextMonth(year, month, date){
    let lastDay = false;
    if(months[month] == date){ // last day of each month
        lastDay = true;
    }
    let newMonth = month==12 ? 1 : (month+1);
    let newDate = lastDay ? months[newMonth] : date;
    let newYear = month==12 ? (year+1) : year;
    return [newYear,newMonth,newDate];
}

function getMemorialEventDates(initial_date){
    let arr = initial_date.split('/');
    let ini_year = parseInt(arr[0]);
    let ini_month = parseInt(arr[1]);
    let ini_date = parseInt(arr[2]);
    if(checkLeapYear(ini_year)){
        months[2] = 29;
    }
    let memorial_dates = {};
    let year, month, date;
    // add anniversaries
    month = ini_month;
    date = ini_date;
    for(let i=1;i<=10;i++){
        year = ini_year+i;
        if(month==2 && date==29){ // last year is a leap year
            date = 28;
        }
        else if(checkLeapYear(year) && month==2 && date==28){ // this year is a leap year
            date = 29;
        }
        memorial_dates[i+" Year"] = year+'/'+month+'/'+date;
    }
    // add monthly memorial events
    year = ini_year;
    month = ini_month;
    date = ini_date;
    for(let i=1;i<=6;i++){
        let tmp = getNextMonth(year, month, date);
        year = tmp[0];
        month = tmp[1];
        date = tmp[2];
        memorial_dates[i+" Month"] = year+'/'+month+'/'+date;
    }
    return memorial_dates;
}

// create event
router.post('/create', function(req, res, next) {
    if(req.body.current_user_id){
        let new_event = {
            user_id: req.body.current_user_id,
            title: req.body.title,
            category: req.body.category,
            date: req.body.date,
            description: req.body.description,
            likes: 0,
            private: JSON.parse(req.body.private),
            photo: req.body.photo,
            location: req.body.location
        };
        // add special fields
        for(let field in categories[req.body.category]){
            if(categories[req.body.category][field] == "float"){
                new_event[field] = parseFloat(req.body[field]);
            }
            else if(categories[req.body.category][field] == "int"){
                new_event[field] = parseInt(req.body[field]);
            }
            else if(categories[req.body.category][field] == "bool"){
                new_event[field] = JSON.parse(req.body[field]);
            }
            else{
                new_event[field] = req.body[field];
            }
        }
        // generate past memorial events
        if(req.body.category=="Memorial"){
            let memorial_dates = getMemorialEventDates(req.body.date);
            memorial_dates.filter
        }
        // modified from: https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0
        MongoClient.connect('mongodb://localhost:27017', function (connectionErr, client) {
            if(connectionErr){
                res.send({success: false, msg: "DB connection failed."});
                throw connectionErr;
            }
            let db = client.db('Pawsgram');
            db.collection('events').insertOne(
                new_event,
                function(operationErr, event){
                    if(operationErr){
                        res.send({success: false, msg: "DB insertion failed."});
                        throw operationErr;
                    }
                    res.send({success: true, msg: "Successfully created event."});
                    client.close();
                });
        });
    }
});

// timeline: show all events for an user (others only show public events, mine show public+private events)
router.post('/timeline', function(req, res, next) {
    let user_id;
    if(req.body.user_id){
        user_id = req.body.user_id;
    }
    else{
        user_id = req.body.current_user_id;
    }
    // modified from: https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0
    MongoClient.connect('mongodb://localhost:27017', function (connectionErr, client) {
        if(connectionErr){
            res.send({success: false, msg: "DB connection failed."});
            throw connectionErr;
        }
        let db = client.db('Pawsgram');
        db.collection('events').find({user_id: user_id})
            .sort({date: -1})
            .toArray(
                function(operationErr, events){
                    if(operationErr){
                        res.send({success: false, msg: "DB find failed."});
                        throw operationErr;
                    }
                    // filter out private events for non-self users
                    if(user_id != req.body.current_user_id){
                        events = events.filter(event => event.private == false);
                    }
                    // get today's date
                    let today = new Date();
                    let todayStr = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
                    // detect if future events
                    for(let event_id=0; event_id<events.length;event_id++){
                        if(events[event_id].date > todayStr){
                            events[event_id].future = true;
                        }
                        else{
                            events[event_id].future = false;
                        }
                    }
                    // get insert id for today event
                    let insert_id = binarySearch(events, todayStr);
                    events.splice(insert_id, 0, {category:"Today", date:todayStr});
                    db.collection('users').findOne(
                        {_id: new ObjectID(user_id)},
                        {projection: {password: 0}},
                        function(operationErr2, user){
                        if(operationErr2){
                            res.send({success: false, msg: "DB find failed."});
                            throw operationErr2;
                        }
                        res.send({data: events, user: user, success: true, msg: "Successfully load timeline for user."});
                    });
                    client.close();
            });
    });
});

// for you page: show the latest public event for everyone
router.post('/forYou', function(req, res, next) {
    // modified from: https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0
    MongoClient.connect('mongodb://localhost:27017', function (connectionErr, client) {
        if(connectionErr){
            res.send({success: false, msg: "DB connection failed."});
            throw connectionErr;
        }
        let db = client.db('Pawsgram');
        let data = [];
        db.collection('users').find(
            {user_id: {$ne: req.body.current_user_id}},
            {projection: {password: 0}}
            )
            .toArray(
                function(operationErr, users){
                    if(operationErr){
                        res.send({success: false, msg: "DB find failed."});
                        throw operationErr;
                    }
                    for(let i=0; i<users.length; i++){
                        let user = users[i];
                        data.push({"user":user});
                        db.collection('events').find({user_id: user._id.toString()}) // user._id is ObjectID object, need to convert to string
                            .sort({date: -1})
                            .toArray(function(operationErr2, events){
                                if(operationErr2){
                                    res.send({success: false, msg: "DB find failed."});
                                    throw operationErr2;
                                }
                                // filter out private events for non-self users
                                if(user._id.toString() != req.body.current_user_id) {
                                    events = events.filter(event => event.private == false);
                                }
                                // get today's date
                                let today = new Date();
                                let todayStr = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
                                // get the latest event before tomorrow
                                let latest_id = binarySearch(events, todayStr);
                                // exclude all future events / no events
                                if(latest_id < events.length){
                                    data[i].event = events[latest_id];
                                }
                                // after last query
                                if(i == users.length-1){
                                    // do not display users with no past events
                                    data = data.filter(d => d.hasOwnProperty('event'));
                                    // order data by event date
                                    data.sort(function(a,b){return b.event.date - a.event.date});
                                    res.send({data: data, success: true, msg: "Successfully load for you page."});
                                }
                            });
                    }
                    client.close();
                });
    });
});

// like event
router.post('/like', function(req, res, next) {
    // modified from: https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0
    MongoClient.connect('mongodb://localhost:27017', function (connectionErr, client) {
        if(connectionErr){
            res.send({success: false, msg: "DB connection failed."});
            throw connectionErr;
        }
        let db = client.db('Pawsgram');
        db.collection('events').update(
            {_id: new ObjectID(req.body.event_id)},
            {$inc: {likes: 1}},
            function(operationErr, event){
                if(operationErr){
                    res.send({success: false, msg: "DB find failed."});
                    throw operationErr;
                }
                res.send({success: true, msg: "Successfully liked event "+req.body.event_id});
                client.close();
            });
    });
});

function binarySearch(array, today){
    //console.log("events:",array);
    let l = 0, h = array.length-1;
    let mid;
    let res = -1;
    while(h < array.length && l <= h){
        mid = parseInt((l+h+1)/2);
        //console.log("low:",l,"\tmid:",mid,"\thigh:",h);
        if(array[mid].date > today){
            res = mid;
            l = mid+1;
        }
        else{
            h = mid-1;
        }
    }
    res = res == -1 ? 0 : res+1;
    //console.log("res:",res);
    return res;
}

module.exports = router;

// TODO: for you include self
// TODO: automatically generate memorial events
// TODO: 服务器上传图片
