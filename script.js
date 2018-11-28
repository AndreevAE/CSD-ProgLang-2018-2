function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function rootPath()
{
    jsonString = httpGet("/?ls");
    json = JSON.parse(jsonString);
    createExplorerFromJSON(json);
}

function createExplorerFromJSON(json)
{
    var table = document.createElement("table");

    for (var key in json) {
        switch (key) {
            case 'path':
                console.log(key + ':' + json[key]);
                // TODO: to header
                break;
            case 'query':
                console.log(key + ':' + json[key]);
                // TODO: not show
                break;
            case 'error':
                console.log(key + ':' + json[key]);
                break;
            case 'result':
                console.log(key + ':' + json[key]);

                break;
            default:
                console.log(key + ':' + json[key]);
                break;
        }
    }

    var rows = [];
    for (var key in json) {
        if (rows.indexOf(key) === -1) {
            rows.push(key);
        }
    }

    for (var i = 0; i < rows.length; i++) {
        var tr = table.insertRow(-1);
        var th = document.createElement("th");
        th.innerHTML = rows[i];
        tr.appendChild(th);
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = json[rows[i]];
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    var dirNameTextField = document.createElement("input");
    dirNameTextField.setAttribute('type', 'text');
    dirNameTextField.setAttribute('id', 'dirNameTextField');
    divContainer.appendChild(dirNameTextField)

    var mkdirButton = document.createElement("input");
    mkdirButton.setAttribute('type', 'button');
    mkdirButton.setAttribute('value', 'Make New Dir');
    var createDirHandler = function() {
        return function() {
            var dirName = document.getElementById('dirNameTextField').value;
            httpGet(dirName + "?mkdir");
            rootPath();
        };
    };
    mkdirButton.onclick = createDirHandler();
    divContainer.appendChild(mkdirButton);
}

rootPath();
