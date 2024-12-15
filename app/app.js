// 初始化 CodeMirror 编辑器
const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'htmlmixed', // 设置默认语言为 HTML
    theme: 'dracula',  // 设置主题
    lineNumbers: true, // 显示行号
    matchBrackets: true, // 启用括号匹配
    autoCloseBrackets: true, // 启用自动闭合括号
    styleActiveLine: true, // 高亮当前行
    tabSize: 4,           // 设置缩进为 4 个空格
    extraKeys: {
        "Ctrl-Space": "autocomplete", // 绑定 Ctrl-Space 触发代码提示
        "Tab": function (cm) {
            // 自定义 Tab 键行为：如果光标位于括号内，则自动补全括号，否则插入 Tab
            if (cm.somethingSelected()) {
                cm.indentSelection("add");
            } else {
                cm.execCommand("insertSoftTab");
            }
        }
    },
    hintOptions: {
        completeSingle: false, // 当只有一个提示时，不要自动完成
        tables: {}
    }
});

// 语言切换功能
function setLanguage(language) {
    switch (language) {
        case 'xml':
            editor.setOption('mode', 'application/xml');
            editor.setOption('hintOptions', { hint: CodeMirror.hint.xml });
            break;
        case 'html':
            editor.setOption('mode', 'htmlmixed');
            editor.setOption('hintOptions', { hint: CodeMirror.hint.html });
            break;
        case 'javascript':
            editor.setOption('mode', 'javascript');
            editor.setOption('hintOptions', { hint: CodeMirror.hint.javascript });
            break;
        case 'lua':
            editor.setOption('mode', 'lua');
            editor.setOption('hintOptions', { hint: CodeMirror.hint.anyword }); // Lua 没有内置提示，使用 anyword 作为简单提示
            break;
        default:
            editor.setOption('mode', 'htmlmixed');
            editor.setOption('hintOptions', { hint: CodeMirror.hint.html });
    }
}

setLanguage('javascript');

// 自动显示代码提示
let timeoutId;

function maybeShowHint() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        // 获取当前光标位置
        const cursor = editor.getCursor();
        const token = editor.getTokenAt(cursor);

        // 检查是否需要显示提示
        if (token.string && token.end === cursor.ch) {
            // 如果光标位于一个有效的 token 之后，显示提示
            CodeMirror.showHint(editor, editor.getOption('hintOptions').hint);
        }
    }, 500); // 延迟 500 毫秒以避免频繁触发
}

// 监听光标活动事件
editor.on('cursorActivity', maybeShowHint);

function input_box() {
    if (document.getElementById("input_box").style.bottom != "-27%") {
        document.getElementById("input_box").style.bottom = "-27%"
    } else {
        document.getElementById("input_box").style.bottom = "0"
    }
}

function setinputtext(text) {
    document.getElementById("input_text").innerText = text
}

function setpretext(text) {
    editor.setValue(text)
}
function getcode() {
    return editor.getValue()
}
let inclient = false
//对无法取值的调用方增加回调事件
editor.on('inputRead', function (cm, changeObj) {
    var text = editor.getValue();
    if (inclient == true) {
        setcodeinclient(text)
    }
});