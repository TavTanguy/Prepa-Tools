const listExcept = [
  "hui",
  "socio",
  "spatio",
  "t",
  ",", ";", ".", "?", "!",
  "%",
  "franco", "sino","nippo", "afro", "indo", "latino", "hispano", "rhéno",
  "post", "intra", "infra", "inter", "poly"
]
const listAddChar = [
  "%"
]
const space = [" ", "'", "-"]

export function getInfos(str: string, expect: string[], delimiter: string, spacing: number, addDelimiter = false){
  let newStr= ""
  let nbWord = 0
  let nbChar = 0

  const words: string[] = []
  let currentword = ""
  const listSpaces: string[] = [];
  for(let i = 0; i < str.length; i++){
    if(str[i] === delimiter) continue;
    if(listAddChar.includes(str[i])) nbWord++;
    if(space.includes(str[i])){
      if(currentword != ""){
        words.push(currentword);
        listSpaces.push(str[i])
      }
      currentword = ""
    } else
      currentword += str[i]
  }
  if(currentword != "")
    words.push(currentword);
  

  words.forEach((word, i)=>{
    if(![...expect, delimiter, ...listExcept].includes(word))
      nbWord++
    if(addDelimiter && i !== 0 && i % spacing === 0)
      newStr += delimiter + " "
    newStr += word + (listSpaces[i] ?? "")
    nbChar += word.length
  })

  return {words: nbWord, chars: nbChar, str: newStr}
}