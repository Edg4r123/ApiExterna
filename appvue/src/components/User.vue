<template>
    <div>
        <h1>{{ user.name }}</h1>
    </div>
</template>

<script>
export default {
    name: "User",
    data() {
        return {
            user_id: 0,
            user: {}
        }
    },
    created() {
        this.user_id = this.$route.params.id;
        this.getUser();
        this.getPosts();
    },
    methods: {
        async getUser() {
            await axios.get(`users/${this.user_id}`)
                .then((response) => {
                    if (response.status == 200 && response.data) {
                        this.user = response.data;
                    }
                })
        },
        getPosts() {
            axios.get(`users/${this.user_id}/posts`)
                .then()
        }
    }
}
</script>