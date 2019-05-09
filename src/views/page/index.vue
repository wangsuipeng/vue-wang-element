<template>
    
</template>
<script>
export default {
    name: 'index',
    data() {
        return {

        }
    },
    methods: {
        clickLogin() {
            this.$store.dispatch('LoginByUsername',this.loginForm).then((result) => {
                this.$router.push({path: '/'});
            }).catch((err) => {
                this.$message.error(err);
            });
        }
    }
}
</script>
<style scoped>

</style>
