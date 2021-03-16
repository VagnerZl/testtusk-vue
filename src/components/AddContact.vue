<template>
  <form class="addform" v-on:submit.prevent="onSubmit">
    <input type="text" placeholder="name" v-model="name" />
    <input type="text" placeholder="surname" v-model="surname" />
    <button class="submbtn" type="submit">Добавить контакт</button>
  </form>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      surname: "",
    };
  },
  methods: {
    ...mapMutations(["addContact"]),
    onSubmit() {
      if (this.name.trim() && this.surname.trim()) {
        this.addContact({
          id: Date.now(),
          name: this.name,
          surname: this.surname,
          options: [],
        });
        this.name = "";
        this.surname = "";
      }
    },
  },
};
</script>

<style scoped >
.addform {
  margin: 0 auto;
  min-width: 300px;
  max-width: 50%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
input {
  font-size: 20px;
  display: inline-block;
  flex-grow: 1;
  height: 30px;
  border-radius: 5px;
}
.submbtn {
  height: 36px;
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  background-color: #d3d3d3;
  border-radius: 5px;
}
</style>