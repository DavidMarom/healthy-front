import httpService from './httpService'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    guestMode,
    findIdxToMark
}

function getUsers() {
    return httpService.get('user')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

function guestMode(){
    return{
        _id:'guest',
        fullName:'guest',
        email:'guest@guest',
        userName:'guest',
        imgUrl:'https://res.cloudinary.com/dygtul5wx/image/upload/v1600549811/sprint%204/users/guest-user_z4inbq.jpg',
        prefs:['none']
    }
}

async function login(userCred) {
    // const user = await httpService.post('auth/login', userCred)
    const user = await httpService.get(`user?password=${userCred.password}`)
    //remember to clear [0] once we have a bakcend
    return _handleLogin(user[0])
}
async function signup(userCred) {
    // const user = await httpService.post('auth/signup', userCred)
    const user = await httpService.post(`user`, userCred)
    return _handleLogin(user)
}
async function logout() { 
    // await httpService.post('auth/logout');
    await httpService.post('user')
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function findIdxToMark(suggestions, object){
    return suggestions.findIndex(suggest=> suggest.name === object.name);
}
