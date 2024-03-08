/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_REMOTE_STORE: "ls" | "firebase";
}

interface ImportMeta {
	env: ImportMetaEnv;
}
