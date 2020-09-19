import httpService from './httpService'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
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

async function login(userCred) {
    // const user = await httpService.post('auth/login', userCred)
    const user = await httpService.post(`user`, userCred)
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