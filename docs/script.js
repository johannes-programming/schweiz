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
        "ë": "e",
        'ĝ': 'g',
        'ĥ': 'h',
        'î': 'i',
        "ı": "i",
        'ĵ': 'j',
        "ł": "l",
        "ƚ": "l",
        "ñ": "n",
        'ô': 'o',
        'ŝ': 's',
        "ß": "ss",
        'û': 'u',
        'µ': 'u',
        "ų": "u",
        'ŵ': 'w',

        // uppercase
        "А": "A",
        "Α": "A",
        'Â': 'A',
        "Ã": "A",
        "Å": "A",
        "Ā": "A",
        "Ǟ": "Ä",
        "Ä̃": "Ä",
        "Æ": "AE",
        "Β": "B",
        "В": "B",
        "С": "C",
        'Ĉ': 'C',
        "Е": "E",
        "Ё": "E",
        "Ε": "E",
        'Ê': 'E',
        "Ē": "E",
        "Ė": "E",
        "Ẽ": "E",
        "Ë": "E",
        'Ĝ': 'G',
        "Η": "H",
        "Н": "H",
        'Ĥ': 'H',
        "Ι": "I",
        'Î': 'I',
        "Ĩ": "I",
        "Ī": "I",
        "Ï": "I",
        'Ĵ': 'J',
        "Κ": "K",
        "К": "K",
        "Ƚ": "L",
        "Ḷ": "L",
        "Ł": "L",
        "Μ": "M",
        "М": "M",
        "Ν": "N",
        "Ñ": "N",
        "ᴺ": "N",
        "О": "O",
        "Ő": "Ö",
        "Ο": "O",
        'Ô': 'O',
        "Ö̃": "Ö",
        "Ȫ": "Ö",
        "Ö̀": "Ö",
        "Õ": "O",
        "Ō": "O", 
        "Ø": "Ö",
        "Œ": "OE",
        "Ρ": "P",
        "Р": "P",
        'Ŝ': 'S',
        "Š": "S",
        "ẞ": "SS",
        "Τ": "T",
        "Т": "T",
        'Û': 'U',
        "Ǖ": "Ü",
        "Ụ̈": "Ü",
        "Ụ̄": "U",
        "Ü̃": "Ü",
        "Ǜ": "Ü",
        "Ū": "U",
        "Ụ": "U",
        'Ŵ': 'W',
        "Χ": "X",
        "Х": "X",
        "Υ", "Y",
        "Ỹ": "Y",
        "Ȳ": "Y",
        "У": "Y",
        "Ζ": "Z",

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
        "⟨": "{",
        "⟩": "}",

        // digits
        "З": "3",
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