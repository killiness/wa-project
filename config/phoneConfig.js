const titles = ["917503", "918000", "917504", "919000", "918005"];

var starts = [307, 307, 307, 307, 307];

function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

function getNumber(title, count) {
    num = title + pad(count, 6);
    return num;
}

exports.book = function () {
    let title_count = Math.ceil(Math.random() * 5) - 1;
    var title = titles[title_count];
    var count = starts[title_count] + 1;
    starts[title_count]++;
    return getNumber(title , count);
}