
// Email/Password login
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Plug into Firebase / Supabase / Appwrite
    console.log("Login Attempt:", { email, password });
    alert("Auth logic goes here.");
});

// Google OAuth
document.getElementById("googleLogin").onclick = () => {
    console.log("Google Login Triggered");
    alert("Connect to your OAuth provider.");
};

// Apple OAuth
document.getElementById("appleLogin").onclick = () => {
    console.log("Apple Login Triggered");
    alert("Apple OAuth not implemented yet.");
};
