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
        "ά": "a",
        "ὰ": "a",
        "ᾶ": "a",
        "ἀ": "a",
        "ἁ": "a",
        "ᾱ": "a",
        "ᾰ": "a",
        "ᾳ": "a",
        'â': 'a',
        "ã": "a",
        "å": "a",
        "ā": "a",
        "ǟ": "ä",
        "ä̃": "ä",
        "à": "a",
        "á": "a",
        "æ": "ae",
        "а": "a",
        'ĉ': 'c',
        "с": "c",
        "¢": "c",
        "е": "e",
        "ё": "e",
        "ē": "e",
        "ė": "e",
        "ẽ": "e",
        "ë": "e",
        'ê': 'e',
        "ë": "e",
        'ĝ': 'g',
        'ĥ': 'h',
        "ϊ": "i",
        'î': 'i',
        "ï": "i",
        "ı": "i",
        "ĩ": "i",
        "ī": "i",
        "ì": "i",
        "ï": "i",
        "î": "i",
        "í": "i",
        'ĵ': 'j',
        "ʝ": "j",
        "κ": "k",
        "к": "k",
        "ł": "l",
        "ƚ": "l",
        "ḷ": "l",
        "ñ": "n",
        "ⁿ": "n",
        "ń": "n",
        "ö̃": "ö",
        "ȫ": "ö",
        "ö̀": "ö",
        "õ": "o",
        "ò": "o",
        "œ": "oe",
        "ō": "o",
        "ó": "o",
        'ô': 'o',
        "ο": "o",
        "о": "o",
        "р": "p",
        'ŝ': 's',
        "š": "s",
        "ś": "s",
        "ß": "ss",
        'û': 'u',
        "υ": "u",
        'µ': 'u',
        "μ": "u",
        "ų": "u",
        "ǖ": "ü",
        "ụ̈": "ü",
        "ụ̄": "u",
        "ü̃": "ü",
        "ǜ": "ü",
        "ù": "u",
        "ū": "u",
        "ụ": "u",
        "û": "u",
        "ú": "u",
        'ŵ': 'w',
        "х": "x",
        "у": "y",
        "ỹ": "y",
        "ȳ": "y",
        "ɣ": "y",

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
        "Ϝ": "F",
        'Ĝ': 'G',
        "Ğ": "G",
        "Η": "H",
        "Н": "H",
        'Ĥ': 'H',
        "Ι": "I",
        "İ": "I",
        "Ï": "I",
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
        "Ϻ": "M",
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
        "Ϙ": "Q",
        'Ŝ': 'S',
        "Š": "S",
        "ẞ": "SS",
        "Ş": "S",
        "Τ": "T",
        "Т": "T",
        "Ͳ": "T",
        'Û': 'U',
        "Ǖ": "Ü",
        "Ụ̈": "Ü",
        "Ụ̄": "U",
        "Ü̃": "Ü",
        "Ǜ": "Ü",
        "Ū": "U",
        "Ụ": "U",
        "Ų": "U",
        'Ŵ': 'W',
        "Χ": "X",
        "Х": "X",
        "Υ": "Y",
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