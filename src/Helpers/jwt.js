export const checkJwtTimeOut = (props) => {
    // console.log("In getJWT", localStorage.getItem('JWT_TOKEN'))
    const now = new Date().getTime();
    if(now>=localStorage.getItem('JWT_TIMER')) {
        localStorage.clear();
        props.history.push('/login')
     }
}