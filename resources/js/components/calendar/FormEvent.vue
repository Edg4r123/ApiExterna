<template>
	<div>
		<b-button 
			v-b-modal.modal-event-form 
			size="sm">
			Agregar evento
		</b-button>
		<b-modal
			ref="modal_event" 
			id="modal-event-form" 
			:title="titleModal"
			size="lg" 
			@shown="shownModal"
			@ok="handleOk"
			@hidden="resetModal"
			:ok-title="okTitle"
			no-close-on-backdrop>
			<validation-observer ref="observer_event" v-slot="{ handleSubmit }">
				<b-form ref="form" @submit.stop.prevent="handleSubmit(onSubmit)">
					<validation-provider
						name="Titutlo"
						:rules="{ required: true, max: 50 }"
						v-slot="validationContext"
					>
						<b-form-group 
							label-cols-sm="4"
							label-cols-lg="3"
							label="Titutlo">
							<b-form-input
								v-model="event.title"
								type="text"
								placeholder="Titutlo"
								trim
								ref="title"
								:state="getValidationState(validationContext)"
							/>
							<b-form-invalid-feedback>
								{{ validationContext.errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</validation-provider>
					<b-form-group
						label-cols-sm="4"
						label-cols-lg="3"
						label="Evento recurrente">
						<b-form-checkbox
							v-model="isReminder"
						>
						</b-form-checkbox>
					</b-form-group>
					<div v-if="!isReminder">
						<validation-provider
							name="Fecha inicio"
							:rules="{ required: true }"
							v-slot="validationContext"
						>
							<b-form-group 
								label-cols-sm="4"
								label-cols-lg="3"
								label="Fecha inicio"
								>
								<b-form-datepicker
									v-model="event.start"
									ref="start"
									:state="getValidationState(validationContext)">
								</b-form-datepicker>
								<b-form-invalid-feedback>
									{{ validationContext.errors[0] }}
								</b-form-invalid-feedback>
							</b-form-group>
						</validation-provider>
						<validation-provider
							name="Fecha final"
							:rules="{ required: true }"
							v-slot="validationContext"
						>
							<b-form-group 
								label-cols-sm="4"
								label-cols-lg="3"
								label="Fecha final"
								>
								<b-form-datepicker
									v-model="event.end"
									ref="end"
									:state="getValidationState(validationContext)">
								</b-form-datepicker>
								<b-form-invalid-feedback>
									{{ validationContext.errors[0] }}
								</b-form-invalid-feedback>
							</b-form-group>
						</validation-provider>
					</div>
					<div v-else>
						<validation-provider
							name="Frecuencia"
							:rules="{ required: true }"
							v-slot="validationContext"
						>
							<b-form-group 
								label-cols-sm="4"
								label-cols-lg="3"
								label="Frecuencia"
								>
								<b-form-select 
									v-model="event.rrule.freq" 
									:options="time_type_opts"
									ref="freq"
									:state="getValidationState(validationContext)"
								></b-form-select>
								<b-form-invalid-feedback>
									{{ validationContext.errors[0] }}
								</b-form-invalid-feedback>
							</b-form-group>
						</validation-provider>
						<validation-provider
							name="Repeticiones"
							:rules="{ required: true, max: 3 }"
							v-slot="validationContext"
						>
							<b-form-group 
								label-cols-sm="4"
								label-cols-lg="3"
								label="Repeticiones"
								>
								<b-form-input
									v-model="event.rrule.interval"
									type="number"
									placeholder="Numero de repeticiones"
									trim
									ref="interval"
									:state="getValidationState(validationContext)"
								/>
								<b-form-invalid-feedback>
									{{ validationContext.errors[0] }}
								</b-form-invalid-feedback>
							</b-form-group>
						</validation-provider>
						<validation-provider
							name="Fecha de inicio"
							:rules="{ required: true }"
							v-slot="validationContext"
						>
							<b-form-group 
								label-cols-sm="4"
								label-cols-lg="3"
								label="Fecha de inicio"
								>
								<b-form-datepicker
									v-model="event.rrule.dtstart"
									ref="dtstart"
									:state="getValidationState(validationContext)">
								</b-form-datepicker>
								<b-form-invalid-feedback>
									{{ validationContext.errors[0] }}
								</b-form-invalid-feedback>
							</b-form-group>
						</validation-provider>
					</div>
				</b-form>
			</validation-observer>
		</b-modal>
	</div>
</template>

<script src="./FormEvent.js"></script>