<template>
    
    <!-- Log In Form -->
    <div class="styled-form" id="log-aluno-form">
      <h1>Login do Aluno</h1>
      <form id="login-form">
        <!-- Student's RA -->
        <label for="ra">RA</label>
        <input type="text" id="ra" name="ra" required>
        
        <!-- Students's password -->
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
    document.getElementById('log-aluno-form').addEventListener("submit", function (event) {
      // Prevent from reloading the page
      event.preventDefault();
  
      // Getting the valeus and putting it in the const "data"
      const ra = document.getElementById('ra').value;
      const password = document.getElementById('password').value;
  
      const data = { ra, password };
  
      // Getting the URL from the API to log in
      fetch('http://localhost:8080/api/aluno/login', {
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
  #log-aluno-form h1 {
    color: #121212;
  }
  </style>
  