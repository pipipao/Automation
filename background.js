async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
chrome.tabs.onUpdated.addListener(async (tabs) => {
    const tab = await getCurrentTab();
    let cur = '';
    cur = tab.url;
    try {
        chrome.storage.local.get([cur]).then(async (result) => {
            if (result[cur] != undefined) {
                await chrome.action.setBadgeText({
                    tabId: tab.id,
                    text: "OK",
                });
            } else {
                await chrome.action.setBadgeText({
                    tabId: tab.id,
                    text: "",
                });
            }
        });
    } catch (error) {
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: "",
        });
    }

    chrome.tabs.sendMessage(tab.id, { text: 'report_back', url: tab.url }, addJob);



});
async function addJob(msg) {
    var job = {};
    if (msg != undefined) {
        console.log(msg.company, msg.title);
        var tab = await getCurrentTab();
        let cur = '';
        cur = tab.url;
        var tab = await getCurrentTab();
        job.company = msg.company;
        job.title = msg.title;
        const d = new Date();
        let time = d.getTime();
        job.time = time;
        console.log(job);
        return;
        chrome.storage.local.set({ [cur]: job }).then(() => {
        });
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: "OK",
        });
    }

}
chrome.commands.onCommand.addListener(async (command, tab) => {
    // Add job
    let cur = '';
    cur = tab.url;
    chrome.storage.local.set({ [cur]: cur }).then(() => {
    });
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: "OK",
    });

    chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, addJob);

});
chrome.action.onClicked.addListener(async (tab) => {
    let url = chrome.runtime.getURL("hello.html");
    let myTab = await chrome.tabs.create({ url });
});