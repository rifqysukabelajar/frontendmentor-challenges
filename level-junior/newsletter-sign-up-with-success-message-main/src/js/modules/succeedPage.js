export const initSucceedPage = function () {
  const loginSucceed = document.querySelector(".login__succeed");
  if (!loginSucceed) return;

  const confirmationText = loginSucceed.querySelector(".login-confirmation b");

  const raw = localStorage.getItem("users");
  if (raw) {
    const users = JSON.parse(raw);
    const lastUser = users[users.length - 1]; 
    if (lastUser && confirmationText) {
      confirmationText.textContent = lastUser.email;
    }
  }

  loginSucceed.addEventListener("click", (e) => {
    const dismissBtn = e.target.closest(".btn-dismiss");

    if (dismissBtn) {
      window.location.href = "index.html";
    }
  });
};
