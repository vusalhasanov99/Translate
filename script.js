const fromLang=document.getElementById("from-lang")
const toLang=document.getElementById("to-lang")
const fromText=document.getElementById("from-text")
const toText=document.getElementById("to-text")
const btnTranslate=document.getElementById("btn-translate")
const exchangeIcon=document.querySelector(".fa-exchange-alt")
const icons=document.querySelectorAll(".icons i")
for (const lang in languages) {
    let option=`<option value="${lang}">${languages[lang]}</option>`
    fromLang.innerHTML+=option
    toLang.innerHTML+=option
    fromLang.value="tr-TR"
    toLang.value="en-GB"
}


btnTranslate.onclick=function(){
const url=`https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${fromLang.value}|${toLang.value}`
fetch(url)
.then(res=>res.json())
.then(data=>{
    toText.value=data.responseData.translatedText
})
}

exchangeIcon.onclick=function(){
    let val=fromLang.value;
    fromLang.value=toLang.value;
    toLang.value=val;

    let text=fromText.value;
    fromText.value=toText.value;
    toText.value=text;
}

icons.forEach(i=>{
    i.onclick=function(){
       if(i.id=="from-copy"){
        navigator.clipboard.writeText(fromText.value)
       }
       if(i.id=="to-copy"){
        navigator.clipboard.writeText(toText.value)
       }
       let voiceText;
       if(i.id=="from-volume"){
        voiceText=new SpeechSynthesisUtterance(fromText.value)
        voiceText.lang=fromText.value;
       }
       if(i.id=="to-volume"){
        voiceText=new SpeechSynthesisUtterance(toText.value)
        voiceText.lang=toText.value;
       }
       speechSynthesis.speak(voiceText)
    }
})