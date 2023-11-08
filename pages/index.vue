<template>
  <div>
    <div class="flex justify-center py-10">
      <div class="prose lg:prose-xl">
        <h1>Powerful questions</h1>
      </div>
    </div>
    <ARandomQuestion></ARandomQuestion>
    <GenerateQuestions></GenerateQuestions>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Powerful Questions",
  meta: [
    {
      name: "description",
      content:
        "New powerful questions goes here.",
    },
  ],
});
</script>