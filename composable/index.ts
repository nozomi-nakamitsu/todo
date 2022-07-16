import { ref } from "@nuxtjs/composition-api";
import { db } from "@/plugins/firebase.js";
import {
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { Todo } from "@/types";

export const useTodo = () => {
  const todos = ref<Todo[]>([]);
  const form = ref<string>("");

  /**
   * TODOを作成
   */
  const onCreate = async () => {
    try {
      const newTodo = {
        title: form.value,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const { id } = await addDoc(collection(db, "todo"), newTodo);
      todos.value = [{ ...newTodo, id }, ...todos.value];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  /**
   * TODOリストを取得
   */
  const onFetch = async () => {
    try {
      const q = query(collection(db, "todo"), orderBy("updatedAt", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        todos.value = [
          ...todos.value,
          {
            ...doc.data(),
            id: doc.id,
          } as Todo,
        ];
      });
    } catch (e) {
      console.error("Error fetching document: ", e);
    }
  };

  /**
   * チェックする
   */
  const onUpdate = async (todo: Todo) => {
    try {
      const ref = doc(db, "todo", todo.id);
      await updateDoc(ref, {
        isDone: !todo.isDone,
        updatedAt: new Date(),
      });
      todos.value = todos.value.map((todoArg) => {
        if (todoArg.id === todo.id) {
          todoArg = { ...todoArg, isDone: !todoArg.isDone };
        }
        return todoArg;
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  return {
    onCreate,
    todos,
    form,
    onUpdate,
    onFetch,
  };
};
