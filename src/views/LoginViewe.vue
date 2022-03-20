<template>
  <div>
    <h1>Login</h1>
    <p>User Name : <input v-model="email" type="email" required /></p>
    <p>Password : <input v-model="password" type="password" required /></p>
    <button @click="login()">Login</button>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../plugins/firebaseInit";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      //   const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User=" + user);
          // ...
          this.$router.replace("/about");
          //   this.$router.push("/about");
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " 111" + errorMessage);
        });
    },
    logout() {
      // const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$router.replace("/");
        })
        .catch((error) => {
          // An error happened
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>