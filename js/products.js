document.addEventListener(
    "DOMContentLoaded",
    function () {
        for (let input of document.getElementsByClassName("AccordionInput")) {
            input.checked = true;
        }
    }, false);