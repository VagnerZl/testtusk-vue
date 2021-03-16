import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export default new Vuex.Store({
    actions:{},
    mutations:{
        addContact(state, newContact){
            state.contacts.push(newContact)
        },
        deleteContact(state, id){
            state.contacts = state.contacts.filter( item=>item.id!=id)
        },
        changeContact(state, changedcontact){
          state.contacts= state.contacts.map(function(item){
            if(item.id== changedcontact.id){
              item=changedcontact;
              return item;
            }else{
              return item;
            }
          })
        },
    },
    state:{
        contacts: [
            {
              id: 1,
              name: "Настя",
              surname: "Васильева",
              options: [
                ["Email","sunny@mail.ru"],
                ["Phone:", "+35248624"],
              ],
            },
            {
              id: 2,
              name: "Николай",
              surname: "Иванов",
              options: [
                ["Телефон", "351896452"],
              ],
            },
            { id: 3, name: "Антон", surname: "Киселев",options: [
                ["Город", "Москва"],
              ],},
              {
                id: 4,
                name: "Дарья",
                surname: "Кузнецова",
                options: [
                  ["email", "smit@mail.ru"],
                  ['phone', "+12345678"]
                ],
              },
          ],
        deleteId:null,
    },
    getters:{
        allContacts(state){
            return state.contacts
        },
        getContactById: state => id => {
          return state.contacts.find(contact => contact.id === id);
        },
    }

})