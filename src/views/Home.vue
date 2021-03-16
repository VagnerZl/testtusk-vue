<template>
  <div id="home">
    <h1>Список контактов</h1>
    <AddContact />
    <ContactList v-bind:contacts="allContacts" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ContactList from "@/components/ContactList.vue";
import AddContact from "@/components/AddContact.vue";

export default {
  name: "App",
  computed: {
    ...mapGetters(["allContacts"]),
  },

  mounted: function () {},
  components: {
    ContactList,
    AddContact,
  },
};
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
