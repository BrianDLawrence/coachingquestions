<template>
    <div class="flex justify-center py-10">
        <div class="card w-9/12 bg-base-100 shadow-xl border">
            <div class="card-body">
                <div class="card-actions justify-center">
                    <button class="btn btn-accent" @click="getRandomQuestion()" :tabindex="10">Get Random Question</button>
                </div>
                <p v-if="questionLoaded" class="text-center py-5 text-lg">
                    {{ randomQuestion }}
                </p>
                <div class="mx-auto justify-items-center md:col-span-2 py-2 hover:cursor-pointer" v-if="isError">
                    <div class="alert alert-error" @click="confirmError">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Oh No! Something went wrong, please try
                            again.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const randomQuestion = ref("")
const questionTags = ref("")
const questionLoaded = ref(false)
const isError = ref(false);

interface QuestionData {
    question: string;
    tags: string;
}

const getRandomQuestion = async () => {

    isError.value = false;

    const { data, error } = await useFetch<QuestionData>("/api/randomquestion");

    if (error.value) {
        isError.value = true;
        console.log("ERROR" + error.value);
    }

    if (data && !isError.value) {
        console.log(data.value);
        randomQuestion.value = String(data.value!.question)
        questionTags.value = String(data.value!.tags)
        questionLoaded.value = true
    }
}

const confirmError = () => {
    isError.value = false;
};

</script>