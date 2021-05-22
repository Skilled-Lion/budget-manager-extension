$(function(){
    chrome.storage.sync.get("limit", function(budget){
        $("#limit").val(budget.limit)
    })
    $("#saveLimit").click(function(){
        var limit = parseInt($("#limit").val());
        if(limit){
            chrome.storage.sync.set({"limit":limit}, function(){
                close();
            })
        }
    })
    $("#resetTotal").click(function(){
        chrome.storage.sync.set({"total": 0}, function(){
            var notifOptions = {
                type : "basic",
                iconUrl: "./am_14.svg",
                title : "Total reset",
                message : "Total has been set to reset"
            }
            chrome.notifications.create("resetAmountNotif", notifOptions);
        })
    })
})