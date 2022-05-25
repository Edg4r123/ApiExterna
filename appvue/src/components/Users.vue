<template>
    <div>
        <div>
            <h1>Usuarios</h1>
        </div>
        <div class="row">
            <div class="col-12">
                <b-table 
                    striped 
                    hover
                    small
                    :items="items" 
                    :fields="fields"
                    responsive
                    >
                    <template v-slot:cell(actions)="row">
						<b-button variant="outline-primary" @click.prevent="action(row.item, 1)" size="sm">
							<b-icon icon="newspaper"></b-icon>
						</b-button>
						<b-button variant="outline-warning" @click.prevent="action(row.item, 2)" size="sm">
							<b-icon icon="images"></b-icon>
						</b-button>
                        <Logs :modal-id="'modal-user-' + row.item.id" style="display:inline"></Logs>
					</template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
const ACTION_POST = 1;
const ACTION_PHOTO = 2;
import Logs from './Logs.vue'
export default {
    components: {
        Logs
    },
    name: "Users",
    data() {
        return {
            items: [],
            fields: [
                {
                    key: 'name',
                    stickyColumn: true,
                },
                {
                    key: 'username',
                    stickyColumn: true,
                },
                {
                    key: 'email',
                    stickyColumn: true,
                },
                {
                    key: 'phone',
                    stickyColumn: true,
                },
                {
                    key: 'website',
                    stickyColumn: true,
                },
                {
                    key: 'company.name',
                    stickyColumn: true,
                    label: 'Company'
                },
                {
                    key: 'actions',
                }
            ]
        }
    },
    created() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            axios.get('/users')
                .then((response) => {
                    if (response.status == 200 && response.data) {
                        this.items = response.data;
                    }
                })
                .catch(e => {console.log(e)})
        },
        action(item, action) {
            if (action == ACTION_POST) {
                this.$router.push(`/usuarios/${item.id}/publicaciones`)
            }
            if (action == ACTION_PHOTO) {
                this.$router.push(`/usuarios/${item.id}/fotos`)
            }
        }
    }
}
</script>