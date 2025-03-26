 const form = document.getElementById("registerForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

  const data = await response.json();
  console.log(data);
  if (data.jwt) {
    localStorage.setItem("token", data.jwt);
    alert("Cadastro feito!");
    window.location.href = "index.html";
  } else {
    alert("Erro ao cadastrar");
  }
});