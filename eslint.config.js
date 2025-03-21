import {defineConfig} from "eslint/config";
import globals from "globals";
import js from "@eslint/js";


export default defineConfig([
    {files: ["**/*.{js,mjs,cjs}"]},
    {files: ["**/*.{js,mjs,cjs}"], languageOptions: {globals: globals.browser,}},
    {
        files: ["**/*.{js,mjs,cjs}"], plugins: {js}, extends: ["js/recommended"], rules: {
            "semi": ["error", "always"],
            "no-trailing-spaces": "error",
            "no-multi-spaces": "error",
            "no-multiple-empty-lines": "error",
        },
    },

]);