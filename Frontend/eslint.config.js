import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "error",            // Báo lỗi khi biến được khai báo nhưng không bao giờ sử dụng
      "no-undef": "error",                  // Báo lỗi khi sử dụng biến không được khai báo
      "no-console": "warn",                 // Cảnh báo khi có console trong code
      "eqeqeq": "warn",                     // Cảnh báo khi sử dụng == và != thay vì === và !== 
      "curly": "warn",                      // Cảnh báo khi không sử dụng {} sau mỗi lệnh if, else, while,...
      // "no-magic-numbers": "warn",           // Hạn chế việc sử dụng các con số trực tiếp trong code mà không giải thích rõ ý nghĩa
      "no-var": "warn",                     // Yêu cầu sử dụng let hoặc const thay cho var
      "semi": ["error", "never"],           // Quy định không sử dụng dấu ; ở cuối lệnh
      "quotes": ["error", "double"],        // Quy định sử dụng dấu nháy kép
      "indent": ["error", 2],               // Quy định thụt đầu dòng 2 spaces
      "comma-dangle": ["warn", "never"],    // Không sử dụng dấu phẩy ở phần tử cuối cùng của Array hoặc Object
      "prefer-arrow-callback": [            // Cảnh báo khi callback không phải arrow func
        "warn",
        { "allowNamedFunctions": false }
      ],
      "func-style": ["warn", "expression"]  // Cảnh báo khi dùng func thường, phải dùng arrow func
		},
  },
])
