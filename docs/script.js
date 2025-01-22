function beautify(text){
    text = replaceEszett(text);
    text = replaceTabs(text);
    return text;
}

function replaceEszett(text) {
    // Use a regular expression to replace lowercase and uppercase eszett
    text = text.replace(/ß/g, 'ss');
    text = text.replace(/ẞ/g, 'SS');
    return text;
}
function replaceTabs(inputString) {
    // Replace all tab characters with four spaces
    return inputString.replace(/\t/g, "    ");
}
function updateLabel() {
    const richTextbox = document.getElementById("richTextbox");
    const label = document.getElementById("outputLabel");
    label.textContent = replaceEszett(richTextbox.value);
}