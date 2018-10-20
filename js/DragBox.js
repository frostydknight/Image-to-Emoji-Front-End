// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
dropZone.addEventListener('dragleave',handleDragLeave,false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    const f = files[0];
    document.getElementById("drop_zone").innerHTML = f.type+"  ";

    if(f.type.match("image/*")) {
        document.getElementById("drop_zone").innerHTML += "That's an image alright.";
    }
    else
        document.getElementById("drop_zone").innerHTML += "Nope, not an image at all!";

    // files is a FileList of File objects. List some properties.

    /*output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    f.size, ' bytes, last modified: ',
    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    '</li>');
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';*/
}

function handleDragOver(evt) {
    document.getElementById("drop_zone").innerHTML = "Release file within this box.";
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function handleDragLeave(evt) {
    document.getElementById("drop_zone").innerHTML = "Drag and drop an image to generate tags for!";
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = '';
}

