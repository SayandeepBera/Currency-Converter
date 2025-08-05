const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#msg-show");

/* update the flag */
const updateFlag = (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
};

/* Update exchange rate */
const updateExchangeRate=async(evt)=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }

    let fromVal=fromCurr.value.toLowerCase();
    let toVal=toCurr.value.toLowerCase();

    const URL= `${BASE_URL}/${fromVal}.json`;

    let response= await fetch(URL);
    let data=await response.json();

    let rate=data[fromVal][toVal];
    let finalAmount= amtVal * rate;

    // update the msg
    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

/* convert currency */
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});