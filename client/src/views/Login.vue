<template>
    
    <!-- Log In Form -->
    <div class="styled-form" id="log-form">
      <h1>Login</h1>
      <form id="login-form">
        <!-- Teacher's RM -->
        <label for="rm">RM</label>
        <input type="text" id="rm" name="rm" required>
        
        <!-- Teacher's password -->
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  // Event listener for the login form
  document.addEventListener("DOMContentLoaded", function () {

    // Submit event for the log in form
    document.getElementById('login-form').addEventListener("submit", function (event) {
      // Prevent from reloading the page
      event.preventDefault();
  
      // Getting the valeus and putting it in the const "data"
      const rm = document.getElementById('rm').value;
      const password = document.getElementById('password').value;
  
      const data = { rm, password };
  
      // Getting the URL from the API to log in
      fetch('http://localhost:8080/api/professor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json()) // Getting the response in JSON
      .then(data => {
        if (data) { // If there is a data, store it in the local storage
          window.localStorage.setItem('token', data);
          console.log('Login bem-sucedido:', data);
        } else {
          console.error('Erro: Token não encontrado na resposta');
        }
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
    });
  });
  </script>
  
  <style>
  #log-form h1 {
    color: #121212;
  }
  </style>
  