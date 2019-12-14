<template>
    <div>
        <p>
            {{ciao}}
        </p>
        <input type="text" v-model="pss" />
        <button @click="cliccandolo">Click</button>
    </div>
</template>

<script>
export default {
    props: {
        ciao: String
    },
    data(){
        return {
            pss: "ciaone"
        }
    },
    methods: {
        cliccandolo () {
            alert("Wei, sei meraviglioso: " + this.pss);
        }
    }
}
</script>

<style scoped>

</style>