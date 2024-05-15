// Function to handle user registration form submission
function handleRegistration(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    console.log(formData.get('username'));
    // Send POST request to backend API for user registration
    fetch('/api/auth/register/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Registration successful!');
            // Optionally, redirect to login page
            window.location.href = 'login.html';
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to handle user login form submission
function handleLogin(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    console.log(formData.get('username'));
    console.log(formData.get('password'));
    // Send POST request to backend API for user login
    fetch('/api/auth/login/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            
            return response.json(); // Return the response JSON
        } else {
            alert('Login failed. Please check your credentials and try again.');
        }
    })
    .then(data => {
        // Store the user_id in localStorage
        // localStorage.setItem('user_id', data.user_id);
        console.log(data);
        console.log(data.user_id);
        if (data.user_id){
            localStorage.setItem('user_id', data.user_id);
            console.log(data.user_id);
        }
        alert('Login successful!');
        window.location.href = 'home.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to handle picture posting form submission
function handlePostPicture(event) {
    event.preventDefault();
    console.log('handlePostPicture');
    // Get form data
    const formData = new FormData(event.target);
    const userId = localStorage.getItem('user_id');
    console.log(userId);
    console.log(formData);
    formData.append('user_id', userId);
    console.log(formData);
    // Send POST request to backend API for posting picture
    fetch('/api/pictures/', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            alert('Picture posted successfully!');
            // Optionally, update picture display or redirect to home page
        } else {
            alert('Failed to post picture. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to handle user logout
function handleLogout() {
    // Clear session or token and redirect to login page
    // Example: localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Function to fetch and display followed users and all users
function fetchAndDisplayUsers() {
    // Fetch followed users from backend API
    fetch('/api/followed-users/')
    .then(response => response.json())
    .then(data => {
        // Clear existing followed users
        const followedUsersList = document.getElementById('followed-users-list');
        followedUsersList.innerHTML = '';

        // Iterate through fetched followed users and create HTML elements to display them
        data.forEach(user => {
            const userElement = document.createElement('li');
            userElement.textContent = user.username;
            followedUsersList.appendChild(userElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Fetch all users from backend API
    fetch('/api/users/')
    .then(response => response.json())
    .then(data => {
        // Clear existing users
        const allUsersList = document.getElementById('all-users-list');
        allUsersList.innerHTML = '';

        // Iterate through fetched users and create HTML elements to display them
        data.forEach(user => {
            const userElement = document.createElement('li');
            userElement.textContent = user.username;

            // Add a follow button for each user
            const followButton = document.createElement('button');
            followButton.textContent = 'Follow';
            followButton.addEventListener('click', () => {
                // Handle follow action here
                followUser(user.id);
            });

            // Append username and follow button to the list item
            userElement.appendChild(followButton);
            allUsersList.appendChild(userElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to handle following a user
function followUser(userId) {
    // Send a request to follow the user with the specified userId
    // Implement your follow logic here...
}

// Call the function to fetch and display followed users and all users when the page loads
// fetchAndDisplayUsers();

// Event listeners for form submissions
if (document.getElementById('registration-form')) {
    console.log('registration-form found');
    document.getElementById('registration-form').addEventListener('submit', handleRegistration);
}
if (document.getElementById('login-form')) {
    console.log('login-form found');
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}
if (document.getElementById('post-picture-form')) {
    console.log('post-picture-form found');
    document.getElementById('post-picture-form').addEventListener('submit', handlePostPicture);
}
// Event listener for logout button
if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
}
// Initial fetch and display of pictures
// if (document.getElementById('picture-upload')) {
//     fetchAndDisplayPictures();
// }
// Initial fetch and display of posts and followed users
// if (document.getElementById('picture-upload')) {
//     fetchAndDisplayPosts();
// }
