<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow-lg rounded-0">
                    <div class="card-body">
                        <h4 class="display-1 text-center">Login</h4>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mb-2">
                                <input type="email" class="form-control" id="email" placeholder="Enter email"   v-model="user.email" />
                                <span v-if="warnings.usernamewar" class="text-danger">{{ warnings.usernamewar }}</span>
                            </div>
                            <div class="form-group mb-2">
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    v-model="user.password"
                                />
                                <span class="text-danger">{{ warnings.passwordwar }}</span>
                            </div>
                            <div class="form-group">
                                <div class="custom-control custom-checkbox mt-2">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input custom-checkbox-input"
                                        id="remember"
                                    />
                                    <label
                                    class="custom-control-label mt-2 custom-checkbox-label"
                                        for="remember"
                                    >
                                        Remember me
                                    </label>

                                </div>
                            </div>
                            <div class="form-group mt-3 ">
                                <button
                                    type="submit"
                                    class="btn btn-primary btn-purple"
                                    @click.prevent="login"
                                >

                                    Login
                                </button>
                            </div>
                            <div class="form-group mt-3">
                                <span class="text-muted">Don't have Account? </span>
                                <router-link to="/signup">
                                    <a href="#">Signup</a>
                                </router-link>
                                <span class="text-muted"> here</span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            user:{
                name: '',
                email:'',
                password:''
            },
            warnings: {
                usernamewar: '',
                passwordwar: '',
            }
        }
    },

    methods:{
        login(){
            console.log(this.user),
            axios.post('http://localhost:3000/login',this.user)
            .then(res=>{
                console.log("hellloo friendssssssssssss")
                if (res.status == 200) {

                    localStorage.setItem('user',JSON.stringify(res.data));
                    console.log(res.data)
                    this.$router.push('/')

                }
                
                console.log("aaaa gyaadsaaaaaaaaaasdasdasdasdasdasdasdasdaaa")
                    
               
            }).catch(err=>{
                console.log(err)
                if (err.response.status == 400) {
                    if (JSON.stringify(err.response.data).includes('User')) {
                         this.warnings.usernamewar = err.response.data
                         console.log(this.warnings.usernamewar)
                            }  
                            else if (JSON.stringify(err.response.data).includes('password')){
                             this.warnings.passwordwar = err.response.data
                         console.log(this.warnings.passwordwar)
                         }
                         else{
                             this.warnings.passwordwar = '',
                             this.warnings.usernamewar = ''
                         }
                }
               
            })
        }
       
}
}
</script>

<style scoped>
.btn-purple {
  background: linear-gradient(to right, #6e0e8b, #1b79d1);
  color: #fff;
  width: 100%;
  font-size: large;
}

.btn-purple:hover{
  background: linear-gradient(to right, #1b79d1, #6e0e8b);
  filter: drop-shadow(0 0 0.2em #646cffaa);

}
.custom-checkbox-input {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-color: purple;
  border: none;
  border-radius: 5px;
  outline: none;
}

.custom-checkbox-label {
  font-size: 1.2rem;
}
.card {
  background: linear-gradient(to bottom, #1fc25b, #1bbfd1);
  color: #fff;
}



</style>