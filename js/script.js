
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

//create function for displaying error message after clicking the submission button
function notValidInput (input) {
    input.nextElementSibling.style.display = "inherit";
    input.parentElement.classList.add("not-valid");
    input.parentElement.classList.remove("valid");
    // toolTip.parentElement.lastElementChild.style.display = "inherit";
}

//create function for not displaying error message if the input meet validation after submission
function validInput(input) {
    input.nextElementSibling.style.display = "none";
    input.parentElement.classList.add("valid");
    input.parentElement.classList.remove("not-valid");
}
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
         validInput(inputCost);
     } else {
         notValidInput(inputCost);
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
        const targetInput = e.target;
        if (!valid) {
            notValidInput(targetInput);
        } else {
            validInput(targetInput);
        }
    }
};

inputName.addEventListener('input', createListener(isValidName));
inputCCNumber.addEventListener('input', createListener(isValidCardNum));
inputZip.addEventListener('input', createListener(isValidZip));
inputCVV.addEventListener('input', createListener(isValidCVV));

inputEmail.addEventListener('input', e => {
    const targetInput = e.target;
    if (e.target.value === "") {
        e.target.nextElementSibling.innerHTML = "Email address cannot be empty";
        notValidInput(targetInput);
    } else if (!isValidEmail()) {
        e.target.nextElementSibling.innerHTML = "Email address must be formatted correctly";
        notValidInput(targetInput);
    } else {
        validInput(targetInput);
    }
})

//Submit Listener on the form element
form.addEventListener('submit', e => {
    if (!isValidName()) {
        notValidInput(inputName);
        e.preventDefault();
    } else {
        validInput(inputName);
    }
    if (inputEmail.value === ""){
        inputEmail.nextElementSibling.innerHTML = "Email address cannot be empty";
        notValidInput(inputEmail);
        e.preventDefault();
    }
    else if (!isValidEmail()) {
        inputEmail.nextElementSibling.innerHTML = "Email address must be formatted correctly";
        notValidInput(inputEmail);
        e.preventDefault();
    } else {
        validInput(inputEmail);
    }
    if (creditCardOpt.selected){
        if (!isValidCardNum()) {
            notValidInput(inputCCNumber);
            e.preventDefault();
        } else {
            validInput(inputCCNumber);
        }
        if (!isValidZip()) {
            notValidInput(inputZip);
            e.preventDefault();
        } else {
            validInput(inputZip);
        }
        if (!isValidCVV()) {
            notValidInput(inputCVV);
            e.preventDefault();
        } else {
            validInput(inputCVV);
        }
    }
    if (!isValidAct()) {
        notValidInput(inputCost);
        e.preventDefault();
    } else {
        validInput(inputCost);
    }

    console.log('Submit handler is functional!');
})