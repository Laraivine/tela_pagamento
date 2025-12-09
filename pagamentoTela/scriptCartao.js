document.addEventListener('DOMContentLoaded', function() {
    
    // --- Referências aos elementos ---
    
    // O ID 'expiry-day' no HTML refere-se ao SELECT do Mês,
    // e 'expiry-year' refere-se ao SELECT do Ano.
    const selectMonth = document.getElementById('expiry-day'); 
    const selectYear = document.getElementById('expiry-year');
    const cardNumber = document.getElementById('card-number');
    const cardCvv = document.getElementById('cvv');

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // --- 1. Preencher os Meses (01 a 12) ---
    function populateMonths() {
        // Remove a opção padrão "Mês" do HTML, se existir, e começa a preencher
        // Ou você pode garantir que o HTML já tenha: <option value="" selected>Mês</option>
        
        for (let i = 1; i <= 12; i++) {
            // Garante o formato com dois dígitos (ex: "01")
            const mes = String(i).padStart(2, '0'); 
            const option = document.createElement('option');
            
            option.value = mes;
            // Mostra o número e o nome do mês para o usuário (ex: "01 - Janeiro")
            option.textContent = `${mes} - ${monthNames[i - 1]}`; 
            
            selectMonth.appendChild(option); 
        }
    }

    // --- 2. Preencher os Anos (Exemplo: 2025 a 2045) ---
    function populateYears() {
        // Ajustado para usar o ano atual como referência de início
        const startYear = new Date().getFullYear(); 
        const endYear = startYear + 20; // Próximos 20 anos

        for (let i = startYear; i <= endYear; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);
        }
    }

    // --- 3. Função de Validação de Número (Algoritmo de Luhn) ---
    function validarNumero(){
        const numeroCartao = cardNumber.value;
        // Remove espaços, traços, etc.
        const limpo = numeroCartao.replace(/\D/g, ''); 

        if (!/^\d{13,19}$/.test(limpo)) {
            // alert("Número inválido. Deve ter entre 13 e 19 dígitos.");
            return false;
        }

        let soma = 0;
        let deveDobrar = false;

        for (let i = limpo.length - 1; i >= 0; i--) {
            let digito = parseInt(limpo.charAt(i), 10);

            if (deveDobrar) {
                digito *= 2;
                if (digito > 9) {
                    digito -= 9; 
                }
            }

            soma += digito;
            deveDobrar = !deveDobrar;
        }

        const valido = soma % 10 === 0;

        // if (valido) {
        //     alert("Número do cartão VÁLIDO!");
        // } else {
        //     alert("Número do cartão INVÁLIDO");
        // }

        return valido;
    }

    // --- 4. Função de Validação de Vencimento ---
    function validarVencimento(){
        const mesSelecionado = parseInt(selectMonth.value, 10);
        const anoSelecionado = parseInt(selectYear.value, 10);
        
        // Verifica se os campos foram selecionados
        if (isNaN(mesSelecionado) || isNaN(anoSelecionado)) {
            // alert("Por favor, selecione o mês e o ano de vencimento.");
            return false;
        }

        const hoje = new Date();
        const anoAtual = hoje.getFullYear(); 
        const mesAtual = hoje.getMonth() + 1; 

        if (anoSelecionado < anoAtual) {
            // alert("Ano de vencimento INVÁLIDO");
            return false;
        }
        
        // Se o ano for o atual, verifica se o mês já passou
        if (anoSelecionado === anoAtual && mesSelecionado < mesAtual) {
            // alert("Mês de vencimento INVÁLIDO");
            return false;
        }
        
        // alert("✅ Data de vencimento VÁLIDA!");
        return true;
    }
// --- 5. Função de Validação de CVV ---
function validarCVV(){
    const cvvValor = cardCvv.value;
    
    // 🔑 CORREÇÃO: Altera para validar EXATAMENTE 3 dígitos (\d{3})
    if (!/^\d{3}$/.test(cvvValor)) { 
        // Se desejar um alerta específico para o usuário:
        // alert("CVV inválido. Deve conter exatamente 3 dígitos.");
        return false;
    }
    // alert("CVV VÁLIDO!");
    return true;
}
    // --- Execução na inicialização ---
    populateMonths();
    populateYears();
    
    // As funções de validação (validarNumero, validarVencimento, validarCVV) 
    // geralmente são executadas em um evento de SUBMIT ou BLUR, não no DOMContentLoaded.
    // Comentei os alertas e deixei apenas o retorno booleano para não incomodar o usuário na abertura da página.
    // Se for para testar, você pode reativar:
    /*
    validarNumero();
    validarVencimento();
    validarCVV();
    */
});