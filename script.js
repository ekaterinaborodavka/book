'use strict';

let addBook = document.querySelector('.add_book'),
    cancel = document.querySelector('.cancel'),
    save = document.querySelector('.save'),
    book = document.querySelector('#title_book'),
    author = document.querySelector('#title_author'),
    friend = document.querySelector('#title_friend'),
    until = document.querySelector('#title_until'),
    bookList = document.querySelector('.book_list'),
    totalBook = document.querySelector('.total_book'),
    parentLiId;

    addBook.addEventListener('click', showModal);
    cancel.addEventListener('click', cancelModal);
    save.addEventListener('click', saveBook);

function showModal (){
    document.querySelector('.modal').setAttribute('class', 'active'),
    document.querySelector('.filter').setAttribute('class', 'active_filter');
}

function cancelModal (){
    document.querySelector('.active').setAttribute('class', 'modal'),
    document.querySelector('.active_filter').setAttribute('class', 'filter');
    reset ();
    parentLiId = 'n';
}

function reset (){
    book.value = '',
    author.value = '',
    friend.value = '',
    until.value = '',
    document.querySelector('#title_checkbox').checked = '';
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

function saveBook(){
    let bookCheckbox = document.querySelector('#title_checkbox'),
        editBook = document.querySelector('#'+parentLiId),
        newBook = new Books (book.value, author.value, friend.value , until.value);
    
    if(newBook.book&&newBook.author&&newBook.friend&&newBook.until&&!bookCheckbox.checked&&!editBook){
            addNewBook(newBook);
            cancelModal ();
       }else if(bookCheckbox.checked){
            Books.order--;
            deleteBook(parentLiId);
       }else if(editBook){

            editBook.querySelector('.book_title .book_name').innerHTML = newBook.book,
            editBook.querySelector('.book_title .book_author').innerHTML ='from ' + newBook.author,
            editBook.querySelector('.book_info .book_friend').innerHTML = newBook.friend,
            editBook.querySelector('.book_info .book_until').innerHTML = newBook.until;
           
            editBook.classList.remove('edit');
            parentLiId = 'n';
            
            cancelModal ();
       }else {
            cancelModal ();
       }
}

function addNewBook(newBook){
    let totalLent = document.querySelector('.total_lent'),
        bookItem = document.createElement('li'),
        number = document.createElement('div'),
        bookTitle = document.createElement('div'),
        bookName = document.createElement('div'),
        bookAuthor = document.createElement('div'),
        bookInfo = document.createElement('div'),
        bookFriend = document.createElement('div'),
        bookUntil = document.createElement('div'),
        bookButton = document.createElement('button'),
        imgButton = document.createElement('img'),
        dat;
    
        totalBook.innerHTML = 'You have lent '+ Books.order +' books to friends';
        totalLent.innerHTML = 'Lent to:';
    
        bookItem.className='book_item';
        bookItem.setAttribute('id', 'list_id'+Books.listId++);
        
        number.className = 'number';
        number.innerHTML = Books.order++;
    
        bookTitle.className = 'book_title';
    
        bookName.className = 'book_name';
        bookName.innerHTML = newBook.book;
    
        bookAuthor.className = 'book_author';
        bookAuthor.innerHTML = 'from ' + newBook.author;
    
        bookTitle.appendChild(bookName);
        bookTitle.appendChild(bookAuthor);
    
        bookInfo.className = 'book_info';
    
        bookFriend.className = 'book_friend';
        bookFriend.innerHTML = newBook.friend;
    
        bookUntil.className = 'book_until';
        bookUntil.innerHTML = newBook.until;
    
        bookInfo.appendChild(bookFriend);
        bookInfo.appendChild(bookUntil);
    
        bookButton.className = 'book_button';
        bookButton.type = 'button';
        bookButton.addEventListener('click', showChangeModal);
    
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
    let checkbox = document.querySelector('.checkbox'),
        parentLi = this.parentNode;
    
        checkbox.setAttribute('id', 'active_checkbox');

        parentLiId = parentLi.getAttribute('id');
        parentLi.classList.add('edit');

        book.value = parentLi.querySelector('.book_title .book_name').textContent,
        author.value = parentLi.querySelector('.book_title .book_author').textContent.slice(5,),
        friend.value = parentLi.querySelector('.book_info .book_friend').textContent,
        until.value = parentLi.querySelector('.book_info .book_until').textContent; 

        showModal ();
}

function deleteBook(value){
    let bookItem = document.querySelector('#'+value),
        checkbox = document.querySelector('.checkbox');
    
        bookList.removeChild(bookItem);
        checkbox.removeAttribute('id');
    
    let num = document.querySelectorAll('.number'),
        changeNum = 1;
    for(let i=0; i<num.length; i++){
        num[i].innerHTML = changeNum;
        changeNum++;
        totalBook.innerHTML = 'You have lent '+ num[num.length-1].textContent +' books to friends';
    }
    cancelModal ();
}
