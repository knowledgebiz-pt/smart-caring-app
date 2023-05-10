const apiUrl = ""
export async function LoginUser(email, password) {
    console.log('Attempting login with')
    console.log('Email:', email)
    console.log('Password:', password)
    // try {
    //     const res = await fetch(`${apiUrl}login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //         },
    //     })
    //     const json = await res.json()
    //     /// login if successful



    //     /// warn failed login if not



    // }
    // catch (e) {
    //     console.log(e)
    //     /// warn error
    // }
    // finally {
    //     // unsure if needed yet
    // }
    return "done"
}

export async function RecoverUserPassword(email) {
    console.log('Attempting password recovery of')
    console.log('Email:', email)
}