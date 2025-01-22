function beautify(text){
    text = simplify(text);
    text = trimLineWhitespace(text);
    text = replaceUnallowedChars(text);
    return text;
}
function simplify(text) {
    const quotationRegex = /[“”‘’„‹›«»]/g;
    text = text.replace(quotationRegex, '"');
    text = text.replace(/ß/g, 'ss');
    text = text.replace(/ẞ/g, 'SS');
    text = text.replace(/\t/g, "    ");
    text = text.replace(/μ/g, 'u');
    text = text.replace(/…/g, '...');
    text = text.replace(/—/g, '-');
    text = text.replace(/•/g, '-');
    return text;
}
function replaceUnallowedChars(text) {
    const lowerAscii = "abcdefghijklmnopqrstuvwxyz";
    const upperAscii = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialAscii = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const digits = "0123456789";
    const lowerSwiss = "äöüàéèç";
    const upperSwiss = "ÄÖÜ";
    const specialSwiss = "§°$£€"
    const allowed = lowerAscii + upperAscii + specialAscii + digits + lowerSwiss + upperSwiss + specialSwiss;
    // Create a regular expression that matches any character not in the allowed string
    const regex = new RegExp(`[^${allowedChars}]`, 'g');
    // Replace all such characters with an underscore
    return inputString.replace(text, '_');
}
function trimLineWhitespace(text) {
    // Split the string into lines, trim each line, and join them back
    return text
        .split('\n') // Split into lines
        .map(line => line.trimEnd()) // Trim only the end of each line
        .join('\n'); // Join the lines back together
}
function updateLabel() {
    const inText = document.getElementById("inText");
    const outText = document.getElementById("outText");
    outText.textContent = beautify(inText.value);
}