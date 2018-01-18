/*{
 rows: [
  ["Lisa", 16, "Female", "2000-12-01"],
  ["Bob", 22, "Male", "1996-01-21"]
 ],
 metaData: [
  {name: "name", note: ''},
  {name: "age", note: ''},
  {name: "gender", note: ''},
  {name: "birthday", note: ''}
 ]
}
rows是数据，metaData是对数据的说明。现写一个函数，将上面的Object转化为期望的数组：

[
 {name: "Lisa", age: 16, gender: "Female", birthday: "2000-12-01"},
 {name: "Bob", age: 22, gender: "Male", birthday: "1996-01-21"},
]*/
const data = {
    rows: [
        ["Lisa", 16, "Female", "2000-12-01"],
        ["Bob", 22, "Male", "1996-01-21"]
    ],
    metaData: [{
        name: "name",
        note: ''
    }, {
        name: "age",
        note: ''
    }, {
        name: "gender",
        note: ''
    }, {
        name: "birthday",
        note: ''
    }]
}
function translateData(data){
    let newData = data.rows.map(item => {
        let obj = {}
        data.metaData.forEach((keyItem, index) => {
            obj[keyItem.name] = item[index];
        })
        return obj;
    })
    return newData;
}
// console.log(translateData(data))

/*
写一个函数，判断给定的日期是几月的第几周，当月1日属于上一月的，该周计入上一月。例如：
1）输入日期2016-02-01，返回结果为2-1，表示2016年2月1日属于2月的第一周；
2）输入日期2016-09-01，返回结果为8-5，表示2016年9月1日属于8月的第五周。
*/
function getDays(year, month) {

    var days;
    //当月份为二月时，根据闰年还是非闰年判断天数
    if (month == 2) {
        days = year % 4 == 0 ? 29 : 28;

    } else if (!(month+'').replace(/(1|3|5|7|8|10|12)/, '')) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31;
    } else {
        //其他月份，天数为：30.
        days = 30;

    }
    return days;
}
function getWeek(date){
    let currDate = new Date(date.toString().replace('-', ','));
    let week = currDate.getDay()==0?7:currDate.getDay();
    let day = currDate.getDate();
    let month = currDate.getMonth()+1;
    let year = currDate.getFullYear();
    let preMonthDays = month>1?getDays(year, month-1):getDays(year-1, 12);
    if(day<8){
        if(week<=day){
            return `${year}年${month}月${day}日:${month}-1`
        }else{
            month = month>1?(month-1):12;
            return `${year}年${month+1}月${day}日:${(month)}-${(Math.floor((preMonthDays-week+1)/7)+1)}`;
        }
    }else{
        return `${year}年${month}月${day}日:${month}-${Math.floor((day-week+1)/7)+1}`
    }
}
console.log(getWeek('2016-09-01'))