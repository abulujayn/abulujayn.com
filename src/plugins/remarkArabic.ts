const shortVowels = new Set(['a', 'i', 'u']);
const DAGGER_ALIF = '\u0670';
const bracketedLetters: Record<string, string> = {
  '(ā)': DAGGER_ALIF,
  '(y)': 'ى',
};

const longVowels: Record<string, string> = {
  ā: 'ا',
  ī: 'ي',
  ū: 'و',
};

const consonants: Record<string, string> = {
  th: 'ث',
  kh: 'خ',
  dh: 'ذ',
  sh: 'ش',
  gh: 'غ',
  b: 'ب',
  t: 'ت',
  j: 'ج',
  ḥ: 'ح',
  d: 'د',
  r: 'ر',
  z: 'ز',
  s: 'س',
  ṣ: 'ص',
  ḍ: 'ض',
  ṭ: 'ط',
  ẓ: 'ظ',
  "'": 'ع',
  '‘': 'ع',
  '’': 'ع',
  ʿ: 'ع',
  f: 'ف',
  q: 'ق',
  k: 'ك',
  l: 'ل',
  m: 'م',
  n: 'ن',
  w: 'و',
  h: 'ه',
  y: 'ي',
};

const transliterationPattern = /\|([^|\n]+)\|/g;

type ParentNode = {
  children?: MarkdownNode[];
};

type MarkdownNode = ParentNode & {
  type: string;
  value?: string;
};

export default function remarkArabicTransliteration() {
  return (tree: ParentNode) => {
    visit(tree);
  };
}

function visit(parent: ParentNode) {
  if (!Array.isArray(parent.children)) {
    return;
  }

  const nextChildren: MarkdownNode[] = [];

  for (const child of parent.children) {
    if (child.type === 'text' && typeof child.value === 'string') {
      nextChildren.push(...replaceTransliteration(child.value));
      continue;
    }

    if (!['code', 'inlineCode', 'html'].includes(child.type)) {
      visit(child);
    }

    nextChildren.push(child);
  }

  parent.children = nextChildren;
}

function replaceTransliteration(value: string): MarkdownNode[] {
  const nodes: MarkdownNode[] = [];
  let lastIndex = 0;

  for (const match of value.matchAll(transliterationPattern)) {
    if (match.index === undefined) {
      continue;
    }

    if (match.index > lastIndex) {
      nodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }

    nodes.push({
      type: 'html',
      value: `<span lang="ar" dir="rtl">${escapeHtml(transliterate(match[1].trim()))}</span>`,
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    nodes.push({ type: 'text', value: value.slice(lastIndex) });
  }

  return nodes.length > 0 ? nodes : [{ type: 'text', value }];
}

function transliterate(input: string): string {
  let output = '';
  let previousConsonantStart = -1;
  let previousConsonant = '';
  let atWordStart = true;

  for (let index = 0; index < input.length; ) {
    const remaining = input.slice(index);
    const char = input[index];

    if (/\s/.test(char)) {
      if (!isSpaceAfterStandaloneWa(input, index)) {
        output += char;
      }

      resetPrevious();
      atWordStart = true;
      index += 1;
      continue;
    }

    if (atWordStart && remaining.toLowerCase().startsWith('allāh')) {
      output += 'الله';
      previousConsonantStart = output.length - 1;
      previousConsonant = 'ه';
      atWordStart = false;
      index += 5;
      continue;
    }

    if (atWordStart && remaining.toLowerCase().startsWith('lillāh')) {
      output += 'لله';
      previousConsonantStart = output.length - 1;
      previousConsonant = 'ه';
      atWordStart = false;
      index += 6;
      continue;
    }

    if (atWordStart && remaining.toLowerCase().startsWith('al-')) {
      output += 'ال';
      previousConsonantStart = output.length - 1;
      previousConsonant = 'ل';
      atWordStart = false;
      index += 3;
      continue;
    }

    if (char === '-' && isEndOfWord(input, index)) {
      output += 'ء';
      resetPrevious();
      atWordStart = false;
      index += 1;
      continue;
    }

    if (char === '-') {
      index += 1;
      continue;
    }

    const bracketedLetter = getBracketedLetter(remaining);
    if (bracketedLetter) {
      output += bracketedLetter.letter;
      atWordStart = false;
      index += bracketedLetter.token.length;
      continue;
    }

    if (isPunctuation(char)) {
      output += char;
      resetPrevious();
      atWordStart = false;
      index += 1;
      continue;
    }

    const longVowel = longVowels[char.toLowerCase()];
    if (longVowel) {
      output += longVowel;
      atWordStart = false;
      index += 1;
      continue;
    }

    if (shortVowels.has(char.toLowerCase())) {
      if (atWordStart) {
        output += 'ا';
        previousConsonantStart = output.length - 1;
        previousConsonant = 'ا';
      }

      atWordStart = false;
      index += 1;
      continue;
    }

    const consonantToken = getConsonantToken(remaining);
    if (consonantToken) {
      const isTaMarbutah =
        (consonantToken === 't' || consonantToken === 'h') &&
        input[index + consonantToken.length] === ',';

      const letter = isTaMarbutah ? 'ة' : consonants[consonantToken];

      if (previousConsonantStart < 0 || previousConsonant !== letter) {
        output += letter;
        previousConsonantStart = output.length - letter.length;
        previousConsonant = letter;
      }

      atWordStart = false;
      index += consonantToken.length + (isTaMarbutah ? 1 : 0);
      continue;
    }

    output += char;
    resetPrevious();
    atWordStart = false;
    index += 1;
  }

  return output;

  function resetPrevious() {
    previousConsonantStart = -1;
    previousConsonant = '';
  }
}

function getConsonantToken(input: string): string | undefined {
  const lowerInput = input.toLowerCase();

  for (const token of ['th', 'kh', 'dh', 'sh', 'gh']) {
    if (lowerInput.startsWith(token)) {
      return token;
    }
  }

  return consonants[lowerInput[0]] ? lowerInput[0] : undefined;
}

function getBracketedLetter(
  input: string,
): { token: string; letter: string } | undefined {
  const lowerInput = input.toLowerCase();

  for (const [token, letter] of Object.entries(bracketedLetters)) {
    if (lowerInput.startsWith(token)) {
      return { token, letter };
    }
  }

  return undefined;
}

function isSpaceAfterStandaloneWa(input: string, index: number): boolean {
  const previousText = input.slice(0, index).trimEnd();
  const previousWord = previousText.match(/\S+$/)?.[0];

  return previousWord?.toLowerCase() === 'wa' && /\S/.test(input.slice(index));
}

function isEndOfWord(input: string, index: number): boolean {
  const next = input[index + 1];

  return next === undefined || /\s/.test(next) || isPunctuation(next);
}

function isPunctuation(char: string): boolean {
  return /[.,!?;:()[\]{}"“”]/.test(char);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
