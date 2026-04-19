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

for (let i = 0; i < GlobalModeTabButtons.length; ++i) {
    GlobalModeTabButtons[i].addEventListener("click",() => switchMode(i));
}

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