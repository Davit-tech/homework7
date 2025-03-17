(async () => {
    let userInfo = document.querySelector("#user-info");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userInfo && userData) {
        const {id,firstName, lastName, email} = userData.user;

        userInfo.innerHTML = `
            <pre class="userdata">
First Name: ${firstName}
id : ${id}
Last Name: ${lastName}
Email: ${email}
 

            </pre>
        `;
    } else {
        console.log("No user data");
    }


})();

let logout = document.querySelector(".logout");
if (logout) {
    logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/user/login";
        window.location.reload();
    });
}
