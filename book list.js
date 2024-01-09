const formContianer = document.querySelector(".form");
const addButton = document.querySelector(".AddBook");

const formTitel = document.querySelector("#bookName");
const formAuthor = document.querySelector("#bookAuthor");
const formYear = document.querySelector("#bookYear");

const tableform = document.querySelector(".tablebook");

//تعریف آرایه
let listbook = [];
initiateBooks();
addButton.addEventListener("click", function getinformation(e) {
  e.preventDefault();
  //تعریف متغییر برای مقدار دریافتی از اینپوت
  let titleInputValue = formTitel.value;
  let authorInputValue = formAuthor.value;
  let yearInputValue = formYear.value;
  //تعریف ابجکت
  let newBookObject = {
    id: listbook.length + 1,
    title: titleInputValue,
    author: authorInputValue,
    year: yearInputValue,
  };
  //اضافه کردن مقدار به آرایه
  listbook.push(newBookObject);

  setIntoLocalStorage(listbook);
  insertNewRow(listbook);
  makeEmptyInputs();
});

// ست کردن در لوکال استوریج وتبدیل به جیسان
function setIntoLocalStorage(allBooks) {
  localStorage.setItem("listbook", JSON.stringify(allBooks));
}

// خالی کردن مقدار اینپوت در نهایت
function makeEmptyInputs() {
  formTitel.value = " ";
  formAuthor.value = " ";
  formYear.value = " ";
}
function createHeader() {
  tableform.innerHTML = `<thead class="information-book">
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Year</th>
  </tr>
  </thead>
  <tbody id="book-list">  `;
}
function insertNewRow(allBooks) {
  if (allBooks.length == 1) {
    createHeader();
  }
  let newBook = allBooks[allBooks.length - 1];
  tableform.innerHTML += `
  <table>
   <tbody class="book-all">
      <tr>
        <th>${newBook.title}</th>
        <th>${newBook.author}</th>
        <th>${newBook.year}</th>
      </tr>
    </tbody>
  </table>`;
}

function initiateBooks() {
  let allBooks = localStorage.getItem("listbook");
  if (allBooks) {
    let books = JSON.parse(allBooks);
    listbook = books;
    if (books.length > 0) {
      createHeader();
    }
    books.forEach((b) => {
      tableform.innerHTML += `
      <table>
      <tbody class="book-all">
         <tr>
        <th>${b.title}</th>
        <th>${b.author}</th>
       <th>${b.year}</th>
    </tr>
    </tbody>
    </table>`;
    });
  }
}
