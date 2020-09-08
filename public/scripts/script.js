const inpFile = document.getElementById("inpFile");
if (inpFile) {
    console.log("This is the new campground page.");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".boilerplate-image");
    const previewDefaultText = previewContainer.querySelector(".boilerplate-text");

    inpFile.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";
            reader.addEventListener("load", function () {
                console.log(this);
                previewImage.setAttribute("src", this.result);
            });
            reader.readAsDataURL(file);
        } else {
            previewDefaultText.style.display = null;
            previewImage.style.display = null;
        }
    });
}