document.addEventListener('DOMContentLoaded', function() {
    const cardOption = document.getElementById('card-option'); 
    const pixOption = document.getElementById('pix-option'); 
    const cardFormFields = document.getElementById('card-form-fields'); 

    // Inicializa escondendo os campos do cartão
    cardFormFields.style.display = 'none';

    // Função para mostrar campos do cartão
    function showCardFields() {
        cardFormFields.style.display = 'block'; 
        cardOption.classList.add('active'); 
        pixOption.classList.remove('active');
    }

    // Event listener para a opção Cartão
    cardOption.addEventListener('click', showCardFields);

    // Event listener para a opção PIX
    pixOption.addEventListener('click', function() {
        // Redireciona para a página PIX
        window.location.href = 'telaPix.html';  // Alterado de 'pix.html' para 'telaPix.html'
    });
});