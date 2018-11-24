import * as user from '../services/user';
import _ from 'lodash';
export default {
    namespace: 'user',
    state: {
        btnName: "添加",
        btnType: "add",
        tipMessage: "",
        userList: [],
        total: 0
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(async ({ pathname, search, query }) => {
                if (pathname === "/dashboard/table") {
                    dispatch({ type: "userList", payload: { querystring: "start=0&length=10" } })
                }
                if (pathname === "/dashboard/from" && _.isEmpty(query)) {
                    dispatch({
                        type: "reBtn", payload: {
                            btnName: "添加",
                            btnType: "add"
                        }
                    })
                }
            })
        }
    },

    effects: {
        * deleteUser({ payload: { id, callback } }, { call, put }) {
            let resData = yield call(user.deleteUser, id);
            callback(resData.errmsg);
        },
        * resetBtn({ payload: { values } }, { put }) {
            yield put({
                type: "reBtn",
                payload: {
                    btnName: values.btnName,
                    btnType: values.btnType
                }
            })
        },
        * update({ payload: { values, callback } }, { call, put }) {
            let resData = yield call(user.update, values);
            callback(resData.errmsg);
        },
        * create({ payload: { values, callback } }, { call, put }) {
            let resData = yield call(user.createUser, values);
            callback(resData.errmsg);
        },
        * userList({ payload: { querystring } }, { call, put }) {
            let resData = yield call(user.get, querystring);
            let userList = resData.result.results;
            let total = resData.total
            yield put({
                type: "list",
                payload: {
                    userList: userList,
                    total: total
                }
            })
        }

    },

    reducers: {
        reBtn(state, { payload: { btnName, btnType } }) {
            return { ...state, btnName, btnType }
        },
        list(state, { payload: { userList, total } }) {
            return { ...state, userList, total }
        },
        save(state, { payload: { tipMessage } }) {
            return { ...state, tipMessage }
        }
    },

};
