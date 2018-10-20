// Setup the dnd listeners.
$(document).ready(function() {
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  dropZone.addEventListener('dragleave',handleDragLeave,false);

  var pageReady;

  function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var files = evt.dataTransfer.files;
      const f = files[0];
      document.getElementById("drop_zone").innerHTML = f.type+"  ";

      if(f.type.match("image/*")) {
          document.getElementById("drop_zone").innerHTML = "<h3 id='drag-text'>Drag and drop image here!</h3>";
          document.getElementById("drag-text").innerHTML = "That's an image alright.";
          encodeImageFileAsURL(f);
      }
      else {
          document.getElementById("drop_zone").innerHTML = "<h3 id='drag-text'>Drag and drop image here!</h3>";
          document.getElementById("drag-text").innerHTML = "Sorry, that's not an image. Please try again.";
        }
  }
  function encodeImageFileAsURL(f) {

    var filesSelected = f;
    var fileToLoad = f;
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64
      //uploadEncodedImage(srcData);
    }
    fileReader.readAsDataURL(fileToLoad);
    changePage();
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

  function changePage() {
    $("#drop_zone").remove();
    $("#form-group").remove();
    $("#Home").append("<div class='border border-width-8 col-sm-3' id='image-container'></div>");
    $("#Home").append("<div class='border border-width-8 col-sm-3' id='emoji-container'></div>");
  }

});
