const messageContainer = document.querySelector("#message-container");

const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.onsubmit = async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.token);

        if (messageContainer) {
          messageContainer.classList.add("success-message");
          messageContainer.innerHTML = result.message;

          setTimeout(() => {
            window.location.href = "/user/profile";
          }, 1000);
        }
      } else {
        if (messageContainer) {
          messageContainer.classList.add("error-message");
          messageContainer.innerHTML = result.message;
        }
        if (result.fields) {
          for (const [field, message] of Object.entries(result.fields)) {
            const inputElement = document.querySelector(`[name="${field}"]`);
            if (inputElement) {
              const errorSpan = document.createElement("span");
              errorSpan.classList.add("error-text");
              errorSpan.textContent = message;
              inputElement.parentNode.appendChild(errorSpan);
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
}
