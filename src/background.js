var djangoVersion;
chrome.storage.sync.get("djangoVersion", function (data) {
    djangoVersion = data.djangoVersion;
});
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher()
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
chrome.storage.onChanged.addListener(function(changes, area) {
    if (area == "sync" && "djangoVersion" in changes) {
        djangoVersion = changes.djangoVersion.newValue;
    }
});
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {redirectUrl: details.url.replace(/(?:docs.djangoproject.com\/en\/)((?:dev)|([0-9].[0-9]+))\//, `docs.djangoproject.com/en/${djangoVersion}/`)};
    },
    {
        urls: [
            "*://docs.djangoproject.com/*",
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);