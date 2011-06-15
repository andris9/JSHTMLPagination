/*
 * ----------------------------- JSHTMLPagination -------------------------------------
 * Simple paging wrapper to generate pagination inside a web page
 *
 * Copyright (c) 2011 Andris Reinman, andris.reinman@gmail.com
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * new JSHTMLPagination(container, data)
 * - container (Element): DOM object that is going to host the pagination
 * - data (String | Element): HTML contents to be paginated
 * 
 * Creates a pagination element.
 * 
 *     var pager = new JSHTMLPagination($("pager"), "<p>.....</p>");
 *     pager.next(); // show next page
 *     pager.previous(); // show previous page
 * 
 **/
function JSHTMLPagination(container, data){

    this.container = container;
    this.data = data;

    this.position = 0;

    this.column_count = 1;
    this.curcolumn = 0;

    this.column_gap = 20;
    this.getDimensions();
    this.generate();

    if(typeof data == "string"){
        this.column_container.innerHTML = data;
    }else{
        this.column_container.appendChild(data);
    }

    this.container.appendChild(this.inner_container);

    this.calculateColumnCount();
}

/**
 * JSHTMLPagination#getDimensions() -> undefined
 * 
 * Calculates available dimensions (width, height) to be used
 **/
JSHTMLPagination.prototype.getDimensions = function(){

    this.styles = window.getComputedStyle(this.container,null);
    this.width = Number(this.styles.getPropertyValue("width").replace(/\D/g,'')) || 0;
    this.height = Number(this.styles.getPropertyValue("height").replace(/\D/g,'')) || 0;

    this.column_width = this.width;

}

/**
 * JSHTMLPagination#generate() -> undefined
 * 
 * Generates DOM structure to hold the pagination
 **/
JSHTMLPagination.prototype.generate = function(){

    // inner container
    this.inner_container = document.createElement("div");
    this.inner_container.style.overflow = "hidden";
    this.inner_container.style.padding = 0;
    this.inner_container.style.margin = 0;
    this.inner_container.width = this.width+"px";
    this.inner_container.height = this.height+"px";

    // lenghty spacer
    this.space_container = document.createElement("div");
    this.space_container.style.width = "99999999px";
    this.space_container.style.height = this.height+"px";
    this.space_container.style.padding = 0;
    this.space_container.style.margin = 0;

    // columns
    this.columns_container = document.createElement("div");
    this.columns_container.style.height = this.height+"px";
    this.columns_container.style.padding = 0;
    this.columns_container.style.margin = 0;

    this.columns_container.style.mozColumnWidth = this.column_width + "px";
    this.columns_container.style.webkitColumnWidth = this.column_width + "px";
    this.columns_container.style.msColumnWidth = this.column_width + "px";
    this.columns_container.style.columnWidth = this.column_width + "px";

    this.columns_container.style.mozColumnGap = this.column_gap +"px";
    this.columns_container.style.webkitColumnGap = this.column_gap + "px";
    this.columns_container.style.msColumnGap = this.column_gap + "px";
    this.columns_container.style.columnGap = this.column_gap +"px";

    // column
    this.column_container = document.createElement("div");
    this.column_container.style.padding = 0;
    this.column_container.style.margin = 0;

    this.inner_container.appendChild(this.space_container);
    this.space_container.appendChild(this.columns_container);
    this.columns_container.appendChild(this.column_container);
}

/**
 * JSHTMLPagination#calculateColumnCount() -> undefined
 * 
 * Calculates column count for paging
 **/
JSHTMLPagination.prototype.calculateColumnCount = function(){
    var total_height = Number(window.getComputedStyle(this.column_container,null).getPropertyValue("height").replace(/\D/g,''));
    this.column_count = Math.ceil(total_height / this.height) || 1;
}

/**
 * JSHTMLPagination#next() -> undefined
 * 
 * Displays next page
 **/
JSHTMLPagination.prototype.next = function(){
    if(this.curcolumn>=this.column_count-1)return;
    this.curcolumn++;
    this.position += this.column_width + this.column_gap;
    this.space_container.style.marginLeft = -this.position + "px";
    this.space_container.style.webkitTransition = "1s ease-out";
}

/**
 * JSHTMLPagination#previous() -> undefined
 * 
 * Displays previous page
 **/
JSHTMLPagination.prototype.previous = function(){
    if(this.curcolumn<=0)return;
    this.curcolumn--;
    this.position -= this.column_width + this.column_gap;
    this.space_container.style.marginLeft = -this.position + "px";
    this.space_container.style.webkitTransition = "1s ease-out";
}