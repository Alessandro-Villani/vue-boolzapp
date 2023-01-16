console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return{
            data,
            currentIndex: 0,
            newMessage: '',
            searchField: '',
            lastSeen: '',
            dropdownId: '',
            optionMenu: false
           }
    },
    methods:{
        selectContact(i){
            console.log('click');
            this.optionMenu = false;
            this.closeDropdown();
            this.currentIndex = i;
            this.scrollToBottom(this.$refs.chat, 0);
            /*TODO display the correct last seen after deleting*/
            this.getLastSeen();
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
            this.optionMenu = false;
            this.closeDropdown();
            const id = `dropdown_${i}`;
            this.dropdownId = id;
            console.log(id);
            const dropDown = document.getElementById(id);
            console.log(dropDown);
            dropDown.classList.toggle('d-none');
        },
        closeDropdown(){
            console.log(this.dropdownId);
            if (this.dropdownId){
                const dropDown = document.getElementById(this.dropdownId);
                dropDown.classList.add('d-none');
                this.dropdownId = '';
            } 
        },
        deleteMessage(i){
            this.data.contacts[this.currentIndex].messages.splice(i, 1);
            this.closeDropdown();
            this.getLastSeen();
        },
        deleteAllMessages(){
            this.data.contacts[this.currentIndex].messages = [];
            this.toggleOptionMenu();
            this.getLastSeen();
        },
        filteredNames(){
            this.data.contacts.forEach(contact => {
               contact.visible = contact.name.toLowerCase().includes(this.searchField.toLowerCase())
            })
        },
        dateToHours(index){
            if (this.getLastReceivedMessageDate(index)){
            const actualDate = this.getLastReceivedMessageDate(index);
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
        },
        getLastReceivedMessageDate(i){
            let lastReceivedDate = '';
            this.data.contacts[i].messages.forEach((message) => {
                if (message.status === 'received'){
                lastReceivedDate =  message.date;
                }
            })
            return lastReceivedDate;
        },
        toggleOptionMenu(){
            this.optionMenu = !this.optionMenu;
            this.closeDropdown();
            console.log(this.optionMenu);
        },
        getLastSeen(){
            if (this.dateToHours(this.currentIndex)){
                this.lastSeen = `Ultimo accesso alle: ${this.dateToHours(this.currentIndex)}`
                } else {
                    this.lastSeen = '';
                }
        }
        
    },
    mounted() {
        this.getLastSeen();
    }
});

app.mount('#root');