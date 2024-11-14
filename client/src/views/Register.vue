<template>
  <form class="styled-form" id="reg-form" @submit.prevent="handleSubmit">
    <label for="rm">RM:</label>
    <input type="text" id="rm" v-model="form.rm" @input="updatePassword" required />

    <label for="name">Nome:</label>
    <input type="text" id="name" v-model="form.name" required />

    <label for="password">Senha (RM):</label>
    <input type="password" id="password" v-model="form.password" readonly required />

    <div class="checkbox-group">
      <input type="checkbox" id="tg_role" value="Responsável" v-model="form.roles" />
      <label for="tg_role">Professor de Trabalho de Graduação</label>
      <input type="checkbox" id="advisor_role" value="Orientador" v-model="form.roles" />
      <label for="advisor_role">Professor Orientador</label>
      <input type="checkbox" id="coordinator_role" value="Coordenador" v-model="form.roles" />
      <label for="coordinator_role">Coordenador de Curso</label>
    </div>

    <button type="submit">Cadastrar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        rm: '',
        name: '',
        password: '',
        roles: [],
      },
    };
  },
  methods: {
    updatePassword() {
      this.form.password = this.form.rm;
    },
    handleSubmit() {
      const data = {
        rm: this.form.rm,
        name: this.form.name,
        password: this.form.password,
        roles: this.form.roles,
      };

      fetch('http://localhost:8080/api/professor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      console.log(data);
    },
  },
};
</script>

<style>
.styled-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f7f7f7;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.styled-form label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
}

.styled-form input[type="text"],
.styled-form input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
  margin-bottom: 8px;
  color: #555;
}
</style>
