<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		name: 'app',

        created() {
			this.$ws.connect();
		}
	}
</script>

<style>
    @import url("assets/roboto-mono.css");
    body {
        font-family: 'Roboto Mono', monospace;
    }

    button,
    input,
    select,
    textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
    }

    .margin-s {
        margin: 1vh;
    }
</style>
