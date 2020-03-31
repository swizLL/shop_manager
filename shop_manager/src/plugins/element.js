import Vue from 'vue'
import { 
    Button, 
    Radio,
    Row,
    Form,
    FormItem,
    Input,
    Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//将message组件挂载到VUE对象，作为全局属性
Vue.prototype.$msg=Message