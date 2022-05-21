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
						<b-button variant="outline-danger" @click.prevent="action(row.item, 3)" size="sm">
							<b-icon icon="code"></b-icon>
						</b-button>
					</template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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

        }
    }
}
</script>