chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    var card = document.getElementsByClassName("ember-view t-black t-normal")[0];
    var titleEle = document.getElementsByClassName("t-24 t-bold jobs-unified-top-card__job-title")[0];
    var title = titleEle.textContent;
    console.log(card);
    var company = card.textContent;
    console.log(company, title);
    sendResponse({ company, title });
    // if (msg.text === 'report_back') {
    //     // Call the specified callback, passing
    //     // the web-page's DOM content as argument
    //     sendResponse({ company, title });
    // }
});