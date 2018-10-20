var copyRunning = false;
var allEmojis = "";
var allHashtags = "";

function copy(s) {
    if (copyRunning)
        return;
    copyRunning = true;
    $("#emoji-container").append("<textarea id = 'copy-text'>" + s + "</textarea>");
    $("#copy-text").select();
    document.execCommand("copy");
    $("#copy-text").remove();
    copyRunning = false;
}

$(document).ready(function () {
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    dropZone.addEventListener('dragleave', handleDragLeave, false);
    //creates global variables
    var pageReady;
    var base64;
    // clears URL-Text on page refresh
    $("#URL-Text").val('');
    //Listens for button click
    $("#submit-btn").click(function () {
        var urlText = $("#URL-Text").val();
        base64 = urlText;
        //checks for a url upload and uploads the image
        if (base64 != "") {
            uploadEncodedImage(base64);
        }
    })

    //Handles dnd functionality, calls image encoding
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files;
        const f = files[0];
        document.getElementById("drop_zone").innerHTML = f.type + "  ";

        if (f.type.match("image/*")) {
            document.getElementById("drop_zone").innerHTML = "<h3 id='drag-text'>Drag and drop image here!</h3>";
            document.getElementById("drag-text").innerHTML = "That's an image alright.";
            encodeImageFileAsURL(f);
        }
        else {
            document.getElementById("drop_zone").innerHTML = "<h3 id='drag-text'>Drag and drop image here!</h3>";
            document.getElementById("drag-text").innerHTML = "Sorry, that's not an image. Please try again.";
        }
    }

    // deals with dragging over the dnd box
    function handleDragOver(evt) {
        document.getElementById("drag-text").innerHTML = "Release file within this box.";
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    //Handles the curso leaving the dnd box
    function handleDragLeave(evt) {
        document.getElementById("drag-text").innerHTML = "Drag and drop image here!";
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = '';
    }

    //Encodes the image in base 64, calls image upload and the page change
    function encodeImageFileAsURL(f) {

        var fileToLoad = f;
        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            uploadEncodedImage(srcData);
            changePage(srcData);
        }

        fileReader.readAsDataURL(fileToLoad);
    }

    //uploads the encoded image
    function uploadEncodedImage(s) {
        var url = "localhost:5000/";
        var http = new XMLHttpRequest();
        http.open("POST", url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function () {
            if (http.readyState === 3 && http.status === 200) {
                document.getElementById("drag-text").innerHTML = "Loading...";
            }
            if (http.readyState === 4 && http.status === 200) {
                console.log(http.responseText);
            }
        };
        http.send(s);
    }

    //updates the page after image upload
    function changePage(src) {
        var imgSRC = src;
        $("#drop_zone").remove();
        $("#form-home").remove();
        $("#Home").append("<img class='drop img-thumbnail col-xs-3 col-sm-3' id='image-home' src='" + imgSRC + "'>");
        $("#Home").append("<div class='drop border border-width-8 col-xs-3 col-sm-3 container' id='emoji-container'></div>");
        $("#emoji-container").append("<div class=\"row\">" +
            "        <div class=\"col-sm-5 d-flex align-items-center justify-content-center\">" +
            "            <table>" +
            "                <tbody id=\"emoji-table\">" +
            "                </tbody>" +
            "            </table>" +
            "        </div>" +
            "        <div class=\"col-sm-5 d-flex align-items-center justify-content-center\">" +
            "            <table>" +
            "                <tbody id=\"hashtag-table\">" +
            "                </tbody>" +
            "            </table>" +
            "        </div>" +
            "        <div class=\"col-sm-2 d-flex align-items-center justify-content-center\">" +
            "            <button id=\"copyAll\" class=\"btn btn-dark\" onclick=\"copy(allEmojis+allHashtags)\">Copy All</button>" +
            "        </div>" +
            "    </div>");
        $("#Home").after("<div class='row align-items-center justify-content-center'><button type='submit' id='reset-page' class='btn btn-info margins col-sm-2' onclick='document.location.reload(true)'>Refresh</button></div>");
        populateTable(null);
    }





    function appendEmoji(em, id) {
        allEmojis += em + " ";
        var str = '<tr><td><button id=\"em%d\" class=\"btn btn-outline-dark\" onclick=\"copy(\'%s\')\">%s</button></td></tr>';
        str = str.replace("%d", id);
        str = str.replace("%s", em);
        str = str.replace("%s", em);
        $("#emoji-table").append(str);
    }

    function appendHashtag(hs, id) {
        allHashtags += hs + " ";
        var str = '<tr><td><button id=\"hs%d\" class=\"btn btn-outline-dark\" onclick=\"copy(\'%s\')\">%s</button></td></tr>';
        str = str.replace("%d", id);
        str = str.replace("%s", hs);
        str = str.replace("%s", hs);
        $("#hashtag-table").append(str);
    }

    function appendBottomButtons() {
        var allEms = '<tr><td><button id=\"emB\" class=\"btn btn-dark\" onclick=\"copy(allEmojis)\">Copy Emojis</button></td></tr>';
        $("#emoji-table").append(allEms);
        var allHss = '<tr><td><button id=\"hsB\" class=\"btn btn-dark\" onclick=\"copy(allHashtags)\">Copy Hashtags</button></td></tr>';
        $("#hashtag-table").append(allHss);
    }

    //populates the table with emojis and hashtags
    function populateTable(json) {
        appendEmoji("😃", 0);
        appendEmoji("🌳", 1);
        appendHashtag("#wowee", 0);
        appendHashtag("#gotem", 1);
        appendBottomButtons();
    }
});
