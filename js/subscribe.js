function open_form_success_modal(email_address) {
    const modal = document.getElementById("form_submit_success");
    document.getElementById("modal_message_email").innerText = email_address;
    modal.style.display = "block";
}

function close_form_success_modal() {
    const modal = document.getElementById("form_submit_success");
    modal.style.display = "none";

    window.location.href = "index.html";
}

function validate_subscription_form() {

    function clear_errors() {
        const error_fields = document.getElementsByClassName("ErrorMessage");
        for (let error_field of error_fields) {
            error_field.style.display = "none";
            error_field.innerText = "";
        }
    }

    function form_error(input_field, error_message) {
        const error_field = input_field.getElementsByClassName("ErrorMessage")[0];
        error_field.style.display = "block";
        error_field.innerText = error_message;
    }

    clear_errors();

    const email_field = document.getElementById("email_field");
    // const password_field = document.getElementById("password_field");
    const name_field = document.getElementById("name_field");
    const phone_field = document.getElementById("phone_field");
    const pronouns_field = document.getElementById("pronouns_field");
    const preferences_field = document.getElementById("preferences_field");
    const newsletter_field = document.getElementById("newsletter_field");
    const submit_button = document.getElementById("form_submit_button");

    let valid = true;

    // email
    const email = email_field.getElementsByTagName("input")[0].value;
    if (!email.includes("@")) {
        form_error(email_field, "Make sure this email is valid");
        valid = false;
    }

    // password
    // const password = password_field.getElementsByTagName("input")[0].value;
    // if (password.length < 6) {
    //     form_error(password_field, "Make your password at least 6 characters long");
    //     valid = false;
    // }

    // name
    const name = name_field.getElementsByTagName("input")[0].value;
    if (name.length === 0) {
        form_error(name_field, "Please enter your name");
        valid = false;
    }

    // pronouns

    // phone
    const phone = phone_field.getElementsByTagName("input")[0].value;
    if (phone.length === 0) {
        form_error(phone_field, "Please enter your phone number");
        valid = false
    }
    else if (isNaN(phone)) {
        form_error(phone_field, "Make sure this only contains numbers");
        valid = false;
    }

    // preferences
    // at least one preference must be selected
    let preferences = preferences_field.getElementsByClassName("Checkbox");
    let selected_preferences = 0;
    for (let preference of preferences) {
        if (preference.checked) {
            selected_preferences += 1
        }
    }
    if (selected_preferences === 0) {
        form_error(preferences_field, "Please pick at least one preference");
        valid = false;
    }

    // newsletter
    const newsletter_agreement = newsletter_field.getElementsByClassName("Checkbox")[0];
    if (!newsletter_agreement.checked) {
        form_error(newsletter_field, "Please agree to sign up for the newsletter");
        valid = false;
    }

    if (valid) {
        open_form_success_modal(email);
    }
    else {
        form_error(submit_button, "*Sorry, some inputs aren't quite right.")
    }

}

function checkbox_setup() {
    const checkbox_options = document.getElementsByClassName("CheckboxOption");

    for (let checkbox_option of checkbox_options) {
        let input = checkbox_option.getElementsByClassName("Checkbox")[0];
        let icon = checkbox_option.getElementsByClassName("CheckboxIcon")[0];

        input.checked = false;

        let on_input_change = function() {
            // console.log("🛠");
            let src = icon.getAttribute("src");
            // console.log(src);
            if (src === "styles/bg/checkbox.png") {
                icon.setAttribute("src", "styles/bg/checkbox-checked.png");
            }
            else if (src === "styles/bg/checkbox-checked.png") {
                icon.setAttribute("src", "styles/bg/checkbox.png");
            }
        }

        let on_icon_click = function () {
            input.checked = !input.checked;
            on_input_change();
        }

        input.addEventListener("change", on_input_change);
        icon.addEventListener("click", on_icon_click);
    }

}

function modal_setup() {
    const modal = document.getElementById("form_submit_success");
    window.onclick = function(event) {
        if (event.target === modal) {
            close_form_success_modal();
        }
    }
}

// check for email variable from other pages
function import_email_input() {
    const imported_email_input = sessionStorage.getItem("vorskins_email_input");
    if (imported_email_input !== null) {
        document.getElementById("email").value = imported_email_input;
        sessionStorage.setItem("vorskins_email_input", "");
    }
}

function on_load() {
    checkbox_setup();
    modal_setup();
    import_email_input();
}

document.addEventListener("DOMContentLoaded", on_load, false);