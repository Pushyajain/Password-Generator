const characters={
lowercase:"abcdefghijklmnopqrstuvwxyz",
uppercase:"ABCDEFGHIJKLMNOPQRSTUVXYZ",
numbers:"0123456789",
symbols:"@$%#?/\[]!&<>+-~"
}
const passindicator=document.querySelector(".pass-indicator");
const lengthslider=document.querySelector(".Pass_length input");
const options=document.querySelectorAll(".pass_setting .option input");
const passwordinput=document.querySelector(".input-box input");
const copyIcon=document.querySelector(".input-box span");
const generatePassword=()=>{
    let staticPassword="";
    let randompassword="";
    let exc_duplicate=false;
    options.forEach(option=>{
        if(option.checked)
        {
            if(option.id!="exc-duplicates"&&option.id!="spaces")
            {
                staticPassword+=characters[option.id];
            }
          else if(option.id==="spaces")
          {
            staticPassword+=` ${staticPassword} `;
          }  
          else{
               exc_duplicate=true;
          }
        }
    });

    for(let i=0;i<lengthslider.value;i++)
    {
        let randomchar=staticPassword[Math.floor(Math.random()*staticPassword.length)];
        if(exc_duplicate)
        {
            if(!randompassword.includes(randomchar)||randompassword==="")
            {
                  randompassword+=randomchar;
            }
            else{
                i--;
            }
        }
        else{
            randompassword+=randomchar;
        }
    }
passwordinput.value=randompassword;

}
const upadtepassindicator=()=>{
if(lengthslider.value<=8)
{
    passindicator.id="weak";
}
else if(lengthslider.value<=16)
{
    passindicator.id="medium";
}
else{
    passindicator.id="strong"
}
}
const updateSlider=()=>{
    document.querySelector(".Pass_length span").innerText=lengthslider.value;
    generatePassword();
    upadtepassindicator();
}
const copypassword=()=>{
    navigator.clipboard.writeText(passwordinput.value);
    copyIcon.innerText="check";
    setTimeout(()=>{copyIcon.innerText="content_copy"},100);
}
//updateSlider();
lengthslider.addEventListener("input",updateSlider);
const btn=document.querySelector(".generate-btn");
btn.addEventListener("click",generatePassword);
copyIcon.addEventListener("click",copypassword);