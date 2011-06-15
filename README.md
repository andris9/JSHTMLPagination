# JSHTMLPagination

**JSHTMLPagination** is a small library to achieve pagination in modern browsers (currently supported Chrome and Safari).

## Usage

To paginate you need a container which is going to be the pagination *window* and some text to paginate.

    var pager = new JSHTMLPagination(container_elm, html_to_paginate);
    
To control the behavior you can use the following methods

    pager.next(); // to show next page
    
and

    pager.previous(); // to show previous page

    
See example.html for a better example or [this demo](http://tahvel.info/pagination/example.html).