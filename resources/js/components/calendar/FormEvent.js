import * as fd from './FormEventData';
import { errorManager } from '../../errors/errors_axios';
export default{
    name: 'form-event',
	props: {
		iEvent: {
			type: Object,
			default: fd.event
		},
		iFreqOpts: {
			type: Array,
			default: fd.freq_opts
        },
        iUserId: {
            type: Number,
            default: null
        }
	},
	data(){
		return{
			event: this.iEvent,
			isReminder: false,
			time_type_opts: this.iFreqOpts
		}
	},
	created(){
        this.$root.$on("modal-event-form::set-item", this.setItem)
        if (this.iUserId) {
            this.event.user_id = this.iUserId;
        }
	},
	methods: {
		setItem(item){
            Object.assign(this.event, item)
			this.$bvModal.show('modal-event-form')
		},
		shownModal(){
			this.$refs.title.focus()
		},
		handleOk(bvModalEvt) {
			bvModalEvt.preventDefault()
			this.$refs.observer_event.validate().then(success => {
				if (success) {
					this.saveItem();
				}
			});
		},
		onSubmit() {
			this.saveItem()
		},
		async saveItem(){
			await axios({
				url: '/event' + (!this.isNew ? '/' + this.event.id : ''),
				method: this.isNew ? 'post' : 'put',
				data: {
					event: JSON.stringify(this.event),
					recurring: this.isReminder,
					user_id: this.iUserId
				}
			}).then(response => {
				if (response.data.item) {
					const title = `${this.event.title}`;
					const message = this.isNew ? 'Evento agregado' : 'Evento actualizado';
					this.$bvToast.toast(message, {
						title: title,
						autoHideDelay: 5000,
						variant: "success"
					})
					// this.$root.$emit("crud-event::update-item", response.data.item)
					this.$emit('onSaveUpdateEvent', Object.assign({}, this.event), this.isReminder);
				}
				this.$nextTick(() => { this.$refs.modal_event.hide() })
			})
			.catch((e) => {
				this.$refs.modal_event.hide();
				errorManager(e, this);
			});
		},
		resetModal(){
            this.event = fd.event();
            this.event.user_id = this.iUserId;
		},
		getValidationState({ dirty, validated, valid = null }) {
			return dirty || validated ? valid : null;
		},
	},
	computed: {
		titleModal(){
			return this.event.id ? this.event.name : "Nuevo evento";
		},
		okTitle(){
			return this.event.id ? "Actualizar" : "Guardar";
		},
		isNew(){
			return this.event.id ? false : true;
		}
	}
}