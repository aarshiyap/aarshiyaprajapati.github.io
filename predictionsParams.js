const meanValues = {
    age: 38.08633633633634,
    gender: "female",
    bmi: 30.658333333333328,
    bloodpressure: 94.1891891891892,
    diabetic: 0.47822822822822825,
    children: 1,
    smoker: 0.2057057057057057,
    region: "Northwest",
    claim: 13325.246426426416
  };

  const stdValues = {
    age: 11.108632012817202,
    gender: 0.4999909818916377,
    bmi: 6.116669581706353,
    bloodpressure: 11.440875704251111,
    diabetic: 0.4995257650551349,
    children: 1.2055053797881516,
    smoker: 0.40421636328311017,
    region: 1.0947078707395852,
    claim: 12105.074205
  };

  const weights = {
    'age': 0.02395204,
    'gender': 0.00855673,
    'bmi': 0.15993287,
    'bloodpressure': 0.22657713,
    'diabetic': -0.03026697,
    'children': 0.06236328,
    'smoker': 1.6927791,
    'region': 0.04902264
  };
  

const dictionaryConversion = {
  "yes": 1, "no": 0,
  "Southeast": 1, "Northwest": 2, "Southwest": 3, "Northeast": 4,
  "female": 1, "male": 0
};

  
  const intercept = -0.52172069;
  
    function onPredict() {

  
        // Get the values from text areas, checkboxes, and select
        const bmi = document.getElementById("bmiTextarea").value !== '' ? parseFloat(document.getElementById("bmiTextarea").value) : meanValues['bmi'];
        const bloodPressure = document.getElementById("bpTextarea").value ? parseFloat(document.getElementById("bpTextarea").value) : meanValues['bloodpressure'] ;
        const age = document.getElementById("ageTextarea").value ? parseFloat(document.getElementById("ageTextarea").value) : meanValues['age'] ;
        const childNum = document.getElementById("childTextarea").value !== '' ? parseFloat(document.getElementById("childTextarea").value) : meanValues['children'];

        const diabetic = document.getElementById("checkBoxDiabetic").checked ? 1 : 0;
        const smoker = document.getElementById("checkBoxSmoker").checked ? 1 : 0;
        const gender = document.getElementById("genderSelect").value !== '' ? document.getElementById("genderSelect").value : meanValues['gender'];
        const region = document.getElementById("regionSelect").value !== '' ? document.getElementById("regionSelect").value : meanValues['region'];



      


        console.log("Gender: ", gender);
        // Map values to integers using the conversion dictionary
        const mappedGender = dictionaryConversion[gender];
        const mappedRegion = dictionaryConversion[region];
  
    
        // Standardize the values
        const standardizedBMI = standardize(bmi, meanValues.bmi, stdValues.bmi);
        const standardizedAge = standardize(age, meanValues.age, stdValues.age);
        const standardizedChildNum = standardize(childNum, meanValues.children, stdValues.children);

        const standardizedBloodPressure = standardize(bloodPressure, meanValues.bloodpressure, stdValues.bloodpressure);
  
        const predictedValue = intercept +
        weights['age'] * standardizedAge +
        weights['gender'] * mappedGender +
        weights['bmi'] * standardizedBMI +
        weights['bloodpressure'] * standardizedBloodPressure +
        weights['diabetic'] * diabetic +
        weights['children'] * childNum +
        weights['smoker'] * smoker +
        weights['region'] * mappedRegion;
  
        console.log("Pridicted Values: " , predictedValue);
  
        const actualValue = destandardize(predictedValue , meanValues.claim , stdValues.claim);
  
        console.log("Actual Values: " , actualValue);

       
    getStoreValues(
        bmi, bloodPressure, age, childNum, diabetic, smoker, gender, region,
        standardizedBMI, standardizedBloodPressure, standardizedAge, standardizedChildNum,
        mappedGender, mappedRegion, actualValue , predictedValue);

        if (isNaN(actualValue)) {
          alert("Please Enter Correct Input");
        } else {
          goToResults();
        }
  
      }
    
    function standardize(value, mean, std) {
  
        const standarValue = (value - mean)/std;
        return standarValue;
    }
  
  function destandardize(value, mean, std) {
    const standarValue = (value * std ) + mean;
    return standarValue;
  }

  function getStoreValues(
    bmi, bloodPressure, age, childNum, diabetic, smoker, gender, region,
    standardizedBMI, standardizedBloodPressure, standardizedAge, standardizedChildNum,
    mappedGender, mappedRegion, actualValue ,predictedValue) {
    
    // Store original values
    localStorage.setItem('bmi', bmi.toString());
    localStorage.setItem('bloodPressure', bloodPressure.toString());
    localStorage.setItem('age', age.toString());
    localStorage.setItem('childNum', childNum.toString());
    localStorage.setItem('diabetic', diabetic.toString());
    localStorage.setItem('smoker', smoker.toString());
    localStorage.setItem('gender', gender.toString());
    localStorage.setItem('region', region.toString());
    localStorage.setItem('predictedValue', predictedValue.toString());


    

    // Store standardized values
    localStorage.setItem('standardizedAge', standardizedAge.toString());
    localStorage.setItem('standardizedBMI', standardizedBMI.toString());
    localStorage.setItem('standardizedBloodPressure', standardizedBloodPressure.toString());

    localStorage.setItem('standardizedChildNum', standardizedChildNum.toString());
    localStorage.setItem('standardizedGender', mappedGender.toString());
    localStorage.setItem('standardizedSmoker', smoker.toString());
    localStorage.setItem('standardizedDiabetic', diabetic.toString());

    localStorage.setItem('standardizedRegion', mappedRegion.toString());

    localStorage.setItem('actualValue', actualValue.toString());


    
    }
  
  function goToResults(){
         window.location.href = "Results.html";
   }