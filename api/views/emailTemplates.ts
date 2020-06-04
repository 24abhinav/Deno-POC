
export default {
    signUpWelcome: (userData: any) => {
        const html = `
        <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        *:focus {
                            outline: none;
                        }
                        button {
                            border: none;
                            font-size: 15px;
                            font-family: sans-serif;
                            font-weight: 600;
                            padding: 4px 20px;
                            color: white;
                            background: darkred;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                
                    <div>
                        <h4>Welcome, ${userData.name}</h4>
                        <button onclick="foo()">Click here</button>
                    </div>
                
                    <script>
                        (function() {
                            foo = () => {
                                alert(9);
                            }
                        }())
                    </script>
                
                </body>
            </html>
        `;
        return html;
    }
};
