// Varibles
const allSelects = document.querySelectorAll(".drop-down");
const button = document.querySelector("#exchange-btn");
const URL = "https://v6.exchangerate-api.com/v6/edf90eb73784fbf996603777/latest/USD";
const relationText = document.querySelector("#exchange-relation-box");
const amountFrom = document.querySelector("#input-from");
const amountTo = document.querySelector("#input-to");


// Functions

const updateFlag = (element)=>{
    let code = countryList[element.value];
    let image = `https://flagsapi.com/${code}/flat/64.png`
    element.parentElement.querySelector("img").src = image;
}

async function submit(){
        let fromCountry = allSelects[0].value;
        let response = await fetch(`https://v6.exchangerate-api.com/v6/edf90eb73784fbf996603777/latest/${fromCountry}`);
        let data = await response.json();

        let toCountry = allSelects[1].value;
        let toData = data.conversion_rates[toCountry];
        relationText.textContent = `1 ${fromCountry} = ${toData} ${toCountry}`;

        amountTo.value = amountFrom.value*toData;
    }

// Main

// forEach(select, index, array) it is preDefined.
allSelects.forEach((select)=>{    
    for(let i in countryList){
        let val = countryList[i];
        const newOp = document.createElement("option");
        newOp.text = val;
        newOp.value = i;

        select.append(newOp);

        // Pre select an Option.
        if(select.name==="from" && i=="USD"){
            newOp.selected = true;
            select.value = i;
        }
        if(select.name==="to" && i=="INR"){
            newOp.selected = true;
            select.value = i;
        }
    }

    // Set Flag
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
})

button.addEventListener("click", ()=>{
    submit();
})

addEventListener("keydown", (evt)=>{
    if(evt.key == "Enter"){
        submit();
    }
})

amountFrom.addEventListener("input", ()=>{
    submit();
})
