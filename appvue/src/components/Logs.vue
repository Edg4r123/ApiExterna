<template>
    <div>
        <b-button 
            variant="outline-danger" 
            size="sm"
            v-b-modal="modal_id"
            ref="mlogs">
            <b-icon icon="code"></b-icon>
        </b-button>
        <b-modal 
            :id="modal_id"
            title="Logs"
            size="lg"
            @hidden="reset()">
            <p 
                v-for="(v,k) in logs"
                :key="k"
                class="font-italic">
                {{ v.message }}
            </p>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "Logs",
    props: {
        modalId: {
            type: String,
            defalut: "modal-log"
        }
    },
    data() {
        return {
            modal_id: this.modalId,
            logs: []
        }
    },
    created() {
        this.getLogs()
    },
    methods: {
        getLogs() {
            axios.get('/logs')
                .then((response) => {
                    if (response.status == 200 && response.data) {
                        this.logs = response.data;
                    }
                })
        },
        reset() {
            this.logs = []
        }
    }
}
</script>