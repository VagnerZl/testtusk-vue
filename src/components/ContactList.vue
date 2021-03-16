<template>
  <div>
    <ul>
      <ContactItem
        v-for="contact of contacts"
        :key="contact.id"
        v-bind:contact="contact"
      />
    </ul>
  </div>
</template>

<script>
import ContactItem from "@/components/ContactItem.vue";

export default {
  props: ["contacts"],
  components: {
    ContactItem,
  },
  methods: {},
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 30px 0;
}
div {
  min-width: 300px;
  max-width: 50%;
  margin: 20px auto;
  border: 1px solid rgb(92, 92, 92);
  border-radius: 10px;
  background-color: rgb(248, 248, 248);
}
</style>