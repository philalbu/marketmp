const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const identifier = document.getElementById("identifier").value;
  const password = document.getElementById("password").value;

  const response = await fetch("https://marketmp-production.up.railway.app/api/auth/local", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await response.json();
  console.log(data);
  if (data.jwt) {
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("userName", data.user.username); // Salva o nome do usuário
    alert("Login realizado!");
    window.location.href = "/index.html";
  } else {
    alert("Erro ao fazer login");
  }
});
