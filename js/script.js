
const inputName = document.getElementById("name");
const form = document.querySelector("form");
const inputEmail = document.getElementById("email");
const inputJobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const inputSize = document.getElementById("size");
const inputDesign = document.getElementById("design");
const inputColor = document.getElementById("color");
const ActivitiesFieldSet = document.getElementById("activities");
const ActivitiesCheckBox = document.querySelectorAll('.activities input')
const inputCost = document.getElementById('activities-cost');
const inputPayment = document.getElementById("payment");
const CCDiv = document.getElementById("credit-card");
const inputExpMonth= document.getElementById("exp-month");
const inputExpYear = document.getElementById("exp-year");
const inputCCNumber = document.getElementById("cc-num");
const inputZip = document.getElementById("zip");
const inputCVV = document.getElementById("cvv");
const inputPaypal = document.getElementById("paypal");
const inputBitcoin = document.getElementById("bitcoin");

/**The "Name" field: the first text field is focused when the page loads
 **/
inputName.focus();

/**"Job Role" Section: when selecting other in the Job Role section,
the "Other Job role" text box will appear**/
otherJobRole.style.display = 'none';

inputJobRole.addEventListener('change', e => {
    if(e.target.value==='other'){
        otherJobRole.style.display = 'block';
    } else{
        otherJobRole.style.display = 'none'
    };
});

/**"T-Shirt Info" Section:
 **/
// disable the Color element
inputColor.disabled = true;

inputDesign.addEventListener('change', e => {
    inputColor.disabled = false;
    if(e.target.value === 'js puns'){
        for(let i = 1; i < inputColor.length; i++){
            let dataTheme = inputColor[i].getAttribute('data-theme');
            if(dataTheme === 'js puns'){
                //inputColor[i] works for here too
                inputColor.options[i].selected = true;
                inputColor.options[i].hidden = false;
            } else {
                inputColor.options[i].selected = false;
                inputColor.options[i].hidden = true;
            }
        }//end of for loop
    } else if (e.target.value === 'heart js'){
        for(let i = 1; i < inputColor.length; i++){
            let dataTheme = inputColor[i].getAttribute('data-theme');
            if(dataTheme === 'heart js'){
                inputColor.options[i].selected = true;
                inputColor.options[i].hidden = false;
            } else {
                inputColor.options[i].selected = false;
                inputColor.options[i].hidden = true;
            }
        }//end of for loop
    }
});//end of addEventListener

/**
 Register for Activities Section: The "Total: $" element below the "Register for Activities" section
 should update to reflect the sum of the cost of the user’s selected activities
 */
 ActivitiesFieldSet.addEventListener('change', e => {
     let totalCost = 0;
     for (let i = 0; i < ActivitiesCheckBox.length; i++){
         if(ActivitiesCheckBox[i].checked === true){
            totalCost += parseInt(ActivitiesCheckBox[i].getAttribute('data-cost'));
         }
     }//end of for loop
     //change the p element with id of "activities-cost" with updated cost
     inputCost.innerHTML = `Total: $${totalCost}`;
     if(totalCost !== 0){
         inputCost.nextElementSibling.style.display = "none";
         inputCost.parentElement.classList.add("valid");
         inputCost.parentElement.classList.remove("not-valid");
     } else {
         inputCost.nextElementSibling.style.display = "inherit"
         inputCost.parentElement.classList.add("not-valid");
         inputCost.parentElement.classList.remove("valid");
     }
 });//end of addEventListener

 // Adding focus and blur events to the activities check box for user accessibility
 for (let i = 0; i < ActivitiesCheckBox.length; i++) {
    ActivitiesCheckBox[i].addEventListener ('focus', e => {
         e.target.parentElement.classList.add('focus');
     })
     ActivitiesCheckBox[i].addEventListener ('blur', e => {
         e.target.parentElement.classList.remove('focus');
 })
}
 
// Prevent users from registering for conflicting activities
ActivitiesFieldSet.addEventListener('change', e => {
    const targetDayAndTime = e.target.getAttribute('data-day-and-time');
    for (let i = 0; i < ActivitiesCheckBox.length; i++){
        const currentDayAndTime = ActivitiesCheckBox[i].getAttribute('data-day-and-time');
            if (ActivitiesCheckBox[i] !== e.target){
                if(currentDayAndTime === targetDayAndTime){
                    ActivitiesCheckBox[i].disabled = true;
                    ActivitiesCheckBox[i].parentElement.classList.add('disabled');
                    if (e.target.checked === false) {
                        ActivitiesCheckBox[i].disabled = false;
                        ActivitiesCheckBox[i].parentElement.classList.remove('disabled');
                    }
                 }
            }
    }//end of for loop
});

/* Payment Info Section
*/
const creditCardOpt = inputPayment.options[1];
creditCardOpt.selected = true;
inputPaypal.hidden = true;
inputBitcoin.hidden = true;
inputPayment.addEventListener('change', e => {
    if (e.target.value === 'paypal'){
        inputPaypal.hidden = false;
        CCDiv.hidden = true;
        inputBitcoin.hidden = true;
    } else if (e.target.value === 'bitcoin'){
        inputBitcoin.hidden = false;
        inputPaypal.hidden = true;
        CCDiv.hidden = true;
    } else if (e.target.value === 'credit-card'){
        inputBitcoin.hidden = true;
        inputPaypal.hidden = true;
        CCDiv.hidden = false;
    } 
});//end of addEventListener

/* Form validation
*/
//will return true or false if the string is valid or not
function isValidName(){
    const name = inputName.value;
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);
}

function isValidEmail(){
    const email = inputEmail.value;
    return  /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidAct(){
    let totalCost = 0;
    for (let i = 0; i < ActivitiesCheckBox.length; i++){
        if(ActivitiesCheckBox[i].checked === true){
           totalCost += parseInt(ActivitiesCheckBox[i].getAttribute('data-cost'));
        }
    }//end of for loop
    if (totalCost !== 0) {
        return true
    } else {
        return false
    }
}

function isValidCardNum(){
    const number = inputCCNumber.value;
    return /^[0-9]{13}\d?\d?\d?$/.test(number);
}

function isValidZip(){
    const zip = inputZip.value;
    return /^[0-9]{5}$/.test(zip);
}

function isValidCVV(){
    const cvv = inputCVV.value;
    return /^[0-9]{3}$/.test(cvv);
}

//This function can validate the valifator and determine to show or hide tips

function createListener (validation) {
    return e => {
        const valid = validation() && e.target.value!== "";
        const toolTip = e.target.nextElementSibling;
        if (!valid) {
            toolTip.style.display = "inherit";
            toolTip.parentElement.classList.add("not-valid");
            toolTip.parentElement.classList.remove("valid");
            // toolTip.parentElement.lastElementChild.style.display = "inherit";
        } else {
            toolTip.style.display = "none";
            toolTip.parentElement.classList.add("valid");
            toolTip.parentElement.classList.remove("not-valid");
            // toolTip.parentElement.lastElementChild.style.display = "none";
        }
    }
};

inputName.addEventListener('input', createListener(isValidName));
inputCCNumber.addEventListener('input', createListener(isValidCardNum));
inputZip.addEventListener('input', createListener(isValidZip));
inputCVV.addEventListener('input', createListener(isValidCVV));

inputEmail.addEventListener('input', e => {
    const toolTip = e.target.nextElementSibling;
    if (e.target.value === "") {
        toolTip.innerHTML = "Email address cannot be empty";
        toolTip.style.display = "inherit";
        toolTip.parentElement.classList.add("not-valid");
        toolTip.parentElement.classList.remove("valid");
    } else if (!isValidEmail()) {
        toolTip.innerHTML = "Email address must be formatted correctly";
        toolTip.style.display = "inherit";
        toolTip.parentElement.classList.add("not-valid");
        toolTip.parentElement.classList.remove("valid");
    } else {
        toolTip.style.display = "none";
        toolTip.parentElement.classList.add("valid");
        toolTip.parentElement.classList.remove("not-valid");
    }
})
//Submit Listener on the form element

form.addEventListener('submit', e => {
    if (!isValidName()) {
        inputName.nextElementSibling.style.display = "inherit";
        inputName.parentElement.classList.add("not-valid");
        inputName.parentElement.classList.remove("valid");
        e.preventDefault();
    } else {
        inputName.nextElementSibling.style.display = "none";
        inputName.parentElement.classList.add("valid");
        inputName.parentElement.classList.remove("not-valid");
    }
    if (inputEmail.value === ""){
        inputEmail.nextElementSibling.innerHTML = "Email address cannot be empty";
        inputEmail.nextElementSibling.style.display = "inherit";
        inputEmail.parentElement.classList.add("not-valid");
        inputEmail.parentElement.classList.remove("valid");
        e.preventDefault();
    }
    else if (!isValidEmail()) {
        inputEmail.nextElementSibling.innerHTML = "Email address must be formatted correctly";
        inputEmail.nextElementSibling.style.display = "inherit";
        inputEmail.parentElement.classList.add("not-valid");
        inputEmail.parentElement.classList.remove("valid");
        e.preventDefault();
    } else {
        inputEmail.nextElementSibling.style.display = "none";
        inputEmail.parentElement.classList.add("valid");
        inputEmail.parentElement.classList.remove("not-valid");
    }
    if (creditCardOpt.selected){
        if (!isValidCardNum()) {
            inputCCNumber.nextElementSibling.style.display = "inherit";
            inputCCNumber.parentElement.classList.add("not-valid");
            inputCCNumber.parentElement.classList.remove("valid");
            e.preventDefault();
        } else {
            inputCCNumber.nextElementSibling.style.display = "none";
            inputCCNumber.parentElement.classList.add("valid");
            inputCCNumber.parentElement.classList.remove("not-valid");
        }
        if (!isValidZip()) {
            inputZip.nextElementSibling.style.display = "inherit";
            inputZip.parentElement.classList.add("not-valid");
            inputZip.parentElement.classList.remove("valid");
            e.preventDefault();
        } else {
            inputZip.nextElementSibling.style.display = "none";
            inputZip.parentElement.classList.add("valid");
            inputZip.parentElement.classList.remove("not-valid");
        }
        if (!isValidCVV()) {
            inputCVV.nextElementSibling.style.display = "inherit";
            inputCVV.parentElement.classList.add("not-valid");
            inputCVV.parentElement.classList.remove("valid");
            e.preventDefault();
        } else {
            inputCVV.nextElementSibling.style.display = "none";
            inputCVV.parentElement.classList.add("valid");
            inputCVV.parentElement.classList.remove("not-valid");
        }
    }
    if (!isValidAct()) {
        inputCost.nextElementSibling.style.display = "inherit";
        inputCost.parentElement.classList.add("not-valid");
        inputCost.parentElement.classList.remove("valid");
        e.preventDefault();
    } else {
        inputCost.nextElementSibling.style.display = "none";
        inputCost.parentElement.classList.add("valid");
        inputCost.parentElement.classList.remove("not-valid");
    }

    console.log('Submit handler is functional!');
})