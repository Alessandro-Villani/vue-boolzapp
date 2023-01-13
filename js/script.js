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
        toggleDropdown(i){
            const id = `dropdown_${i}`;
            console.log(id);
            const dropDown = document.getElementById(id);
            console.log(dropDown);
            dropDown.classList.toggle('d-none');
            
        },
        deleteMessage(i){
            this.data.contacts[this.currentIndex].messages.splice(i, 1);
            this.toggleDropdown(i);
        },
        filteredNames(){
            this.data.contacts.forEach(contact => {
               contact.visible = contact.name.toLowerCase().includes(this.searchField.toLowerCase())
            })
        }
    },
});

app.mount('#root');