export const initSucceedPage = function () {
  const loginSucceed = document.querySelector(".login__succeed");
  if (!loginSucceed) return;

  loginSucceed.addEventListener("click", (e) => {
    const dismissBtn = e.target.closest(".btn-dismiss");

    if (dismissBtn) {
      window.location.href = "index.html";
    }
  });
};
