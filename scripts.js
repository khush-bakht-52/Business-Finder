// Sample user data
const users = [
    { name: 'Admin', email: 'admin@123', password: 'admin123', role: 'admin' },
    { name: 'Business User 1', email: 'business1@example.com', password: 'password1', role: 'business' },
    { name: 'Business User 2', email: 'business2@example.com', password: 'password2', role: 'business' },
    { name: 'Client 1', email: 'client1@example.com', password: 'password1', role: 'client' },
    { name: 'Client 2', email: 'client2@example.com', password: 'password2', role: 'client' }
];

let loggedInUser = null;

function navigateTo(screen) {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('loginSignupScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('categoriesScreen').classList.add('hidden');
    document.getElementById('userProfileScreen').classList.add('hidden');

    document.getElementById(screen).classList.remove('hidden');
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        loggedInUser = user;
        if (user.role === 'admin') {
            navigateTo('adminScreen');
            displayAdminData();
        } else if (user.role === 'client') {
            navigateTo('categoriesScreen');
        }
    } else {
        alert('Invalid email or password');
    }
}

function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password === confirmPassword) {
        const newUser = { name, email, password, role: 'client' };
        users.push(newUser);
        alert('Sign Up Successful');
        navigateTo('loginSignupScreen');
    } else {
        alert('Passwords do not match');
    }
}

function displayAdminData() {
    const adminBusinessUsers = document.getElementById('adminBusinessUsers');
    const adminClients = document.getElementById('adminClients');
    
    adminBusinessUsers.innerHTML = '<h3>Business Users</h3>';
    users.filter(u => u.role === 'business').forEach(user => {
        adminBusinessUsers.innerHTML += `<p>${user.name} (${user.email}) <button onclick="removeUser('${user.email}')">Remove</button></p>`;
    });

    adminClients.innerHTML = '<h3>Clients</h3>';
    users.filter(u => u.role === 'client').forEach(user => {
        adminClients.innerHTML += `<p class="${user === loggedInUser ? 'new-client' : ''}">${user.name} (${user.email}) <button onclick="removeUser('${user.email}')">Remove</button></p>`;
    });
}

function removeUser(email) {
    const index = users.findIndex(u => u.email === email);
    if (index !== -1) {
        users.splice(index, 1);
        if (loggedInUser.email === email) {
            loggedInUser = null;
            navigateTo('welcomeScreen');
        } else {
            displayAdminData();
        }
    }
}

function updateProfile() {
    // Add functionality to update profile if needed
    alert('Update profile functionality not implemented.');
}

function logout() {
    loggedInUser = null;
    navigateTo('welcomeScreen');
}

document.querySelector('.get-started').addEventListener('click', () => navigateTo('loginSignupScreen'));
