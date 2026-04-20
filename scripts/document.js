/*************************************************************************
 * File: document.js
 * These functions support interaction with the top-level document
 * element.
 ************************************************************************/

/*************************************************************************
 * @function Document Keydown Event Handler 
 * @desc 
 * When the user presses a key in the app, we interpret the
 * keypress based on which user interface element currently has focus. 
 *************************************************************************/
 document.addEventListener("keydown", function(e) { 
    if (document.activeElement.id === "menuBtn") {
        //User is pressing a key when menu button is focused
        keyDownMenuBtnFocused(e.code); 
    } else if (document.activeElement.getAttribute("role") 
               === "menuitem") {
        //User is pressing a key when menu item is focused
        keyDownMenuItemFocused(e.code);
    } else if (document.activeElement.getAttribute("role") 
               === "tab") {
        //User is pressing a key when mode tab is focused
        keyDownModeTabFocused(e.code); 
    } else if (document.activeElement.classList
        .contains("action-dialog")) {
            keyDownDialogFocused(e);
    }
 });
