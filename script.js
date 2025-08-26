// 密码生成器核心功能
const generatePassword = (length, options) => {
    const { useNumbers, useLowercase, useUppercase, useSpecialChars } = options;
    let chars = '';
    let password = '';
    
    if (useNumbers) chars += '0123456789';
    if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useSpecialChars) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return password;
};

// 6位数字密码
const generate6DigitPassword = () => {
    return generatePassword(6, {
        useNumbers: true,
        useLowercase: false,
        useUppercase: false,
        useSpecialChars: false
    });
};

// 12位简单密码
const generate12SimplePassword = () => {
    return generatePassword(12, {
        useNumbers: true,
        useLowercase: true,
        useUppercase: true,
        useSpecialChars: false
    });
};

// 12位复杂密码
const generate12ComplexPassword = () => {
    return generatePassword(12, {
        useNumbers: true,
        useLowercase: true,
        useUppercase: true,
        useSpecialChars: true
    });
};

// 18位密码
const generate18Password = () => {
    return generatePassword(18, {
        useNumbers: true,
        useLowercase: true,
        useUppercase: true,
        useSpecialChars: true
    });
};

// 初始化DOM事件
// 风险提示信息
const warningMessages = {
    weak: "警告：6位数字密码安全性较低，建议仅在非重要场合使用",
    medium: "提示：12位简单密码适合一般安全要求的场合",
    strong: "提示：12位复杂密码安全性较高，适合重要账户",
    veryStrong: "提示：18位密码安全性极高，建议用于重要账户"
};

// 显示警告信息
function showWarning(type) {
    const warningElement = document.getElementById('warning-message');
    warningElement.textContent = warningMessages[type];
    
    // 根据密码强度设置不同样式
    warningElement.className = 'warning';
    if (type === 'weak') {
        warningElement.classList.add('warning-weak');
    } else {
        warningElement.classList.add('warning-normal');
    }
}

// 确保DOM元素存在
function getElementByIdSafe(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id '${id}' not found`);
        return null;
    }
    return element;
}

// 更新displayPassword函数
function displayPassword(password) {
    const passwordDisplay = getElementByIdSafe('password-display');
    if (passwordDisplay) {
        passwordDisplay.textContent = password;
    }
}

// 更新window.onload函数
window.onload = function() {
    // 获取所有需要的DOM元素
    const passwordDisplay = getElementByIdSafe('password-display');
    const generate6DigitsBtn = getElementByIdSafe('generate-6digits');
    const generate12SimpleBtn = getElementByIdSafe('generate-12simple');
    const generate12ComplexBtn = getElementByIdSafe('generate-12complex');
    const generate18Btn = getElementByIdSafe('generate-18');
    const copyBtn = getElementByIdSafe('copy-password');
    const regenerateBtn = getElementByIdSafe('regenerate');
    const warningElement = getElementByIdSafe('warning-message');
    
    // 检查所有元素是否存在
    if (!passwordDisplay || !generate6DigitsBtn || !generate12SimpleBtn || 
        !generate12ComplexBtn || !generate18Btn || !copyBtn || !regenerateBtn || !warningElement) {
        console.error('One or more required elements are missing from the DOM');
        return;
    }
    
    // 添加事件监听器
    generate6DigitsBtn.addEventListener('click', () => {
        displayPassword(generate6DigitPassword());
        showWarning('weak');
    });
    
    generate12SimpleBtn.addEventListener('click', () => {
        displayPassword(generate12SimplePassword());
        showWarning('medium');
    });
    
    generate12ComplexBtn.addEventListener('click', () => {
        displayPassword(generate12ComplexPassword());
        showWarning('strong');
    });
    
    generate18Btn.addEventListener('click', () => {
        displayPassword(generate18Password());
        showWarning('veryStrong');
    });
    
    // 复制功能
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordResult.textContent);
        alert('密码已复制到剪贴板');
    });
    
    // 重新生成当前密码
    regenerateBtn.addEventListener('click', () => {
        const currentPassword = passwordResult.textContent;
        if (currentPassword.length === 6 && /^\d+$/.test(currentPassword)) {
            displayPassword(generate6DigitPassword());
        } else if (currentPassword.length === 12) {
            if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(currentPassword)) {
                displayPassword(generate12ComplexPassword());
            } else {
                displayPassword(generate12SimplePassword());
            }
        } else if (currentPassword.length === 18) {
            displayPassword(generate18Password());
        }
    });
};