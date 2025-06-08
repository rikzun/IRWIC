"use strict";
(self["webpackChunkirwic"] = self["webpackChunkirwic"] || []).push([["main"],{

/***/ "./src/App.style.scss":
/*!****************************!*\
  !*** ./src/App.style.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var _App_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.style.scss */ "./src/App.style.scss");
/* harmony import */ var _cypher_cypher_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cypher/cypher.service */ "./src/cypher/cypher.service.ts");
/* harmony import */ var _utils_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/react */ "./src/utils/react.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");





function App() {
    var mode = (0,_utils_react__WEBPACK_IMPORTED_MODULE_3__.useStorage)('encrypt');
    var key = (0,_utils_react__WEBPACK_IMPORTED_MODULE_3__.useStorage)('');
    var input = (0,_utils_react__WEBPACK_IMPORTED_MODULE_3__.useStorage)('');
    var output = (0,_utils_react__WEBPACK_IMPORTED_MODULE_3__.useStorage)('');
    (0,_utils_react__WEBPACK_IMPORTED_MODULE_3__.useDebouncedEffect)(100, function() {
        if (key.value == '' || input.value == '') {
            output.set('');
            return;
        }
        output.set((mode.value == 'encrypt' ? _cypher_cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.encrypt : _cypher_cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.decrypt)(key.value, input.value));
    }, [
        mode.value,
        key.value,
        input.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "column",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "key-field",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                type: "text",
                                spellCheck: "false",
                                placeholder: "Key",
                                className: "text-input",
                                value: key.value,
                                onChange: function(e) {
                                    return key.set(e.target.value);
                                }
                            }, void 0, false, {
                                fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                                lineNumber: 28,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components__WEBPACK_IMPORTED_MODULE_4__.Switch, {
                                first: {
                                    title: 'Encrypt',
                                    value: 'encrypt'
                                },
                                second: {
                                    title: 'Decrypt',
                                    value: 'decrypt'
                                },
                                state: mode
                            }, void 0, false, {
                                fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                                lineNumber: 36,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "textarea-container",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("textarea", {
                            spellCheck: "false",
                            placeholder: "Input",
                            className: "text-input",
                            value: input.value,
                            onChange: function(e) {
                                return input.set(e.target.value);
                            }
                        }, void 0, false, {
                            fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components__WEBPACK_IMPORTED_MODULE_4__.TextStats, {
                        text: input.value
                    }, void 0, false, {
                        fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "column",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "textarea-container",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("textarea", {
                                spellCheck: "false",
                                placeholder: "Output",
                                className: "text-input output",
                                value: output.value,
                                disabled: true
                            }, void 0, false, {
                                fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                className: "copy-button active",
                                children: "Copy",
                                onClick: function() {
                                    return navigator.clipboard.writeText(output.value);
                                }
                            }, void 0, false, {
                                fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components__WEBPACK_IMPORTED_MODULE_4__.TextStats, {
                        text: output.value,
                        comparable: input.value
                    }, void 0, false, {
                        fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/runner/work/IRWIC/IRWIC/src/App.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}


/***/ }),

/***/ "./src/components/Switch/Switch.style.scss":
/*!*************************************************!*\
  !*** ./src/components/Switch/Switch.style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/Switch/Switch.tsx":
/*!******************************************!*\
  !*** ./src/components/Switch/Switch.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Switch: () => (/* binding */ Switch)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var _Switch_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Switch.style.scss */ "./src/components/Switch/Switch.style.scss");


function Switch(props) {
    var _this = this;
    var _props_elements;
    var elements = (_props_elements = props.elements) !== null && _props_elements !== void 0 ? _props_elements : [
        props.first,
        props.second,
        props.third,
        props.fourth
    ].filter(function(v) {
        return v != null;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "switch",
        children: elements.map(function(button) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                children: button.title,
                className: props.state.value == button.value ? 'active' : undefined,
                onClick: function() {
                    return props.state.set(button.value);
                }
            }, button.value, false, {
                fileName: "/home/runner/work/IRWIC/IRWIC/src/components/Switch/Switch.tsx",
                lineNumber: 27,
                columnNumber: 17
            }, _this);
        })
    }, void 0, false, {
        fileName: "/home/runner/work/IRWIC/IRWIC/src/components/Switch/Switch.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}


/***/ }),

/***/ "./src/components/TextStats/TextStats.tsx":
/*!************************************************!*\
  !*** ./src/components/TextStats/TextStats.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextStats: () => (/* binding */ TextStats)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _this = undefined;


var TextStats = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function(props) {
    if (props.text.length == 0) return null;
    var textLength = props.text.length;
    var textSize = new Blob([
        props.text
    ]).size;
    var compLength = props.comparable ? Math.floor(textLength / props.comparable.length * 100 - 100) : null;
    var compLengthSign = (compLength !== null && compLength !== void 0 ? compLength : 0) >= 0 ? '+' : '';
    var compSize = props.comparable ? Math.floor(textSize / new Blob([
        props.comparable
    ]).size * 100 - 100) : null;
    var compSizeSign = (compSize !== null && compSize !== void 0 ? compSize : 0) >= 0 ? '+' : '';
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
        className: "text-stats",
        children: [
            textLength,
            compLength && "(".concat(compLengthSign).concat(compLength, "%)"),
            " chars ",
            textSize,
            compSize && "(".concat(compSizeSign).concat(compSize, "%)"),
            " bytes"
        ]
    }, void 0, true, {
        fileName: "/home/runner/work/IRWIC/IRWIC/src/components/TextStats/TextStats.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, _this);
}, function(prevProps, nextProps) {
    return prevProps.text === nextProps.text;
});


/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Switch: () => (/* reexport safe */ _Switch_Switch__WEBPACK_IMPORTED_MODULE_0__.Switch),
/* harmony export */   TextStats: () => (/* reexport safe */ _TextStats_TextStats__WEBPACK_IMPORTED_MODULE_1__.TextStats)
/* harmony export */ });
/* harmony import */ var _Switch_Switch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Switch/Switch */ "./src/components/Switch/Switch.tsx");
/* harmony import */ var _TextStats_TextStats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextStats/TextStats */ "./src/components/TextStats/TextStats.tsx");




/***/ }),

/***/ "./src/cypher/cypher.decrypt.ts":
/*!**************************************!*\
  !*** ./src/cypher/cypher.decrypt.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DecryptBuilder: () => (/* binding */ DecryptBuilder)
/* harmony export */ });
/* harmony import */ var random_seed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! random-seed */ "./node_modules/random-seed/index.js");
/* harmony import */ var random_seed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(random_seed__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utf16tools */ "./src/utils/utf16tools.ts");
/* harmony import */ var _cypher_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cypher.service */ "./src/cypher/cypher.service.ts");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}



var DecryptBuilder = /*#__PURE__*/ function() {
    "use strict";
    function DecryptBuilder(keycode, input) {
        _class_call_check(this, DecryptBuilder);
        _define_property(this, "keycode", void 0);
        _define_property(this, "mCharacters", void 0);
        this.keycode = keycode;
        this.mCharacters = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.splitGraphemes(input);
    }
    _create_class(DecryptBuilder, [
        {
            key: "getOutput",
            value: function getOutput() {
                return this.mCharacters.join('');
            }
        },
        {
            key: "removeHash",
            value: function removeHash() {
                var _this = this;
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('hash_' + this.keycode);
                var length = this.mCharacters.length - _cypher_service__WEBPACK_IMPORTED_MODULE_2__.HASH_LENGTH;
                if (length < 1) throw Error("WRONG STRING");
                var indexes = _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.generateIndexes(random, _cypher_service__WEBPACK_IMPORTED_MODULE_2__.HASH_LENGTH, length);
                var currentHash = indexes.map(function(index) {
                    return _this.mCharacters[index];
                }).join('');
                indexes.reverse().forEach(function(index) {
                    return _this.mCharacters.splice(index, 1);
                });
                var hash = _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.getHash(this.mCharacters.join(''));
                if (hash !== currentHash) throw Error('HASH MISMATCH');
                return this;
            }
        },
        {
            key: "removeNoise",
            value: function removeNoise() {
                var _this = this;
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('noise_' + this.keycode);
                var noiseCount = random.intBetween(0, _cypher_service__WEBPACK_IMPORTED_MODULE_2__.MAX_NOISE);
                var length = this.mCharacters.length - noiseCount;
                if (length < 1) throw Error("WRONG STRING");
                _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.generateIndexes(random, noiseCount, length).reverse().forEach(function(index) {
                    return _this.mCharacters.splice(index, 1);
                });
                return this;
            }
        },
        {
            key: "shuffle",
            value: function shuffle() {
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('shuffle_' + this.keycode);
                _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.shuffle(random, this.mCharacters, true);
                return this;
            }
        },
        {
            key: "decrypt",
            value: function decrypt() {
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('offset_' + this.keycode);
                this.mCharacters = this.mCharacters.map(function(char) {
                    var offset = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.generateCodePoint(random);
                    var codePoints = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.codePointsFromChar(char);
                    var final = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.verifyOffset(codePoints.shift() - offset);
                    return _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.codePointsToChar([
                        final
                    ].concat(_to_consumable_array(codePoints)));
                });
                return this;
            }
        }
    ]);
    return DecryptBuilder;
}();


/***/ }),

/***/ "./src/cypher/cypher.encrypt.ts":
/*!**************************************!*\
  !*** ./src/cypher/cypher.encrypt.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EncryptBuilder: () => (/* binding */ EncryptBuilder)
/* harmony export */ });
/* harmony import */ var random_seed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! random-seed */ "./node_modules/random-seed/index.js");
/* harmony import */ var random_seed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(random_seed__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utf16tools */ "./src/utils/utf16tools.ts");
/* harmony import */ var _cypher_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cypher.service */ "./src/cypher/cypher.service.ts");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}



var EncryptBuilder = /*#__PURE__*/ function() {
    "use strict";
    function EncryptBuilder(keycode, input) {
        _class_call_check(this, EncryptBuilder);
        _define_property(this, "keycode", void 0);
        _define_property(this, "mCharacters", void 0);
        this.keycode = keycode;
        this.mCharacters = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.splitGraphemes(input);
    }
    _create_class(EncryptBuilder, [
        {
            key: "getOutput",
            value: function getOutput() {
                return this.mCharacters.join('');
            }
        },
        {
            key: "addHash",
            value: function addHash() {
                var _this = this;
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('hash_' + this.keycode);
                var hash = _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.getHash(this.mCharacters.join(''));
                _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.generateIndexes(random, _cypher_service__WEBPACK_IMPORTED_MODULE_2__.HASH_LENGTH, this.mCharacters.length).forEach(function(insertIndex, index) {
                    _this.mCharacters.splice(insertIndex, 0, hash[index]);
                });
                return this;
            }
        },
        {
            key: "addNoise",
            value: function addNoise() {
                var _this = this;
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('noise_' + this.keycode);
                var noiseCount = random.intBetween(0, _cypher_service__WEBPACK_IMPORTED_MODULE_2__.MAX_NOISE);
                _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.generateIndexes(random, noiseCount, this.mCharacters.length).forEach(function(insertIndex) {
                    var char = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.generateChar(random);
                    _this.mCharacters.splice(insertIndex, 0, char);
                });
                return this;
            }
        },
        {
            key: "shuffle",
            value: function shuffle() {
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('shuffle_' + this.keycode);
                _cypher_service__WEBPACK_IMPORTED_MODULE_2__.CypherService.shuffle(random, this.mCharacters);
                return this;
            }
        },
        {
            key: "encrypt",
            value: function encrypt() {
                var random = (0,random_seed__WEBPACK_IMPORTED_MODULE_0__.create)('offset_' + this.keycode);
                this.mCharacters = this.mCharacters.map(function(char) {
                    var codePoints = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.codePointsFromChar(char);
                    var offset = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.generateCodePoint(random);
                    var final = _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.verifyOffset(codePoints.shift() + offset);
                    return _utils_utf16tools__WEBPACK_IMPORTED_MODULE_1__.UTF16Tools.codePointsToChar([
                        final
                    ].concat(_to_consumable_array(codePoints)));
                });
                return this;
            }
        }
    ]);
    return EncryptBuilder;
}();


/***/ }),

/***/ "./src/cypher/cypher.service.ts":
/*!**************************************!*\
  !*** ./src/cypher/cypher.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CypherService: () => (/* binding */ CypherService),
/* harmony export */   HASH_LENGTH: () => (/* binding */ HASH_LENGTH),
/* harmony export */   MAX_NOISE: () => (/* binding */ MAX_NOISE)
/* harmony export */ });
/* harmony import */ var _cypher_encrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cypher.encrypt */ "./src/cypher/cypher.encrypt.ts");
/* harmony import */ var _cypher_decrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cypher.decrypt */ "./src/cypher/cypher.decrypt.ts");
/* harmony import */ var _utils_utf16tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/utf16tools */ "./src/utils/utf16tools.ts");
/* harmony import */ var string_hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! string-hash */ "./node_modules/string-hash/index.js");
/* harmony import */ var string_hash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(string_hash__WEBPACK_IMPORTED_MODULE_3__);
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}




var MAX_NOISE = 100;
var HASH_LENGTH = 10;
var CypherService = /*#__PURE__*/ function() {
    "use strict";
    function CypherService() {
        _class_call_check(this, CypherService);
    }
    _create_class(CypherService, null, [
        {
            key: "keywordToKeycode",
            value: function keywordToKeycode(keyword) {
                return _utils_utf16tools__WEBPACK_IMPORTED_MODULE_2__.UTF16Tools.splitGraphemes(keyword).map(function(grapheme) {
                    return "(".concat(Array.from(grapheme).map(function(v) {
                        return v.codePointAt(0);
                    }).join('|'), ")");
                }).join('');
            }
        },
        {
            key: "getHash",
            value: function getHash(value) {
                return string_hash__WEBPACK_IMPORTED_MODULE_3___default()(value).toString().padStart(HASH_LENGTH, '0');
            }
        },
        {
            key: "generateIndexes",
            value: function generateIndexes(random, count, stringLength) {
                var maxIndex = stringLength - 1 + count;
                var indexes = new Set();
                while(indexes.size < count){
                    var num = random.intBetween(0, maxIndex);
                    indexes.add(num);
                }
                return Array.from(indexes).sort(function(a, b) {
                    return a - b;
                });
            }
        },
        {
            key: "shuffle",
            value: function shuffle(random, mCharacters) {
                var reverse = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var maxIndex = mCharacters.length - 1;
                var indexes = new Array(maxIndex);
                for(var i = maxIndex; i > 0; i--){
                    indexes[maxIndex - i] = [
                        i,
                        random.intBetween(0, i)
                    ];
                }
                if (reverse) indexes.reverse();
                indexes.forEach(function(param) {
                    var _param = _sliced_to_array(param, 2), i = _param[0], j = _param[1];
                    var ref;
                    ref = [
                        mCharacters[j],
                        mCharacters[i]
                    ], mCharacters[i] = ref[0], mCharacters[j] = ref[1], ref;
                });
            }
        },
        {
            key: "encrypt",
            value: function encrypt(keyword, input) {
                var keycode = CypherService.keywordToKeycode(keyword);
                return new _cypher_encrypt__WEBPACK_IMPORTED_MODULE_0__.EncryptBuilder(keycode, input).addHash().addNoise().shuffle().encrypt().getOutput();
            }
        },
        {
            key: "decrypt",
            value: function decrypt(keyword, input) {
                var keycode = CypherService.keywordToKeycode(keyword);
                try {
                    return new _cypher_decrypt__WEBPACK_IMPORTED_MODULE_1__.DecryptBuilder(keycode, input).decrypt().shuffle().removeNoise().removeHash().getOutput();
                } catch (e) {
                    return e.message;
                }
            }
        }
    ]);
    return CypherService;
}();


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.tsx");



var container = document.getElementById("root");
var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_App__WEBPACK_IMPORTED_MODULE_2__.App, {}, void 0, false, {
    fileName: "/home/runner/work/IRWIC/IRWIC/src/index.tsx",
    lineNumber: 7,
    columnNumber: 13
}, undefined));


/***/ }),

/***/ "./src/utils/react.ts":
/*!****************************!*\
  !*** ./src/utils/react.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDebouncedEffect: () => (/* binding */ useDebouncedEffect),
/* harmony export */   useStorage: () => (/* binding */ useStorage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}

function useDebouncedEffect(delay, callback, dependencies) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        var timer = setTimeout(function() {
            callback();
        }, delay);
        return function() {
            return clearTimeout(timer);
        };
    }, dependencies);
}
function useStorage(value) {
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value), 2), state = _useState[0], setState = _useState[1];
    return {
        value: state,
        set: setState
    };
}


/***/ }),

/***/ "./src/utils/utf16tools.ts":
/*!*********************************!*\
  !*** ./src/utils/utf16tools.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UTF16Tools: () => (/* binding */ UTF16Tools)
/* harmony export */ });
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var UTF16Tools = /*#__PURE__*/ function() {
    "use strict";
    function UTF16Tools() {
        _class_call_check(this, UTF16Tools);
    }
    _create_class(UTF16Tools, null, [
        {
            key: "generateChar",
            value: function generateChar(random) {
                return this.codePointsToChar([
                    this.generateCodePoint(random)
                ]);
            }
        },
        {
            key: "generateCodePoint",
            value: function generateCodePoint(random) {
                var code = random.intBetween(this.range00, this.range11);
                if (code > this.range01 && code < this.range10) code += this.freeSpace;
                return code;
            }
        },
        {
            key: "verifyOffset",
            value: function verifyOffset(offset) {
                if (offset > this.range11) return offset - this.range11;
                if (offset < 0) return offset + this.range11;
                if (offset > this.range01 && offset < this.range10) return offset + this.freeSpace;
                return offset;
            }
        },
        {
            key: "codePointsToChar",
            value: function codePointsToChar(codePoints) {
                var _String;
                return (_String = String).fromCodePoint.apply(_String, _to_consumable_array(codePoints));
            }
        },
        {
            key: "codePointsFromChar",
            value: function codePointsFromChar(char) {
                return Array.from(char).map(function(v) {
                    return v.codePointAt(0);
                });
            }
        },
        {
            key: "splitGraphemes",
            value: function splitGraphemes(value) {
                return _to_consumable_array(this.segmenter.segment(value)).map(function(v) {
                    return v.segment;
                });
            }
        }
    ]);
    return UTF16Tools;
}();
_define_property(UTF16Tools, "range00", 0x0000);
_define_property(UTF16Tools, "range01", 0xD7FF);
_define_property(UTF16Tools, "freeSpace", 0x0801);
_define_property(UTF16Tools, "range10", 0xE000);
_define_property(UTF16Tools, "range11", 0x10FFFF);
_define_property(UTF16Tools, "segmenter", new Intl.Segmenter("en", {
    granularity: "grapheme"
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/index.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.43e578de.js.map