// Fetch users
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const dropdown = document.querySelector('#dropdown');
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.username;
            dropdown.appendChild(option);
        });
    });

// Fetch posts
document.querySelector('#dropdown').addEventListener('change', function() {
    const selectedUsername = this.options[this.selectedIndex].text;
    fetch('https://jsonplaceholder.typicode.com/posts?userId=' + this.value)
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.querySelector('.posts');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postHTML = createPostHTML(post, selectedUsername);
                const postElement = document.createElement('div');
                postElement.innerHTML = postHTML;
                postElement.addEventListener('click', () => displayComments(post.id, selectedUsername));
                postsContainer.appendChild(postElement);
            });
        });
        fetch('https://jsonplaceholder.typicode.com/users/' + this.value)
        .then(response => response.json())
        .then(user => {
            console.log('Fetched user:', user); // Debug line
            const profileDetails = document.querySelector('.profile-details');
            profileDetails.innerHTML = `
                <h3>${selectedUsername}</h3>
                <p>@${selectedUsername}</p>
                <p>${user.email}</p>
                <p><img src="./images/location.png" alt="location" style="width:1%; height:2%;">${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
               
            `;
        });
});

// Function to create post HTML
function createPostHTML(post, username) {
    return `
        <div class="post">
            <div class="post-header">
                <img src="images/profile.png" alt="profile image">
                <div>
                    <h3>${username}</h3>
                    <p>@${username}</p>
                    <p>${post.id}h</p>
                </div>
            </div>
            <div class="post-content">
                <p>${post.title}</p>
            </div>
            <div class="post-footer">
           <div> <img src="./images/message.png" alt=""> 200 </div>
            <div><img src="./images/retweet.png" alt=""> 200 </div>
            <div><img src="./images/heart.png" alt=""> 200</div>
            </div>
        </div>
    `;
}

// Function to display comments
function displayComments(postId, username) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.querySelector('.comments');
            commentsContainer.innerHTML = ''; 
            comments.forEach(comment => {
                const commentHTML = createCommentHTML(comment, username);
                const commentElement = document.createElement('div');
                commentElement.innerHTML = commentHTML;
                commentsContainer.appendChild(commentElement);
            });
        });
}

// Function to create comment HTML
function createCommentHTML(comment, username) {
    return `
        <div class="comment">
        <div class="post-header">
                <img src="images/profile.png" style="width:20%; height:90px;"alt="profile image">
         <div>
            <div class="comment-header">
                <h3>${username}</h3>
                <p>@${comment.email}</p>
            </div>
            <div class="comment-content">
                <p>${comment.body}</p>
            </div>
            <div class="hr"></div>
            <div class="post-footer">
           <div> <img src="./images/message.png" alt=""> 200 </div>
            <div><img src="./images/retweet.png" alt=""> 200 </div>
            <div><img src="./images/heart.png" alt=""> 200</div>
            </div>
        </div>
    `;
}
fetch('https://jsonplaceholder.typicode.com/users/' + this.value)
    .then(response => response.json())
    .then(user => {
        const profileDetails = document.querySelector('.profile-details');
        profileDetails.innerHTML = `
            <h3>${user.name}</h3>
            <p>@${user.username}</p>
            <p>${user.email}</p>
            <p>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            <p>Coordinates: ${user.address.geo.lat}, ${user.address.geo.lng}</p>
        `;
    });
