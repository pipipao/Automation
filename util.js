function createJobUlElement(id, url, job) {
    var ul = document.createElement("ul");
    ul.className = "list-group list-group-horizontal-lg";
    ul.style.margin = "0.5vh";
    var eleA = document.createElement("a");
    var show = "";
    if (url.length <= 50) {
        show = url;
    } else {
        show = url.slice(-50);
    }
    var mylink = document.createTextNode(show);
    eleA.appendChild(mylink);
    eleA.style.width = "15vh";
    eleA.href = url;
    eleA.title = "Link";
    var liLink = document.createElement("li");
    liLink.className = "list-group-item";
    liLink.appendChild(eleA);


    var liId = document.createElement("li");
    liId.className = "list-group-item";
    var myId = document.createTextNode(id);
    liId.appendChild(myId);
    ul.appendChild(liId);

    const date = new Date(job.time);
    var myTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    var liTime = document.createElement("li");
    liTime.className = "list-group-item";
    var myTime = document.createTextNode(date.toLocaleString('en-US', { timeZone: myTimezone }));
    liTime.appendChild(myTime);
    ul.appendChild(liTime);

    if (job.format == 1) {
        var liCompany = document.createElement("li");
        liCompany.className = "list-group-item";
        var myCompany = document.createTextNode(job.company);
        liCompany.appendChild(myCompany);
        ul.appendChild(liCompany);

        var liTitle = document.createElement("li");
        liTitle.className = "list-group-item";
        var myTitle = document.createTextNode(job.title);
        liTitle.appendChild(myTitle);
        ul.appendChild(liTitle);
    }

    ul.appendChild(liLink);
    return ul;
}

async function getAllAppliedJobs() {
    var divJobs = document.getElementById("jobs");

    try {
        chrome.storage.local.get(null, function (items) {
            var jobCount = document.getElementById("jobcount");
            var count = 0;
            for (key in items) {
                count++;
                console.log("*******", key, items[key]);
                divJobs.insertBefore(createJobUlElement(count, key, items[key]), divJobs.firstChild);
                // divJobs.appendChild(createJobUlElement(count, key, items[key]));
            }
            jobCount.textContent = count;
        });
    } catch (error) {
        console.error("ERROR");
    }
}
function check(para) {
    if (para == undefined) {
        return "null";
    }
    return para;
}
function exportToCSV() {
    console.log("download");
    try {
        chrome.storage.local.get(null, function (items) {
            let csvStr = '';
            for (key in items) {
                job = items[key];
                csvStr += check(key);
                csvStr += ',';
                csvStr += check(job.time);
                csvStr += ',';
                csvStr += check(job.company);
                csvStr += ',';
                csvStr += check(job.title);
                csvStr += '\r\n';
            }
            console.log(csvStr);
            csvStr = 'data:application/vnd.ms-excel;charset=utf-8,\uFEFF' + encodeURIComponent(csvStr);
            const downloadLink = document.createElement('a');
            downloadLink.href = csvStr;
            downloadLink.download = `jobs.csv`;
            downloadLink.click();
            downloadLink.remove();
        });
    } catch (error) {
        console.error("ERROR");
    }
}
function initButtons() {
    document.getElementById("exportCSV").addEventListener("click", exportToCSV);
}
getAllAppliedJobs();
initButtons();
