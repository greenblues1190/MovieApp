function Util () { }

// yyyy-MM-dd to Date
Util.toDate = function(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    return new Date(y, m - 1, d);
};

// 날짜포맷 yyyy-MM-dd 변환
Util.getFormatDate = function(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
};

export default Util