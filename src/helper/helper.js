function createTime() {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var date = new Date();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
 
    return monthNames[monthIndex] + " " + year;
  }

  function _toArray(obj) {
    let temp = [];
    for (let item in obj) {
      if (obj.hasOwnProperty(item)) {
        const postsList = {
          id: item,
          author: obj[item].author,
          htmlCode: obj[item].htmlCode,
          cssCode: obj[item].cssCode,
          jsCode: obj[item].jsCode,
          tags: obj[item].tags,
          title: obj[item].title,
          createdAt: obj[item].createdAt
        };
        temp.push(postsList);
      }
    }

    return temp;
  }

  export { createTime, _toArray };