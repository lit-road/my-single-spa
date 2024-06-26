/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 14:56:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:16:02
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { registerMircoApps, start } from '../../src/index.ts';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const appList = [
//   {
//     name: 'vue',
//     activeRule: '/vue',
//     container: '#micro-container',
//     entry: 'http://localhost:8080',
//   },
// ];

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerMircoApps([
  {
    name: "app1",
    entry: "http://baidu.com",
    container: "#app1",
    activeRule: "/app1",
  },
  {
    name: "app2",
    entry: "http://google.com",
    container: "#app2",
    activeRule: "/app2",
  },
], {
  beforeLoad: [
    (app) => {
      console.log("beforeLoad", app);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(() => {
            console.log("beforeLoad", app);
          });
        })
      })
    },
    (app) => {
      console.log("test", app);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(() => {
            console.log("test", app);
          });
        })
      })
    }
  ],
  beforeMount: (app) => {
    console.log("beforeMount", app);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => {
          console.log("beforeMount", app);
        });
      });
    });
  },
  afterMount: (app) => {
    console.log("afterMount", app);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => {
          console.log("afterMount", app);
        });
      });
    });
  },
  beforeUnmount: (app) => {
    console.log("beforeUnmount", app);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => {
          console.log("beforeUnmount", app);
        });
      });
    });
  },
});

start();
