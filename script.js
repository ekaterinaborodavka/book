function showModal (){
    var mod = document.querySelector('.modal');
    mod.setAttribute('class', 'active');
    var filter = document.querySelector('.filter');
    filter.setAttribute('class', 'active_filter');
};
var addBook = document.querySelector('.add_book');
    addBook.addEventListener('click', showModal);

function cancelModal (){
    var mod = document.querySelector('.active');
    mod.setAttribute('class', 'modal');
    var filter = document.querySelector('.active_filter');
    filter.setAttribute('class', 'filter');
    reset ();
    
    var editBook = document.querySelector('#'+parentLiId);
    if(editBook){
       editBook.classList.remove('edit');
       }
};
var cancel = document.querySelector('.cancel');
    cancel.addEventListener('click', cancelModal);

function reset (){
    var book = document.querySelector('#title_book').value = '',
        author = document.querySelector('#title_author').value = '',
        friend = document.querySelector('#title_friend').value = '',
        until = document.querySelector('#title_until').value = '',
        checkbox = document.querySelector('#title_checkbox').checked = '';
}

class Books{
    constructor(book,author,friend, until){
        this.book = book;
        this.author = author;
        this.friend = friend;
        this.until = until;
    }
}
Books.order=1;
Books.listId=1;

var save = document.querySelector('.save');
    save.addEventListener('click', saveBook);

var parentLiId;

function saveBook(){
    var book = document.querySelector('#title_book').value,
        author = document.querySelector('#title_author').value,
        friend = document.querySelector('#title_friend').value,
        until = document.querySelector('#title_until').value,
        bookCheckbox = document.querySelector('#title_checkbox'),
        editBook = document.querySelector('#'+parentLiId);
        newBook = new Books (book,author,friend, until);
    
    if(newBook.book&&newBook.author&&newBook.friend&&newBook.until&&!bookCheckbox.checked&&!editBook){
            addNewBook(newBook);
            cancelModal ();
       }else if(bookCheckbox.checked){
            deleteBook(parentLiId);
            Books.order--;
       }else if(editBook){
            var  bookEdit = editBook.querySelector('.book_title .book_name'),
            authorEdit = editBook.querySelector('.book_title .book_author'),
            friendEdit = editBook.querySelector('.book_info .book_friend'),
            untilEdit = editBook.querySelector('.book_info .book_until');
           
            bookEdit.innerHTML = newBook.book;
            authorEdit.innerHTML = 'from ' + newBook.author;
            friendEdit.innerHTML = newBook.friend;
            untilEdit.innerHTML = newBook.until;
           
            editBook.classList.remove('edit');
            parentLiId = 'nan';
            
            cancelModal ();
       }else {
            cancelModal ();
       }
}

function addNewBook(newBook){
    var bookList = document.querySelector('.book_list');
    
    var totalBook = document.querySelector('.total_book');
    totalBook.innerHTML = 'You have lent '+ Books.order +' books to friends';
    
    var totalLent = document.querySelector('.total_lent');
    totalLent.innerHTML = 'Lent to:';
    
    var bookItem = document.createElement('li');
    bookItem.className='book_item';
    bookItem.setAttribute('id', 'list_id'+Books.listId++);
    
    var number = document.createElement('div');
    number.className = 'number';
    number.innerHTML = Books.order++;
    
    var bookTitle = document.createElement('div');
    bookTitle.className = 'book_title';
    
    var bookName = document.createElement('div');
    bookName.className = 'book_name';
    bookName.innerHTML = newBook.book;
    
    var bookAuthor = document.createElement('div');
    bookAuthor.className = 'book_author';
    bookAuthor.innerHTML = 'from ' + newBook.author;
    
    bookTitle.appendChild(bookName);
    bookTitle.appendChild(bookAuthor);
    
    var bookInfo = document.createElement('div');
    bookInfo.className = 'book_info';
    
    var bookFriend = document.createElement('div');
    bookFriend.className = 'book_friend';
    bookFriend.innerHTML = newBook.friend;
    
    var bookUntil = document.createElement('div');
    bookUntil.className = 'book_until';
    bookUntil.innerHTML = newBook.until;
    
    bookInfo.appendChild(bookFriend);
    bookInfo.appendChild(bookUntil);
    
    var bookButton = document.createElement('button');
    bookButton.className = 'book_button';
    bookButton.type = 'button';
    bookButton.addEventListener('click', showChangeModal);
    
    var imgButton = document.createElement('img');
    imgButton.src = 'img/menu.png';
    imgButton.className = 'button_img';
    
    bookButton.appendChild(imgButton);
    
    bookItem.appendChild(number);
    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookInfo);
    bookItem.appendChild(bookButton);
    
    bookList.appendChild(bookItem);
    reset ();
}
 
function showChangeModal(){
    var checkbox = document.querySelector('.checkbox');
    checkbox.setAttribute('id', 'active_checkbox');
    
    var parentLi = this.parentNode;
    parentLiId = parentLi.getAttribute('id');
    parentLi.classList.add('edit');
    
    document.querySelector('#title_book').value = parentLi.querySelector('.book_title .book_name').textContent,
    document.querySelector('#title_author').value = parentLi.querySelector('.book_title .book_author').textContent,
    document.querySelector('#title_friend').value = parentLi.querySelector('.book_info .book_friend').textContent,
    document.querySelector('#title_until').value = parentLi.querySelector('.book_info .book_until').textContent; 
    
    showModal ();
}

function deleteBook(value){
    var bookList = document.querySelector('.book_list');
    bookItem = document.querySelector('#'+value);
    bookList.removeChild(bookItem);
    
    var checkbox = document.querySelector('.checkbox');
    checkbox.removeAttribute('id');
    
    var num = document.querySelectorAll('.number'),
    changeNum = 1;
    for(i=0; i<num.length; i++){
        num[i].innerHTML = changeNum;
        changeNum++;
    }
    cancelModal ();
}
