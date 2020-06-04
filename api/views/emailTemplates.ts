
export default {
    signUpWelcome: (userData: any) => {
        const html = `
            <!DOCTYPE html>
            <html>
                <head></head>
                <body>
                    <div>
                        <h4>Welcome, ${userData.name || 'Guest'}</h4>
                    </div>
                </body>
            </html>
        `;
        return html;
    }
};
