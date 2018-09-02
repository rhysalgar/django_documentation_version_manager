let page = document.getElementById('versionDiv');
const djangoVersions = ['1.7', '1.8', '1.9', '1.10', '1.11', '2.0', '2.1', 'dev'];

function constructOptions(djangoVersions, currentVersion) {
    for (let item of djangoVersions) {
        let optionDiv = document.createElement('div');
        let versionInput = document.createElement('input');
        versionInput.setAttribute("type", "radio");
        versionInput.setAttribute("id", item);
        versionInput.setAttribute("value", item);
        versionInput.setAttribute("name", "djangoVersion");
        let versionLabel = document.createElement('label');
        versionLabel.setAttribute("for", item);
        let versionText = document.createTextNode(item);
        versionLabel.append(versionText);
        if (item == currentVersion){
            versionInput.setAttribute("checked", true);
        }
        optionDiv.append(versionInput);
        optionDiv.append(versionLabel);
        versionInput.addEventListener('click', function () {
            chrome.storage.sync.set({djangoVersion: item})
        });
        page.appendChild(optionDiv);
    }
}

chrome.storage.sync.get("djangoVersion", function (data) {
    let currentVersion = data.djangoVersion;
    constructOptions(djangoVersions, currentVersion);
});
