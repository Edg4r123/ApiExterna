<template>
    <div>
        <h1>Fotos</h1>
        <div class="row">
            <div 
                v-for="(v,k) in albums" 
                :key="k"
                class="col-lg-4 col-md-4 col-sm-12"
                style="margin-top:2em">
                <h6>Album {{ v.title }}</h6>
                <b-carousel
                    :interval="4000"
                    controls
                    label-next=""
                    label-prev=""
                    indicators
                    background="#ababab"
                    style="text-shadow: 1px 1px 2px #333;"
                >
                    <b-carousel-slide
                        v-for="(val, key) in v.photos"
                        :key="key"
                        :text="val.title"
                        :img-src="val.url"
                    ></b-carousel-slide>
                </b-carousel>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserPhoto",
    data() {
        return {
            user_id: 0,
            albums: []
        }
    },
    created() {
        this.user_id = this.$route.params.id;
        this.getAlbums()
    },
    methods: {
        async getAlbums() {
            try {
                const response = await axios.get(`/users/${this.user_id}/albums`);
                if (response.status == 200 && response.data) {
                    this.albums = response.data.map((a) => {
                        a.photos = [];
                        return a;
                    });
                    this.getPhotos()
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getPhotos() {
            for (var i = 0; i < this.albums.length; i++) {
                let url = `/albums/${this.albums[i].id}/photos`;
                try {
                    const response = await axios.get(url);
                    if (response.status == 200 && response.data) {
                        this.albums[i].photos = response.data;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}
</script>