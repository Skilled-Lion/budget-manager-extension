$(function(){
    chrome.storage.sync.get(["total", "limit"], function(budget){
        if(budget.total){
            $("#total").text(budget.total);
        }
        else{
            $("#total").text(0);
        }
        $("#limit").text(budget.limit);
    })
    $("#spendAmount").click(function(){
        chrome.storage.sync.get(["total", "limit"], function(budget){
            var newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }
            var amount = $("#amount").val();
            if(amount){
                newTotal+=parseInt(amount);
            }
            chrome.storage.sync.set({"total": newTotal}, function(){
                if(amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type : "basic",
                        iconUrl: "am_14.svg",
                        title : "limit reached",
                        message : "oops! looks like u reached ur limit"
                    }
                    chrome.notifications.create("limitNotif", notifOptions);
                }
            });
            $("#total").text(newTotal);
            $("#amount").val("");
        });
    })
})