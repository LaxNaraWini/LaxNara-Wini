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

// 2. COMMENT SECTION LOGIC
document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById('submit-btn');
  const commentsContainer = document.getElementById('comments-container');
  const currentBlogId = window.location.pathname; // Identifies which blog page this is

  // Guard check: Only run if the HTML elements exist on the page
  if (!commentForm || !commentsContainer) return;

  // Save comment to Firestore
  commentForm.addEventListener('click', function() {
    const name = document.getElementById('username').value;
    const text = document.getElementById('comment-text').value;

    if (name && text) {
      db.collection("comments").add({
        blogId: currentBlogId,
        username: name,
        comment: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        document.getElementById('username').value = '';
        document.getElementById('comment-text').value = '';
      })
      .catch((error) => console.error("Error adding comment: ", error));
    } else {
      alert("Please fill out both fields!");
    }
  });

  // Fetch and display comments for this blog only
  db.collection("comments")
    .where("blogId", "==", currentBlogId)
    .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot) => {
      commentsContainer.innerHTML = "";
      
      if (querySnapshot.empty) {
        commentsContainer.innerHTML = "<p style='color: #666;'>No comments yet. Be the first!</p>";
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const commentDiv = document.createElement('div');
        commentDiv.style.borderBottom = "1px solid #eee";
        commentDiv.style.padding = "10px 0";
        
        commentDiv.innerHTML = `<strong>${data.username}</strong><p style='margin: 5px 0 0 0; color: #333;'>${data.comment}</p>`;
        commentsContainer.appendChild(commentDiv);
      });
    }, (error) => {
      console.error("Error getting comments: ", error);
    });
});
