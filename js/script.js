console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return{
            data,
            currentIndex: undefined,
            newMessage: '',
            searchField: '',
            searchMessageField: '',
            searchMessages: false,
            lastSeen: '',
            previousDropdownId: '',
            dropdownId: '',
            optionMenu: false,
            switchVisibility: true
           }
    },
    computed: {
        filteredMessages(){
            return this.data.contacts[this.currentIndex].messages.filter((message, i) =>{
                message.id = i;
                return message.text.toLowerCase().includes(this.searchMessageField.toLowerCase());
            })
        },
    },
    methods:{
        selectContact(i){
            console.log('click');
            this.closeDropdowns();
            this.currentIndex = i;
            this.scrollToBottom(this.$refs.chat, 0); 
            this.getLastSeen();
            if(window.innerWidth < 1200){
                this.toggleChat();
            } else {
                this.switchVisibility = false;
            }
        },
        isSent(i){
            return this.filteredMessages[i].status === 'sent'
        },
        sendMessage(){
            console.log('enter');
            if(this.newMessage){
                const message = {
                    date: new Date().toLocaleString(),
                    text: this.newMessage,
                    status: 'sent'
                }
                this.data.contacts[this.currentIndex].messages.push(message);
                this.scrollToBottom(this.$refs.chat, 20);
                this.receiveMessage();
                this.clearMessageField();
            }
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
                if(item !== undefined){
                setTimeout(() => {
                    item.scrollTop = item.scrollHeight;
                }, timeout)
                }
        },
        toggleDropdown(i){
            this.optionMenu = false;
            this.previousDropdownId = this.dropdownId;
            const id = `dropdown_${i}`;
            this.dropdownId = id;
            if (this.dropdownId !== this.previousDropdownId){
                this.closeDropdown(this.previousDropdownId);
            }
            const dropDown = document.getElementById(id);
            dropDown.classList.toggle('d-none');
        },
        closeDropdown(id = this.dropdownId){
            if (id){
                const dropDown = document.getElementById(id);
                dropDown.classList.add('d-none');
                id = '';
                this.dropdownId = '';
            } 
        },
        deleteMessage(i){
            console.log('id' + i);
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
            if(this.currentIndex !== undefined){
                if (this.dateToHours(this.currentIndex)){
                    this.lastSeen = `Ultimo accesso alle: ${this.dateToHours(this.currentIndex)}`
                    } else {
                        this.lastSeen = '';
                    }
            }
        },
        toggleSearchMessages(){
            this.searchMessages = !this.searchMessages;
            if(this.searchMessages){
                this.$nextTick(() => {
                    this.$refs.searchMessagesInput.focus();
                });
            }
            this.closeDropdowns();
        },
        getFilteredMessageId(i){
            const filteredArray = this.filteredMessages;
            console.log(filteredArray);
            console.log("filteredArray id " + filteredArray[i].id);
            return filteredArray[i].id;
        },
        closeDropdowns(){
            this.optionMenu = false;
            this.closeDropdown();
        },
        toggleChat(){
            this.switchVisibility = !this.switchVisibility;
            if(this.switchVisibility){
                this.currentIndex = undefined;
            }
        }
        
    },
    mounted() {
        this.getLastSeen();
    }
});

app.mount('#root');