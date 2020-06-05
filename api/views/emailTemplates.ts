
export default {
    signUpWelcome: (userData: any) => {
        const html = `
            <!DOCTYPE html>
            <html>
                <head></head>
                <body>
                    <div>
                        <h1>Sign Up Completed!</h1>
                        <h4>Welcome, ${userData.name || 'Guest'}</h4>
                    </div>
                </body>
            </html>
        `;
        return html;
    }
};
