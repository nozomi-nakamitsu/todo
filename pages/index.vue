<template>
  <!-- フォーム -->
  <div>
    <h1>CREATE TODO</h1>
    <div>
      <input type="text" v-model="form" />
      <button @click="onCreate">onCreate</button>
    </div>
    <!-- 表示 -->
    <div>
      <h1>TODO LIST</h1>
      <div v-for="(todo, index) in todos" :key="index">
        <div class="card">
          <p class="text">{{ todo.title }}</p>
          <p
            class="circle"
            :class="{ '-checked': todo.isDone }"
            @click="onUpdate(todo)"
          >
            {{ todo.isDone ? "済" : "未着手" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@nuxtjs/composition-api";
import dayjs from "dayjs";
import { useTodo } from "@/composable";

export default defineComponent({
  props: {},
  setup() {
    const { onCreate, todos, form, onUpdate, onFetch } = useTodo();
    onMounted(() => {
      onFetch();
    });

    return {
      onCreate,
      todos,
      form,
      onUpdate,
      dayjs,
    };
  },
});
</script>

<style>
.card {
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid lightgrey;
  padding: 8px;
  width: 500px;
}
.circle {
  width: 50px;
  height: 20px;
  border-radius: 12px;

  border: 1px solid lightgrey;
  margin-left: auto;
  padding: 8px;
  text-align: center;
  cursor: pointer;
}
.-checked {
  background-color: pink;
  border: 1px solid pink;
}
</style>
