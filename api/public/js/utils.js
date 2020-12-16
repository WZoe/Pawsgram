// special fields for categories
let categories = {
    "General": {},
    "Activity":{},
    "Memorial":{},
    "Weight Tracking":{"weight":"float"},
    "Vaccination":{"vac_name":"string"},
    "Vet Visit":{"reason":"string","medication":"string"}
};

function compareDates(day1, day2){
    let arr1 = day1.split('/');
    let year1 = parseInt(arr1[0]);
    let month1 = parseInt(arr1[1]);
    let date1 = parseInt(arr1[2]);
    let arr2 = day2.split('/');
    let year2 = parseInt(arr2[0]);
    let month2 = parseInt(arr2[1]);
    let date2 = parseInt(arr2[2]);
    if(year1==year2 && month1==month2 && date1==date2){
        return 0;
    }
    else if(year1 != year2){
        return year1-year2;
    }
    else if(month1 != month2){
        return month1-month2;
    }
    else{
        return date1-date2;
    }
}

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
    let memorial_dates = [];
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
        memorial_dates.push({"name":" -- "+i+" Year Memorial","date":year+'/'+month+'/'+date});
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
        memorial_dates.push({"name":" -- "+i+" Month Memorial","date":year+'/'+month+'/'+date});
    }
    return memorial_dates;
}

function binarySearch(array, today){
    //console.log("events:",array);
    let l = 0, h = array.length-1;
    let mid;
    let res = -1;
    while(h < array.length && l <= h){
        mid = parseInt((l+h+1)/2);
        //console.log("low:",l,"\tmid:",mid,"\thigh:",h);
        if(compareDates(array[mid].date, today) > 0){
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

// exports
module.exports = {
    categories: categories,
    months: months,
    compareDates: compareDates,
    checkLeapYear: checkLeapYear,
    getNextMonth: getNextMonth,
    getMemorialEventDates: getMemorialEventDates,
    binarySearch: binarySearch
}