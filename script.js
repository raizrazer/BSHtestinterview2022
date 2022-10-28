// * Dark Mode Theme
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const button = document.querySelector("#darkmodeBtn");
button.addEventListener("click", () => {
  if (localStorage.theme === "dark") {
    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  } else {
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  }
  // Whenever the user explicitly chooses to respect the OS preference
//   localStorage.removeItem("theme");
});

// * Mobile menu toggle
const mobileMenuButton = document.querySelector('button#hamburger');
const mobileMenu = document.querySelector("#mobilemenu>nav")
mobileMenuButton.addEventListener('click',()=>{
    const insideDiv = mobileMenuButton.children[0];
    (insideDiv.dataset.toggle == 'true') ? insideDiv.dataset.toggle = 'false' : insideDiv.dataset.toggle = 'true';
    (mobileMenu.dataset.visible == 'true') ? mobileMenu.dataset.visible = 'false' : mobileMenu.dataset.visible = 'true'
})


// * Slider

const slider = document.querySelector('#length-slider');

// * Slider length setting
const lengthLabel = document.querySelector('#slider>label>span');
lengthLabel.textContent = slider.value;

const mainData ={
    leng:slider.value,
    uppercase:true,
    lowercase:true,
    numbers:true,
    symbols:true,
}
// Slider Function
slider.addEventListener('input',(e)=>{
    mainData.leng=e.target.value;
    lengthLabel.textContent = slider.value;
})

// * Getting all the setting checkboxes
const checkboxes = document.querySelectorAll('.setting>label>input')
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change',(e)=>{
        switch(e.target.id){
            case "uppercase":
                (e.currentTarget.checked)?mainData.uppercase=true:mainData.uppercase=false;
                break;
            case "lowercase":
                (e.currentTarget.checked)?mainData.lowercase=true:mainData.lowercase=false;
                break;
            case "numbers":
                (e.currentTarget.checked)?mainData.numbers=true:mainData.numbers=false;
                break;
            case "symbols":
                (e.currentTarget.checked)?mainData.symbols=true:mainData.symbols=false;
                break;
            default:
                console.log("Error");
        }
        console.log(mainData);
    })
})

// * Function to generate random string

const lowercaseChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercaseChars = [...lowercaseChars.join("").toString().toUpperCase()];
const numbersChars = ["0","1","2","3","4","5","6","7","8","9"];
const symbolsChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]","|",":",";",'"',"'","<",",",">",".","?","/"];


// * Return one random value from the array it is passed with
const returnOneChar = (value) =>{
    return value[Math.floor(Math.random()*value.length)];
}


// Get the copy button to copy it to clipboard, if present.
const copyButton = document.querySelector('#generated>button');

// Get the input section to display the value
const inputSection = document.querySelector('#input_section');

copyButton.addEventListener('click',()=>{
    const copyPageUrl = async () => {
        const inputSectionInstance = document.querySelector('#input_section');
        console.log(inputSectionInstance);
        inputSectionInstance.innerHTML.select()
        inputSectionInstance.selectRange(0,99999)
        try{
            // await navigator.clipboard.writeText(inputSectionInstance.textContent);
            // alert("Copied");
            document.execCommand('copy');
        }
        catch(err){
            alert("Error",inputSectionInstance.textContent);
        }
    }
    copyPageUrl()
    })

// Getting RandomChar Function
const randomChar = () => {
    const randomInstance = Math.floor(Math.random()*4);
    switch(randomInstance){
        case 0:
            return (mainData.lowercase) ? returnOneChar(lowercaseChars) : randomChar();
        case 1:
            return (mainData.uppercase) ? returnOneChar(uppercaseChars) : randomChar();
        case 2:
            return (mainData.numbers) ? returnOneChar(numbersChars) : randomChar();
        case 3:
            return (mainData.symbols) ? returnOneChar(symbolsChars) : randomChar();
    }
}

// * Generate Paint Content on to Page
const contentPaint = () => {
    let str = ""
        for(let i=0;i<mainData.leng;i++){
            const value = randomChar();
            str += value;
        }
    copyButton.dataset.visible = "true";
    inputSection.dataset.present = "true";
    inputSection.textContent = str;
}

// Get the Generate Button and assigning a click function
const generateButton = document.querySelector('button#generate-btn');
generateButton.addEventListener('click',(e)=>{
    
    const {lowercase,uppercase,numbers,symbols} = mainData;
    if(lowercase || uppercase || numbers || symbols)
    {
        contentPaint();
    }
    else{
        copyButton.dataset.visible = "false";
        inputSection.dataset.present = "false";
        inputSection.textContent = "Please enable atleast one setting";
        console.log(new Error("No option were enabled. make sure to enable one of the settings"))
    }
})

// * First time painting
contentPaint();
