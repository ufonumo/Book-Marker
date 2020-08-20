// listen for form submit
document.getElementById('my-form').addEventListener('submit', saveBookmark);

// function for the savebook
function saveBookmark(e){
    // get form value
    var siteName = document.getElementById('site-name').value;
    var siteUrl = document.getElementById('site-url').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //local storage test
    // localStorage.setItem('test', 'Hello word');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test')
    // console.log(localStorage.getItem('test'));

    // test bookmarks
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        // add to the array
        bookmarks.push(bookmark);
        //set to local storage; json.stringify will turn JSON into a string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    else{
        // get bookmarks from localstorage; json.parse will turn a string into JSON
    var bookmarks = JSON.parse (localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // reset it back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
        // clear form
        document.getElementById('my-form').reset();

        // prevents form from submitting
        e.preventDefault();

        // refetch bookmarks
        fetchBookmarks();
}

function deleteBookmark(url){
    // get the bookmarks from the local storage
    var bookmarks = JSON.parse (localStorage.getItem('bookmarks'));
    //loop through the bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // remove the url from the array
            bookmarks.splice(i, 1);
        }
    }
    // reset it back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    // refetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
   // get bookmarks from localstorage; json.parse will turn a string into JSON
   var bookmarks = JSON.parse (localStorage.getItem('bookmarks'));

   //fetch output id
   var bookmarksResults = document.getElementById('bookmarksResults');

   // build the output
   bookmarksResults.innerHTML= "";
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' + 
                                    '   <h3>' + name +
                                        '<div class="book"> ' +
                                    '       <a class="btn btn-primary" target="_blank" href="'+url+'">Visit </a>' +
                                    '       <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete </a>' +
                                        '</div>' +
                                     '  </h3>' + 
                                    '</div>';
    }
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}