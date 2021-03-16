<template>
  <li>
    <Confirm
      v-if="needConfirm"
      v-on:yes-confirm="yesConfirm"
      v-on:none-confirm="noneConfirm"
    />
    <button
      v-bind:id="contact.id"
      v-on:click="removeContact"
      class="remove-button"
    ></button>

    <router-link
      :to="{
        name: 'contactinfo',
        params: {
          contact: contact,
          id: contact.id,
        },
      }"
    >
      <span>{{ contact.name + " " + contact.surname }}</span>
    </router-link>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import Confirm from "@/components/Confirm.vue";
export default {
  components: { Confirm },
  props: ["contact"],
  data() {
    return {
      needConfirm: false,
    };
  },
  methods: {
    ...mapMutations(["deleteContact"]),
    removeContact(event) {
      return new Promise((resolve, reject) => {
        this.needConfirm = true;
        this.yesConfirm = () => {
          console.log("делать");
          this.deleteContact(event.target.id);
          this.needConfirm = false;
          resolve();
        };
        this.noneConfirm = () => {
          this.needConfirm = false;
        };
      });
    },
  },
};
</script>

<style scoped>
li {
  font-size: 1.4rem;
  font-weight: bold;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: white;
}
.remove-button {
  display: block;
  cursor: pointer;
  margin: 0 35px;
  min-width: 30px;
  min-height: 30px;
  background-color: white;
  background-image: url("/img/delete.png");
  background-size: cover;
  color: #fff;
  border-radius: 50%;
}
a {
  display: flex;
  align-items: center;
  min-height: 50px;
  width: 100%;
  text-align: start;
  text-decoration: none;
  color: #2c3e50;
  word-wrap: break-word;
  word-break: break-all;
}
</style>