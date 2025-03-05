export const toFirstCapitalLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeTrailingSlash = (str: string) => {
  if (str.endsWith("/")) {
    return str.slice(0, -1);
  }
  return str;
};

export const toFirstLowerLetter = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const truncateString = (str: string, limit: number = 100) => {
  if (!str) return "";
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  } else {
    return str;
  }
};

function isCyrillic(input: string): boolean {
  // Regex to match any Cyrillic character
  const cyrillicRegex = /[\u0400-\u04FF]/;
  return cyrillicRegex.test(input);
}

function cyrillicToUzbekLatin(input: string): string {
  const mapping: Record<string, string> = {
    А: "A",
    а: "a",
    Б: "B",
    б: "b",
    В: "V",
    в: "v",
    Г: "G",
    г: "g",
    Д: "D",
    д: "d",
    Е: "E",
    е: "e",
    Ё: "Yo",
    ё: "yo",
    Ж: "J",
    ж: "j",
    З: "Z",
    з: "z",
    И: "I",
    и: "i",
    Й: "Y",
    й: "y",
    К: "K",
    к: "k",
    Л: "L",
    л: "l",
    М: "M",
    м: "m",
    Н: "N",
    н: "n",
    О: "O",
    о: "o",
    П: "P",
    п: "p",
    Р: "R",
    р: "r",
    С: "S",
    с: "s",
    Т: "T",
    т: "t",
    У: "U",
    у: "u",
    Ф: "F",
    ф: "f",
    Х: "X",
    х: "x",
    Ц: "S",
    ц: "s",
    Ч: "Ch",
    ч: "ch",
    Ш: "Sh",
    ш: "sh",
    Щ: "Sh",
    щ: "sh",
    Ъ: "",
    ъ: "",
    Ы: "I",
    ы: "i",
    Ь: "",
    ь: "",
    Э: "E",
    э: "e",
    Ю: "Yu",
    ю: "yu",
    Я: "Ya",
    я: "ya",
    Ў: "Oʻ",
    ў: "oʻ",
    Қ: "Q",
    қ: "q",
    Ғ: "Gʻ",
    ғ: "gʻ",
    Ҳ: "H",
    ҳ: "h",
  };

  return input
    .split("")
    .map((char) => mapping[char] || char)
    .join("");
}

export const convertIfCyrillic = (input: string): string => {
  if (isCyrillic(input)) {
    return cyrillicToUzbekLatin(input);
  }
  return input; // Return the original string if no Cyrillic characters are found
};

export const keepOnlyLatinLettersAndWhitespace = (input: string): string => {
  // Regex to match Latin letters (a-z, A-Z) and whitespace
  const latinAndWhitespaceRegex = /[a-zA-Z\s]/g;
  // Extract and join matched characters
  return input.match(latinAndWhitespaceRegex)?.join("") || "";
};
