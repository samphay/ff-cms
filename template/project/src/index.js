import dva from 'dva';
import createLoading from 'dva-loading';
import {notification} from 'antd';
import './index.less';
// 1. Initialize
import models from "./models/app";
import passwordModal from "./models/passwordModal";
import router from "./router";
const app = dva({
    onError(e){
      console.error(e);
      notification.error(
        {
          message: <span style={{color:"#fff"}}>{e.message}</span>,
          duration:0
        }
      )
    }
  }
);
// 2. Plugins
app.use(createLoading());
// 4. Router
app.model(models);
app.model(passwordModal);

app.router(router);
// 5. Start
app.start('#root');
