import axios from 'axios';

const url = "https://slimmom-backend.herokuapp.com/"; //"https://lpj-tasker.herokuapp.com"

axios.defaults.baseURL = url;

class PhonebookService {

    //===================  auth ===================

    register(newUser){
        return axios.post('/auth/register', newUser)
    }

    login(userCredentials){
        return axios.post('/auth/login', userCredentials)
    }

    logout(token){
        return axios.post('/auth/logout', token)
    }    

    getCurrentUser(){
        return axios.get('/user')
    }

    setToken(token){
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    unsetToken(){
        axios.defaults.headers.common.Authorization = ``;
    }

    //================== contacts ==================
    getContacts(){
        return axios.get('/contacts'); 
    }

    addContact(newContact) {
        return axios.post('/contacts', newContact);
    }

    delContact(id) {
        return axios.delete(`/contacts/${id}`)
    }
    
    updateContact(id) {
        return axios.patch(`/contacts/${id}`)
    }

}

export default new PhonebookService();