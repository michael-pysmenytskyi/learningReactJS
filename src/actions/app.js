import {
    CHANGE_LOGIN,
    SET_USERS,
    DELETE_USERS,
    SIGNUP_ERROR, GET_MY_PROFILE, SIGNIN_ERROR
} from '../constants/actionTypes'

export const changeLogin = (isLoggedIn) => {
    return {
        type: CHANGE_LOGIN,
        payload: {
            isLoggedIn: isLoggedIn
        }
    }
};

export const deleteUser = (id) => {
    return (dispatch) => {
        fetch(`/users/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: DELETE_USERS,
                    payload: id
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getUsers = () => {
    return (dispatch) => {
        fetch('/users', {
            method: 'GET',
            // mode: 'no-cors',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token': 'sas'
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: SET_USERS,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const signUp = ({name, email, pass}, history) => {
    return (dispatch) => {
        fetch('/users/signUp', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                pass
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return history.push('/signIn')
            })
            .catch((err) => {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: err
                })
            })
    }
};

export const signIn = ({email, pass}, history) => {
    return (dispatch) => {
        fetch('/users/signIn', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                pass
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }
                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return history.push('/')
            })
            .then((resp) => {
                return dispatch({
                    type: CHANGE_LOGIN,
                    payload: {
                        isLoggedIn: true
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: SIGNIN_ERROR,
                    payload: err
                })
            })
    }
};

export const checkSession = (history) => {
    return (dispatch) => {
        fetch('/users/checkAuthentication?type=text', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: CHANGE_LOGIN,
                    payload: {
                        user: resp.user,
                        isLoggedIn: true
                    }
                })
            })
            .catch((err) => {
                return history.push('/signIn')
            })
    }
};
export const logout = (history) => {
    return (dispatch) => {
        fetch('/users/logout', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: CHANGE_LOGIN,
                    payload: {
                        users: {},
                        isLoggedIn: false
                    }
                })
            })
            .catch((err) => {
                return history.push('/signIn')
            })
    }
};