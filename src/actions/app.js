import {
  CHANGE_LOGIN,
  SET_USERS,
  DELETE_USERS,
  SET_POSTS,
  DELETE_POSTS
} from '../constants/actionTypes'

export const changeLogin = (isLoggedIn) => {
  return {
    type: CHANGE_LOGIN,
    payload: isLoggedIn
  }
};

export const deleteUser = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:3033/users/${id}`, {
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
    fetch('http://localhost:3033/users', {
      method: 'GET',
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

export const signUp = ({ name ,email, pass }, history) => {
  return (dispatch) => {
    fetch('http://localhost:3033/users/signUp', {
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
        console.log(err);
      })
  }
};

export const signIn = ({ email, pass }, history) => {
  return (dispatch) => {
    fetch('http://localhost:3033/users/signIn', {
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
        return history.push('/mainMenu')
      })
      .catch((err) => {
        console.log(err);
      })
  }
};
export const logout = () => {
    return (dispatch) => {
        fetch('http://localhost:3033/users/logout', {
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
            .then(() => {
                return dispatch({
                    type: CHANGE_LOGIN,
                    payload: false
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getPosts = () => {
    return (dispatch) => {
        fetch('http://localhost:3033/posts', {
            method: 'GET',
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
                    type: SET_POSTS,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const deletePost = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3033/posts/${id}`, {
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
                    type: DELETE_POSTS,
                    payload: id
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
