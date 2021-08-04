function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) { 
  let currentlyBorrowed = 0; 
  for (let book in books) { 
  if (!books[book].borrows[0].returned) currentlyBorrowed++; 
} 
return currentlyBorrowed; 
};

function getMostCommonGenres(books) {
  let countObj = books.reduce((acc, {genre}) => {
    if (acc[genre]) {
      acc[genre]+=1;
    }
    else {
      acc[genre]=1;
    };
    return acc;
  },{});
  let sortedKeys = _sortObjectByValues(countObj);
  let sorted = sortedKeys.map((key)=> ({ name:key, count:countObj[key]})).slice(0,5);
  return sorted;
}

function _sortObjectByValues(obj){
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]){
      return -1;
    } else if (obj[keyB] > obj [keyA]){
      return 1;
    }
    return 0;
  })
};



function getMostPopularBooks(books) {
let sortedObj = books.sort(function (a,b){
  return b.borrows.length - a.borrows.length;
});
let topFive = sortedObj.slice(0,5);
let newArr = [];
for(let i= 0; i < topFive.length; i++){
  newArr.push({name: topFive[i].title, count:topFive[i].borrows.length});
}
return newArr;
}



function getMostPopularAuthors(books, authors) {
  let count = books.reduce((acc, {authorId, borrows}) =>{
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  },{})
  console.log(count);
  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }
  const sorted = _sortObjectByValues(count);
  //console.log(sorted);
  return sorted.map((authorId) => {
    const {
      name:{first, last},
    } = authors.find(({id}) => id === Number(authorId))
    //console.log(count[authorId])
    const name = `${first} ${last}`;
    return {name, count: count[authorId]};
  }).slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
