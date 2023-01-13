console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return{
            data,
            currentIndex: 0,
            newMessage: '',
            searchField: '',
        }
    },
    computed:{
        filteredNames(){
            return this.data.contacts.filter(contact => {
                return contact.name.toLowerCase().includes(this.searchField.toLowerCase());
            })
        }
    },
    methods:{
        selectContact(i){
            console.log('click')
            this.currentIndex = i;
            this.scrollToBottom(this.$refs.chat, 0);
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
            this.scrollToBottom(this.$refs.chat, 20);
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
                this.scrollToBottom(this.$refs.chat, 20);
            }, 1000);
        },
        clearMessageField(){
            this.newMessage = '';
        },
        scrollToBottom(item, timeout){
            setTimeout(() => {
                item.scrollTop = item.scrollHeight;
            }, timeout)
            
        },
        userSearch(){

        }
    }
});

app.mount('#root');