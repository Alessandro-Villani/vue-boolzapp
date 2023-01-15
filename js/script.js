console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return{
            data,
            currentIndex: 0,
            newMessage: '',
            searchField: '',
            lastSeen: ''
           }
    },
    methods:{
        selectContact(i){
            console.log('click')
            this.currentIndex = i;
            this.scrollToBottom(this.$refs.chat, 0);
            this.lastSeen = `Ultimo accesso alle: ${this.dateToHours(this.currentIndex)}`
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
            this.lastSeen = 'Sta Scrivendo...'
            setTimeout(() => {
                const message = {
                    date: new Date().toLocaleString(),
                    text: 'ok',
                    status: 'received'
                }
                this.data.contacts[this.currentIndex].messages.push(message);
                this.scrollToBottom(this.$refs.chat, 20);
                this.lastSeen = `Ultimo accesso alle: ${this.dateToHours(this.currentIndex)}`
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
        },
        dateToHours(index){
            if (this.data.contacts[index].messages.length > 0){
            const actualDate = this.data.contacts[index].messages[this.data.contacts[index].messages.length - 1].date;
            console.log(typeof(actualDate));
            const splitDate = actualDate.split(' ');
            console.log(splitDate);
            const splitHour = splitDate[1].split(':');
            console.log(splitHour);
            return splitHour[0] + ':' + splitHour[1];
        }
          },
        getMessage(i){
            return this.data.contacts[i].messages.length > 0 ? this.data.contacts[i].messages[this.data.contacts[i].messages.length - 1].text : ''
        },
        getDate(i){
            return this.data.contacts[i].messages.length > 0 ? this.data.contacts[i].messages[this.data.contacts[i].messages.length - 1].date : ''
        }
        
    },
    mounted() {
        this.lastSeen = `Ultimo accesso alle: ${this.dateToHours(this.currentIndex)}`
    }
});

app.mount('#root');