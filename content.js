chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    var format = 1;

    var company;
    var title;
    // Linedin = 1
    try {
        var card = document.getElementsByClassName("ember-view t-black t-normal")[0];
        var titleEle = document.getElementsByClassName("t-24 t-bold jobs-unified-top-card__job-title")[0];
        title = titleEle.textContent;
        console.log(card);
        company = card.textContent;
        company=company.replace(/\n/g,"");
        company=company.trim();
        console.log(company, title);
        ans = { company, title, format }
    } catch (error) {

    }
    if (company == undefined && title == undefined) {
        format = 0;
        //Unknow or TODO = 0
        ans = {format}

    }
    sendResponse(ans);
    // if (msg.text === 'report_back') {
    //     // Call the specified callback, passing
    //     // the web-page's DOM content as argument
    //     sendResponse({ company, title });
    // }
});