function subscribe() {
    const email_input = document.getElementById("subscribe_email_input").value;
    sessionStorage.setItem("vorskins_email_input", email_input);
    window.open("subscribe.html");
}