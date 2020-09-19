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
    console.log('user_id-', user);
    return httpService.put(`user/${user._id}`, user)
}

function guestMode(){
    return{
        _id:'guest',
        fullName:'guest',
        email:'guest@guest',
        userName:'guest',
        imgUrl:'https://res.cloudinary.com/dygtul5wx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1600549811/sprint%204/users/guest-user_z4inbq.jpg',
        prefs:['none']
    }
}

async function login(userCred) {
    console.log('usercred', userCred.email);
    // const user = await httpService.post('auth/login', userCred)
    const user = await httpService.get(`user/d5tNi2t`)
    console.log('user-',user);
    return _handleLogin(user)
}
async function signup(userCred) {
    // const user = await httpService.post('auth/signup', userCred)
    const user = await httpService.post(`user`, userCred)
    console.log(user);
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