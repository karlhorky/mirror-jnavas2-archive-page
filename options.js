// Saves options to chrome.storage
function save_options() {
    var iTabOption = document.getElementById('tabEnd').checked ? 1 : (document.getElementById('tabAct').checked ? 2 : 0);
    var bButtonNew = document.getElementById('cbButtonNew').checked;
    var bPageNew = document.getElementById('cbPageNew').checked;
    var bArchiveNew = document.getElementById('cbArchiveNew').checked;
    var bSearchNew = document.getElementById('cbSearchNew').checked;
    chrome.storage.sync.set({
        tabOption: iTabOption,
        activateButtonNew: bButtonNew,
        activatePageNew: bPageNew,
        activateArchiveNew: bArchiveNew,
        activateSearchNew: bSearchNew
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Default tab option is Adjacent (0, 1: end, 2: active)
    // Use default value true for all activate options.
    chrome.storage.sync.get({
        tabOption: 0,
        activateButtonNew: true,
        activatePageNew: true,
        activateArchiveNew: true,
        activateSearchNew: true
    }, function(items) {
        switch (items.tabOption) {
            case 1:
                document.getElementById('tabEnd').checked = true;
                break;
            case 2:
                document.getElementById('tabAct').checked = true;
                break;
            default:
                document.getElementById('tabAdj').checked = true;
        }
        document.getElementById('cbButtonNew').checked = items.activateButtonNew;
        document.getElementById('cbPageNew').checked = items.activatePageNew;
        document.getElementById('cbArchiveNew').checked = items.activateArchiveNew;
        document.getElementById('cbSearchNew').checked = items.activateSearchNew;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('bSave').addEventListener('click', save_options);