import React from 'react';

const LoginPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement login functionality here
        // You can access the email and password values from the form data
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="email">Email:</label>
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" required />
                    <label htmlFor="password">Password:</label>
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;
