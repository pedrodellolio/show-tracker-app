export default function firstLetterUpperCase(str: string) {
  return str
    .trim()
    .split(" ")
    .map((word) => {
      return word[0].toLocaleUpperCase().concat(word.substring(1));
    })
    .join(" ");
}
