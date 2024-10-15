const backendDomin = "http://localhost:8000"


const SummaryApi = {
    signUp : {
        url: `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url: `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user : {
        url : `${backendDomin}/api/user-logout`,
         method: "post"
    },
}

export default SummaryApi