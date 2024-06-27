const Signup = document.getElementById('form')
const formMessage = document.getElementById('form-message')
const errorElement =  document.querySelectorAll('.error')


//clear errors
function clearErrors() {
    errorElement.forEach(error => { error.textContent = '' 
    });

}

// set the error messages
function setError(field, message) {
    const errElement = document.getElementById(`${field}-error`)
    if(errElement) {errElement.textContent = message}
    else{
        console.error(`Error element for ${field} not found`)
    }
    
}

//
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase());
}
    
function isStrongPassword(password) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return reg.test(password);
}

Signup.addEventListener('submit', (e) => {
    e.preventDefault()

    //get form data 1st approach
   /* const data = {}
    const fields = e.target.querySelectorAll('input')

    for(const field of fields){
        data[field.name] = field.value
    }
    */

    //second approach to get form data
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    let hasError = false

    clearErrors()

    //name validation
    if(!data.name || data.name.trim() == ''){
        setError('name', 'Name is required')
        hasError = true
    }

    //email validation
    if(!data.email ||!isValidEmail(data.email)){
        setError('email','Enter valid email')
        hasError = true
    }

    // valid password
    if (!data.password || data.password.trim() === '') {
        setError('password', 'Password is required.');
        hasError = true;
    } else if (data.password.length < 6) {
        setError('password', 'Password must be at least 6 characters long.');
        hasError = true;
    }

    //confirm password
    if(data.password !== data.cpassword){
        setError('cpassword', 'Password must match')
        hasError = true
    }
    // there are no errors

    if(!hasError){
        alert('Form submited successfully')
    }
    Signup.reset()
})



