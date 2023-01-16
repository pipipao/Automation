chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    var card=document.getElementsByClassName("jobs-unified-top-card__company-name")[0];
    console.log(card);
    var titleEle=document.getElementsByClassName("t-24 t-bold jobs-unified-top-card__job-title")[0];
    var title=titleEle.textContent;
    var company= card.firstElementChild.textContent;
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse({company,title});
    }
});