import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import BackEndService from "../services/backend.service";

import { ADMIN_USERS } from "../utils/config";

import "https://www.gstatic.com/firebasejs/8.0/firebase.js";
const config = {
	apiKey: "AIzaSyAAP3uOiNIyC55cfoy9WnAAsGS6qfNGk-A",
	authDomain: "confundo-capstone.firebaseapp.com"
};
firebase.initializeApp(config);

export const useApp = create()(
	devtools(
		persist(
			(set) => ({
				loading: false,
				setLoading: (loading) => set({ loading }),
				userId: undefined,
				role: undefined,
				login: async (userId, password) => {
					return new Promise((resolve, reject) => {
						set({ loading: true });
						firebase
							.auth()
							.signInWithEmailAndPassword(userId, password)
							.then((_) => {
								set({
									userId,
									role: ADMIN_USERS.includes(userId) ? "admin" : undefined
								});
								set({ loading: false });
								resolve();
							})
							.catch((err) => {
								set({ loading: false });
								reject(err);
							});
					});
				},
				logout: () => {
					firebase.auth().signOut();
					set({ userId: undefined, role: undefined });
				},
				homePosts: [],
				myUploads: [],
				dashboardPosts: [],
				getHomePosts: async () => {
					const posts = await BackEndService.getHomePosts();
					set({ homePosts: posts });
				},
				getMyUploads: async () => {
					const posts = await BackEndService.getMyUploads(
						useApp.getState().userId
					);
					set({ myUploads: posts });
				},
				getDashboardPosts: async () => {
					const posts = await BackEndService.getPosts();
					set({ dashboardPosts: posts });
				}
			}),
			{
				name: "app-storage",
				getStorage: () => sessionStorage
			}
		)
	)
);
