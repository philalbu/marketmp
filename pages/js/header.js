// window.onload = () => {
//     const userName = localStorage.getItem("userName");
//     const token = localStorage.getItem("token");

//     const userInfo = document.getElementById("user-info");
//     const userNameElement = document.getElementById("user-name");
//     const logoutBtn = document.getElementById("logout-btn");
//     const loginBtnContainer = document.getElementById("login-btn-container");
//     const loginBtn = document.getElementById("login-btn");
//     const registerBtn = document.getElementById("register-btn"); // Novo botão de cadastro

//     // Verifique se o usuário está logado
//     if (userName && token) {
//         // Exibe o nome do usuário
//         userNameElement.textContent = `Olá, ${userName}`;

//         // Exibe o botão de logout e esconde o botão de login
//         logoutBtn.style.display = "inline-block"; // Mostrar o botão de logout
//         loginBtnContainer.style.display = "none"; // Esconde o botão de login
//         registerBtn.style.display = "none"; // Esconde o botão de cadastro quando o usuário estiver logado

//         // Adicionar evento de clique no botão de logout
//         logoutBtn.addEventListener("click", () => {
//             // Remove os dados do localStorage
//             localStorage.removeItem("token");
//             localStorage.removeItem("userName");

//             // Esconde o botão de logout e exibe o botão de login
//             logoutBtn.style.display = "none"; // Esconde o botão de logout
//             userNameElement.textContent = ''; // Limpa o nome do usuário
//             loginBtnContainer.style.display = "inline-block"; // Exibe o botão de login
//             registerBtn.style.display = "inline-block"; // Exibe o botão de cadastro

//             // Redireciona para a página de listagem de produtos (index.html)
//             window.location.href = "index.html";  // Redireciona para a página principal de produtos
//         });
//     } else {
//         // Se não houver login, exibe o botão de login e cadastro, e esconde o de logout
//         logoutBtn.style.display = "none"; // Esconde o botão de logout
//         loginBtnContainer.style.display = "inline-block"; // Exibe o botão de login
//         registerBtn.style.display = "inline-block"; // Exibe o botão de cadastro

//         // Adicionar evento de clique no botão de login
//         loginBtn.addEventListener("click", () => {
//             // Redireciona para a página de login
//             window.location.href = "pages/login.html"; // Redireciona para a página de login
//         });

//         // Adicionar evento de clique no botão de cadastro
//         registerBtn.addEventListener("click", () => {
//             // Redireciona para a página de registro
//             window.location.href = "pages/register.html"; // Redireciona para a página de cadastro
//         });
//     }

//     // Após o carregamento completo do header.js, chama a função do app.js
//     setupApp();
// };

window.onload = () => {
  // Adicionar a lógica do header, mas chamar o setupApp depois que a exibição do conteúdo do carrinho for configurada
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const userInfo = document.getElementById("user-info");
  const userNameElement = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");
  const loginBtnContainer = document.getElementById("login-btn-container");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn"); // Novo botão de cadastro

  // Verifique se o usuário está logado
  if (userName && token) {
    userNameElement.textContent = `Olá, ${userName}`;
    logoutBtn.style.display = "inline-block";
    loginBtnContainer.style.display = "none";
    registerBtn.style.display = "none";

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      logoutBtn.style.display = "none";
      userNameElement.textContent = '';
      loginBtnContainer.style.display = "inline-block";
      registerBtn.style.display = "inline-block";
      window.location.href = "index.html";
    });
  } else {
    logoutBtn.style.display = "none";
    loginBtnContainer.style.display = "inline-block";
    registerBtn.style.display = "inline-block";

    loginBtn.addEventListener("click", () => {
      window.location.href = "pages/login.html";
    });

    registerBtn.addEventListener("click", () => {
      window.location.href = "pages/register.html";
    });
  }

  // Agora chamamos setupApp, que carrega os produtos
  setupApp();  // Chama setupApp apenas após o carregamento do header
};
