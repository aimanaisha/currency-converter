// Selectors

const form=document.querySelector('form');
const from=document.querySelector('#from');
const to=document.querySelector('#to');
const submitBtn=document.querySelector('#submit');
const quantityInput=document.querySelector('#quantity');
const section=document.querySelector('section');
const loader=document.querySelector('#loader');

// EventListeners

form.addEventListener('submit',(e)=>{

    e.preventDefault();
    section.innerHTML='';

    baseValue=from.options[from.selectedIndex].value;
    baseText=from.options[from.selectedIndex].text;

    targetValue=to.options[to.selectedIndex].value;
    targetText=to.options[to.selectedIndex].text;

    quantityValue=quantityInput.value;

    // console.log(quantityInputValue);
    // console.log(baseValue);
    // console.log(targetValue);
    loader.style.display = "flex";
    axios.get(`https://v6.exchangerate-api.com/v6/48b00af89071686b6959f4ca/pair/${baseValue}/${targetValue}/${quantityValue}`)
        .then((res)=>{
        loader.style.display = "none";
        const rate= res.data.conversion_rate;
        const result= res.data.conversion_result;

        const resultDiv=document.createElement('div')
        resultDiv.classList.add('result-div')

        const resultA=document.createElement('p')
        resultA.innerText=`${quantityValue} ${baseText}  =  ${result} ${targetText}`

        const resultB=document.createElement('p')
        resultB.innerText=`1 ${baseValue}  =  ${rate} ${targetValue}`;
        resultB.classList.add('rate-text')


        resultDiv.appendChild(resultA);
        resultDiv.appendChild(resultB);

        section.appendChild(resultDiv);
           
        console.log(res.data.conversion_rate,'rate');
        console.log(res.data.conversion_result, 'result');
    })

})



