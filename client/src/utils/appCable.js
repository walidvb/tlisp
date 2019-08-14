import ActionCable from 'actioncable'

const url =  'localhost:3001'
const appCable = ActionCable.createConsumer(`ws://${url}/cable`);
//const appCable = ActionCable.createConsumer();
export default appCable