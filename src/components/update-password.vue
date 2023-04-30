<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow-lg rounded-0">
                    <div class="card-body">
                        <h4 class="display-1 text-center">Update Password</h4>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mb-2">
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    v-model="data.password"
                                />
                                <span class="text-danger">{{ warnings.passwordwar }}</span>
                                <span class="">{{ success.textPass }}</span>
                            </div>
                            <div class="form-group mt-3 ">
                                <button
                                    type="submit"
                                    class="btn btn-primary btn-purple"
                                    @click.prevent="updatePassword"
                                >

                                    Update
                                </button>
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
            data: {
                password:''
            },
            warnings: {
                passwordwar: '',
            },
            success:{
                textPass: ''
            }
        }
    },

    mounted(){

        const user = JSON.parse(localStorage.getItem('user'));
            
        if(!user?.authToken) {
            this.$router.push('/login');
            return;
        }

    },
    methods:{
        updatePassword(){
            
            const user = JSON.parse(localStorage.getItem('user'));
            

            if(!user?.authToken) {
                this.$router.push('/login');
                return;
            }

            axios.put('http://localhost:3000/update-password', 
                this.data, 
                {
                    headers: {"Authorization": `Bearer ${user.authToken}`}
                }
            )
            .then(res=>{
                if (res.status == 200) {

                    this.success.textPass = "Password Updated."

                }                    
               
            }).catch(err=>{
                console.log(err);
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