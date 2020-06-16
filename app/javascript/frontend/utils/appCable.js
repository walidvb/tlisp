import ActionCable from 'actioncable'


// const appCable = ActionCable.createConsumer(`ws://${url}/cable`);
const appCable = ActionCable.createConsumer();
export default appCable