// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
dropZone.addEventListener('dragleave', handleDragLeave, false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
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
    // files is a FileList of File objects. List some properties.

    /*output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    f.size, ' bytes, last modified: ',
    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    '</li>');
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';*/
}

function encodeImageFileAsURL(f) {
    var filesSelected = f;
    var fileToLoad = f;
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        uploadEncodedImage(srcData);
    };
    fileReader.readAsDataURL(fileToLoad);
}

function uploadEncodedImage(s) {
    var url = "localhost:5000/";
    var http = new XMLHttpRequest();
    http.open("POST", url);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {
        if(http.readyState === 3 && http.status === 200) {
            document.getElementById("drag-text").innerHTML = "Loading...";
        }
        if(http.readyState === 4 && http.status === 200) {
            console.log(http.responseText);
        }
    };
    http.send(s);
}

function handleDragOver(evt) {
    document.getElementById("drag-text").innerHTML = "Release file within this box.";
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function handleDragLeave(evt) {
    document.getElementById("drag-text").innerHTML = "Drag and drop image here!";
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = '';
}
