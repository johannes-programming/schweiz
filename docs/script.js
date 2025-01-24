function beautify(text){
    text = simplifyWithMap(text);
    text = replaceUnallowedChars(text);
    text = trimLineWhitespace(text);
    return text;
}
function simplifyWithMap(text) {
    // Define a mapping of accented characters to their non-accented equivalents
    const accentMap = {
        // lowercase
        'â': 'a',
        'ĉ': 'c',
        'ê': 'e',
        'ĝ': 'g',
        'î': 'i',
        'µ': 'u',
        "ñ": "n",
        'ô': 'o',
        "ß": "ss",
        'û': 'u',

        // uppercase
        'Â': 'A',
        'Ê': 'E',
        'Î': 'I',
        "Ñ": "N",
        'Ô': 'O',
        "ẞ": "SS",
        'Û': 'U',

        // whitespace
        "\r": "",
        "\t": "    ",

        // punctuation
        "•": "-",
        "`": "'",
        "…": "...",
        "—": '-',
        '“': '"',
        '”': '"',
        "‘": "'",
        "’": "'",
        '„': '"',
        "‹": '"',
        "›": '"',
        "«": '"',
        '»': '"',
    };

    // Process each replacement in the map using a loop
    for (const [accentedChar, plainChar] of Object.entries(accentMap)) {
        text = text.replace(new RegExp(accentedChar, 'g'), plainChar);
    }

    return text;
}
function replaceUnallowedChars(text) {
    const lowerAscii = "abcdefghijklmnopqrstuvwxyz";
    const upperAscii = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const punctAscii = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const whiteAscii = " \n";
    const digits = "0123456789";
    const lowerSwiss = "äöüàéèç";
    const upperSwiss = "ÄÖÜ";
    const specialSwiss = "§°$£€"
    const allowed = lowerAscii + upperAscii + punctAscii + whiteAscii + digits + lowerSwiss + upperSwiss + specialSwiss;
    // Create a regular expression that matches any character not in the allowed string
    const regex = new RegExp(`[^${allowed}]`, 'g');
    // Replace all such characters with an underscore
    return text.replace(regex, '_');
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