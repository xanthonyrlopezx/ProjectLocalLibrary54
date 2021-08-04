function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
let lastName = accounts.sort((lastA, lastB) =>
  lastA.name.last.toLowerCase() > lastB.name.last.toLowerCase() ? 1 : -1
);
return lastName;
}


function getTotalNumberOfBorrows(account, books) {
let num = 0;
for(let book of books){
  let ids = book.borrows.map((borrow)=> borrow.id);
  for(let i = 0;i<ids.length;i++){
    if(ids[i]===account.id) 
    num++;
  }
};
return num;
};




function getBooksPossessedByAccount(account, books, authors) {
  let accountId = account.id;
  let bookCheckouts = books.filter(book => book.borrows[0].id === accountId);
  for (let i=0; i < bookCheckouts.length; i++) {
    bookCheckouts[i].author = authors.find(author =>  bookCheckouts[i].authorId === author.id); 
  }
    return bookCheckouts;
};



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
