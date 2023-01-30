const bookNameField = document.querySelector("#book_name");
const bookAuthorField = document.querySelector("#book_author");
const bookIsbnField = document.querySelector("#isbn");

// Book constructor
class Book {
  constructor(author, title, isbn) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
  }
}

// UI constructor
class UI {
  // Add book
  addBook(book) {
    let tBody = document.querySelector(".book-list");
    let row = document.createElement("tr");
    row.innerHTML = ` 
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="delete">Delete</a></td>
  `;
    tBody.appendChild(row);
  }

  // Clear Fields
  clearFields() {
    bookNameField.value = "";
    bookAuthorField.value = "";
    bookIsbnField.value = "";
  }

  // Delete Book
  deleteBook(e) {
    e.target.parentElement.parentElement.remove();
  }

  // Show Alert
  showAlert(message, type) {
    let div = document.createElement("div");
    let bookForm = document.getElementById("book-form");
    let parent = bookForm.parentElement;
    div.className = `alert alert-${type}`;
    div.appendChild(document.createTextNode(message));
    console.log(bookForm, parent);
    parent.insertBefore(div, bookForm);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// Event listeners
const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const book_name = bookForm.querySelector("#book_name").value;
  const author = bookForm.querySelector("#book_author").value;
  const isbn = bookForm.querySelector("#isbn").value;
  const ui = new UI();
  if (book_name == "" || author == "" || isbn == "") {
    ui.showAlert("Please fill all the fields", "danger");
  } else {
    const book = new Book(book_name, author, isbn);
    console.log(book);
    ui.addBook(book);
    ui.showAlert("Book added successfully", "success");
    ui.clearFields();
  }
});
document.querySelector(".book-list").addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.classList.contains("delete")) {
    e.preventDefault();
    console.log(e.target);
    const ui = new UI();
    ui.deleteBook(e);
  }
});
