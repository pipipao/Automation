async function getAllAppliedJobs() {
    try {
        chrome.storage.local.get(null, function (items) {
            var ul = document.getElementById("links");
            var jobCount = document.getElementById("jobcount");
            var count = 0;
            for (key in items) {
                count++;
                link = items[key];
                var li = document.createElement("li");
                var a = document.createElement("a");
                var mylink = document.createTextNode(link)
                a.appendChild(mylink);
                a.href = items[key];
                a.title = items[key];
                li.appendChild(a);
                li.className = "list-group-item";
                ul.appendChild(li);
            }
            jobCount.textContent = count;
        });
    } catch (error) {
        console.error("ERROR");
    }
}
function test() {
    alert("Click");
}
function exportToCSV() {
    console.log("download");
    try {
        chrome.storage.local.get(null, function (items) {
            let csvStr = '';
            for (key in items) {
                link = items[key];
                csvStr += link;
                csvStr += '\r\n';
            }
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
