
const valuesList = [
    'age',
    'bmi',
    'bloodPressure',
    'diabetic',
    'childNum',
    'smoker',
];
const valueLists2 = [
    'standardizedAge',
    'standardizedBMI',
    'standardizedBloodPressure',
    'diabetic',
    'standardizedChildNum',
    'smoker',
    'standardizedGender',
    'standardizedRegion',
];

const conversionDict = {
    1: "Yes", 0 : "No"  , meanClaim : 13325.246426426416 ,  stdCaim : 12105.074205}

window.onload = function() {

    setClaimsSection();  // Call the function to set the text
    tableConversion();
}

function setClaimsSection() {
    document.getElementById("claims").innerText = "$" + parseInt(localStorage.getItem("actualValue"));
}

function tableConversion() {
    const table = document.getElementById('conversionTable');
    const tableBody = table.querySelector('tbody'); // Get the tbody element

    const rows = tableBody.children; // Get all rows in the tbody

    for (let rowVal = 0; rowVal < 7; rowVal++) {

        // Get the current value for the corresponding property
        let currValue = 0 ;
        getItm = valuesList[rowVal];

        if (getItm == "diabetic" || getItm == "smoker"){
            tempVal = parseFloat(localStorage.getItem(getItm));
             currValue = conversionDict[tempVal];

        }else{

             currValue = parseFloat(localStorage.getItem(getItm));
        }
        const currValueTwo = parseFloat(localStorage.getItem(valueLists2[rowVal]));
        rows[rowVal].children[1].textContent = currValue;
        rows[rowVal].children[2].textContent = currValueTwo;


    }

    rows[7].children[1].textContent = localStorage.getItem("region");
    rows[6].children[1].textContent = localStorage.getItem("gender");

    rows[7].children[2].textContent = localStorage.getItem("standardizedRegion");

    //set the fromula

    document.getElementById('formulaApplication').innerText= "$" + parseInt(localStorage.getItem("actualValue"))+ " = " + localStorage.getItem('predictedValue').toString() + "(Predicted Value) * " + conversionDict['stdCaim'].toString() + " (Standarized Value) + " + conversionDict['meanClaim'].toString();
   

}

