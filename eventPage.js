var contextMenuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts" : ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText){
        if(typeof parseInt(clickData.selectionText) == "number"){
            chrome.storage.sync.get(["total", "limit"], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText.replace(",", ""));
                chrome.storage.sync.set({"total": newTotal}, function(){
                    if(newTotal >= budget.limit){
                        var notifOptions = {
                            type : "basic",
                            iconUrl: "am_14.svg",
                            title : "limit reached",
                            message : "oops! looks like u reached ur limit"
                        }
                        chrome.notifications.create("limitNotif", notifOptions);
                    }
                })
            })  
        }
    }
})

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
})