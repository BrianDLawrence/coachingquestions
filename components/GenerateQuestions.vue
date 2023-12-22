<template>
    <div class="flex justify-center py-10">
        <div class="card w-9/12 bg-base-100 shadow-xl border">
            <div class="card-body">
                <div class="card-actions justify-center">
                    <button class="btn btn-accent" @click="generateQuestions()" :tabindex="10"
                        :disabled="!readyToGenerate">Generate Questions</button>
                </div>
                <div class="flex flex-col md:flex-row justify-center pt-5">
                    <div class="md:basis-1/3 w-full px-2 mb-4 md:mb-0">
                        <div class="flex flex-col md:flex-row items-center">
                            <h2 class="text-lg mt-1 mb-2 md:mb-0 md:mr-2">Coaching Model:</h2>
                            <label class="label cursor-pointer flex items-center mb-2 md:mb-0">
                                <span class="label-text">GROW</span>
                                <input type="radio" name="radio-coachtype" class="radio checked:bg-red-500 mx-3"
                                    value="GROW" v-model="coachtype" />
                            </label>
                            <label class="label cursor-pointer flex items-center">
                                <span class="label-text">TOMS</span>
                                <input type="radio" name="radio-coachtype" class="radio checked:bg-blue-500 mx-3"
                                    value="TOMS" v-model="coachtype" />
                            </label>
                        </div>
                    </div>

                    <div class="md:basis-1/3 w-full px-2">
                        <div v-show='coachtype === "GROW"'>
                            <select class="select w-full max-w-xs" v-model="growstage">
                                <option disabled selected>Select the model stage:</option>
                                <option>Grow</option>
                                <option>Reality</option>
                                <option>Options</option>
                                <option>Will</option>
                            </select>
                        </div>
                        <div v-show='coachtype === "TOMS"'>
                            <select class="select w-full max-w-xs" v-model="tomsstage">
                                <option disabled selected>Select the model stage:</option>
                                <option>Topic</option>
                                <option>Outcome</option>
                                <option>Meaning</option>
                                <option>Success</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div v-if="questionsLoaded" class="flex justify-center py-5">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Save To DB</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(question, index) in generatedQuestions">
                                <th>{{ question }}</th>
                                <td><input type="checkbox" class="checkbox checkbox-primary"
                                        v-model="saveQuestionIndex[index]" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-actions justify-center" v-if="canSaveQuestion && !questionsSaved && !isSavingQuestions">
                    <button class="btn btn-accent" @click="saveQuestions()" :tabindex="11" :disabled="!readyToGenerate">Save
                        Questions</button>
                </div>
                <div class="card-actions justify-center" v-if="questionsSaved">
                    <div role="alert" class="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Questions saved!</span>
                    </div>
                </div>
                <div v-if="isGenerating || isSavingQuestions" class="grid">
                    <span class="loading loading-bars loading-lg justify-self-center"></span>
                </div>
                <div class="mx-auto justify-items-center md:col-span-2 py-2 hover:cursor-pointer" v-if="isError">
                    <div class="alert alert-error" @click="confirmError">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Oh No! Something went wrong, please try
                            again. It is possible the AI is down, <a class="underline hover:decoration-dashed"
                                href="https://status.openai.com/">check status of the
                                openai brain</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const generatedQuestions = ref<String[]>([])
const saveQuestionIndex = ref<Boolean[]>([])
const questionsLoaded = ref(false)
const isError = ref(false);
const isGenerating = ref(false);
const isSavingQuestions = ref(false);
const questionsSaved = ref(false);
const coachtype = ref("GROW")
const growstage = ref("Select the model stage:")
const tomsstage = ref("Select the model stage:")

const readyToGenerate = computed(() => {
    return (
        (growstage.value != "Select the model stage:" && coachtype.value === "GROW") ||
        (tomsstage.value != "Select the model stage:" && coachtype.value === "TOMS")
    )
});

const apiQuery = computed(() => ({
    numberofquestions: '5',
    coachingModel: coachtype.value,
    questiontype: coachtype.value === 'GROW' ? growstage.value : tomsstage.value,
}));

const canSaveQuestion = computed(() => saveQuestionIndex.value.some(element => element === true));

const generateQuestions = async () => {

    isError.value = false;
    isGenerating.value = true;
    questionsSaved.value = false;

    const { data, error } = await useFetch<String[]>("/api/generatequestions", {
        query: apiQuery
    }
    );

    if (error.value) {
        isError.value = true;
        console.log("ERROR" + error.value);
    }

    if (data && !isError.value) {
        generatedQuestions.value = data.value!
        saveQuestionIndex.value = new Array(generatedQuestions.value.length).fill(false);
        questionsLoaded.value = true;
    }

    isGenerating.value = false
}

const saveQuestions = async () => {

    const savedQuestions: String[] = [];
    for (let i = 0; i < generatedQuestions.value.length; i++) {
        if (saveQuestionIndex.value[i]) {
            savedQuestions.push(generatedQuestions.value[i]);
        }
    }

    isError.value = false;
    isSavingQuestions.value = true;

    const { data, error } = await useFetch<String[]>("/api/savegeneratedquestions", {
        method: 'POST',
        body: {
            questions: savedQuestions,
            coachingModel: coachtype.value,
            questionType: coachtype.value === 'GROW' ? growstage.value : tomsstage.value,
        }
    }
    );

    if (error.value) {
        isError.value = true;
        console.log("ERROR" + error.value);
    }

    if (data && !isError.value) {
        questionsSaved.value = true;
    }
    isSavingQuestions.value = false;
}

const confirmError = () => {
    isError.value = false;
};

</script>