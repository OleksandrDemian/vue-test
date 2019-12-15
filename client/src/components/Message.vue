<template>
    <div id="message">
        <p>{{message.user}}: {{message.text}}</p>
    </div>
</template>

<script>
	export default {
		name: "Message",
        props: {
			message: Object
        }
	}
</script>

<style scoped>

</style>