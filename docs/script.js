function beautify(text){
    text = replaceEszett(text);
    return text;
}

function replaceEszett(text) {
    // Use a regular expression to replace lowercase and uppercase eszett
    text = text.replace(/ß/g, 'ss');
    text = text.replace(/ẞ/g, 'SS');
    return text;
}

function updateLabel() {
    const richTextbox = document.getElementById("richTextbox");
    const label = document.getElementById("outputLabel");
    label.textContent = replaceEszett(richTextbox.value);
}