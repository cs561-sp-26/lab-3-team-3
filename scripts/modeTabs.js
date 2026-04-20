/*************************************************************************
 * File: modeTabs.js
 * Desc: Contains the JavaScript functions to handle interactions 
 * with the mode tabs ("Feed", "Rounds", "Courses", "Buddies"). 
 * We use the w3.org "Example of Tabs with Manual Activiation" as a 
 * specification for implementing the accessible keyboard interface:
 * https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
*************************************************************************/

/*************************************************************************
 * @function switchMode 
 * @desc 
 * Switch from the current mode to a new mode. Unhighlight previous
 * mode tab button, highlight new mode tab button, hide previous mode
 * tab panel, show new mode tab panel, and update mode variables.
 * @param newMode, an integer index (into modeTabButtons and 
 *        modeTabPanels) corresponding to the new mode
 * @global modeTabButtons (array of HTML tab button elements) 
 * @global modeTabPanels (array of HTML tab panel elements)
 * @global currentMode (index of current mode)
 * @global focusedMode (index of mode with current focus)
 *************************************************************************/
 function switchMode(newMode) {
    //Switch mode button
    GlobalModeTabButtons[GlobalCurrentMode.get()].classList.remove("modetab-selected");
    GlobalModeTabButtons[GlobalCurrentMode.get()].setAttribute("aria-selected",false);
    GlobalModeTabButtons[newMode].classList.add("modetab-selected");
    GlobalModeTabButtons[newMode].setAttribute("aria-selected",true);
    //Switch tab panel
    GlobalModeTabPanels[GlobalCurrentMode.get()].classList.add("hidden");
    GlobalModeTabPanels[newMode].classList.remove("hidden");
    GlobalCurrentMode.set(newMode); //Change mode
    GlobalFocusedMode.set(newMode); //Change focused mode
    if (GlobalHistoryLogging) {
        const historyObj = {
            page: GlobalModeNumbersToModes.get(newMode),
            mode: newMode,
            path: GlobalModeNumbersToRoutes.get(newMode)  
        };   
        history.pushState(historyObj, "", historyObj.path);
        console.log("Console: In switchMode; pushing state: ", 
            JSON.stringify(historyObj));
    }
}

/*************************************************************************  
 * Bind switchMode() to each tab button's click handler.
 *************************************************************************/
for (let i = 0; i < GlobalModeTabButtons.length; ++i) {
    GlobalModeTabButtons[i].addEventListener("click",() => switchMode(i));
}

/*************************************************************************
 * @function keyDownModeTabFocused 
 * @Desc 
 * Handles valid keydown events when a mode tab button has the focus, 
 * Left and Right Arrow change the focus to the previous and 
 * next tab; Home and End change the focus to the first and last tab; 
 * Enter or Space selects the currently focused tab.
 * @param key: the string corresponding the key pressed
 * @global modeTabButtons: array of HTML mode tab button elements
 * @global focusedMode: index (into modeTabButtons) of currently focused
 * mode tab
 * @global currentMode: index (into modeTabButtons) of current mode
 *************************************************************************/
 function keyDownModeTabFocused(key) {
    if (key =="Enter" || key =="Space") {
      //Switch to mode corresponding to tab with current focus
      switchMode(GlobalFocusedMode.get()); 
    } else if (key =="ArrowRight") { //shift focus to next mode tab
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","-1");
        GlobalFocusedMode.set((GlobalFocusedMode.get() + 1) % GlobalModeTabButtons.length); 
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","0");
        GlobalModeTabButtons[GlobalFocusedMode.get()].focus();  
    }  else if (key == "ArrowLeft") { //shift focus to prev mode tab    
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","-1");
        GlobalFocusedMode.set((GlobalFocusedMode.get() - 1 + 
            GlobalModeTabButtons.length) % GlobalModeTabButtons.length); 
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","0");
        GlobalModeTabButtons[GlobalFocusedMode.get()].focus(); 
    } else if (key =="Home") { //shift focus to first mode tab
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","-1");
        GlobalFocusedMode.set(0); 
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","0");
        GlobalModeTabButtons[GlobalFocusedMode.get()].focus(); 
    } else if (key =="End") { //shift focus to last mode tab    
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","-1");
        GlobalFocusedMode.get() = modeTabButtons.length - 1; 
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","0");
        GlobalModeTabButtons[GlobalFocusedMode.get()].focus();  
    } else if (key == "Tab") { //Reset focus to current mode tab   
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","-1");
        GlobalFocusedMode.set(GlobalCurrentMode.get()); 
        GlobalModeTabButtons[GlobalFocusedMode.get()].setAttribute("tabindex","0");  
    }  
}