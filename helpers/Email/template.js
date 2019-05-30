
exports.htmlContent=(emailContent)=>{
    const htmlContent = `
    <p style="margin-bottom:2rem;">Saludos</p>
    <p>${emailContent.name} quiere contactarse con usted </p>
    <p>Su correo electrónico es: ${emailContent.email}</p>
    <p>Su teléfono es: ${emailContent.phone}</p>
    <p>El equipo que necesitan es: ${emailContent.equipment}</p>
    <p>La cantidad de equipos son: ${emailContent.quantity}</p>
    <p>El proyecto en el que se utilizaran los equipos es: ${emailContent.project}</p>
    <p style="margin-top:3rem;">Atte: Sitio Epsilon</p>
`
    return htmlContent
}

