<template>
  <div class="wrapper">
    <router-link
      :to="{
        name: 'home',
        params: {},
      }"
    >
      К списку контактов
    </router-link>
    <div class="contact">{{ contact.name + " " + contact.surname }}</div>
    <ul>
      <li
        class="option"
        v-for="(option, index) in contact.options"
        :key="index"
      >
        <input class="first" v-model="option[0]" disabled /> :
        <input class="second" v-model="option[1]" disabled />
        <button
          v-bind:id="index"
          v-on:click="removeOption"
          class="remove-button"
        >
          &times;
        </button>
        <button
          class="btn"
          ref="change"
          v-bind:id="index"
          v-on:click="changeOption"
        >
          Изменить
        </button>
        <button
          ref="save"
          class="nobtn btn"
          v-bind:id="index"
          v-on:click="saveChanges"
        >
          Сохранить
        </button>
        <button
          ref="back"
          class="nobtn btn"
          v-bind:id="index"
          v-on:click="backChanges"
        >
          Отменить
        </button>
      </li>
    </ul>
    <form class="add-form" v-on:submit.prevent="onSubmit">
      <input type="text" placeholder="название" v-model="optionsKey" />
      <input type="text" placeholder="значение" v-model="optionsValue" />
      <button class="submbtn" type="submit">Добавить</button>
    </form>
    <button class="btn undo" v-if="done.length > 1" v-on:click="undo">
      Отменить последнее изменение
    </button>
    <Confirm
      v-if="needConfirm"
      v-on:yes-confirm="yesConfirm"
      v-on:none-confirm="noneConfirm"
    />
  </div>
</template>

<script>
import Confirm from "@/components/Confirm.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  props: ["id"],

  data() {
    return {
      done: [],
      contact: "",
      optionsKey: "",
      optionsValue: "",
      changeoptionKey: "",
      changeoptionValue: "",
      showbuttons: false,
      needConfirm: false,
    };
  },
  computed: {
    ...mapGetters(["getContactById"]),
  },
  methods: {
    ...mapMutations(["changeContact"]),

    onSubmit() {
      if (this.optionsKey && this.optionsValue) {
        this.contact.options.push([[this.optionsKey], this.optionsValue]);
        this.changeContact(this.contact);
        this.optionsKey = "";
        this.optionsValue = "";
      }
    },
    removeOption(event) {
      return new Promise((resolve, reject) => {
        this.needConfirm = true;
        this.yesConfirm = () => {
          this.removeId = event.target.id;
          this.contact.options.splice(this.removeId, 1);
          this.changeContact(this.contact);
          this.needConfirm = false;
          this.$refs.change.forEach(function (item) {
            item.classList.remove("nobtn");
          });
          resolve();
        };
        this.noneConfirm = () => {
          this.needConfirm = false;
        };
      });
    },
    changeOption(event) {
      event.target.parentNode.querySelector(".first").disabled = false;
      event.target.parentNode.querySelector(".second").disabled = false;
      this.showbuttons = true;
      console.log(this.$refs.change);
      this.$refs.change.forEach(function (item) {
        item.classList.add("nobtn");
      });

      this.$refs.save[event.target.id].classList.remove("nobtn");
      this.$refs.save[event.target.id].classList.add("showbtn");
      this.$refs.back[event.target.id].classList.remove("nobtn");
      this.$refs.back[event.target.id].classList.add("showbtn");
      this.changeoptionKey = event.target.parentNode.querySelector(
        ".first"
      ).value;
      this.changeoptionValue = event.target.parentNode.querySelector(
        ".second"
      ).value;
    },
    saveChanges(event) {
      this.contact.options[event.target.id] = [
        event.target.parentNode.querySelector(".first").value,
        event.target.parentNode.querySelector(".second").value,
      ];

      event.target.parentNode.querySelector(".first").disabled = true;
      event.target.parentNode.querySelector(".second").disabled = true;
      this.changeContact(this.contact);

      this.$refs.save[event.target.id].classList.remove("showbtn");
      this.$refs.save[event.target.id].classList.add("nobtn");
      this.$refs.back[event.target.id].classList.remove("showbtn");
      this.$refs.back[event.target.id].classList.add("nobtn");
      this.$refs.change.forEach(function (item) {
        item.classList.remove("nobtn");
      });
    },
    backChanges(event) {
      return new Promise((resolve, reject) => {
        this.needConfirm = true;
        this.yesConfirm = () => {
          this.contact.options[event.target.id] = [
            this.changeoptionKey,
            this.changeoptionValue,
          ];
          event.target.parentNode.querySelector(".first").disabled = true;
          event.target.parentNode.querySelector(".second").disabled = true;
          this.$refs.save[event.target.id].classList.remove("showbtn");
          this.$refs.save[event.target.id].classList.add("nobtn");
          this.$refs.back[event.target.id].classList.remove("showbtn");
          this.$refs.back[event.target.id].classList.add("nobtn");
          this.$refs.change.forEach(function (item) {
            item.classList.remove("nobtn");
          });
          this.needConfirm = false;
          resolve();
        };
        this.noneConfirm = () => {
          this.needConfirm = false;
        };
      });
    },

    undo() {
      this.done.pop();
      this.contact = this.done.pop();

      this.changeContact(this.contact);
    },
  },
  mounted: function () {
    this.contact = this.getContactById(+this.id);
    this.changeContact(this.contact);
  },
  created: function () {
    this.$store.subscribe((mutation) => {
      let item = JSON.parse(JSON.stringify(mutation.payload));
      if (
        JSON.stringify(item) != JSON.stringify(this.done[this.done.length - 1])
      ) {
        this.done.push(item);
      }
    });
  },
  components: {
    Confirm,
  },
};
</script>
<style>
.nobtn {
  display: none;
}
.showbtn {
  display: inline;
}
a {
  font-weight: bold;
  font-size: 30px;
  color: #2c3e50;
}
.wrapper {
  min-width: 320px;
  max-width: 770px;
  margin: 0 auto;
  text-align: center;
  font-size: 24px;
}
.add-form {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
.contact {
  margin: 25px 0;
}
.option {
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 10px 0;
  min-height: 30px;
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
.remove-button {
  font-weight: bold;
  font-size: 24px;
  border-radius: 5px;
  background-color: rgb(128, 128, 128);
  color: rgb(255, 242, 242);
  text-align: center;
}
.btn {
  font-weight: bold;
  font-size: 18px;
  border-radius: 5px;
  color: #2c3e50;
}
.undo {
  margin: 10px 0;
}
</style>