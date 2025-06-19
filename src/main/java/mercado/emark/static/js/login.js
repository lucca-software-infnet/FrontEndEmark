// document.addEventListener('DOMContentLoaded', function() {
//     // Configurações
//     const loginForm = document.querySelector('form');
//     const apiBaseUrl = 'http://localhost:8080/auth';
//     const allowedOrigins = ['http://127.0.0.1:5500']; // Deve bater com a configuração do backend

//     // Elementos da UI
//     const submitButton = loginForm.querySelector('button[type="submit"]');
//     const originalButtonText = submitButton.textContent;
    
//     // Criar elemento para mensagens de erro
//     const errorMessage = document.createElement('div');
//     errorMessage.className = 'error-message';
//     errorMessage.style.cssText = `
//         color: #e74c3c;
//         margin-top: 15px;
//         text-align: center;
//         padding: 10px;
//         border-radius: 4px;
//         background-color: #fdecea;
//         display: none;
//     `;
//     loginForm.appendChild(errorMessage);

//     // Verificar se já está logado
//     checkLoggedIn();

//     // Evento de submit do formulário
//     loginForm.addEventListener('submit', async function(e) {
//         e.preventDefault();
        
//         const email = document.getElementById('email').value.trim();
//         const password = document.getElementById('password').value;
        
//         // Validação básica
//         if (!validateEmail(email) || !password) {
//             showError('Por favor, insira um e-mail válido e uma senha!');
//             return;
//         }

//         // Estado de loading
//         setLoadingState(true);

//         try {
//             const response = await authenticate(email, password);
            
//             if (response) {
//                 handleSuccessfulLogin(response);
//             } else {
//                 showError('Credenciais inválidas. Tente novamente.');
//             }
//         } catch (error) {
//             handleAuthError(error);
//         } finally {
//             setLoadingState(false);
//         }
//     });

//     // Função principal de autenticação
//     async function authenticate(email, password) {
//         // Verificar se a origem é permitida (opcional, apenas para debug)
//         if (!allowedOrigins.includes(window.location.origin)) {
//             console.warn('Atenção: Origem não está na lista de CORS permitidos');
//         }

//         // Tentar autenticar como funcionário primeiro
//         try {
//             const funcionarioResponse = await makeAuthRequest(`${apiBaseUrl}/login-funcionario`, email, password);
//             if (funcionarioResponse) return formatResponse(funcionarioResponse, 'FUNCIONARIO');
            
//             // Se não for funcionário, tentar como cliente
//             const clienteResponse = await makeAuthRequest(`${apiBaseUrl}/login-cliente`, email, password);
//             if (clienteResponse) return formatResponse(clienteResponse, 'CLIENTE');
            
//             return null;
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Função para fazer a requisição de autenticação
//     async function makeAuthRequest(url, email, password) {
//         const response = await fetch(url, {
//             method: 'POST',
//             credentials: 'include', // Importante para cookies/sessão
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         });

//         if (response.status === 403) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || 'Acesso não autorizado. Código: 403');
//         }

//         if (!response.ok) return null;

//         return await response.json();
//     }

//     // Formatar a resposta da API
//     function formatResponse(data, userType) {
//         return {
//             token: data.token,
//             userType: userType,
//             user: data[userType.toLowerCase()] || data.user
//         };
//     }

//     // Tratar login bem-sucedido
//     function handleSuccessfulLogin(response) {
//         // Armazenar dados no localStorage
//         localStorage.setItem('authToken', response.token);
//         localStorage.setItem('userType', response.userType);
//         localStorage.setItem('userData', JSON.stringify(response.user));
        
//         // Redirecionar
//         window.location.href = 'displayCustomer.html';
//     }

//     // Tratar erros de autenticação
//     function handleAuthError(error) {
//         console.error('Erro na autenticação:', error);
        
//         let errorMsg = 'Erro ao autenticar. Tente novamente.';
        
//         if (error.message.includes('403')) {
//             errorMsg = 'Acesso não autorizado. Verifique suas credenciais.';
//         } else if (error.message.includes('Failed to fetch')) {
//             errorMsg = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
//         } else if (error.message) {
//             errorMsg = error.message;
//         }
        
//         showError(errorMsg);
//     }

//     // Mostrar mensagem de erro
//     function showError(message) {
//         errorMessage.textContent = message;
//         errorMessage.style.display = 'block';
        
//         setTimeout(() => {
//             errorMessage.style.display = 'none';
//         }, 5000);
//     }

//     // Validar e-mail
//     function validateEmail(email) {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email);
//     }

//     // Estado de loading
//     function setLoadingState(isLoading) {
//         submitButton.disabled = isLoading;
//         submitButton.textContent = isLoading ? 'Autenticando...' : originalButtonText;
//     }

//     // Verificar se já está logado
//     function checkLoggedIn() {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             window.location.href = 'displayCustomer.html';
//         }
//     }
// });