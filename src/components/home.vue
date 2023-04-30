<template>
    <div class="container">
        <h1 class="display-1 d-flex text-center align-items-center justify-content-center">
            Welcome to Home Page
        </h1>

        <router-link to="/login" v-if="!ifUserLogin()">
            <button class="btn btn-info">
                Login
            </button>
        </router-link>

        <button class="btn btn-info" v-if="ifUserLogin()" @click="logout">
                Logout
        </button>

        <router-link to="/update-password" v-if="ifUserLogin()">
            <button class="btn btn-info">
                Update Password
            </button>
        </router-link>

        <router-link to="/delete-account" v-if="ifUserLogin()">
            <button class="btn btn-info">
               Delete Account
            </button>
        </router-link>

        <lord-icon trigger="hover" src="/123.json"></lord-icon>
    </div>
</template>

<script>
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
export default {

    methods:{

        logout(){
            localStorage.setItem('user', null);
            this.$router.push('/login');
        },
        ifUserLogin(){
            return JSON.parse(localStorage.getItem('user'))?.authToken ? true : false;
        }
    }

}

</script>