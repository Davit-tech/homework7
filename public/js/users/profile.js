(async () => {
    let userInfo = document.querySelector("#user-info");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userInfo && userData) {
        const {id,first_name, last_name, email} = userData.user;

        userInfo.innerHTML = `
            <pre class="userdata">
First Name: ${first_name}
id : ${id}
Last Name: ${last_name}
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
