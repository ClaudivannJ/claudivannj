// function handleFormSubmission() {
//     const nome = document.getElementById("nome").value;
//     const email = document.getElementById("email").value;
//     const mensagem = document.getElementById("mensagem").value;

    
//     saveFormData(nome, email, mensagem);

    
//     sendToWhatsApp(mensagem);
// }

// function saveFormData(nome, email, mensagem) {
   
//     const googleFormsURL = "https://docs.google.com/forms/d/e/1FAIpQLSeroBwUYpP--7CH_ETC97-3KMi6PcKIdk49qodPme4WgTMpgA/formResponse";
//     const formData = new FormData();
//     formData.append("entry.577541334", nome); 
//     formData.append("entry.2053883527", email);
//     formData.append("entry.487125680", mensagem); 

//     formData.append("dlut", "1731592817115");
//     formData.append("hud", "true");
//     formData.append("fvv", "1");
//     formData.append("partialResponse", "[null,null,\"957210038606311648\"]");
//     formData.append("pageHistory", "0");
//     formData.append("fbzx", "957210038606311648");

//     fetch(googleFormsURL, {
//         method: "POST",
//         mode: "no-cors",
//         body: formData
//     }).then(() => {
//         console.log("Dados enviados para o Google Forms com sucesso!");
//     }).catch(error => {
//         console.error("Erro ao enviar os dados:", error);
//     });
// }

// function sendToWhatsApp(mensagem) {
//     const numeroWhatsApp = "5587981569414"; 
//     const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

//     window.open(linkWhatsApp, "_blank");
// }




function handleFormSubmission() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    // 1. Salvar os dados na Planilha via Google Apps Script
    saveFormData(nome, email, mensagem);

    // 2. Enviar somente a mensagem via WhatsApp
    sendToWhatsApp(mensagem);
}

function saveFormData(nome, email, mensagem) {
    // URL do Web App do Google Apps Script
    const googleAppsScriptURL = "https://script.google.com/macros/s/AKfycbwjXNvquTRoqMmxKsTVTvcahk3iCTtbqz-r0megIVuCSi8Jg8kDTlZFBc7EzHFldS74/exec"; // Substitua com o seu URL

    // Configuração da requisição
    const formData = new URLSearchParams();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("mensagem", mensagem);

    // Envia os dados via POST
    fetch(googleAppsScriptURL, {
        method: "POST",
        body: formData
    }).then(response => {
        return response.text();
    }).then(data => {
        console.log(data); // Mensagem de sucesso do Google Apps Script
    }).catch(error => {
        console.error("Erro ao enviar os dados:", error);
    });
}

function sendToWhatsApp(mensagem) {
    const numeroWhatsApp = "5587981569414"; // Substitua pelo número correto
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, "_blank");
}
