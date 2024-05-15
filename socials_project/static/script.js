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
        alert('An error occurred during registration. Please try again.');
    });
}

// Function to handle user login form submission
function handleLogin(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    
    // Send POST request to backend API for user login
    fetch('/api/auth/login/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Return the response JSON
        } else {
            throw new Error('Login failed. Please check your credentials and try again.');
        }
    })
    .then(data => {
        if (data.user_id) {
            localStorage.setItem('user_id', data.user_id);
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            throw new Error('Invalid response from server.');
        }
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
    formData.append('user_id', userId);
    
    // Send POST request to backend API for posting picture
    fetch('/api/pictures/', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            alert('Picture posted successfully!');
            // Optionally, update picture display or redirect to home page
            window.location.href = 'home.html';
        } else {
            throw new Error('Failed to post picture. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        console.log(error.message);
    });
}

// Function to handle user logout
function handleLogout() {
    // Clear session or token and redirect to login page
    localStorage.removeItem('user_id');
    window.location.href = 'login.html';
}

// Function to fetch and display followed users and all users
function fetchAndDisplayUsers() {
    // Fetch followed users from backend API
    fetch('/api/followed-users/')
    .then(response => {
        if (!response.ok) {
            console.log('Failed to fetch followed users.');
        }
        return response.json();
    })
    .then(data => {
        const followedUsersList = document.getElementById('followed-users-list');
        followedUsersList.innerHTML = '';

        data.forEach(user => {
            const userElement = document.createElement('li');
            userElement.textContent = user.username;
            
            const unfollowButton = document.createElement('button');
            unfollowButton.textContent = 'Unfollow';
            unfollowButton.addEventListener('click', () => {
                unfollowUser(user.id);
            });

            userElement.appendChild(unfollowButton);
            followedUsersList.appendChild(userElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        console.log(error.message);
    });

    // Fetch all users from backend API
    fetch('/api/users/')
    .then(response => {
        if (!response.ok) {
            console.log('Failed to fetch all users.');
        }
        return response.json();
    })
    .then(data => {
        const allUsersList = document.getElementById('all-users-list');
        allUsersList.innerHTML = '';

        data.forEach(user => {
            const userElement = document.createElement('li');
            userElement.textContent = user.username;

            const followButton = document.createElement('button');
            followButton.textContent = 'Follow';
            followButton.addEventListener('click', () => {
                followUser(user.id);
            });

            userElement.appendChild(followButton);
            allUsersList.appendChild(userElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        console.log(error.message);
    });
}

// Function to handle following a user
function followUser(userId) {
    fetch(`/api/follow/${userId}/`, {
        method: 'PATCH',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to follow user.');
        }
        fetchAndDisplayUsers();
        alert('User followed successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        console.log(error.message);
    });
}

// Function to handle unfollowing a user
function unfollowUser(userId) {
    fetch(`/api/unfollow/${userId}/`, {
        method: 'PATCH',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to unfollow user.');
        }
        fetchAndDisplayUsers();
        alert('User unfollowed successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        console.log(error.message);
    });
}

// Call the function to fetch and display followed users and all users when the page loads
fetchAndDisplayUsers();

// Event listeners for form submissions
if (document.getElementById('registration-form')) {
    document.getElementById('registration-form').addEventListener('submit', handleRegistration);
}
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}
if (document.getElementById('post-picture-form')) {
    document.getElementById('post-picture-form').addEventListener('submit', handlePostPicture);
}
if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
}
