<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCVTFEseCU0PlXF7b5GAuGxmD4_QO_1XLQ",
    authDomain: "laxnara-wini-dairy.firebaseapp.com",
    projectId: "laxnara-wini-dairy",
    storageBucket: "laxnara-wini-dairy.firebasestorage.app",
    messagingSenderId: "774501530597",
    appId: "1:774501530597:web:cb044ef436aa0d0f3fcd0c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>

// 2. COMMENT LOGIC
document.addEventListener("DOMContentLoaded", function () {
  const postBtn = document.getElementById('post-comment');
  const commentsContainer = document.getElementById('comments-list');
  const currentBlogId = window.location.pathname; 

  if (!postBtn || !commentsContainer) return;

  // Save comment to Firestore
  postBtn.addEventListener('click', function() {
    const name = document.getElementById('username-input').value;
    const text = document.getElementById('comment-input').value;

    if (name && text) {
      db.collection("comments").add({
        blogId: currentBlogId,
        username: name,
        comment: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        // Clear text fields after posting
        document.getElementById('username-input').value = '';
        document.getElementById('comment-input').value = '';
      })
      .catch((error) => console.error("Error adding comment: ", error));
    } else {
      alert("Please fill out both your name and comment!");
    }
  });

  // Fetch and display comments
  db.collection("comments")
    .where("blogId", "==", currentBlogId)
    .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot) => {
      commentsContainer.innerHTML = "";
      
      if (querySnapshot.empty) {
        commentsContainer.innerHTML = "<p style='color: #666; font-style: italic;'>No comments yet. Be the first!</p>";
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const commentDiv = document.createElement('div');
        commentDiv.style.borderBottom = "1px dashed rgba(241, 175, 198, 0.4)";
        commentDiv.style.padding = "15px 5px";
        
        commentDiv.innerHTML = `<strong style="color: #D47A9C;">${data.username}</strong><p style='margin: 5px 0 0 0; color: #4a3a40; font-size: 15px;'>${data.comment}</p>`;
        commentsContainer.appendChild(commentDiv);
      });
    }, (error) => {
      console.error("Error getting comments: ", error);
    });
});
