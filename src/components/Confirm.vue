<template>
  <div class="overlay">
    <div class="modal">
      <p>Вы уверены?</p>
      <div>
        <button v-on:click="$emit('yes-confirm')">ДА</button>
        <button v-on:click="$emit('none-confirm')">Нет</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(74, 74, 74, 0.5);
  display: flex;
  justify-content: center;
}
.modal {
  border-radius: 10px;
  width: 50%;
  height: 250px;
  margin-top: 250px;
  background-color: rgb(243, 243, 243);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
button {
  height: 36px;
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  background-color: #d3d3d3;
  border-radius: 5px;
  margin: 10px;
}
p {
  font-weight: bold;
  font-size: 24px;
  color: #2c3e50;
}
</style>