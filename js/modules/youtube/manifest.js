console.log("modules/youtube/manifest.js");
import {AllModules} from '../../modules.js';
var Youtube = (function() {
    'use strict';
    
    return {
        name: "Youtube",
        description: "This module looks through all activities of a user on Youtube and captures those activities that the user has permitted",
        path: "/youtube",
        URL: ["https://www.youtube.com"],
        functions: ["content" ,"browsing", "apiCall"],
		viewGroups: [
			{
				name: "UX",
				title: "User Experience"
			},
			{
				name: "API",
				title: "Youtube API"
			}
		],
        is_enabled: false,
        privacy_level: 2,        
        style: 'simple',
        status: "enabled",
        icons: ["data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIxN3B4IiB2aWV3Qm94PSIwIDAgMjQgMTciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA1OCAoMTAxMDEwKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5FQjkyODgyNi05RDVBLTQxMUYtQjkxNi1DM0JBRUIxMTIyMzFAMS4wMHg8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIHNrZXRjaHRvb2wuPC9kZXNjPgogICAgPGcgaWQ9IlN3YXNoLVZpZXdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTW9kdWxlLVN0YXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTc3LjAwMDAwMCwgLTIyMDAuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9IllvdXR1YmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3Ny4wMDAwMDAsIDIyMDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjMuMzkwMTYzOSwyLjYxNjM5MzQ0IEMyMy4xMTQ3NTQxLDEuNTkzNDQyNjIgMjIuMzA4MTk2NywwLjc4Njg4NTI0NiAyMS4yODUyNDU5LDAuNTExNDc1NDEgQzE5LjQxNjM5MzQsMCAxMS45NDA5ODM2LDAgMTEuOTQwOTgzNiwwIEMxMS45NDA5ODM2LDAgNC40NjU1NzM3NywwIDIuNTk2NzIxMzEsMC40OTE4MDMyNzkgQzEuNTkzNDQyNjIsMC43NjcyMTMxMTUgMC43NjcyMTMxMTUsMS41OTM0NDI2MiAwLjQ5MTgwMzI3OSwyLjYxNjM5MzQ0IEMwLDQuNDg1MjQ1OSAwLDguMzYwNjU1NzQgMCw4LjM2MDY1NTc0IEMwLDguMzYwNjU1NzQgMCwxMi4yNTU3Mzc3IDAuNDkxODAzMjc5LDE0LjEwNDkxOCBDMC43NjcyMTMxMTUsMTUuMTI3ODY4OSAxLjU3Mzc3MDQ5LDE1LjkzNDQyNjIgMi41OTY3MjEzMSwxNi4yMDk4MzYxIEM0LjQ4NTI0NTksMTYuNzIxMzExNSAxMS45NDA5ODM2LDE2LjcyMTMxMTUgMTEuOTQwOTgzNiwxNi43MjEzMTE1IEMxMS45NDA5ODM2LDE2LjcyMTMxMTUgMTkuNDE2MzkzNCwxNi43MjEzMTE1IDIxLjI4NTI0NTksMTYuMjI5NTA4MiBDMjIuMzA4MTk2NywxNS45NTQwOTg0IDIzLjExNDc1NDEsMTUuMTQ3NTQxIDIzLjM5MDE2MzksMTQuMTI0NTkwMiBDMjMuODgyMDY3NiwxMi4yNTU3Mzc3IDIzLjg4MjA2NzYsOC4zODAzMjc4NyAyMy44ODIwNjc2LDguMzgwMzI3ODcgQzIzLjg4MjA2NzYsOC4zODAzMjc4NyAyMy45MDE2MzkzLDQuNDg1MjQ1OSAyMy4zOTAxNjM5LDIuNjE2MzkzNDQgWiIgaWQ9IlBhdGgiIGZpbGw9IiMzMjMyMzIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjkuNTYwNjU1NzQgMTEuOTQwOTgzNiAxNS43NzcwNDkyIDguMzYwNjU1NzQgOS41NjA2NTU3NCA0Ljc4MDMyNzg3Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==","data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIxN3B4IiB2aWV3Qm94PSIwIDAgMjQgMTciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA1Ny4xICgxMDEwMTApIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPjkxMjIyMkExLUFFQzctNDA0Mi1BOEYzLUVBOTg4NDIxQkEyN0AxLjAweDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZyBpZD0iU3dhc2gtVmlld3MiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJNYWluLVZpZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MjQuMDAwMDAwLCAtMTQxOS4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAwLjAwMDAwMCwgODQ0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IllvdXR1YmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA1NDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IllvdXR1YmUtZGlzYWJsZWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjAwMDAwMCwgMjcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMy4zOTAxNjM5LDIuNjE2MzkzNDQgQzIzLjExNDc1NDEsMS41OTM0NDI2MiAyMi4zMDgxOTY3LDAuNzg2ODg1MjQ2IDIxLjI4NTI0NTksMC41MTE0NzU0MSBDMTkuNDE2MzkzNCwwIDExLjk0MDk4MzYsMCAxMS45NDA5ODM2LDAgQzExLjk0MDk4MzYsMCA0LjQ2NTU3Mzc3LDAgMi41OTY3MjEzMSwwLjQ5MTgwMzI3OSBDMS41OTM0NDI2MiwwLjc2NzIxMzExNSAwLjc2NzIxMzExNSwxLjU5MzQ0MjYyIDAuNDkxODAzMjc5LDIuNjE2MzkzNDQgQzAsNC40ODUyNDU5IDAsOC4zNjA2NTU3NCAwLDguMzYwNjU1NzQgQzAsOC4zNjA2NTU3NCAwLDEyLjI1NTczNzcgMC40OTE4MDMyNzksMTQuMTA0OTE4IEMwLjc2NzIxMzExNSwxNS4xMjc4Njg5IDEuNTczNzcwNDksMTUuOTM0NDI2MiAyLjU5NjcyMTMxLDE2LjIwOTgzNjEgQzQuNDg1MjQ1OSwxNi43MjEzMTE1IDExLjk0MDk4MzYsMTYuNzIxMzExNSAxMS45NDA5ODM2LDE2LjcyMTMxMTUgQzExLjk0MDk4MzYsMTYuNzIxMzExNSAxOS40MTYzOTM0LDE2LjcyMTMxMTUgMjEuMjg1MjQ1OSwxNi4yMjk1MDgyIEMyMi4zMDgxOTY3LDE1Ljk1NDA5ODQgMjMuMTE0NzU0MSwxNS4xNDc1NDEgMjMuMzkwMTYzOSwxNC4xMjQ1OTAyIEMyMy44ODIwNjc2LDEyLjI1NTczNzcgMjMuODgyMDY3Niw4LjM4MDMyNzg3IDIzLjg4MjA2NzYsOC4zODAzMjc4NyBDMjMuODgyMDY3Niw4LjM4MDMyNzg3IDIzLjkwMTYzOTMsNC40ODUyNDU5IDIzLjM5MDE2MzksMi42MTYzOTM0NCBaIiBpZD0iUGF0aCIgZmlsbD0iI0NEQ0RDRCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI5LjU2MDY1NTc0IDExLjk0MDk4MzYgMTUuNzc3MDQ5MiA4LjM2MDY1NTc0IDkuNTYwNjU1NzQgNC43ODAzMjc4NyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+", ""],
        version: 1,
        changelog: [],		
		type: "builtin",
        streamId: "2gItuFWsQvyEDpuSdaE9Bw",
        apiKey: "ccXn0lptQNmA6Htu2wNNrQDmEnlphjTq20fxvUV38gLg",
		is_verified: false		
		
    };
}());
AllModules.push(Youtube);
export {Youtube};