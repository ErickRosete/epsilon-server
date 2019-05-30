// https://www.emailonacid.com/blog/article/email-development/12_things_you_must_know_when_developing_for_gmail_and_gmail_mobile_apps-2/
// https://litmus.com/community/discussions/1500-using-flexbox-in-an-email
exports.htmlContent2=(emailContent)=>{
    const htmlContent2 = `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
            :root {
                --main-bg-color: #0485B7;
                --main-contrast-color: #005F7C;
                --secondary-bg-color: #403d39;
                --secondary-contrast-color: #262421;
                --light-gray: #f7f7f7;
            }

            .img-container {
                position: relative;
            }

            .img-fluid {
                max-width: 100%;
                height: auto;
            }

            .logo {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 55%;
            }

            .blue-line {
                border-color: #0485B7;
                border-width: 1rem;
                margin-block-start: -4px;
                margin-block-end: 0;
                border-style: solid;
            }

            .gray-line {
                border-color:#403d39;
                border-width: 0.25rem;
                margin-block-start: 0;
                margin-block-end: 0;
                border-style: solid;
                max-width: 7.5%;
            }

            main {
                font-family: 'Arial', sans-serif;
                background-color: #f7f7f7;
            }

            .main-content {
                padding: 3rem;
            }

            .greeting {
                text-align: center;
                font-size: 2rem;
                margin: 0.5rem;
                font-weight: 500;
            }

            .name {
                text-align: center;
                margin: 0;
                font-size: 4rem;
                font-weight: 600;
            }

            .message {
                text-align: justify;
                font-size: 2rem;
                margin: 3rem;
                line-height: 3rem;
                font-weight: 500;
            }

            footer {
                font-family: 'Abel', sans-serif;
                text-align: center;
            }

            .footer-blue {
                background-color: #0485B7;
                padding: 1.5rem 0;
            }

            .footer-content {
                background-color: #403d39;
                font-size: 2rem;
                padding: 1.5rem;
            }

            .footer-content p {
                margin: 0;
                color: white;
            }
        </style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet">
        <title>Correo</title>
    </head>

    <body>
        <div class="img-container">

            <img class="img-fluid" src="cid:logo" alt="fondo">
            <hr class="blue-line">
        </div>

        <main>
            <div class="main-content">
                <p class="greeting">Buenas tardes,</p>
                <p class="name">${emailContent.name}</p>
                <div>
                    <hr class="gray-line">
                </div>
                <p class="message">
                    Hemos recibido tu solicitud. Nos pondremos en contacto a la brevedad.
                </p>
            </div>
        </main>
        <footer>
            <div class="footer-blue">
                <div class="footer-content">                              
                    <p>(55) 9627-8073 | ventas@epsiloncomputadoras.mx | Lunes a Viernes: 9.00 am. - 7.00 pm.</p>
                </div>
            </div>
        </footer>

    </body>

</html>
`
    return htmlContent2
}

