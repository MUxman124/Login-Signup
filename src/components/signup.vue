<template>
    <div class="container">
        <div class="row justify-content-center"
            style="margin-top: 10px;">
            <div class="col-md-4">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <h4 class="display-1 text-center">Sign Up</h4>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mb-2">
                                <input

                                    type="text"
                                    class="form-control"
                                    id="name"
                                    placeholder="Enter name"
                                    v-model="name"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input
                                 type="email"
                                    class="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    v-model="email"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    v-model="password"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input

                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Confirm password"
                                    v-model="password_confirmation"
                                />
                            </div>
                            <div class="form-group mb-2">
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
                            <div class="form-group mt-3">
                                 <button
                                type="submit"
                                class="btn btn-primary btn-purple"
                                @click.prevent="signup"
                                >
                                    Signup
                                </button>
                            </div>
                            <div class="form-group mt-3">
                                 <span class="text-muted">  
                                  Already have Account?
                               
                                </span>
                            <span class="text-muted">
                                <router-link to="/login">
                                    <a href="#">Login</a>
                                </router-link>
                            </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

import {ref} from 'vue'


export default defineComponent({
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')

    return {
      name,
      email,
      password,
      password_confirmation,
      signup() {
        if (this.password !== this.password_confirmation) {
          alert('Password confirmation does not match password')
          return
        }
        else {
            console.log(this.name, this.email, this.password, this.password_confirmation)
            axios.post('http://localhost:3000/signup', {
                name: this.name.replace(/\s+/g, '-').toLowerCase(),
                email: this.email,
                password: this.password
                
            }).then(res => {
                console.log(res.data)
                if (res.status == 200) {
                    this.$router.push('/login')
                }
            }).catch(error => {
                console.log(error);
            })
        }

      }
    }
  },
})
</script>

<style scoped>
.btn-purple {
  background: linear-gradient(to right, #6e0e8b, #1b79d1);
  color: #fff;
  width: 100%;
  font-size: large;
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

</style>
