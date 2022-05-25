<template>
	<div>
		<form-event 
			@onSaveUpdateEvent="saveUpdateEvent"
			:i-user-id="iUser.id">
		</form-event>
		<FullCalendar :options="calendarOptions" />
	</div>
</template>
<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
	props: {
		iUser: {
            type: Object,
            default: () => ({})
        },
	},
	components: {
		FullCalendar,
	},
	created() {
		this.iUser.events.map((e) => {
			this.saveUpdateEvent(JSON.parse(e.event), e.recurring)
		});
	},
	data() {
		return {
			calendarOptions: {
				plugins: [rrulePlugin, dayGridPlugin, interactionPlugin],
				initialView: "dayGridMonth",
				events: [],
				eventClick: function(info) {
					console.log(info)
				}
			},
		};
	},
	methods: {
		saveUpdateEvent(event, isReminder) {
			if (isReminder) {
				if (event.rrule.dtstart) {
					event.rrule.dtstart  = new Date(event.rrule.dtstart)
				}
				if (event.rrule.interval) {
					event.rrule.interval = parseInt(event.rrule.interval)
				}
			} else {
				delete event.rrule;
			}
			this.calendarOptions.events.push(event);
		}
	}
};
</script>