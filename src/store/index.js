import Vue from "vue";
import Vuex from "vuex";
import CryptoJS from "crypto-js";
import { clipboard, remote } from "electron";
import randomWords from "random-words";
import fs from "fs";
import { cryptrSecret } from "../data/constants";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		passwords: []
	},
	mutations: {
		addPassword: (state, password) => {
			const { passwords } = state;
			passwords.push(password);
			state.passwords = passwords;
			console.log(state.passwords);
		},
		setJson: state => {
			const { passwords } = state;
			const json = { passwords };
			console.log(json);
			const dataPath = remote.app.getPath("userData");
			fs.writeFileSync(
				`${dataPath}/passwords.json`,
				JSON.stringify(json),
				err => {
					if (err) {
						console.error(err);
					} else {
						console.log("Passwords synced");
					}
				}
			);
		},
		splicePassword: (state, index) => {
			const { passwords } = state;
			passwords.splice(index, 1);
			state.passwords = passwords;
		},
		readPasswords: state => {
			const dataPath = remote.app.getPath("userData");
			const unparsedJson = fs.readFileSync(`${dataPath}/passwords.json`);
			const json = JSON.parse(unparsedJson);
			state.passwords = json.passwords;
		}
	},
	actions: {
		generatePassword: ({ commit }, { siteName }) => {
			const wordSoup = randomWords(4);
			console.log("running");
			const unencrypted = wordSoup.join("");
			console.log(unencrypted);
			const password = CryptoJS.AES.encrypt(
				unencrypted,
				cryptrSecret
			).toString();
			const dateCreated = new Date(Date.now());
			commit("addPassword", { siteName, password, dateCreated });
			commit("setJson");
		},
		copyPassword: ({ state }, { siteName }) => {
			const index = state.passwords.findIndex(x => x.siteName === siteName);
			const encrypted = state.passwords[index].password;
			const bytes = CryptoJS.AES.decrypt(encrypted, cryptrSecret);
			const password = bytes.toString(CryptoJS.enc.Utf8);
			clipboard.writeText(password);
		},
		deletePassword: ({ commit, state }, { siteName }) => {
			const index = state.passwords.findIndex(x => x.siteName === siteName);
			commit("splicePassword", index);
			commit("setJson");
		},
		loadPasswords: ({ commit }) => {
			commit("readPasswords");
		}
	}
});
