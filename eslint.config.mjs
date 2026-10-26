import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],

    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },

    rules: {
      "constructor-super": ["error"],
      "no-dupe-args": ["error"],
      "require-await": ["error"],
      "no-invalid-regexp": ["error"],
      indent: ["error", 2],
      "no-self-assign": ["error"],
      "no-self-compare": ["error"],
      "no-this-before-super": ["error"],
      "no-unreachable": ["error"],
      camelcase: ["error"],
      "capitalized-comments": ["error"],
      eqeqeq: ["error"],
      "no-console": ["warn"],
      "no-empty-function": ["error"],
      "no-eq-null": ["error"],
      "no-useless-catch": ["error"],
      "no-useless-call": ["error"],
      "no-useless-constructor": ["error"],
      "no-useless-return": ["error"],
      "no-invalid-this": ["error"],
      "no-lonely-if": ["error"],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "no-unused-vars": "off",
      "class-methods-use-this": "off",
      //typescript
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unsafe-return": "error",
    },
  },
  {
    files: ["src/database/migrations/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  {
    files: ["src/database/models/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
);
