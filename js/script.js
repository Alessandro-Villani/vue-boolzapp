console.log('VUE OK', Vue);

const app = Vue.createApp({
    data(){
        return{
            data,
            currentIndex: 0
        }
    },
    methods:{
        selectContact(i){
            console.log('click')
            this.currentIndex = i;
        },
        isSent(i){
            return this.data.contacts[this.currentIndex].messages[i].status === 'sent'
        }
    }
});

app.mount('#root');