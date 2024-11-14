<script setup>
import { RouterLink, RouterView } from 'vue-router'

// Importing JWT Decode and Ref to manipulate the token correctly
import { jwtDecode } from 'jwt-decode';
import { onMounted, ref } from 'vue';

// Defining user as "Null", 'cuz there is no user logged in yet
const user = ref(null)

// When the component is mounted, a "User Check" will happen to see if there are any tokens on the localStorage
onMounted(() => {

  // Getting the token from the localStorage
  const token = window.localStorage.getItem('token')

  // If there is a token, decode it and store it in the user const
  if(token) {
    try {

      // Decoding the token from the localStorage
        const decodedToken = jwtDecode(token)
        // Setting a new value to the user, which is the decoded token
        user.value = decodedToken

        // Printing the User Info for debugging purposes
        console.log('Usuário:', user.value)
    }
    catch (err) {
      console.error('Erro ao decodificar token:', err)
    }
  }

})

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <!-- Using V-IF to check if there are any user's information -->
    <div class="wrapper" v-if="user">
      
      <!-- Printing the user name -->
      <h1> Boas vindas, {{ user.nome }} </h1>

      <!-- Printing the user RM -->
      <h2> RM: {{ user.rm }} </h2>

      <!-- Printing the roles of the user -->
      <span> Permissões: {{ user.permissoes.join(', ') }}. </span>

      <!-- Using V-IF to check if there are any user's information -->
      <nav v-if="!user">
        <RouterLink to="/register">Cadastrar</RouterLink>
        <RouterLink to="/login">Entrar</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
