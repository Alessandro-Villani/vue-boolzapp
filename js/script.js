console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return{
            data,
            currentIndex: 0,
            newMessage: ''
        }
    },
    methods:{
        selectContact(i){
            console.log('click')
            this.currentIndex = i;
        },
        isSent(i){
            return this.data.contacts[this.currentIndex].messages[i].status === 'sent'
        },
        sendMessage(){
            console.log('enter');
            const message = {
                date: new Date().toLocaleString(),
                text: this.newMessage,
                status: 'sent'
            }
            this.data.contacts[this.currentIndex].messages.push(message);
            this.receiveMessage();
            this.clearMessageField();
        },
        receiveMessage(){
            setTimeout(() => {
                const message = {
                    date: new Date().toLocaleString(),
                    text: 'ok',
                    status: 'received'
                }
                this.data.contacts[this.currentIndex].messages.push(message);
            }, 1000);
        },
        clearMessageField(){
            this.newMessage = '';
        }
    }
});

app.mount('#root');