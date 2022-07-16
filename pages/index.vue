<template>
  <div>
    {{ test }}
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {},
  setup(props, context: SetupContext) {
    /**
     * test
     */
    const test = "test";

    return {
      test,
    };
  },
});
</script>
