export function PostData(userData) {
    return new Promise((resolve, reject) => {
        //Typicode Test
        fetch('http://localhost:5000/api/user/login', {
            // fetch('http://dgha-backend-aus-east.azurewebsites.net/api/members', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
            }) 
            .then((response) => {
                console.log("Login response", response.json());
            })
            .then((responseJson) =>
             {
                 //success
                resolve(responseJson); 
            })
            .catch(error => {
                reject(error);
                console.log("Login error", error);
            });
    })
}

         

