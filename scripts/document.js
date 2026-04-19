/*************************************************************************
 * File: document.js
 * These functions support interaction with the top-level document
 * element.
 ************************************************************************/


document.addEventListener("keydown", function(e) { 
    if (document.activeElement.id === "menuBtn") {
            //User is pressing a key when menu button is focused
            keyDownMenuBtnFocused(e.code); 
    } else if (document.activeElement.getAttribute("role") 
               === "menuitem") {
        //User is pressing a key when menu item is focused
        keyDownMenuItemFocused(e.code);
    }
});