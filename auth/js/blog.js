// Upload image to Cloudinary
async function uploadImage(file) {
  const url = "https://api.cloudinary.com/v1_1/dthi3bgp4/image/upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "pmsa_blog_upload");

  const res = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  return data.secure_url;
}

// Make function global (IMPORTANT)
window.publishPost = async function () {

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("desc");
  const imageInput = document.getElementById("image");
  const keywordsInput = document.getElementById("keywords");

  const title = titleInput.value;
  const desc = descInput.value;
  const file = imageInput.files[0];
  const keywords = keywordsInput.value.split(",");

  // Validation
  if (!title || !desc) {
    alert("Title & Description required");
    return;
  }

  if (!file) {
    alert("Please select an image");
    return;
  }

  try {
    // Show loading screen
    const loadingOverlay = document.getElementById("formLoadingOverlay");
    if (loadingOverlay) loadingOverlay.style.display = "flex";

    // Upload image
    const imageUrl = await uploadImage(file);

    // Save to Firebase
    await db.collection("blogs").add({
      title: title,
      desc: desc,
      image: imageUrl,
      keywords: keywords,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Hide loading screen
    if (loadingOverlay) loadingOverlay.style.display = "none";

    // Hide upload button and show success screen with check post button
    const uploadBtn = document.getElementById("uploadBtn");
    const successActions = document.getElementById("successActions");
    
    if (uploadBtn) uploadBtn.style.display = "none";
    if (successActions) successActions.style.display = "block";

  } catch (error) {
    console.error(error);
    const loadingOverlay = document.getElementById("formLoadingOverlay");
    if (loadingOverlay) loadingOverlay.style.display = "none";
    alert("Error uploading blog ❌");
  }
};