const selectbtn = document.querySelector("#selectfile")
const fileInput = document.querySelector(".file-input")
const uploadedArea = document.querySelector(".uploaded-area")
const dropArea = document.getElementById('drop-area');

selectbtn.addEventListener("click", () =>{
  fileInput.click();
});

dropArea.addEventListener('dragover', (e) => {
  preventDefaults(e);
  dropArea.classList.add('active');
});

dropArea.addEventListener('dragleave', (e) => {
  preventDefaults(e);
  dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', (e) => {
    preventDefaults(e);
    dropArea.classList.remove('active');
    let fileInput1 = e.dataTransfer.files;
    fileInput.files=fileInput1
    showupload()
});

fileInput.addEventListener('change', (e) => {
  e.preventDefault();
  showupload()
});


$('#submitupload').click((e)=>{
  e.preventDefault();
  var files = fileInput.files;
  if(files.length > 0){
    var formData = new FormData(); 
    var files = $('.file-input')[0].files;// Get selected files
    for (var i = 0; i < files.length; i++) {
        formData.append('files', files[i]); 
    }
    console.log('formData',formData);
    $.ajax({
      url: '/upload', 
      type:'POST',
      data:formData ,
      contentType: false, 
      processData: false, 
      success: function(data) {
       $(".showupload").html('')
      },
      error: function(error) {
        console.error('Error uploading files:', error);
                 
      }
   });
  }
  
  
})

const preventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
}


function showupload(){
  $(".showupload").html('')
    const files = fileInput.files;    
    for(let i=0;i<files.length;i++){
      let htmlbody=`<li class="row">
                      <div class="content upload">
                        <i class="fas fa-file-alt"></i>
                        <div class="details">
                          <span class="name">${files[i].name}</span>
                          <span class="size"></span>
                        </div>
                      </div>
                      <i class="fas fa-check"></i>
                    </li>`
      $(".showupload").append(htmlbody)
    }
    
}
