# JSHTMLPagination

**JSHTMLPagination** is a small library to achieve pagination of arbitrary HTML in modern browsers (currently supported Chrome and Safari).

## Usage

To paginate you need a container which is going to be the pagination *window* and some text to paginate.

    var pager = new JSHTMLPagination(container_elm, html_to_paginate);
    
To control the behavior you can use the following methods

    pager.next(); // to show next page
    
and

    pager.previous(); // to show previous page

    
See example.html for a better example or [this demo](http://tahvel.info/pagination/example.html).

## How does it work?

**JSHTMLPagination** makes use of *multi column* support in CSS3. The text is divided into columns with the paging screen dimensions and layed out accordingly.
