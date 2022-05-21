<template>
    <div>
        <h1>Publicaciones de {{ user.name }}</h1>
        <div v-for="(v,k) in news" :key="k">
            <b-card :title="v.title">
                <b-card-text>
                    {{ v.body }}
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserPost",
    data() {
        return {
        user_id: 0,
        user: {},
        news: [],
        };
    },
    created() {
        this.user_id = this.$route.params.id;
        this.getUser();
        this.getPosts();
    },
    methods: {
        async getUser() {
            await axios.get(`users/${this.user_id}`).then((response) => {
                if (response.status == 200 && response.data) {
                    this.user = response.data;
                }
            });
        },
        getPosts() {
            axios.get(`users/${this.user_id}/posts`).then((response) => {
                if (response.status == 200 && response.data) {
                    this.news = response.data;
                }
            });
        },
    },
};
</script>