export const errorManager = (e, _this) => {
    try {
        if (e.response.status === 422) {
            const keys = Object.keys(e.response.data.errors);
            keys.some((k) => {
                const message = `Error: ${e.response.data.errors[k][0]}`;
                _this.$bvModal.msgBoxOk(message);
                return;
            });
        } else if (e.response.status === 500) {
            _this.$bvModal.msgBoxOk(e.response.data.message);
        } else {
            console.log(e.response);
        }
    } catch (ex) {
        console.log(ex)
        console.log(e)
    }
}