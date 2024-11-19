function handleFormSubmission() {
   
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();


    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return; 
    }

    if (email === '') {
        alert('Por favor, preencha o campo Email.');
        return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um Email válido.');
        return;
    }

    if (mensagem === '') {
        alert('Por favor, preencha o campo Mensagem.');
        return;
    }

    
    saveFormData(nome, email, mensagem);
    sendToWhatsApp(mensagem);
}


function saveFormData(nome, email, mensagem) {

    const googleAppsScriptURL = "https://script.google.com/macros/s/AKfycbwjXNvquTRoqMmxKsTVTvcahk3iCTtbqz-r0megIVuCSi8Jg8kDTlZFBc7EzHFldS74/exec"; // Substitua com o seu URL


    const formData = new URLSearchParams();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("mensagem", mensagem);


    fetch(googleAppsScriptURL, {
        method: "POST",
        body: formData
    }).then(response => {
        return response.text();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error("Erro ao enviar os dados:", error);
    });
}

function sendToWhatsApp(mensagem) {
    const numeroWhatsApp = "5587981569414";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, "_blank");
}
